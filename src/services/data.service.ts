import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Stands } from "../models/stands";
import { User } from "../models/user";

@Injectable()
export class DataService {
  unassignedStand: any;
  userStands: AngularFireList<any>;
  newStand: AngularFireList<Stands>;
  standApplications: AngularFireList<any>;
  userId: string;
  userEmail: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userId = user.uid;
      }
    });
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  getUserStands() {
    return this.db.list(`stand-applications`);
  }

  standSearch(stand) {
    return this.db.list<any>(`stand-applications/${stand}`, ref => ref.orderByChild('applicant')
      .equalTo(this.userEmail));
  }

  addStand(stand: Stands) {
    this.standApplications = this.db.list(`stand-applications/${stand.area}`);
    let data = Object.assign(
      stand, {
        applicant: this.userEmail,
        status: 'Pending Approval'
      })
    let key = this.standApplications.push(data).key;
    stand.standId = key;
    return this.db.list(`stand-applications/${stand.area}`).update(key, { standId: key });
  }

  newStands(newStand: Stands) {
    this.unassignedStand = this.db.list(`new-stands`);
    let ref = this.unassignedStand.push(newStand).key;
    return this.db.list(`new-stands`).update(ref, { standRef: ref });
  }

  getNewStandsAreas() {
    return this.db.list(`/new-stands`);
  }

  getAreaApplicants(area) {
    return this.db.list(`stand-applications/${area}`);
  }

  // stand number
  assignStandNumber(area: string, id: string, standNumber) {
    let data = Object.assign(
      standNumber, {
        status: 'Owned'
      })
    return this.db.list(`stand-applications/${area}`).update(id, data);
  }

  //payment
  chargeRates(area: string, id: string, bills) {
    return this.db.list(`stand-applications/${area}`).update(id, bills);
  }

  paymentRequest(area: string, id: string) {
    return this.db.list(`stand-applications/${area}`).update(id, { status: 'Payment' });
  }

  searchByArea(area) {
    return this.db.list(`stands/${this.userId}`, ref => ref.orderByChild('area')
      .equalTo(area));
  }

  pay(stand) {
    return this.db.list(`stands/${this.userId}`).update(stand.key, { status: 'Paid' });
  }

  makePayment(area, stand) {
    this.db.list(`new-stands`).remove(stand.standRef);
    return this.db.list(`stand-applications/${area}`).update(stand.standId, { status: 'Owned' });
  }

  //bills
  payBills(area, standId) {
    return this.db.list(`stand-applications/${area}`).update(standId, { Bins: 0, Water: 0, Waste: 0 });
  }
}

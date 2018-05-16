import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Stands } from "../models/stands";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { database } from "firebase";


@Injectable()
export class DataService {
  userStands: AngularFireList<any>;
  newStand: AngularFireList<Stands>;
  standApplications: AngularFireList<any>;
  userId: string;
  userEmail: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (user) {
        //add loader
        this.userEmail = user.email;
        this.userId = user.uid;
        this.userStands = this.db.list(`stands/${this.userId}`);
        console.log(this.userStands);

      }
    });
    this.newStand = this.db.list(`new-stands`);
  }

  getUserStands() {
    return this.db.list(`stand-applications`);
  }

  standSearch(stand) {
    return this.db.list(`stand-applications/${stand}`, ref => ref.orderByChild('applicant')
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
    this.newStand.push(newStand);
  }

  getNewStandsAreas() {
    return this.db.list(`/new-stands`);
  }

  getAreaApplicants(area) {
    return this.db.list(`stand-applications/${area}`);
  }

  // stand number
  assignStandNumber(area: string, applicant: any, standNumber) {
    return this.db.list(`stand-applications/${area}`, ref => ref.orderByChild('applicant')
      .equalTo(applicant));
  }
  updateStandNumber(area: string, item: any, standNumber) {
    this.db.list(`approved-stands/${item.key}`)
    return this.db.list(`stand-applications/${area}`).update(item.key, standNumber);
  }

  //payment

  paymentRequest(area: string, id: string) {
    return this.db.list(`stand-applications/${area}`).update(id, { status: 'Payment' });
  }

  searchByArea(area) {
    // this.db.list(`stand-applications/${area}`, ref => ref.orderByChild('applicant')
    //   .equalTo(this.userEmail))
    //   .snapshotChanges()
    //   .subscribe(data => {
    //     this.db.list(`stand-applications/${area}`).update(data[0].key, { status: 'Paid' });
    //   })
    return this.db.list(`stands/${this.userId}`, ref => ref.orderByChild('area')
      .equalTo(area));
  }

  pay(stand) {
    return this.db.list(`stands/${this.userId}`).update(stand.key, { status: 'Paid' });
  }

  makePayment(area, standId) {
    return this.db.list(`stand-applications/${area}`).update(standId, { status: 'Paid' });
  }
}

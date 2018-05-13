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

  getUserStands(): AngularFireList<Stands> {
    return this.userStands;
  }

  addStand(stand: Stands) {
    this.standApplications = this.db.list(`stand-applications/${stand.area}`);
    this.standApplications.push({ applicant: this.userEmail, status: 'Pending Approval', standNumber: null });
    stand.status = 'Pending Approval';
    return this.userStands.push(stand);
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

  assignStandNumber(area: string, applicant: any, standNumber) {
    this.db.list(`stand-applications/${area}`, ref => ref.orderByChild('applicant')
      .equalTo(applicant))
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(item => {
          standNumber.status = 'Owned';
          this.db.list(`approved-stands/${item.key}`)
          this.db.list(`stand-applications/${area}`).update(item.key, standNumber);
        })
      });
  }

  paymentRequest(area: string, applicant: any) {
    this.db.list(`stand-applications/${area}`, ref => ref.orderByChild('applicant')
      .equalTo(applicant))
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(item => {
          this.db.list(`stand-applications/${area}`).update(item.key, { status: 'Payment' });
        })
      });

    this.db.list(`stands/${this.userId}`, ref => ref.orderByChild('area')
      .equalTo(area))
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(item => {
          this.db.list(`stands/${this.userId}`).update(item.key, { status: 'Payment' })
        })
      });
  }

  makePayment(area) {
    this.db.list(`stands/${this.userId}`, ref => ref.orderByChild('area')
      .equalTo(area))
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(item => {
          this.db.list(`stands/${this.userId}`).update(item.key, { status: 'Paid' })
        })
      });

    this.db.list(`stand-applications/${area}`, ref => ref.orderByChild('applicant')
      .equalTo(this.userEmail))
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(item => {
          this.db.list(`stand-applications/${area}`).update(item.key, { status: 'Paid' });
        })
      })

  }
}

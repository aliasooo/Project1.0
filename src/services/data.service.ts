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
      }
    });
    this.newStand = this.db.list(`new-stands`);
  }

  getUserStands(): AngularFireList<Stands> {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userStands = this.db.list(`stands/${this.userId}`);
    //   }
    // });
    this.db.list(`stand-applications`)
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(location => {
        console.log(location);
        
          // this.db.list(`stand-applications/${location}`, ref => ref.orderByChild('applicant')
          //   .equalTo(this.userEmail))
          //   .snapshotChanges()
          //   .subscribe(result => {
          //     this.userStands.push(result);
          //     console.log(this.userStands);
              
          //   })
        })
      })
    return this.userStands;
  }

  addStand(stand: Stands) {
    this.standApplications = this.db.list(`stand-applications/${stand.area}`);
    this.standApplications.push({ applicant: this.userEmail, status: 'Pending', standNumber: null });
    stand.status = 'Pending';
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
    return this.db.list(`stand-applications/${area}`, ref => ref.orderByChild('applicant')
      .equalTo(applicant))
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(item => {
          standNumber.status = 'Owned';
          this.db.list(`stands/${item.key}`)
          this.db.list(`stand-applications/${area}`).update(item.key, standNumber);
        })
      })
  }

  paymentRequest() { }
}

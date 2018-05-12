import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Stands } from "../models/stands";


@Injectable()
export class DataService {
  userStands: AngularFireList<Stands>;
  newStand: AngularFireList<Stands>;
  standApplications: AngularFireList<any>;
  userId: string;


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (user) {
        //add loader
        this.userId = user.uid;
        this.userStands = this.db.list(`stands/${this.userId}`);
      }
    });
    this.newStand = this.db.list(`new-stands`);
  }

  getUserStands(): AngularFireList<Stands> {
    if (!this.userId) return;
    return this.userStands;
  }

  addStand(stand: Stands) {
    this.standApplications = this.db.list(`stand-applications/${stand.area}`);
    this.standApplications.push({ applicant: this.userId, status: 'Pending' });
    return this.userStands.push(stand);

  }

  newStands(newStand: Stands) {
    this.newStand.push(newStand);
  }

  getNewStandsAreas() {
    return this.db.list(`/new-stands`);
  }

  getAreaApplicants(area){
    return this.db.list(`new-stands/${area}`); 
  }

  assignStandNumber() {

  }

}

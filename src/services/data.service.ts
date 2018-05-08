import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Stands } from "../models/stands";


@Injectable()
export class DataService {
  userStands: AngularFireList<Stands[]>;
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
   this.userStands = db.list('/stands');
    afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
    });
  }

  getUserStands(): AngularFireList<Stands[]> {
    if (!this.userId) return;
    this.userStands = this.db.list(`items/${this.userId}`);
    return this.userStands;
  }

  addStand(stand) {
    this.userStands.push(stand);
  }
}

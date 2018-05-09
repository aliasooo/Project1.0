import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Stands } from "../models/stands";


@Injectable()
export class DataService {
  userStands: AngularFireList<Stands>;
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (user) {
        //add loader
        this.userId = user.uid;
        this.userStands = this.db.list(`stands/${this.userId}`);
      }
    });
  }

  getUserStands(): AngularFireList<Stands> {
    console.log(this.userId);

    if (!this.userId) return;
     return this.userStands;
  }

  addStand(stand: Stands) {
    console.log('stand', stand);
    this.userStands.push(stand);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  // uid = this.activatedRoute.snapshot.params.id;

  // id: any;
  profile: Array<any> = [];
  profId: any;
  profOwner: any;
  prof: any;
  ownerProfile: any = [];

  constructor(
    public nav: NavController,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authService.signAuth();

    // this.id = this.activatedRoute.snapshot.paramMap.get('id')
    // console.log('ID: ', this.id)

    let user = firebase.auth().currentUser.uid;
    console.log('profile: ', user)

    // fetching profile
    firebase.firestore().collection('companyprofile').doc(user).get().then(snapshot => {
      this.ownerProfile = snapshot.data();
      console.log('new data: ', this.ownerProfile)
    });

    // Fetching owner details from firebase
    firebase.firestore().collection('eventOwners').doc(user).get().then(snap => {
      this.profOwner = snap.data();
      console.log('Event Owner: ', this.profOwner)
    })


  }

}

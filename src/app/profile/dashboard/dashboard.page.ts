import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';

import { AuthService } from '../../../app/services/auth.service';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  profile: Array<any> = [];
  profId: any;
  profOwner: any;
  profileOwner: any;
  allOwners: Array<any> = [];

  constructor(
               public nav: NavController,
               private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.signAuth();

    let user = firebase.auth().currentUser.uid;
    console.log('profile: ', user)

    firebase.firestore().collection('companyprofile').doc(user).get().then(res => {
      this.profileOwner = res.data();
      console.log('profile owner: ', this.profileOwner)
    })

    // Fetching owner details from firebase
    firebase.firestore().collection('eventOwners').doc(user).get().then(snap => {
      this.profOwner = snap.data();
      console.log('Event Owner: ', this.profOwner)
    })


    // Fetching the company profile from firebase
    // firebase.firestore().collectionGroup('companyprofile').where('eventOwnerId', '==', user).get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     this.profile.push(Object.assign( doc.data(), {uid:doc.id}) )
    //     console.log('Profilee: ', this.profile)
    //     this.profId = {uid:doc.id}
    //     console.log('prof_ID: ', this.profId)
    //   })
    // })
  }

  logout(){
    this.authService.logoutEventOwner();
    this.authService.signAuth();
    this.nav.navigateRoot('/signin')
  }

}

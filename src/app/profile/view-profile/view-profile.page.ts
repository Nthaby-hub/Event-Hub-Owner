import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
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

  editProfileForm: FormGroup
  profile: Array<any> = [];
  profId: any;
  profOwner: any;
  prof: any;
  id: any;
  companyprofile: any;
  ownerProfile: any = [];

  constructor(
    public nav: NavController,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alertCtrl: AlertController
  ) {  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    this.authService.signAuth();

    let user = firebase.auth().currentUser.uid;
    console.log('profile: ', user)

    // fetching single company profile by it's id and set the values
    firebase.firestore().collection('companyprofile').doc(this.id).get().then(snapshot => {
      this.companyprofile = snapshot.data()
      console.log('New Profile details: ', this.companyprofile)
      this.editProfileForm.controls['clientCode'].setValue(this.companyprofile.clientCode),
      this.editProfileForm.controls['companyName'].setValue(this.companyprofile.companyName),
      this.editProfileForm.controls['address'].setValue(this.companyprofile.address),
      this.editProfileForm.controls['phone'].setValue(this.companyprofile.phone),
      this.editProfileForm.controls['email'].setValue(this.companyprofile.email),
      this.editProfileForm.controls['website'].setValue(this.companyprofile.website)
    });
    this.editProfile();

    // Fetching owner details from firebase
    firebase.firestore().collection('eventOwners').doc(user).get().then(snap => {
      this.profOwner = snap.data();
      console.log('Event Owner: ', this.profOwner)
    })
  }

  editProfile(){
    this.editProfileForm = this.fb.group({
      clientCode: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['',  [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      website: ['', Validators.required]
    });
  }

  async companyProf(){

    const alert = await this.alertCtrl.create({
      
      message: `Your company profile is updated successfully, please click Ok to confirm.`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            let user = firebase.auth().currentUser.uid

            firebase.firestore().collection('companyprofile').doc(user).update({
              clientCode: this.editProfileForm.value.clientCode,
              companyName: this.editProfileForm.value.companyName,
              address: this.editProfileForm.value.address,
              phone: this.editProfileForm.value.phone,
              email: this.editProfileForm.value.email,
              website: this.editProfileForm.value.website
            }).then(() => {
              this.nav.navigateRoot('/view-profile/' + this.id)
            }).catch(function(error){
              console.log(error)
            });
          }
        }
      ]
    });
    return await alert.present();

  }

  addPic(){
    console.log('Pic pic')
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;
  isSubmitted: boolean = false;
  eventOwnerId: any;
  company: string;

  set = {}
  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) { 
    this.company = localStorage.getItem('companyName')
  }

  ngOnInit() {
    this.saveProfile();
  }

  saveProfile(){
    this.profileForm = this.fb.group({
      // clientCode: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['',  [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      website: ['', Validators.required]
    });
  }

  // get clientCode() {
  //   return this.profileForm.get("clientCode");
  // }

  get companyName() {
    return this.profileForm.get("companyName");
  }

  get address() {
    return this.profileForm.get("address");
  }

  get email() {
    return this.profileForm.get("email");
  }

  get phone() {
    return this.profileForm.get("phone");
  }

  get website() {
    return this.profileForm.get("website");
  }

  public errorMessages = {
    // clientCode: [
    //   { type: 'required', message: 'Client code is required' },
    //   { type: 'maxLength', message: 'Client code cannot be longer than 100 characters' }
    // ],
    companyName: [
      { type: 'required', message: 'Company name is required' },
      { type: 'maxLength', message: 'Company name cannot be longer than 100 characters' }
    ],
    address: [
      { type: 'required', message: 'Address is required' },
      { type: 'maxLength', message: 'Address cannot be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please provide valid email.' }
    ],
    phone: [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile number cannot be less than 10 digits.' },
      { type: 'maxlength', message: 'Mobile number cannot be more than 10 digits.' },
      { type: 'pattern', message: 'Only numerical values allowed.' }
    ],
    website: [
      { type: 'required', message: 'Website is required.' },
      { type: 'maxlength', message: 'Website cannot be longer than 100 characters.' }
    ]
  }

  async companyProf(){

    const loading = await this.loadingCtrl.create();

    const user = firebase.auth().currentUser;
    this.eventOwnerId = user.uid;
    
    firebase.firestore().collection('companyprofile').doc(this.eventOwnerId).set({
      eventOwnerId: this.eventOwnerId,
      // clientCode: this.profileForm.value.clientCode,
      companyName: this.profileForm.value.companyName,
      address: this.profileForm.value.address,
      phone: this.profileForm.value.phone,
      email: this.profileForm.value.email,
      website: this.profileForm.value.website
    }).then(() => {
      loading.dismiss().then(() => {
        this.nav.navigateRoot('/tabs/landing');
        this.profileForm.reset();
      })
    },
    error => {
      loading.dismiss().then(() => {
        console.log(error)
      })
    } 
    );

    var clientCode = (<HTMLInputElement>document.getElementById("clientCode")).value;

    user.updateProfile({
      displayName: clientCode
    }).then(() => {
      localStorage.setItem("display name: ", clientCode);
      console.log('Client Code : ', clientCode)
      this.nav.navigateRoot('/tabs/landing');
    })

    return await loading.present();
  }
}

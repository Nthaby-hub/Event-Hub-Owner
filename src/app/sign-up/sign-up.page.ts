import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  eventOwnerForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.addOwner();
  }

  addOwner() {
    this.eventOwnerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      // mobile: ['',  [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }


  get username() {
    return this.eventOwnerForm.get("username");
  }

  get email() {
    return this.eventOwnerForm.get("email");
  }

  // get mobile() {
  //   return this.ownerForm.get("mobile");
  // }

  get password() {
    return this.eventOwnerForm.get("password");
  }

  public errorMessages = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'maxLength', message: 'Username cannot be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please provide valid email.' }
    ],
    // mobile: [
    //   { type: 'required', message: 'Mobile number is required.' },
    //   { type: 'minlength', message: 'Mobile number cannot be less than 10 digits.' },
    //   { type: 'maxlength', message: 'Mobile number cannot be more than 10 digits.' },
    //   { type: 'pattern', message: 'Only numerical values allowed.' }
    // ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password cannot be less than 5 characters.' },
      { type: 'maxlength', message: 'Password cannot be more than 10 characters.' }
    ]
  }

  async registerOwner() {

    const alert = await this.alertCtrl.create({

      message: `Your account is registered successfully, click Okay to continue to login.`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('User: ', this.eventOwnerForm.value);
            this.isSubmitted = true;
            if (this.eventOwnerForm.valid) {
              this.authService.signupEventOwner(this.eventOwnerForm.value.email, this.eventOwnerForm.value.password).then((res) => {
                return firebase.firestore().collection('eventOwners').doc(res.user.uid).set({
                  username: this.eventOwnerForm.value.username,
                  role: 'eventOwner'
                }).then(() => {
                  console.log('User: ', res.user);
                  this.nav.navigateRoot('/signin');
                }).catch(function (error) {
                  console.log(error)
                })
              });
            } else {
              console.log('Failed to register');
            }
          }
        },
      ]

    });
    return await alert.present();


  }


}

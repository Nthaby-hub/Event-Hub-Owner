import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {


  uid = this.activatedRoute.snapshot.params.id;

  eventLoginForm: FormGroup;
  isSubmitted: boolean = false;
  spin: boolean = false;
  owners: any;
  username: any;
  role: any;
  profiles: any;
  clientCode: any;
  profID: any;
  comProf: Array<any> = [];
  eventId: any;
  companyProf: any;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.loginOwner();
  }

  loginOwner() {
    this.eventLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  get email() {
    return this.eventLoginForm.get("email");
  }

  get password() {
    return this.eventLoginForm.get("password");
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please provide valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password cannot be less than 5 characters.' },
      { type: 'maxlength', message: 'Password cannot be more than 10 characters.' }
    ]
  }

  async signinOwner() {

    const loading = await this.loadingCtrl.create();

    console.log(this.eventLoginForm.value)
    this.isSubmitted = true;
    // Logging in the current owner/user  
    this.authService.signinEventOwner(this.eventLoginForm.value.email, this.eventLoginForm.value.password).then((res) => {
      console.log('logged in: ', res)

      // Getting logged in owner
      let user = firebase.auth().currentUser.uid
      console.log('user: ', user)
      // Fetching the event owners to get their username when logged in
      firebase.firestore().collection('eventOwners').doc(user).get().then(async (snap) => {
        this.owners = snap.data();
        this.username = snap.get('username');
        this.role = snap.get('role')

        const toast = await this.toastCtrl.create({
          message: "Welcome " + this.username,
          duration: 3000
        });
        toast.present();

        // Fetching company profile to get the client code
        firebase.firestore().collection('companyprofile').doc(user).get().then((snapshot) => {
          this.companyProf = snapshot.data();
          console.log('only profile: ', this.companyProf)
          this.clientCode = snapshot.get('clientCode')
          console.log('hahah client Codee: ', this.clientCode)

          // Checking if the client code is available before logging in
          if (this.clientCode) {
            console.log(' IF Client Code: ', this.clientCode)
            this.nav.navigateRoot("/tabs/landing");
          } else {
            console.log('Else User Client Code: ', this.clientCode)
            this.nav.navigateRoot("/profile");
          }

        })

      })

    }).then(() => {
      loading.dismiss().then(() => {
        this.nav.navigateRoot('/tabs/landing')
      });
    },
      async error => {
        const toast = await this.toastCtrl.create({
          message: error.message,
          duration: 3000
        });
        toast.present();
        loading.dismiss().then(() => {
          console.log(error)
        });
      }
    );
    return await loading.present();
  }
  goToNextPage() {
    this.router.navigateByUrl('/forgotpassword');
     }
     


}










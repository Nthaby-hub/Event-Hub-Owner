import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { AlertController, LoadingController, NavController } from '@ionic/angular';

//-----------------------Banele

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { EventsService } from 'src/app/services/events.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss']
})
export class CreateEventPage implements OnInit {

  // public minDate = moment().format();
  // public maxDate = moment().add(5, 'y').format('YYYY');
  // myDate = moment().toDate();

  minDate: Date;
  maxDate: Date;

  minTime = '06:30';
  maxTime = '19:30';
  hourValues = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19'];

  eventForm: FormGroup
  categories: Array<any> = [];
  catId: any;
  eventOwnerId: any;
  eventId: any;

  selectedFile: File = null;
  upLoadedFile: any;

  // ownerForm: FormGroup;
  // ownerId:any;
  // eventId:any;
  // downloadurl:null;

  events: Array<any> = [];

  constructor(
            private fb: FormBuilder,
            private router: Router,
            public nav: NavController,
            private eventService: EventsService,
            private authService: AuthService,
            public loadingCtrl: LoadingController, 
            private alertCtrl: AlertController
            ) {
              const currentYear = new Date().getFullYear();
              this.minDate = new Date();
              this.maxDate = new Date(currentYear + 20, 11, 31);
             }

  ngOnInit() {

    this.authService.signAuth();

    let user = firebase.auth().currentUser.uid;
    console.log('profile: ', user)

    firebase.firestore().collection('categories').onSnapshot(res => {
      res.forEach(element => {
        this.categories.push(Object.assign(element.data(), {uid:element.id}) );
        this.catId = {uid:element.id};
        console.log('CATIDD: ', this.catId)
        console.log('Categories: ', this.categories)
      });
    });

    this.addEvent();
  }

  changeDate(event: FocusEvent){
    const eventTarget = event.target;
    console.log(eventTarget);
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadstart = (p) => {
      console.log(p);
    };
    reader.onloadend = (e) => {
      console.log(e.target);
      this.upLoadedFile = reader.result;
      this.eventForm.get('imgUrl').setValue(this.upLoadedFile);
      //console.log(this.upLoadedFile);
    };
  }

  addEvent(){
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventVenue: ['', Validators.required],
      eventAddress: ['', Validators.required],
      eventType: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      imgUrl: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async eventSubmit(){

    const alert = await this.alertCtrl.create({

      message: `Event added successfully. Click Okay to add ticket for the event.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {

            const user = firebase.auth().currentUser
            this.eventOwnerId = user.uid

            firebase.firestore().collection('events').add({
              eventOwnerId: this.eventOwnerId,
              eventName: this.eventForm.value.eventName,
              eventVenue: this.eventForm.value.eventVenue,
              eventAddress: this.eventForm.value.eventAddress,
              eventType: this.eventForm.value.eventType,
              date: this.eventForm.value.date,
              startTime: this.eventForm.value.startTime,
              endTime: this.eventForm.value.endTime,
              imgUrl: this.eventForm.value.imgUrl,
              description: this.eventForm.value.description,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }).then((doc) => {
              doc.set({ eventId: doc.id }, { merge: true }).then(() => {
                console.log('event iddddd: ', this.eventId)
                // this.router.navigate(['/create-ticket', this.eventId]);
                // this.eventForm.reset();
              })
              // this.nav.navigateRoot('/create-ticket');
              this.router.navigate(['/create-ticket', doc.id]);
              this.eventForm.reset();
            }).catch(function(error){
              console.log(error)
            });
          },
        },
      ]

    });
    return await alert.present();

  }

}

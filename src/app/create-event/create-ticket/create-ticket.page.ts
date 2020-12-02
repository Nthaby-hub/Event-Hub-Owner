import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { AlertController, LoadingController, NavController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
})
export class CreateTicketPage implements OnInit {

  selectedTabs = 'free';
  ticketForm: FormGroup;
  ticketForm1: FormGroup;
  id: any;
  events: any;

  eventId: any;
  eventName: any;
  eventVenue: any;
  eventAddress: any;
  description: any;
  date: any;
  startTime: any;
  endTime: any;

  eventOwnerId: any;
  ticketId: any

  constructor(
            private fb: FormBuilder,
            private router: Router,
            public nav: NavController,
            private authService: AuthService,
            public loadingCtrl: LoadingController, 
            private alertCtrl: AlertController,
            private activatedActivated: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.authService.signAuth();

    // let user = firebase.auth().currentUser.uid;
    // console.log('profile: ', user)

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    // fetching single events
    firebase.firestore().collection('events').doc(this.id).get().then(snapshot => {
      this.events = snapshot.data();
      this.eventId = snapshot.get('eventId');
      this.eventName = snapshot.get('eventName');
      this.eventVenue = snapshot.get('eventVenue');
      this.eventAddress = snapshot.get('eventAddress');
      this.description = snapshot.get('description');
      this.date = snapshot.get('date');
      this.startTime = snapshot.get('startTime');
      this.endTime = snapshot.get('endTime');
      console.log('eventId: ', this.eventId)
      console.log('Event name: ', this.eventName)
      console.log('eventVenue: ', this.eventVenue)
      console.log('description: ', this.description)
      console.log('date: ', this.date)
      console.log('startTime: ', this.startTime)
      console.log('endTime: ', this.endTime)
      console.log('New Events: ', this.events)
    });

    this.addEventFree();
    this.addEventPaid();
  }

  addEventFree(){
    this.ticketForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: [{value: '', disabled: true}, Validators.required],
      // hideRequired: this.hideRequiredControl,
      // floatLabel: this.floatLabelControl,
      // description: ['', Validators.required]
    });
  }

  addEventPaid(){
    this.ticketForm1 = this.fb.group({
      name1: ['', Validators.required],
      quantity1: ['', Validators.required],
      price1: ['', Validators.required]
      // description: ['', Validators.required]
    });
  }

  // segmentChanged(ev: any) {
  //   console.log('Segment changed', ev);
  // }

  async ticketSubmit(){

    const alert = await this.alertCtrl.create({

      message: `Ticket created successfully. Click Okay to view landing page.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {

            const user = firebase.auth().currentUser
            this.eventOwnerId = user.uid

            firebase.firestore().collection('events').doc(this.eventId).collection('tickets').add({
              eventOwnerId: this.eventOwnerId,
              eventId: this.eventId,
              eventName: this.eventName,
              eventVenue: this.eventName,
              eventAddress: this.eventAddress,
              date: this.date,
              startTime: this.startTime,
              endTime: this.endTime,
              description: this.description,
              name: this.ticketForm.value.name,
              quantity: this.ticketForm.value.quantity,
              ticketType: "free",
              // price: this.ticketForm.value.price,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }).then((doc) => {
              doc.set({ ticketId: doc.id }, { merge: true }).then(() => {
                console.log('ticket iddddd: ', this.ticketId)
              })
              // this.nav.navigateRoot('/create-ticket');
              this.router.navigateByUrl('/tabs/landing');
              this.ticketForm.reset();
            }).catch(function(error){
              console.log(error)
            });
          },
        },
      ]

    });
    return await alert.present();

  }

  ticketSubmit1(){

  }

}

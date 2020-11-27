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

  public minDate = moment().format();
  public maxDate = moment().add(5, 'y').format('YYYY');
  myDate = moment().toDate();

  ownerForm: FormGroup;
  ownerId:any;
  downloadurl:null;

  constructor(
            private fb: FormBuilder,
            private router: Router,
            public nav: NavController,
            private eventService: EventsService,
            private authService: AuthService,
            public loadingCtrl: LoadingController, 
            private alertCtrl: AlertController
    ) { }

  ngOnInit() {

    this.authService.signAuth();

    let user = firebase.auth().currentUser.uid;
    console.log('profile: ', user)

    this.addEvent();

    // this.ownerForm = this.fb.group({
    //   eventName: ['', Validators.required],
    //   venue: ['', Validators.required],
    //   address: ['', Validators.required],
    //   eventType: ['', Validators.required],
    //   startTime: ['', Validators.required],
    //   endTime	: ['', Validators.required],
    //   eventDate	: ['', Validators.required],
    //   eventImage1	: ['', Validators.required],
    //   eventImage2	: ['', Validators.required],
    //   hosts: ['', Validators.required],
    //   TicketName: ['', Validators.required],
    //   ticketQuantity: ['', Validators.required],
    //   freetickbox: ['', Validators.required],
    //   TickLinks: ['', Validators.required],
    //   Mini: ['', Validators.required],
    //   max: ['', Validators.required],
    //   date1: ['', Validators.required],
    //   time1: ['', Validators.required],
    //   date2: ['', Validators.required],
    //   time2: ['', Validators.required]
      
      
    // });
  }
  

  //--------------------Banele

  get eventName() {
    return this.ownerForm.get("eventName");
  }
  get venue() {
    return this.ownerForm.get("venue");
  }
  get address() {
    return this.ownerForm.get("address");
  }
  get eventType() {
    return this.ownerForm.get("eventType");
  }

  get startTime() {
    return this.ownerForm.get("startTime");
  }
  get endTime() {
    return this.ownerForm.get("endTime");
  }
  get eventDate() {
    return this.ownerForm.get("eventDate");
  }
  get eventImage1() {
    return this.ownerForm.get("eventImage1");
  }
  // get eventImage2() {
  //   return this.ownerForm.get("eventImage2");
  // }
  get hosts() {
    return this.ownerForm.get("hosts");
  }
  
  

  get TicketName() {
    return this.ownerForm.get("TicketName");
  }
  get ticketQuantity() {
    return this.ownerForm.get("ticketQuantity");
  }
  get freetickbox() {
    return this.ownerForm.get("freetickbox");
  }
  get TickLinks() {
    return this.ownerForm.get("TickLinks");
  }
  get Mini() {
    return this.ownerForm.get("Mini");
  }
  get max() {
    return this.ownerForm.get("max");
  }

  get date1() {
    return this.ownerForm.get("date1");
  }
  get time1() {
    return this.ownerForm.get("time1");
  }
  get date2() {
    return this.ownerForm.get("date2");
  }
  get time2() {
    return this.ownerForm.get("time2");
  }


  public errorMessages = {
    eventName: [
      { type: 'required', message: 'Event name is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    
    venue: [
      { type: 'required', message: 'Venue is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    address: [
      { type: 'required', message: 'Address field is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    eventType: [
      { type: 'required', message: 'Choose one' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    startTime: [
      { type: 'required', message: 'Start timeis required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    endTime: [
      { type: 'required', message: 'The time the event will end' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    eventDate: [
      { type: 'required', message: 'Valid date' },
      { type: 'maxlength', message: 'No longer than 10 characters' }
    ],
    eventImage1: [
      { type: 'required', message: 'Poster Image is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    // eventImage2: [
    //   { type: 'required', message: 'Image field required' },
    //   { type: 'maxlength', message: 'No longer than 100 characters' }
    // ],
    hosts: [
      { type: 'required', message: 'Host name is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    TicketName: [
      { type: 'required', message: 'Ticket name is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    ticketQuantity: [
      { type: 'required', message: 'Quantity Quantity is required' },
      { type: 'maxlength', message: 'No longer than 10 characters' }
    ],
    freetickbox: [
      { type: 'required', message: 'Tick the box field is required' },
      { type: 'maxlength', message: 'No longer than 1 characters' }
    ],
    TickLinks: [
      { type: 'required', message: 'Ticket Links is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    Mini: [
      { type: 'required', message: 'Mini field is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    max: [
      { type: 'required', message: 'Max is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    date1: [
      { type: 'required', message: 'Select the date field is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    time1: [
      { type: 'required', message: 'Time is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    date2: [
      { type: 'required', message: 'Select the date is required' },
      { type: 'maxlength', message: 'No longer than 100 characters' }
    ],
    time2: [
      { type: 'required', message: 'Select the correct time' },
      {
        type: 'maxlength',
        message: 'Not more than 100 characters'
      }
    ]
  };

 



  addEvent() {
    this.ownerForm = this.fb.group({
      eventName: ['', Validators.required],
      venue: ['', Validators.required],
      address: ['', Validators.required],
      eventType: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime	: ['', Validators.required],
      eventDate	: ['', Validators.required],
       eventImage1	: ['', Validators.required],
      // eventImage2	: ['', Validators.required],
      hosts: ['', Validators.required],
      TicketName: ['', Validators.required],
      ticketQuantity: ['', Validators.required],
      freetickbox: ['', Validators.required],
      TickLinks: ['', Validators.required],
      Mini: ['', Validators.required],
      max: ['', Validators.required],
      date1: ['', Validators.required],
      time1: ['', Validators.required],
      date2: ['', Validators.required],
      time2: ['', Validators.required]
      });
    }


    addPic(event: any) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.downloadurl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  
    }
   


    async submit() {
      const alert = await this.alertCtrl.create({
        message: `Event added successfulluy, please click Okay to confirm`,
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              console.log(this.ownerForm.value);
              var user = firebase.auth().currentUser
              this.ownerId = user.uid;
              this.eventService.regEvent().add({
                ownerId: this.ownerId,
                eventName: this.ownerForm.value.eventName,
                venue: this.ownerForm.value.venue,
                address:this.ownerForm.value.address,
                eventType:this.ownerForm.value.eventType,
                startTime:this.ownerForm.value.startTime,
                endTime:this.ownerForm.value.endTime,
                eventDate:this.ownerForm.value.eventDate,
                eventImage1:this.ownerForm.value.eventImage1,
                // eventImage2:this.ownerForm.value.eventImage2,
                hosts:this.ownerForm.value.hosts,

                createdAt: firebase.firestore.FieldValue.serverTimestamp(),

                TicketName:this.ownerForm.value.TicketName,
                ticketQuantity:this.ownerForm.value.ticketQuantity,
                freetickbox:this.ownerForm.value.freetickbox,
                TickLinks:this.ownerForm.value.TickLinks,
                Mini:this.ownerForm.value.Mini,
                max:this.ownerForm.value.max

              }).then(() => {
                this.router.navigateByUrl('/tabs/landing');
                this.ownerForm.reset();
              }).catch(function (error) {
                console.log(error)
              });
            },
          },
        ]
      });
      return await alert.present();
  
    }

    goToNext(){
      this.router.navigateByUrl('/tabs/landing');
    }

 

}

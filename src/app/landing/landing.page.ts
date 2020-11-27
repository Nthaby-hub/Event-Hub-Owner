import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { EventsService } from '../services/events.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  uid = this.activatedActivated.snapshot.params.id;
  events: Array<any> = [];
  id: any;

  constructor(private router:Router,
    public nav:NavController,
    private loadingController: LoadingController,
    private modalCtrlr: ModalController,
    private authService: AuthService,
    private activatedActivated: ActivatedRoute, 
    private eventService: EventsService) { }

  ngOnInit() {
    // this.eventService.signAuth()

    this.authService.signAuth();

    let user = firebase.auth().currentUser.uid;
    console.log('profile: ', user)

    firebase.firestore().collection('events').orderBy('createdAt', 'desc').onSnapshot(res => {
      res.forEach(element => {
        this.events.push(element.data());
      });
    }); 
  
  }
  goToNext()
  {
    this.router.navigateByUrl('/create-event');
  }

  ago(time){
    let difference = moment(time).diff(moment())
    return moment.duration(difference).humanize();
  }
  
}

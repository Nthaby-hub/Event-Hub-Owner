import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { EventsService } from '../services/events.service';

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
    
    private activatedActivated: ActivatedRoute, 
    private eventService: EventsService) { }

  ngOnInit() {
    // this.eventService.signAuth()
    firebase.firestore().collection('events').onSnapshot(res => {
      res.forEach(element => {
        this.events.push(element.data());
      });
    });
  
  }
  goToNext()
  {
    this.router.navigateByUrl('/create-event');
  }

  
}

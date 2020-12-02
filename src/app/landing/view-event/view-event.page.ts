import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
})
export class ViewEventPage implements OnInit {
  uid = this.activatedActivated.snapshot.params.id;

  id: any;
  events: any;

  constructor(
              public nav: NavController,
              private activatedActivated: ActivatedRoute,
            ) { }

  ngOnInit() {
    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    // fetching single event by id
    firebase.firestore().collection('events').doc(this.id).get().then(snapshot => {
      this.events = snapshot.data();
      console.log('new events: ', this.events)
    });
  }

}

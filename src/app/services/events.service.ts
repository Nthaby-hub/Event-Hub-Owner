import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private router: Router) { }
//-------------------Banele
  regEvent() {
    return firebase.firestore().collection('events');
  }

  Signup_Owner(email,password) 
  {
    return firebase.auth().createUserWithEmailAndPassword(email, password);  
  }
  reserve() {
    return firebase.firestore().collection('events');
  }
}

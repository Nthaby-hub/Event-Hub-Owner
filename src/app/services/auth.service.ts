import { Injectable } from '@angular/core';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signAuth(){
    return firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log('User logged in: ', user);
      }else{
        console.log('User logged out:');
      }
    });
  }

  //signup owner
  signupEventOwner(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  //signin owner
  signinEventOwner(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //reset owner password
  resetPassword(email){
    return firebase.auth().sendPasswordResetEmail(email);
  }

  //logout owner
  logoutEventOwner(){
    return firebase.auth().signOut();
  }


}

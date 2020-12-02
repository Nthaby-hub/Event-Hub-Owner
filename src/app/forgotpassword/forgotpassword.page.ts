import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  email: string;
  constructor(private router: Router,
    private authService: AuthService,
    private toastr: ToastController,
    private loadingCtrl:LoadingController) { }

  ngOnInit() {
  }
  goToNext() {
    this.router.navigateByUrl('/signin');
     }

     goToNextPage() {
      this.router.navigateByUrl('/forgotpassword');
       }

       async resetPassword()
       {
         if(this.email)
         {
           const loading = await this.loadingCtrl.create({
             message:'Please wait ..',
             spinner:'crescent',
             showBackdrop: true
           });
           loading.present();
           
           return firebase.auth().sendPasswordResetEmail(this.email).then(()=>{
             loading.dismiss();
             this.toast('successful, please check your emails','success');
             this.router.navigate(['/signin']);
           })
           .catch((error)=>{
             this.toast(error.message,'danger')
           })
         } else{
           this.toast('Please enter your email address','danger');
           this.router.navigate(['/forgotpassword']);
         }
     
       } //end of reset password

       async toast(message, status)
       {
         const toast = await this.toastr.create({
         message: message,
          position:'top',
           color: status,
         duration: 2000
         });
           toast.present();
        }//end of toast

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEventPageRoutingModule } from './create-event-routing.module';

import { CreateEventPage } from './create-event.page';
import { MaterialModule } from './../../../app/material.module';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEventPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatFileInputModule 
  ],
  declarations: [CreateEventPage]
})
export class CreateEventPageModule {}

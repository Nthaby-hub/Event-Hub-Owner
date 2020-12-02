import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from './../../../app/material.module';

import { CreateTicketPageRoutingModule } from './create-ticket-routing.module';

import { CreateTicketPage } from './create-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonicModule,
    CreateTicketPageRoutingModule
  ],
  declarations: [CreateTicketPage]
})
export class CreateTicketPageModule {}

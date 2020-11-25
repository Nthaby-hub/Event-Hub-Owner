import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  ownerForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.ownerForm = this.fb.group({
      eventName: ['', Validators.required],
      venue: ['', Validators.required],
      address: ['', Validators.required],
      hosts: ['', Validators.required],
      eventType: ['', Validators.required],
      TicketName: ['', Validators.required],
      ticketQuantity: ['', Validators.required],
      freetickbox: ['', Validators.required],
      TickLinks: ['', Validators.required],
      Mini: ['', Validators.required],
      max: ['', Validators.required]
      
    });
  }
  

}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RESPONSES, SNACKBAR_MESSAGES } from '../shared/const';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../shared/services/snackbar.service';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent {
  addressForm:FormGroup

  constructor(private formBuilder:FormBuilder, private snackbar:SnackbarService, private dialogRef:MatDialogRef<AddressDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: {cartTotalvalue:number}){
    this.addressForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['', Validators.required],
      address1:['', Validators.required],
      address2:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      pincode:['', Validators.required],
      phone:['', Validators.required],
      email:['', Validators.required],
    })
  }

  cancelDialog():void{
    this.dialogRef.close(RESPONSES.FAILED)
  }

  saveAddressAndPlaceOrder():void{
    if(this.addressForm.valid){
      this.dialogRef.close(RESPONSES.SUCCESS)
    }else{
      this.addressForm.markAllAsTouched()
      this.snackbar.show(SNACKBAR_MESSAGES.REQUIRED_FIELDS_MISSING, RESPONSES.FAILED)
    }
  }
}

import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder) { }

  formModel = this.fb.group({
    UserName:['', Validators.required],
    Email:['', Validators.email],
    FullName:[''],
    Passwords: this.fb.group({
      Password:['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword:['', Validators.required]
    },{validator : this.comparePasswords})
  });

  comparePasswords(fb: FormGroup){
    let ConfirmPasswordCtrl = fb.get('ConfirmPassword');
    //passwordMissmatch
    //confirmPasswordCtrl.errors={passwordMissmatch: true}
    if(ConfirmPasswordCtrl.errors == null || 'passwordMismatch' in ConfirmPasswordCtrl.errors){
      if(fb.get('Password').value != ConfirmPasswordCtrl.value )
        ConfirmPasswordCtrl.setErrors({passwordMismatch: true});
      else
        ConfirmPasswordCtrl.setErrors(null)
    }
  }
}

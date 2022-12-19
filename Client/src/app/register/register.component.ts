import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();
  registerForm: FormGroup = new FormGroup({});
  maxDate:Date = new Date();
  validationErrors: string[]|undefined;

  constructor(private accountService:AccountService, private toastr: ToastrService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, this.matchValue('password'),
       Validators.minLength(6), Validators.maxLength(15)]]
    });

    this.registerForm.controls['password'].valueChanges.subscribe(
      () => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      }
    );
  }

  matchValue(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  register(){
    // console.log(this.registerForm.value);
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth:dob}
    
    this.accountService.register(values).subscribe(
      () => {
        this.router.navigateByUrl('/members');
      },
      error => {
        this.validationErrors = error;
        console.log(error);
      }
    );
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob:string|undefined){
    if(!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset())).toISOString().slice(0,10);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private joinRouter:Router,private fb:FormBuilder,private api:ApiService,private toastr: ToastrService){}

  //form group
  registerForm = this.fb.group({
    //Form Array (validation=>,[])
    username:['',[Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z ]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  register()
  {
    //separate validation in html file with *ngIf=""
    if(this.registerForm.valid){
      let username = this.registerForm.value.username
      let acno = this.registerForm.value.acno
      let password = this.registerForm.value.password

      //register api call in service
      this.api.register(username,acno,password).subscribe({
          next:(response:any)=>{
            console.log(response);
            this.toastr.success(`${response.username}`, 'Registration Successful!');
          //navigate to login page
          setTimeout(()=>{
              this.joinRouter.navigateByUrl('/login');
          },3000)
          
          },
          error:(err:any)=>{
            console.log(err);
            
          }

      })

    }
    else{
      alert("Invalid Form")
    }
  }
}

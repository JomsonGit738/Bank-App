import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
//creating FormBuilder
constructor(private loginRouter:Router,private fb:FormBuilder,private api:ApiService, private toaster:ToasterService){}

//variable for loading animation, 
isLoading:boolean = false

//form group
loginForm = this.fb.group({
  //Form Array (validation=>,[])
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

login()
{
  //separate validation in html file with *ngIf=""
  if(this.loginForm.valid){
    let acno = this.loginForm.value.acno
    let pswd = this.loginForm.value.password

    //set isloading to true on button clicked
    this.isLoading = true

    //login api call here
    this.api.login(acno,pswd).subscribe({
      next:(res:any)=>{
        // console.log(res);
        
        //Destructuring the presuse and token send by backend server
        const {preuser,token} = res

        //store username in local storage
        localStorage.setItem("loginUser",preuser.username)
        //store acno in local storage
        localStorage.setItem("loginAcno",preuser.acno)
        //storing token in local storage
        localStorage.setItem("token",token);

        //after two seconds
        setTimeout(()=>{
          //isLoading to false
          this.isLoading = false
          //success msg
          this.toaster.showSuccess(preuser.username,"successful Login...")
          //navigate to dashboard
          this.loginRouter.navigateByUrl('user/dashboard')
        },2000);
      },
      error:(err:any)=>{
        console.log(err.error);
        this.toaster.showError(err.error,"failed")
      }
    })

  }
  else{
    alert("Invalid Form")
  }
}




}

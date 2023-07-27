import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  handleTranferButton:boolean = true
  transferSucessMSG:String=""
  transferErrorMSG:String=""
  balance:number = 0
  showOffCanvas:boolean = true;
  user:String = ''

  //transform 
  transferform = this.fb.group({
    creditAcno:["",[Validators.required,Validators.pattern("[0-9]*")]],
    creditAmount:["",[Validators.required,Validators.pattern("[0-9]*")]],
    profilePswd:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })


  constructor(private api:ApiService,
    private toaster:ToasterService,
    private fb:FormBuilder,
    private joinRouter:Router) {}

  ngOnInit(): void {
    //get item(name) from localstorage
    //assign to class property
    this.user = localStorage.getItem("loginUser") || ""
  }

  //get balance
  getBalance(){

    //getting acno from local storage
    let acno = localStorage.getItem("loginAcno")
    //api call to get balance
    this.api.balanceEnquiry(acno).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.balance = res
      },
      error:(err:any)=>{
        this.showOffCanvas = false
        console.log(err.error);
        this.toaster.showError(err.error,"Fail")
      }
    })

  }

  //transfer cash
  transfer(){
    //valid form
    if(!this.transferform.valid){
      //alert invalid form
      this.toaster.showWarning("Invalid Form", "Warning!")
    }
    else {
      
      //valid codes
      let creditAcno = this.transferform.value.creditAcno
      let creditAmount = this.transferform.value.creditAmount
      let profilePswd = this.transferform.value.profilePswd
      
      //make call to api service 
      this.api.fundTransfer(creditAcno, creditAmount, profilePswd).subscribe({
        next: (res: any) => {
          this.transferSucessMSG = res;
          this.handleTranferButton = false;
          setTimeout(() => {
            this.transferSucessMSG = "";
            this.handleTranferButton = true;
            this.transferform.reset();
          }, 6000);
        },
        error: (err) => {
          this.handleTranferButton = false;
          this.transferErrorMSG = err.error;
          setTimeout(() => {
            this.transferErrorMSG = "";
            this.handleTranferButton = true;
          }, 6000);
        }
      })
    }
  }

  //cancel transfer
  cancelTransfer(){
    this.transferform.reset()
    this.transferErrorMSG=""
    this.transferSucessMSG=""
  }

  //delete Account
  deleteMyAcno(){
    //make a call to service
    this.api.deleteAcno().subscribe({
      next:(response:any)=>{
        console.log(response);
        //alert response
        this.toaster.showWarning(response,"Warning")
        this.logout()

      },error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  //logout
  logout()
  {
      //remove login data from local storage
      localStorage.removeItem("loginUser")
      localStorage.removeItem("loginAcno")
      localStorage.removeItem("token")
      //redirect to landing page
      setTimeout(()=>{
        this.joinRouter.navigateByUrl('');
      },1000)
  }

}

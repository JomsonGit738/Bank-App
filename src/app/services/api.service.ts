import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//creating headers of HttpHeaders Globally for overloading
const options = {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // BASE_URL = 'http://localhost:3000'
  BASE_URL = 'https://bank-server-service.onrender.com'
  constructor(private http:HttpClient) { }


  //User Register
  register(username:any,acno:any,password:any)
  {
    const body = {
      username,
      acno,
      password
    }
    //to call register api
   return this.http.post(`${this.BASE_URL}/employee/register`,body)
  }

  //User Login
  login(acno:any,password:any){
    //api call body/data
    const body={
      acno,
      password
    }
    //api call
    return this.http.post(`${this.BASE_URL}/employee/login`,body)
  }

  //Token 
  //token appending to header of http request overriding is must
  appednToken(){
    //get token from local storage
    const token = localStorage.getItem("token")
    //create http header
    let head = new HttpHeaders()
    if(token){
      //append token in headers
      head = head.append("access-token",token)
      options.headers = head
    }
    return options
  }

  //Balance Enquiry
  balanceEnquiry(acno:any){
    //api call to get balance
    return this.http.get(`${this.BASE_URL}/user/balance/${acno}`,this.appednToken())
    
  }

  //fund transfer
  fundTransfer(creditAcno:any,creditAmount:any,profilePswd:any){
    //body
    const body = {
      creditAcno,
      creditAmount,
      profilePswd
    }
    //make an api call
    return this.http.post(`${this.BASE_URL}/user/transfer`,body,this.appednToken())
  }

  //get transactions
  getTransactions(){
    //api call to get all transactions
    return this.http.get(`${this.BASE_URL}/user/transactions`,this.appednToken())
  }

  //deleteAcno
  deleteAcno(){
    //api call
    return this.http.delete(`${this.BASE_URL}/user/remove`,this.appednToken())
  }
}

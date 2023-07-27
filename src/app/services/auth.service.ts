import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //isLoggedIn or not
  isLoggedin(){
    // !! =>checks and load result false or true
    return !!localStorage.getItem("token")
  }
}

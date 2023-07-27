import { Injectable } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService:AuthService,
    private toaster:ToasterService,
    private router:Router){

  }

  //returns true of false
  canActivate: CanActivateFn=()=>{
    if(this.authService.isLoggedin())
    {
      return true
    }
    else
    {
      //alert
      this.toaster.showWarning("Access denied!, Please Login","Warning")
      //redirect to landing page
      this.router.navigateByUrl('')
      return false
    }
  }
  
}

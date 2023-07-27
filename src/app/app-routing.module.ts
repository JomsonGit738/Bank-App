import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LandingContentComponent } from './landing-content/landing-content.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {path:'',component:LandingContentComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'user/dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'user/transactions',component:TransactionsComponent, canActivate:[AuthGuard]}

]
// {path:'**', component:PageNotFoundComponent }
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

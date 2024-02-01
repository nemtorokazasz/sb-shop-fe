import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./guest/home/home.component";
import {LoginComponent} from "./guest/login/login.component";
import {RegisterComponent} from "./guest/register/register.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {AdminComponent} from "./admin/admin/admin.component";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {UnauthorizedComponent} from "./error/unauthorized/unauthorized.component";
import {AuthGuard} from "./guards/auth.guard";
import { Role } from './models/role.enum';

const routes: Routes = [
  // szabad útvonalak
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnauthorizedComponent},

  // védett útvonalak
  {
   path: 'home',
   component: HomeComponent,
   canActivate: [AuthGuard]
  },
  {
   path: 'profile',
   component: ProfileComponent,
   canActivate: [AuthGuard],
   data: { roles: [Role.ADMIN, Role.USER]}
  },
  {
   path: 'admin',
   component: AdminComponent,
   canActivate: [AuthGuard],
   data: { roles: [Role.ADMIN]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    }
  }
}

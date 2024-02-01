import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  login(){
    this.authenticationService.login(this.user).subscribe(data => {
      this.snackBar.open('A bejelentkezés sikeres volt.', 'Bezár', {
        duration: 3000,
      });
      this.router.navigate(['/profile']);
    }, err => {
      this.snackBar.open('Felhasználónév, vagy jelszó helytelen!', 'Bezár', {
        duration: 3000,
      });
    })
  }
}

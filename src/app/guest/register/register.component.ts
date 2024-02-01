import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  user: User = new User();
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }
  register() {
    this.authenticationService.register(this.user).subscribe(data => {
      this.snackBar.open('A regisztráció sikeres volt.', 'Bezár', {
        duration: 3000,
      });
      this.router.navigate(['/login']);
    }, err => {
      if (err?.status === 409) {
        this.snackBar.open('A felhasználónév foglalt!', 'Bezár', {
          duration: 4000,
        });
      } else {
        this.snackBar.open(`Nem várt error fordult elő. ${err?.errorMessage}`, 'Bezár', {
          duration: 4000,
        });
        console.log(err);
      }
    })
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-top-header-nav',
  templateUrl: './top-header-nav.component.html',
  styleUrls: ['./top-header-nav.component.scss'],
})
export class TopHeaderNavComponent implements OnInit {
  public showBackBtn: boolean = false;
  userDetails: any;
  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('dp-world-loggedInUser') || '');
    if (this.location.path() !== '') {
      this.showBackBtn = true;
    } else {
      this.showBackBtn = false;
    }
    this.router.events
      .pipe(filter((r) => r instanceof NavigationEnd))
      .subscribe((r) => {
        if ((r as NavigationEnd).url !== '/') {
          this.showBackBtn = true;
        } else {
          this.showBackBtn = false;
        }
      });
  }

  onGoBackClick() {
    window.history.back();
  }

  onLogoutClick() {
    this.authService.logout().subscribe(
      () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      (err: any) => {
        localStorage.clear();
        this.router.navigate(['/login']);
        console.error(err);
      }
    );
  }
}

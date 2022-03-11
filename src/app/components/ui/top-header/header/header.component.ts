import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(LOCAL_STORAGE) private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onMenuClick() {
    let sideMenu = document.getElementById('sideMenuBar');
    let header = document.getElementById('header');
    let bodyContent = document.getElementById('body-content');
    console.log(bodyContent);
    if (!header) {
      return;
    }
    if (!sideMenu) {
      return;
    }
    sideMenu.style.setProperty('width', '0px !important');
    if (sideMenu.offsetWidth > 1) {
      sideMenu.style.width = '0px';
      header.style.width = '100vw';
      bodyContent.style.left = '0';
    } else {
      sideMenu.style.width = '16rem';
      header.style.width = 'calc(100% - 16rem)';
      bodyContent.style.left = '16rem';
    }
  }

  onLogout() {
    this.authService.logout().subscribe(
      () => {
        this.storageService.clear();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}

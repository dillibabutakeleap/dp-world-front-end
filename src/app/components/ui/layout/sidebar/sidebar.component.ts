import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isActive(item: HTMLElement) {
    return item.className.indexOf('active') > -1;
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}

  public get showLayout(): boolean {
    return !(this.router.url.includes('/login') ||
           this.router.url.includes('/join') ||
           this.router.url.includes('/congratulations'));
  }
}

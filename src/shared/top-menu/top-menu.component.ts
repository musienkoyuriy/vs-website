import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.html',
  styleUrls: ['./top-menu.css']
})
export class TopMenuComponent implements OnInit {
  public isSticky:boolean = false;
  public isOpen: boolean = false;
  public startFixedPosition:number = window.innerHeight;
  public elHeight: number;
  @Input() public isLanding:boolean;

  public constructor(public router:Router) {
    this.router.events.subscribe((event:any) => {
      this.isOpen = false;
      if (event instanceof NavigationEnd) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    });
  }

  public menuToggle():void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      window.ontouchmove = window.preventTouchMove;
      document.body.style.overflow = 'hidden';
    } else {
      window.ontouchmove = null;
      document.body.style.overflow = 'auto';
    }
  }

  public ngOnInit():void {
    // require('./particles-config');
  }

  // tslint:disable
  @HostListener('window:scroll', ['$event'])
  private scroll() {
    if (window.scrollY > this.startFixedPosition) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
}

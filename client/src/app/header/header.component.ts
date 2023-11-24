import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  getCurrentRoute(): void {
    this.router.events
      .pipe()
      .subscribe(() => {
        this.currentRoute =  this.router.url;
      });
  }



}

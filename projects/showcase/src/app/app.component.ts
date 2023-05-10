import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  public title: string = '';

  constructor(private readonly _router: Router, private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this._route.root.firstChild?.snapshot.data['title'];
      }
    });
  }
}

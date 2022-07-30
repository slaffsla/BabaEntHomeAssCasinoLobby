import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './error-room.component.html',
  styleUrls: ['./error-room.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  returnBack() {
    this.router.navigate(['/rooms-lobby']);
  }
}

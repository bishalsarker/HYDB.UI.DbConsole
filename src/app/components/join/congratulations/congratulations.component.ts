import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss']
})
export class CongratulationsComponent implements OnInit {
  public appName: string = '</hydb>';

  constructor() { }

  ngOnInit() {
  }

}

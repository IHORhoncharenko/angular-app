import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  appTitle = 'hhhh';

  Todo = [
    { id: 1, title: 'Buy cats food', result: false },
    { id: 2, title: 'Buy dogs food', result: false },
    { id: 3, title: 'Buy human food', result: false },
  ];
}

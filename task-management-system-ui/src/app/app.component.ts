import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show = false;
  newTask = false;

  showPopup() {
    this.show = true;
  }

  setNewTask(newTask) {
    this.show = false;
    this.newTask = newTask;
  }
}

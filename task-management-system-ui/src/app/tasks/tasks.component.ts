import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TaskService} from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges {

  @Input() newTask: boolean;
  tasks: Array<Task> = [];
  showSuccessMessage = false;
  showFailureMessage = false;
  message: any;
  isEdit = false;
  taskId: number;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.newTask.currentValue === true) {
      this.update();
    }
  }

  edit(id: number) {
    this.isEdit = true;
    this.taskId = id;
  }

  complete(id: number) {
    this.showSuccessMessage = false;
    this.showFailureMessage = false;
    this.taskService.completeTask(id).subscribe(result => {
      this.message = result;
      if (this.message.startsWith('Sorry')) {
        this.showFailureMessage = true;
      } else {
        this.showSuccessMessage = true;
        this.update();
      }
    }, () => {
      this.message = 'This task cannot be completed.';
      this.showFailureMessage = true;
    });
  }

  delete(id: number) {
    this.showSuccessMessage = false;
    this.showFailureMessage = false;
    this.taskService.deleteTask(id).subscribe(result => {
      this.message = result;
      if (this.message.startsWith('Sorry')) {
        this.showFailureMessage = true;
      } else {
        this.showSuccessMessage = true;
        this.update();
      }
    }, () => {
      this.message = 'The task cannot be deleted.';
      this.showFailureMessage = true;
    });
  }

  successClose() {
    this.showSuccessMessage = false;
  }

  failureClose() {
    this.showFailureMessage = false;
  }

  update() {
    this.tasks = [];
    this.taskService.getAllTasks().subscribe(result => {
      this.tasks = result;
      console.log(this.tasks);
    });
  }

  updateTask(isEdit) {
    this.isEdit = false;
    this.update();
  }
}

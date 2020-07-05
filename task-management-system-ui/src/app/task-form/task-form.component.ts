import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnChanges {

  @Input() show: boolean;
  @Input() newTask: boolean;
  @Input() taskId?: number;
  @Output() newTaskEmitter: EventEmitter<any> = new EventEmitter<any>();
  categories = ['Personal', 'Work', 'Other'];
  taskFormGroup: FormGroup;
  message: string;
  showSuccessMessage = false;
  showFailureMessage = false;
  canCreate;
  buttonText = 'Create Task';
  task: Task;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: [this.categories[0], Validators.required]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.taskId && changes.taskId.currentValue !== undefined) {
        this.taskService.getTask(this.taskId).subscribe(result => {
          this.task = result;
          this.buttonText = 'Update Details';
          this.taskFormGroup.controls.name.setValue(this.task.name);
          this.taskFormGroup.controls.description.setValue(this.task.description);
          this.taskFormGroup.controls.category.setValue(this.task.category);
        });
    }
  }

  createOrUpdate() {
    this.canCreate = true;
    if (this.taskFormGroup.controls.name.value === '' || this.taskFormGroup.controls.description.value === '') {
      this.canCreate = false;
      this.message = 'Please fill all the fields';
      this.showFailureMessage = true;
    }
    if (this.canCreate) {
      this.showFailureMessage = false;
      if (this.buttonText === 'Create Task') {
        this.taskService.createTask(this.taskFormGroup.value).subscribe(result => {
          this.taskFormGroup.reset();
          this.message = result;
          if (this.message.startsWith('Sorry')) {
            this.showFailureMessage = true;
          } else {
            this.showSuccessMessage = true;
            setTimeout(() => {
              this.newTaskEmitter.emit(true);
            }, 3000);
          }
        }, () => {
          this.message = 'The task cannot be created';
          this.showFailureMessage = true;
        });
      } else {
        const params = {
          taskId: undefined,
          name: undefined,
          description: undefined,
          category: undefined
        };
        params.taskId = this.taskId;
        params.name = this.taskFormGroup.controls.name.value;
        params.description = this.taskFormGroup.controls.description.value;
        params.category = this.taskFormGroup.controls.category.value;
        this.taskService.editTask(params).subscribe(result => {
          this.taskFormGroup.reset();
          this.message = result;
          if (this.message.startsWith('Sorry')) {
            this.showFailureMessage = true;
          } else {
            this.showSuccessMessage = true;
            setTimeout(() => {
              this.newTaskEmitter.emit(true);
            }, 3000);
          }
        }, () => {
          this.message = 'The task cannot be edited';
          this.showFailureMessage = true;
        });
      }
    }
  }

  cancel() {
    this.newTaskEmitter.emit(false);
  }

  successClose() {
    this.showSuccessMessage = false;
  }

  failureClose() {
    this.showFailureMessage = false;
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly taskUrl: string;

  constructor(private http: HttpClient) {
    this.taskUrl = 'http://localhost:8080/task';
  }

  public createTask(details): Observable<string> {
    return this.http.post(this.taskUrl + '/createTask', details, {responseType: 'text'});
  }

  public getAllTasks(): Observable<any> {
    return this.http.get(this.taskUrl + '/getAllTasks');
  }

  public editTask(newDetails): Observable<string> {
    return this.http.post(this.taskUrl + '/editTask', newDetails, {responseType: 'text'});
  }

  public completeTask(taskId): Observable<string> {
    return this.http.post(this.taskUrl + '/completeTask/', taskId, {responseType: 'text'});
  }

  public deleteTask(taskId): Observable<string> {
    return this.http.delete(this.taskUrl + '/deleteTask/' + taskId, {responseType: 'text'});
  }

  public getTask(taskId): Observable<any> {
    return this.http.get(this.taskUrl + '/getTask/' + taskId);
  }
}

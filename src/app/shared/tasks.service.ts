import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  date?: string;
}

export interface CreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'https://angular-practice-organiz-78011-default-rtdb.firebaseio.com/tasks'

  constructor(private http: HttpClient) {
  }

  load(date: moment.Moment) : Observable<Task[]> {
    return this.http.get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
    .pipe(map(tasks => !tasks? []: Object.keys(tasks).map((key: any) => ({...tasks[key], id:key}))))
  }

  // для создания новой задачи 
  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(map(res => {
        console.log('Response', res);
        return {...task, id: res.name}
      }))
  }

  remove(task: Task): Observable<void> {
    return this.http
      .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }
}

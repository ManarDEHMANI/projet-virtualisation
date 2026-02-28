import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(title: string) {
    return this.http.post<Task>(this.apiUrl, { title });
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

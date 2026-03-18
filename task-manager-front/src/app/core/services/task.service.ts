import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(userId: number) {
    return this.http.get<Task[]>(`/api/tasks?userId=${userId}`);
  }
  
  addTask(title: string, userId: number) {
    return this.http.post<Task>('/api/tasks', {
      title,
      userId
    });
  }
  
  updateTask(task: Task, userId: number) {
    return this.http.put(`/api/tasks/${task.id}`, {
      ...task,
      userId
    });
  }
  
  deleteTask(id: number, userId: number) {
    return this.http.delete(`/api/tasks/${id}?userId=${userId}`);
  }

  createUser(name: string) {
    return this.http.post<any>('/api/users', { name });
  }

  getAllUsers(userId: number) {
    return this.http.get<any[]>(`/api/users/all?userId=${userId}`);
  }

  getAdminTasks(userId: number) {
    return this.http.get<any[]>(`/api/tasks/admin?userId=${userId}`);
  }

  
}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  private taskService = inject(TaskService);

  newTaskTitle = '';
  userId: number | null = null;
  userRole: string | null = null;
  currentUserName: string | null = null;
  username = '';  
  tasks = signal<Task[]>([]);
  users = signal<any[]>([]);
  adminTasks = signal<any[]>([]);

  showUsers = false;

  constructor() {
    const stored = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('username');
    if (name) {
      this.currentUserName = name;
    }
  
    if (stored) {
      this.userId = +stored;
      this.userRole = role;
      this.loadTasks();
    }
  }

  loadTasks() {
    if (this.userId === null) return;
  
    this.taskService.getTasks(this.userId).subscribe({
      next: (tasks) => this.tasks.set(tasks),
      error: (err) => console.error(err)
    });
  }

  addTask(): void {
    if (this.newTaskTitle.trim() === '' || this.userId === null) return;
  
    const title = this.newTaskTitle;
  
    this.taskService.addTask(title, this.userId).subscribe({
      next: (createdTask) => {
        this.tasks.update(tasks => [...tasks, createdTask]);
        this.newTaskTitle = '';
      },
      error: (err) => console.error(err)
    });
  }
  toggleTask(task: Task): void {
    if (this.userId === null) return;
  
    const updated = {
      ...task,
      completed: !task.completed
    };
  
    this.taskService.updateTask(updated, this.userId).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.map(t =>
            t.id === task.id
              ? { ...t, completed: !t.completed }
              : t
          )
        );
      },
      error: (err) => console.error(err)
    });
  }

  deleteTask(id: number): void {
    if (this.userId === null) return;
  
    this.taskService.deleteTask(id, this.userId).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.filter(t => t.id !== id)
        );
      },
      error: (err) => console.error(err)
    });
  }
  trackById(index: number, task: Task): number {
    return task.id;
  }
  createUser() {

    if (!this.username.trim()) return;
  
    this.taskService.createUser(this.username).subscribe({
  
      next: (user) => {
  
        this.userId = user.id;
        this.userRole = user.role;
        this.currentUserName = user.name;
  
        localStorage.setItem('userId', String(user.id));
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('username', user.name);
  
        this.loadTasks();
        this.username = '';
  
      },
  
      error: (err) => console.error(err)
  
    });
  }
  getAllUsers() {

    if (this.userId === null || this.userRole !== 'admin') return;
  
    this.taskService.getAllUsers(this.userId!).subscribe({
  
      next: (users) => {
        this.users.set(users);
        this.showUsers = true;
      },
  
      error: (err) => console.error(err)
  
    });
  
  }

  loadAdminTasks() {
    this.taskService.getAdminTasks(this.userId!).subscribe({
      next: (data) => this.adminTasks.set(data)
    });
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  
    this.userId = null;
    this.userRole = null;
    this.currentUserName = null;
    this.tasks.set([]);
    this.showUsers = false;
  }
}
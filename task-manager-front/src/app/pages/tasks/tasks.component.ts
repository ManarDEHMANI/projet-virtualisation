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
  username = '';  
  tasks = signal<Task[]>([]);

  constructor() {
    const stored = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
  
    if (stored) {
      this.userId = +stored;
      this.userRole = role;
      this.loadTasks();
    }
  }

  loadTasks() {
    if (!this.userId) return;
  
    this.taskService.getTasks(this.userId).subscribe({
      next: (tasks) => this.tasks.set(tasks),
      error: (err) => console.error(err)
    });
  }

  addTask(): void {
    if (!this.newTaskTitle.trim() || !this.userId) return;
  
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
    if (!this.userId) return;
  
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
    if (!this.userId) return;
  
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
  
        localStorage.setItem('userId', String(user.id));
        localStorage.setItem('userRole', user.role);
  
        this.loadTasks();
      },
  
      error: (err) => console.error(err)
  
    });
  
  }

  getAllUsers() {

    if (this.userRole !== 'admin') return;
  
    this.taskService.getAllUsers(this.userId!).subscribe({
  
      next: (users) => {
        console.log("Users:", users);
      },
  
      error: (err) => console.error(err)
  
    });
  
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.userId = null;
    this.userRole = null;
    this.tasks.set([]);
  }
}
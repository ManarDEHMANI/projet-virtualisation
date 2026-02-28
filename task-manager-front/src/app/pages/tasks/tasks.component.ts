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

  tasks = signal<Task[]>([]);

  constructor() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => this.tasks.set(tasks),
      error: (err) => console.error(err)
    });
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const title = this.newTaskTitle;

    this.taskService.addTask(title).subscribe({
      next: (createdTask) => {
        this.tasks.update(tasks => [...tasks, createdTask]);
        this.newTaskTitle = '';
      },
      error: (err) => console.error(err)
    });
  }

  toggleTask(task: Task): void {
    const updated = { ...task, completed: !task.completed };

    this.taskService.updateTask(updated).subscribe({
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
    this.taskService.deleteTask(id).subscribe({
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
}
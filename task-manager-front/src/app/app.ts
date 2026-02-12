import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  tasks: Task[] = [];
  newTask = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask() {
    if (!this.newTask.trim()) return;

    this.taskService.addTask(this.newTask).subscribe(() => {
      this.newTask = '';
      this.loadTasks();
    });
  }

  toggleTask(task: Task) {
    this.taskService.toggleTask(task).subscribe(() => {
      this.loadTasks();
    });
  }
}

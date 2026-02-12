import { Component } from '@angular/core';
import { TasksComponent } from './pages/tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TasksComponent],
  templateUrl: './app.html',
})
export class AppComponent {}

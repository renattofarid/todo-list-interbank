import { Component, Input } from '@angular/core';
import { Task } from '../../../models';
import { Store } from '@ngrx/store';
import { AppState, toggleTask, removeTask } from '../../../redux';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'item-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-task.component.html',
  styleUrl: './item-task.component.css',
})
export class ItemTaskComponent {
  @Input()
  task: Task = {} as Task;

  constructor(private store: Store<AppState>) {}

  finishTask() {
    this.store.dispatch(
      toggleTask({
        taskId: this.task.id,
      })
    );
  }

  deleteTask() {
    this.store.dispatch(
      removeTask({
        taskId: this.task.id,
      })
    );
  }
}

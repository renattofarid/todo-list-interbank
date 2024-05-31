import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUser } from '../../../redux';
import { Task } from '../../../models';
import { selectTasksFromUser } from '../../../redux/tasks/selectors';
import { CommonModule } from '@angular/common';
import { ItemTaskComponent } from '../item-task/item-task.component';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-container-tasks',
  standalone: true,
  imports: [CommonModule, ItemTaskComponent],
  templateUrl: './container-tasks.component.html',
  styleUrl: './container-tasks.component.css',
})
export class ContainerTasksComponent {
  tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.tasks$ = this.store.select(selectUser).pipe(
      switchMap((user) => {
        if (user) {
          return this.store.select(selectTasksFromUser(user.id));
        } else {
          return [];
        }
      })
    );
  }
}

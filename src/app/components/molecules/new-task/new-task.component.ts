import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { addTask, AppState, selectUser } from '../../../redux';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'new-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  user$: Observable<User | null> = new Observable<User | null>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.select(selectUser);
  }

  createTask() {
    if (!this.form.valid) return;

    const { title } = this.form.value;

    this.user$.subscribe((user) => {
      if (title && user) {
        this.store.dispatch(
          addTask({
            task: {
              title,
              id: uuidv4(),
              isFinished: false,
            },
            userId: user.id,
          })
        );
        this.form.reset({
          title: '',
        });
      } else {
        console.log('Title is missing or user is null');
      }
    });
  }
}

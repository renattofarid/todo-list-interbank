import { Component } from '@angular/core';
import { AppState, selectUser } from '../../../redux';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../models';
import { CommonModule } from '@angular/common';
import { logout } from '../../../redux/auth/actions';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user$: Observable<User | null> = new Observable<User | null>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    this.store.dispatch(logout());
  }
}

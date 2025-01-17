import { CanActivateFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState, loginFailure, loginSuccess, selectUser } from '../redux';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (_route, _state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  const user$ = store.select(selectUser);

  const user = localStorage.getItem('user');
  if (user) {
    store.dispatch(loginSuccess({ user: JSON.parse(user) }));
  } else {
    store.dispatch(loginFailure());
    router.navigate(['/auth']);
  }

  let isAuth = false;
  user$.subscribe((user) => {
    if (user) {
      isAuth = true;
    }
  });
  return isAuth;
};

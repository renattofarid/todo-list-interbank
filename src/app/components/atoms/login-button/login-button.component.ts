import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'login-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      class="w-100 btn btn-primary font-light py-3 px-4 rounded"
      (click)="onClick.emit()"
    >
      {{ text }}
    </button>
  `,
})
export class LoginButtonComponent {
  @Input()
  type: string = 'button' || 'submit' || 'reset';

  @Input()
  text: string = 'Ingresar';

  @Input()
  disabled: boolean = false;

  @Output()
  onClick: EventEmitter<void> = new EventEmitter<void>();
}

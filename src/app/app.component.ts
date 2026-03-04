import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  NgToastComponent } from 'ng-angular-popup';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly title = signal('shopping-cart');
}

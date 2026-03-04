import { CommonModule } from '@angular/common';
import { Component, Input, computed } from '@angular/core';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-form-errors',
  imports: [CommonModule],
  standalone: true,
  template: `
    <ng-container *ngIf="shouldShowError()">
      <small *ngFor="let error of errors()" class="text-sm block text-red-500 mt-1">
        {{ error }}
      </small>
    </ng-container>
  `
})
export class FormErrors {

  // Receive a Signal<string>
  @Input({ required: true })
  control!: Signal<string>;

  @Input({ required: false })
  touched?: Signal<boolean>; // optional touched signal

  @Input({ required: false })
  minLength?: number;

  @Input({ required: false }) isEmail?: boolean;

  @Input({ required: false }) customValidator?: (value: string) => string | null;

  protected shouldShowError = computed(() => {
    if (!this.control) return false;

    const value = this.control();
    const isTouched = this.touched?.() ?? false;

    // Show errors only after touched
    if (!isTouched) return false;

    // Required or minLength or email or custom validation triggers
    return (
      !value ||
      (this.minLength && value.length < this.minLength) ||
      (this.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ||
      (!!this.customValidator && !!this.customValidator(value))
    );
  });

  protected errors = computed(() => {
    const value = this.control?.() ?? '';
    const messages: string[] = [];

   if (!value) messages.push('This field is required');

    else if (this.minLength && value.length < this.minLength) {
      messages.push(`Minimum length is ${this.minLength}`);
    }

    else if (this.isEmail && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      messages.push('Please enter a valid email address');
    }

    else if (this.customValidator) {
      const customError = this.customValidator(value);
      if (customError) messages.push(customError);
    }
    else{
        // No errors
    }

    return messages;
  });
}
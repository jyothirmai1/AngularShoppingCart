import { Component, signal, computed, inject } from "@angular/core";
import { Button } from "../../shared/components/button";
import { RouterLink } from "@angular/router";
import { FormErrors } from "../../shared/components/forms-error";
import { Store } from "@ngrx/store";
import { authActions } from "../../shared/store/auth-actions";
import { authFeatures } from "../../shared/store/auth-features";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, FormErrors],
  template: `
    <div class="flex items-center justify-center h-screen bg-linear-to-r from-emerald-600 to-sky-900">
      <div class="bg-white p-8 h-[70vh] rounded-lg shadow-md sm:w-40 md:w-70 lg:w-80 text-center">
        <h2 class="text-2xl font-semibold mt-10 mb-10">LOGIN</h2>

        <form (submit)="onSubmit($event)">

          <div class="mb-4 text-left">
            <input
              id="username"
              name="username"
              [value]="username()"
              (input)="username.set($any($event.target).value || '')"
              (blur)="usernameTouched.set(true)"
              type="text"
              class="w-full px-3 py-2 border rounded"
              placeholder="Username"
            />
            <app-form-errors
              [control]="username"
              [touched]="usernameTouched"
              [minLength]="3">
            </app-form-errors>
          </div>

          <div class="mb-6 text-left">
            <input
              id="password"
              name="password"
              [value]="password()"
              (input)="password.set($any($event.target).value || '')"
              (blur)="passwordTouched.set(true)"
              type="password"
              class="w-full px-3 py-2 border rounded"
              placeholder="Password"
            />
            <app-form-errors
              [control]="password"
              [touched]="passwordTouched"
              [minLength]="6">
            </app-form-errors>
          </div>

          <button
            appButton
            [disabled]="!canSubmit()"
            type="submit"
            class="w-full bg-linear-to-r from-emerald-600 to-sky-900 hover:from-sky-900 hover:to-emerald-600">
            {{isLoading() ? 'Loading...' : 'Login'}}
          </button>

        </form>

        <p class="mt-20 text-sm">
          Don't have an account? <a routerLink="/register" class="text-blue-500 cursor-pointer hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  `
})
export class LoginPage {

  // Form state
  username = signal('');
  password = signal('');

  // Touched state
  usernameTouched = signal(false);
  passwordTouched = signal(false);

  // Validation
  isUsernameValid = computed(() => this.username().trim().length >= 3);
  isPasswordValid = computed(() => this.password().length >= 6);

  // Check if all fields are touched
  allTouched = computed(() => this.usernameTouched() && this.passwordTouched());

  // Form is valid when fields are valid
  isFormValid = computed(() => this.isUsernameValid() && this.isPasswordValid());

  // Button can be clicked only if form is valid and all fields touched
  canSubmit = computed(() => this.isFormValid() && this.allTouched());

  private readonly store = inject(Store);
  protected readonly isLoading = toSignal(this.store.select(authFeatures.selectIsLoading));
  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.canSubmit()) return;
    const payload = {
      username: this.username(),
      password: this.password()
    };
   this.store .dispatch(authActions.login(payload));
  
    console.log('Submitting:', payload);
  }
}
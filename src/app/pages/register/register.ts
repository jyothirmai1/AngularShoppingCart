import { Component, signal, computed } from "@angular/core";
import { Button } from "../../shared/components/button";
import { RouterLink } from "@angular/router";
import { FormErrors } from "../../shared/components/forms-error";
import { Store } from "@ngrx/store";
import { inject } from "@angular/core";
import { authFeatures } from "../../shared/store/auth-features";
import { toSignal } from "@angular/core/rxjs-interop";
import { authActions } from "../../shared/store/auth-actions";

@Component({
    selector: 'app-register',
    imports: [Button, RouterLink, FormErrors],
    template: `
    <div class="flex items-center justify-center h-screen bg-linear-to-r from-emerald-600 to-sky-900">
        <div class="bg-white p-8 h-[70vh] rounded-lg shadow-md sm:w-40 md:w-70 lg:w-80 text-center">
            <h2 class="text-2xl font-semibold mt-5 mb-5">REGISTER</h2>
            <form (submit)="onSubmit($event)">
                <div class="mb-4 text-left">
                    <input id="username"
                     name="username"
                        [value]="username()"
                        (input)="username.set($any($event.target).value || '')"
                        (blur)="usernameTouched.set(true)"
                      type="text" class="w-full px-3 py-2 border rounded"
                       placeholder="Username" />
                    <app-form-errors
                      [control]="username"
                      [touched]="usernameTouched"
                      [minLength]="3">
                    </app-form-errors>
                </div>
                <div class="mb-4 text-left">
                    <input id="email"
                     name="email" 
                        [value]="email()"
                        (input)="email.set($any($event.target).value || '')"
                        (blur)="emailTouched.set(true)"
                     type="email" 
                     class="w-full px-3 py-2 border rounded" 
                     placeholder="Email" />
                    <app-form-errors
                      [control]="email"
                      [touched]="emailTouched">
                    </app-form-errors>
                </div>
                <div class="mb-4 text-left">
                    <input id="password"
                     name="password" 
                        [value]="password()"
                        (input)="password.set($any($event.target).value || '')"
                        (blur)="passwordTouched.set(true)"  
                     type="password"
                      class="w-full px-3 py-2 border rounded"
                       placeholder="Password" />
                    <app-form-errors
                      [control]="password"
                      [touched]="passwordTouched" 
                        [minLength]="6">
                    </app-form-errors>
                </div>
                <div class="mb-6 text-left">
                    <input id="confirm-password"
                     name="confirm-password"
                        [value]="confirmPassword()"
                        (input)="confirmPassword.set($any($event.target).value || '')"
                        (blur)="confirmPasswordTouched.set(true)"
                      type="password"
                       class="w-full px-3 py-2 border rounded" 
                       placeholder="Confirm Password" />
                    <app-form-errors
                      [control]="confirmPassword"
                      [touched]="confirmPasswordTouched"
                      [minLength]="6"
                      [customValidator]="confirmPasswordValidator">
                    >
                    </app-form-errors>  
                </div>
                <button appButton type="submit" class="w-full bg-linear-to-r from-emerald-600 to-sky-900 hover:from-sky-900 hover:to-emerald-600">
                    {{isLoading() ? 'Loading...' : 'Register'}}
                </button>
            </form>
            <p class="mt-9 text-sm">
                Already have an account? <a routerLink="/login" class="text-blue-500 cursor-pointer hover:underline">Login</a>
            </p>
        </div>
    </div>
    `,
})

export class RegisterPage {
    //Form state
    username = signal('');
    email = signal('');
    password = signal('');
    confirmPassword = signal('');

    // Touched signals
    usernameTouched = signal(false);
    emailTouched = signal(false);
    passwordTouched = signal(false);
    confirmPasswordTouched = signal(false);

    // Field validation
    isUsernameValid = computed(() => this.username().trim().length >= 3);
    isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()));
    isPasswordValid = computed(() => this.password().length >= 6);
    isConfirmPasswordValid = computed(() => this.confirmPassword() === this.password());
    confirmPasswordValidator = (value: string) => {
        if (value !== this.password()) return 'Passwords do not match';
        return null;
    };

    // Check if all fields are valid
    isFormValid = computed(() =>
        this.isUsernameValid() &&
        this.isEmailValid() &&
        this.isPasswordValid() &&
        this.isConfirmPasswordValid()
    );
    // Check if all fields touched
    allTouched = computed(() =>
        this.usernameTouched() &&
        this.emailTouched() &&
        this.passwordTouched() &&
        this.confirmPasswordTouched()
    );

    // Submit button enabled only if form valid and all touched
    canSubmit = computed(() => this.isFormValid() && this.allTouched());
    private readonly store = inject(Store);
    protected readonly isLoading =toSignal(this.store.select(authFeatures.selectIsLoading));

    onSubmit(event: Event) {
        event.preventDefault();
        if (!this.canSubmit()) return;
        const id = Date.now();
        const payload = {
            username: this.username(),
            email: this.email(),
            password: this.password()
        };
        const request = { ...payload, id };
         this.store.dispatch(authActions.register(request));
        console.log('Registering user:', request);
    }

}
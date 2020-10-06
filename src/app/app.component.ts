import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    defaultSubscription = 'Advanced';

    exerciseFormData = {
        email: null,
        subscription: null,
        password: null,
    };

    submitted = false;

    @ViewChild('exerciseForm') exerciseForm: NgForm;

    onExerciseSubmit() {

        this.submitted = true;

        this.exerciseFormData.email = this.exerciseForm.value.email;
        this.exerciseFormData.subscription = this.exerciseForm.value.subscription;
        this.exerciseFormData.password = this.exerciseForm.value.password;

        this.exerciseForm.reset();
    }
}

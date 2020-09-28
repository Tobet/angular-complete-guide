import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // different approach to get access to the form submit
    @ViewChild('f') signupForm: NgForm;

    suggestUserName() {
        const suggestedName = 'Superuser';
    }

    // onSubmit(form: NgForm) {
    //     console.log(form);
    // }

    onSubmit() {
        console.log(this.signupForm);
    }
}

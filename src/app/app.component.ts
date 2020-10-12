import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    genders = ['male', 'female'];
    signupForm: FormGroup;
    forbiddenUsernames = ['Tommaso', 'Laura'];

    ngOnInit() {

        this.signupForm = new FormGroup(
            {
                userData: new FormGroup({
                    username: new FormControl(
                        null,
                        [Validators.required, this.forbiddenNames.bind(this)]
                    ),
                    email: new FormControl(
                        null,
                        [Validators.required, Validators.email],
                        this.forbiddenEmails
                    ),
                }),
                gender: new FormControl('male', Validators.required),
                hobbies: new FormArray([])
            }
        );

        // observables of reactive form

        this.signupForm.valueChanges.subscribe(
            (value) => console.log(value)
        );

        this.signupForm.statusChanges.subscribe(
            (value) => console.log(value)
        );

        // with to set value you have to update all the forms
        this.signupForm.setValue(
            {
                userData: {
                    username: 'Tommy',
                    email: 'tom@test.com',
                },
                gender: 'male',
                hobbies: [],
            }
        );

        // with patch value you can assign only part of your totale reactive form
        this.signupForm.patchValue(
            {
                userData: {
                    username: 'Tommaso',
                },
            }
        );
    }

    /**
     * Adds a form-control to hobbies form-array
     */
    onAddHobby() {

        const control: FormControl = new FormControl(null, Validators.required);

        (this.signupForm.get('hobbies') as FormArray).push(control);
    }

    onSubmit() {
        console.log(this.signupForm);
    }

    /*- UTILITY -*/

    getHobbiesControl(): AbstractControl[] {
        return (this.signupForm.get('hobbies') as FormArray).controls;
    }

    /**
     * If validation is successful, you have to pass null in a custom validator
     * @param control
     */
    forbiddenNames(control: FormControl): { [s: string]: boolean } {

        if (this.forbiddenUsernames.includes(control.value)) {
            return {nameIsForbidden: true};
        }

        return null;
    }

    /**
     * Async validator form reactive forms
     * @param control
     */
    forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {

        const promise: Promise<any> = new Promise<any>((resolve, reject) => {

            setTimeout(() => {
                if (control.value === 'test@test.com') {
                    resolve({'emailIsForbidden': true});
                } else {
                    resolve(null);
                }
            }, 1500);
        });

        return promise;
    }
}

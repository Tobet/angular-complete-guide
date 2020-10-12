import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    assignmentForm: FormGroup;
    statusList: string[] = ['Stable', 'Critical', 'Finished'];

    ngOnInit() {

        this.assignmentForm = new FormGroup({
            projectName: new FormControl('', Validators.required, this.projectForbiddenNames),
            mail: new FormControl('', [Validators.required, Validators.email]),
            projectStatus: new FormControl(null)
        });
    }

    onSubmit() {
        console.log('Reactive form submit: ', this.assignmentForm);
    }

    projectForbiddenNames(control: FormControl): Promise<any> | Observable<any> {

        const promise: Promise<any> = new Promise<any>((resolve, reject) => {

            setTimeout(() => {
                if (control.value === 'Test') {
                    resolve({projectNameIsForbidden: true});
                } else {
                    resolve(null);
                }
            }, 1000);

        });

        return promise;
    }
}

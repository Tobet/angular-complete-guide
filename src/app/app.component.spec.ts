import {TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';

describe('App: AngularUdemyCourseMainTest', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ]
        });
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should have as title angular-udemy-course', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('angular-udemy-course');
    });

    it('should render title in a h1 tag', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('angular-udemy-course');
    });
});

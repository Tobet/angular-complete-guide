import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {UserService} from './user.service';
import {DataService} from '../shared/data.service';

describe('UserComponent', () => {

    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserComponent]
        }).compileComponents(); // since we are using webpack, compile components is not needed
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should user username from the service', () => {
        const userService = fixture.debugElement.injector.get(UserService); // get an instance of user service
        // we need to trigger detect changes (we alredy do this in second before each)
        expect(userService.user.name).toEqual(component.user.name);
    });

    it('should display the user name if user is logged in', () => {
        component.isLoggedIn = true;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain(component.user.name);
    });

    it('shouldn\'t display the user name if user is logged in', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
    });

    // ASYNC TEST
    it('shouldn\'t fetch data successfully if not called asynchronously ', () => {

        const dataService = fixture.debugElement.injector.get(DataService);
        const spy = spyOn(dataService, 'getDetails')
            .and.returnValue(Promise.resolve('Data')); // run async code but returns our dummy data
        fixture.detectChanges();
        expect(component.data).toBe(undefined);
    });

    it('should fetch data successfully if not called asynchronously ', async(() => {

        const dataService = fixture.debugElement.injector.get(DataService);
        const spy = spyOn(dataService, 'getDetails')
            .and.returnValue(Promise.resolve('Data')); // run async code but returns our dummy data
        fixture.detectChanges();

        // whenStable allows me to react to all async task finished
        fixture.whenStable().then(() => {
            expect(component.data).toBe('Data');
        });
    }));

    it('should fetch data successfully if not called asynchronously (fake)', fakeAsync(() => {

        const fixture = TestBed.createComponent(UserComponent);
        const component = fixture.componentInstance;

        const dataService = fixture.debugElement.injector.get(DataService);
        const spy = spyOn(dataService, 'getDetails')
            .and.returnValue(Promise.resolve('Data')); // run async code but returns our dummy data
        fixture.detectChanges();
        tick(); // in a fake async environment finish all async task
        expect(component.data).toBe('Data');
    }));
});

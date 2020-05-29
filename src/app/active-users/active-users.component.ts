import {Component} from '@angular/core';
import {UsersService} from '../users.service';

@Component({
    selector: 'app-active-users',
    templateUrl: './active-users.component.html',
    styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {

    constructor(public usersService: UsersService) {
    }

    onSetToInactive(userId: number) {
        this.usersService.setUserToInactive(userId);
    }
}

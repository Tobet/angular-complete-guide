import {Component} from '@angular/core';

import {UsersService} from '../users.service';

@Component({
    selector: 'app-inactive-users',
    templateUrl: './inactive-users.component.html',
    styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {

    constructor(public usersService: UsersService) {
    }

    onSetToActive(userId: number) {
        this.usersService.setUserToActive(userId);
    }
}

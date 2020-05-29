import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CounterService {

    private activeToInactiveCounter = 0;
    private inactiveToActiveCounter = 0;

    public activeToInactiveCount() {
        this.activeToInactiveCounter++;
        console.log('Active to Inactive counter: ', this.activeToInactiveCounter);
    }

    public inactiveToActiveCount() {
        this.inactiveToActiveCounter++;
        console.log('Inactive to Active counter: ', this.inactiveToActiveCounter);
    }
}

import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-game-control',
    templateUrl: './game-control.component.html',
    styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {

    gameCounter = 0;
    gameProgressRef: number;

    @Output() gameProgressEmitter: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    startGame() {
        this.gameProgressRef = setInterval(() => {
            this.gameProgressEmitter.emit(this.gameCounter++);
        }, 1000);
    }

    pauseGame() {
        clearInterval(this.gameProgressRef);
    }
}

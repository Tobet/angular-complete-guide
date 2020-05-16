import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

import {Ingredient} from '../../shared/ingrediente.model';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('amountInput') amountInput: ElementRef;

    @Output() addIngredientEmitter: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
    @Output() deleteIngredientEmitter: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    addIngredient() {

        const newIngredient: Ingredient = new Ingredient(
            this.nameInput.nativeElement.value,
            this.amountInput.nativeElement.value
        );

        this.addIngredientEmitter.emit(newIngredient);
    }

    clearIngredient() {

        this.nameInput.nativeElement.value = null;
        this.amountInput.nativeElement.value = null;
    }
}

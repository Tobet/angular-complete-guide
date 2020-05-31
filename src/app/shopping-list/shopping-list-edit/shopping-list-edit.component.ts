import {Component, ElementRef, ViewChild} from '@angular/core';

import {ShoppingListService} from '../shopping-list.service';
import {Ingredient} from '../../shared/ingrediente.model';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('amountInput') amountInput: ElementRef;

    constructor(private shoppingListService: ShoppingListService) {
    }

    onClearIngredient() {
        this.nameInput.nativeElement.value = null;
        this.amountInput.nativeElement.value = null;
    }

    onAddIngredient() {

        const ingName: string = this.nameInput.nativeElement.value;
        const ingAmount: number = Number(this.amountInput.nativeElement.value);

        const newIngredient: Ingredient = new Ingredient(ingName, ingAmount);

        this.shoppingListService.addIngredient(newIngredient);
    }
}

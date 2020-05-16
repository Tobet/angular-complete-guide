import {Component} from '@angular/core';

import {Ingredient} from '../shared/ingrediente.model';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    constructor() {
    }

    onAddIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    onDeleteIngredient(ingredientName: string) {

        const ingredientIndex: number = this.ingredients.findIndex((ing: Ingredient) => {
            return ing.name === ingredientName;
        });

        if (ingredientIndex < 0) {
            console.log('Ingredient to delete not found');
        }

        this.ingredients.splice(ingredientIndex, 1);
    }
}

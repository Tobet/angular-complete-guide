import {Component, OnDestroy, OnInit} from '@angular/core';

import {Ingredient} from '../shared/ingrediente.model';
import {ShoppingListService} from './shopping-list.service';

import {Subscription} from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Ingredient[];
    private igChangeSub: Subscription;

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit() {

        this.ingredients = this.shoppingListService.getIngredients();

        this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
            (ingredients: Ingredient[]) => this.ingredients = ingredients,
        );
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }

    onDeleteIngredient(index: number) {
        this.shoppingListService.deleteIngredient(index);
    }

    ngOnDestroy() {
        this.igChangeSub.unsubscribe();
    }
}

import {Component, OnDestroy, OnInit} from '@angular/core';

import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

import {Subscription} from 'rxjs';
import {LoggingService} from "../logging.service";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Ingredient[];
    private igChangeSub: Subscription;

    constructor(private shoppingListService: ShoppingListService,
                private loggingService: LoggingService) {
    }

    ngOnInit() {

        this.ingredients = this.shoppingListService.getIngredients();

        this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
            (ingredients: Ingredient[]) => this.ingredients = ingredients,
        );

        this.loggingService.printLog("shopping list component ng on init");
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

import {Component, OnDestroy, OnInit} from '@angular/core';

import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

import {LoggingService} from '../logging.service';
import * as ShoppingListActions from './shopping-list-edit/store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Observable<{ ingredients: Ingredient[] }>;
    private sub: Subscription;

    constructor(private shoppingListService: ShoppingListService,
                private loggingService: LoggingService,
                private store: Store<{ shoppingList: { ingredients: Ingredient[] } }> // generic type that takes an element from map setup on app module (forRoot parameter)
    ) {
    }

    ngOnInit() {

        this.ingredients = this.store.select('shoppingList');

        // this.ingredients = this.shoppingListService.getIngredients();
        // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
        //     (ingredients: Ingredient[]) => this.ingredients = ingredients,
        // );

        this.loggingService.printLog('shopping list component ng on init');
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }

    onDeleteIngredient(index: number) {
        // this.shoppingListService.deleteIngredient(index);
        this.store.dispatch(new ShoppingListActions.DeleteIngredient(index));
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
    }
}

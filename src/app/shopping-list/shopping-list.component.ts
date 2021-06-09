import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

import {LoggingService} from '../logging.service';
import * as fromShoppingList from './shopping-list-edit/store/shopping-list.reducer';
import * as ShoppingListActions from './shopping-list-edit/store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

    ingredients: Observable<{ ingredients: Ingredient[] }>;

    constructor(private shoppingListService: ShoppingListService,
                private loggingService: LoggingService,
                private store: Store<fromShoppingList.AppState> // generic type that takes an element from map setup on app module (forRoot parameter)
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
        // this.shoppingListService.startedEditing.next(index);
        this.store.dispatch(new ShoppingListActions.StartEdit(index));
    }

    onDeleteIngredient(index: number) {
        // this.shoppingListService.deleteIngredient(index);
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    }
}

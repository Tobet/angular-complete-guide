import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListState} from '../store/shopping-list.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

    editedItem: Ingredient;
    editMode = false;
    subs: Subscription[] = [];

    @ViewChild('form') slForm: NgForm;

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {

        this.subs.push(
            this.store.select('shoppingList').subscribe(
                (shopState: ShoppingListState) => {
                    if (shopState.editedIngredientIndex > -1) {
                        this.editMode = true;
                        this.editedItem = shopState.editedIngredient;
                        this.slForm.setValue({
                            name: this.editedItem.name,
                            amount: this.editedItem.amount,
                        });
                    } else {
                        this.editMode = false;
                    }
                }
            )
        );
    }

    onSubmitIngredient(form: NgForm) {

        const value = form.value;
        const newIngredient: Ingredient = new Ingredient(value.name, value.amount);

        if (this.editMode) {
            // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
            this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
        } else {
            // this.shoppingListService.addIngredient(newIngredient);
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
        }

        this.resetShoppingListForm();
    }

    onClearIngredient() {
        this.resetShoppingListForm();
    }

    private resetShoppingListForm() {
        this.slForm.reset();
        this.editMode = false;
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    ngOnDestroy() {
        this.subs.forEach((sub: Subscription) => sub.unsubscribe());
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }
}

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

    editedItem: Ingredient;
    editedItemIndex: number;
    editMode = false;
    subs: Subscription[] = [];

    @ViewChild('form') slForm: NgForm;

    constructor(private shoppingListService: ShoppingListService,
                private store: Store<{ ingredients: Ingredient[] }>) {
    }

    ngOnInit() {

        this.subs.push(
            this.shoppingListService.startedEditing.subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    this.editMode = true;
                    this.editedItem = this.shoppingListService.getIngredient(index);
                    this.slForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount,
                    });
                },
                (err) => console.error(err),
            )
        );
    }

    onSubmitIngredient(form: NgForm) {

        const value = form.value;
        const newIngredient: Ingredient = new Ingredient(value.name, value.amount);

        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
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
        this.editedItemIndex = null;
        this.editedItem = null;
    }

    ngOnDestroy() {
        this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {Recipe} from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import {RecipeState} from '../store/recipe.reducer';
import * as RecipesActions from '../store/recipe.actions';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

    id: number;
    editMode = false;
    recipeForm: FormGroup;

    private storeSub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {

        this.route.params.subscribe(
            (params: Params) => {
                // console.log(params.id);

                this.id = +params.id;
                this.editMode = !!params.id; // bang bang
                this.initForm();
            }
        );
    }

    get ingredientsControls() { // a getter!
        return (<FormArray> this.recipeForm.get('ingredients')).controls;
    }

    onAddIngredient() {
        (<FormArray> this.recipeForm.get('ingredients')).push(
            new FormGroup({
                name: new FormControl(null, Validators.required),
                amount: new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ]),
            })
        );
    }

    private initForm() {

        let recipeName: string = '';
        let recipeImagePath: string = '';
        let recipeDescription: string = '';
        let recipeIngredients: FormArray = new FormArray([]);

        if (this.editMode) {

            // const recipe: Recipe = this.recipeService.getRecipe(this.id);

            this.storeSub = this.store.select('recipes').pipe(
                map((recipesState: RecipeState) => {
                    return recipesState.recipes.find((recipe: Recipe, index: number) => {
                        return index === this.id;
                    });
                })
            ).subscribe(
                (recipe: Recipe) => {

                    recipeName = recipe.name;
                    recipeImagePath = recipe.imagePath;
                    recipeDescription = recipe.description;

                    if (recipe.ingredients) {

                        for (let ingredient of recipe.ingredients) {
                            recipeIngredients.push(
                                new FormGroup({
                                    name: new FormControl(ingredient.name, Validators.required),
                                    amount: new FormControl(ingredient.amount, [
                                        Validators.required,
                                        Validators.pattern(/^[1-9]+[0-9]*$/)
                                    ])
                                })
                            );
                        }
                    }
                }
            );
        }

        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(recipeImagePath, Validators.required),
            description: new FormControl(recipeDescription, Validators.required),
            ingredients: recipeIngredients
        });
    }

    public onSubmit() {

        // const recipe: Recipe = new Recipe(
        //     this.recipeForm.value.name,
        //     this.recipeForm.value.description,
        //     this.recipeForm.value.imagePath,
        //     this.recipeForm.value.ingredients,
        // );

        if (this.editMode) {
            // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
            this.store.dispatch(new RecipesActions.UpdateRecipe({
                index: this.id,
                newRecipe: this.recipeForm.value
            }));
        } else {
            // this.recipeService.addRecipe(this.recipeForm.value);
            this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
        }

        this.onCancel();
    }

    public onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route})
            .catch(err => console.error(err));
    }

    public onDeleteIngredient(index: number) {
        (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
    }

    ngOnDestroy() {
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}

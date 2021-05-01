import {NgModule} from "@angular/core";

import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingListEditComponent} from "./shopping-list-edit/shopping-list-edit.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports:[
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule {
}

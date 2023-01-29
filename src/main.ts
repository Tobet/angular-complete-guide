import {enableProdMode, importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from "@angular/platform-browser";

import {environment} from './environments/environment';
import {AppComponent} from "./app/app.component";
import {AppRoutingModule} from "./app/app-routing.module";

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule)
    ]
});

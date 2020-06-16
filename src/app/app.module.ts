import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AuthService} from './auth.service';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth-guard.service';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app.routing.module';
import {UsersComponent} from './users/users.component';
import {ServersService} from './servers/servers.service';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {ServerComponent} from './servers/server/server.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UsersComponent,
        ServersComponent,
        UserComponent,
        EditServerComponent,
        ServerComponent,
        PageNotFoundComponent,
        ErrorPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [ServersService, AuthService, AuthGuard, CanDeactivateGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}

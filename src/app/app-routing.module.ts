import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {WelcomeComponent} from "./welcome/welcome.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./dashboard/dashboard-routing.module').then(
                (mod) => mod.DashboardRoutingModule
            )
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

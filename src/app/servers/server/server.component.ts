import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Data, Router} from '@angular/router';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

    server: { id: number, name: string, status: string };

    constructor(private serversService: ServersService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {

        this.route.data.subscribe(
            (data: Data) => {
                this.server = data.server; // has to match the name used in the route, in resolve object
            }
        );

        // const initialId: number = +this.route.snapshot.params.id;
        // this.server = this.serversService.getServer(initialId);
        //
        // this.route.params.subscribe(
        //     (serverParams: Params) => {
        //         this.server = this.serversService.getServer(+serverParams.id);
        //     }
        // );
    }

    onEdit() {
        this.router.navigate(
            ['edit'],
            {relativeTo: this.route, queryParamsHandling: 'preserve'}
        );
    }
}

import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-cockpit',
    templateUrl: './cockpit.component.html',
    styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

    // newServerName = '';
    // newServerContent = '';

    @ViewChild('serverContentInput') serverContentInput: ElementRef;

    @Output() serverCreated: EventEmitter<{ serverName: string, serverContent: string }> = new EventEmitter<{ serverName: string, serverContent: string }>();
    @Output('bpCreated') blueprintCreated: EventEmitter<{ serverName: string, serverContent: string }> = new EventEmitter<{ serverName: string, serverContent: string }>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onAddServer(serverNameInput: HTMLInputElement) {
        this.serverCreated.emit({
            serverName: serverNameInput.value,
            serverContent: this.serverContentInput.nativeElement.value
        });
    }

    onAddBlueprint(serverNameInput: HTMLInputElement) {
        this.blueprintCreated.emit({
            serverName: serverNameInput.value,
            serverContent: this.serverContentInput.nativeElement.value
        });
    }
}

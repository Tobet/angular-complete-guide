import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostListener('click') onClick: Event;

    constructor(private elRef: ElementRef, private renderer2: Renderer2) {
    }



}

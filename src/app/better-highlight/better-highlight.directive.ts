import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

/**
 * This is a better way to manipulate dom elements
 */
@Directive({
    selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

    // parametric color for input
    @Input() defaultColor = 'transparent';
    @Input('appBetterHighlight') highlightColor = 'blue'; // directive alias example

    // dom properties are camel case
    @HostBinding('style.backgroundColor') backgroundColor;

    constructor(private elRef: ElementRef,
                private rendered: Renderer2) {
    }

    ngOnInit() {
        this.backgroundColor = this.defaultColor;
    }

    @HostListener('mouseenter') mouseOver(eventData: Event) {

        // this.rendered.setStyle(
        //     this.elRef.nativeElement,
        //     'background-color',
        //     'blue',
        // );

        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') mouseLeave(eventData: Event) {

        // this.rendered.setStyle(
        //     this.elRef.nativeElement,
        //     'background-color',
        //     'transparent',
        // );

        this.backgroundColor = this.defaultColor;
    }
}

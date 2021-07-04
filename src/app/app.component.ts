import {Component} from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('divState', [
            state('normal', style({
                backgroundColor: 'red',
                transform: 'translateX(0)'
            })),
            state('highlighted', style({
                backgroundColor: 'blue',
                transform: 'translateX(100px)'
            })),
            transition('normal <=> highlighted', animate(300)),
            // transition('highlighted => normal', animate(800)),
        ]),
        trigger('wildState', [
            state('normal', style({
                backgroundColor: 'red',
                transform: 'translateX(0) scale(1)'
            })),
            state('highlighted', style({
                backgroundColor: 'blue',
                transform: 'translateX(100px) scale(1)'
            })),
            state('shrunken', style({
                backgroundColor: 'green',
                transform: 'translateX(0px) scale(0.5)'
            })),
            transition('normal => highlighted', animate(300)),
            transition('highlighted => normal', animate(800)),
            transition('shrunken <=> *', [
                style({backgroundColor: 'orange'}),
                animate(1000, style({borderRadius: '50px'})),
                animate(500)
            ]) // * wildcars means any state
        ]),
        trigger('list1', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                style({opacity: 0, transform: 'translateX(-100px)'}),
                animate(300)
            ]),// void is a default state name that specifies elements that azre not in the DOM
            transition('* => void', [
                animate(300, style({opacity: 0, transform: 'translateX(100px)'}))
            ])
        ]),
        trigger('list2', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                animate(1000, keyframes([ // with keyframes, more precise state control
                    style({
                        transform: 'translateX(-100px)',
                        opacity: 0,
                        offset: 0
                    }),
                    style({
                        transform: 'translateX(-50px)',
                        opacity: 0.5,
                        offset: 0.3,
                    }),
                    style({
                        transform: 'translateX(-20px)',
                        opacity: 1,
                        offset: 0.8,
                    }),
                    style({
                        offset: 1
                    })
                ]))
            ]),// void is a default state name that specifies elements that are not in the DOM
            transition('* => void', [
                group([ // we can pass a group of animations we wanna perform synchronously
                    animate(300, style({color: 'red'})),
                    animate(800, style({opacity: 0, transform: 'translateX(100px)'})),
                ])
            ])
        ]),
    ]
})
export class AppComponent {

    state: 'normal' | 'highlighted' = 'normal';
    wildState: 'normal' | 'highlighted' | 'shrunken' = 'normal';

    list = ['Milk', 'Sugar', 'Bread'];

    onAnimate() {
        this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
        this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onShrink() {
        this.wildState = 'shrunken';
    }

    onAdd(item: string) {
        this.list.push(item);
    }

    onDelete(item: string) {
        this.list.splice(this.list.indexOf(item), 1);
    }

    animationStarted(ev: any) {
        console.log('started: ', ev);
    }

    animationEnded(ev: any) {
        console.log('ended: ', ev);
    }
}

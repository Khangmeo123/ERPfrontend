import {animate, group, state, style, transition, trigger} from '@angular/animations';

export const toggleMenu = trigger('toggleMenu', [
  state('opened', style({
    opacity: 1, visibility: 'visible',
  })),
  state('closed', style({
    opacity: 0, visibility: 'hidden',
  })),
  transition('opened => closed', [group([
      animate('100ms ease-in-out', style({
        opacity: 0,
      })),
      animate('100ms ease-in-out', style({
        visibility: 'hidden',
      })),
    ],
  )]),
  transition('closed => opened', [group([
      animate('1ms ease-in-out', style({
        visibility: 'visible',
      })),
      animate('800ms ease-in-out', style({
        opacity: 1,
      })),
    ],
  )]),
]);

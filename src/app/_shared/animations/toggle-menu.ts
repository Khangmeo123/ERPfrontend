import {animate, group, state, style, transition, trigger} from '@angular/animations';

export const toggleMenu = trigger('toggleMenu', [
  state('open', style({
    opacity: '1', visibility: 'visible',
  })),
  state('closed', style({
    opacity: '0', visibility: 'hidden',
  })),
  transition('open => closed', [group([
      animate('400ms ease-in-out', style({
        opacity: '0',
      })),
      animate('600ms ease-in-out', style({
        'max-height': '0px',
      })),
      animate('700ms ease-in-out', style({
        visibility: 'hidden',
      })),
    ],
  )]),
  transition('closed => open', [group([
      animate('1ms ease-in-out', style({
        visibility: 'visible',
      })),
      animate('600ms ease-in-out', style({
        'max-height': '500px',
      })),
      animate('800ms ease-in-out', style({
        opacity: '1',
      })),
    ],
  )]),
]);

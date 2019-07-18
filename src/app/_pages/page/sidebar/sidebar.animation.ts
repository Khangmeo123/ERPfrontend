import { animate, group, state, style, transition, trigger } from '@angular/animations';

export const toggleMenuSideBar = trigger('toggleMenuSideBar', [
  transition(':enter', [
    style({transform: 'translateY(100%)', opacity: 0, position: 'absolute'}),
    animate('200ms', style({transform: 'translateY(0)', opacity: 1, position: 'relative'})),
  ]),
  transition(':leave', [
    style({transform: 'translateY(0)', opacity: 1, position: 'relative'}),
    animate('200ms', style({transform: 'translateY(100%)', opacity: 0, position: 'absolute'})),
  ]),
]);


export const toggleMenuNavbar = trigger('toggleMenuNavbar', [
  transition(':enter', [
    style({transform: 'translateX(100%)', opacity: 0, position: 'absolute'}),
    animate('500ms', style({transform: 'translateX(0)', opacity: 1, position: 'relative'})),
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)', opacity: 1, position: 'relative'}),
    animate('200ms', style({transform: 'translateX(100%)', opacity: 0, position: 'absolute'})),
  ]),
]);

export const toggleMenuNavbarLeft = trigger('toggleMenuNavbarLeft', [
  state('open', style({
    width: '70px', visibility: 'visible', opacity: 0,
  })),
  state('closed', style({
    width: '260px', visibility: 'visible', opacity: 1,
  })),
  transition('open => closed', [group([
      animate('200ms ease-in-out', style({
        width: '260px',
      })),
      animate('300ms ease-in-out', style({
        visibility: 'visible',
      })),
      animate('400ms ease-in-out', style({
        opacity: '1',
      })),
    ],
  )]),
  transition('closed => open', [group([
      animate('200ms ease-in-out', style({
        width: '70px',
      })),
      animate('300ms ease-in-out', style({
        visibility: 'visible',
      })),
      animate('400ms ease-in-out', style({
        opacity: '1',
      })),
    ],
  )]),
]);

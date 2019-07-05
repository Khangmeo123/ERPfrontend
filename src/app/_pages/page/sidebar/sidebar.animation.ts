import { animate, style, transition, trigger, state, group } from '@angular/animations';

export const toggleMenuSideBar = trigger('toggleMenuSideBar', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0, position: 'absolute' }),
    animate('500ms', style({ transform: 'translateY(0)', opacity: 1, position: 'relative' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1, position: 'relative' }),
    animate('200ms', style({ transform: 'translateY(100%)', opacity: 0, position: 'absolute' }))
  ])
]);


export const toggleMenuNavbar = trigger('toggleMenuNavbar', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0, position: 'absolute' }),
    animate('500ms', style({ transform: 'translateX(0)', opacity: 1, position: 'relative' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1, position: 'relative' }),
    animate('200ms', style({ transform: 'translateX(100%)', opacity: 0, position: 'absolute' }))
  ])
]);

export const visibleSpan = trigger('visibleSpan', [
  transition(':enter', [
    style({ opacity: 0}),
    animate('800ms', style({ opacity: 1})),
  ]),
  transition(':leave', [
    style({ opacity: 1}),
    animate('500ms', style({opacity: 0})),
  ])
]);


export const toggleMenuNavbarRight = trigger('toggleMenuNavbarRight', [
  state('open', style({
    width: '260px', visibility: 'visible',
  })),
  state('closed', style({
    width: '70px', visibility: 'hidden',
  })),
  transition('open => closed', [group([
    animate('600ms ease-in-out', style({
      width: '70px',
    })),
    animate('700ms ease-in-out', style({
      visibility: 'visible',
    })),
  ],
  )]),
  transition('closed => open', [group([
    animate('600ms ease-in-out', style({
      width: '260px',
    })),
    animate('800ms ease-in-out', style({
      visibility: 'visible',
    })),
  ],
  )]),
]);
export const toggleMenuNavbarLeft = trigger('toggleMenuNavbarLeft', [
  state('open', style({
    width: '70px', visibility: 'visible', opacity: 0,
  })),
  state('closed', style({
    width: '260px', visibility: 'visible',  opacity: 1,
  })),
  transition('open => closed', [group([
    animate('200ms ease-in-out', style({
      width: '260px',
    })),
    animate('700ms ease-in-out', style({
      visibility: 'visible',
    })),
    animate('800ms ease-in-out', style({
      opacity: '1',
    })),
  ],
  )]),
  transition('closed => open', [group([
    animate('200ms ease-in-out', style({
      width: '70px',
    })),
    animate('800ms ease-in-out', style({
      visibility: 'visible',
    })),
    animate('800ms ease-in-out', style({
      opacity: '1',
    })),
  ],
  )]),
]);
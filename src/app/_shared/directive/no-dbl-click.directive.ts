import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoDblClick]',
})
export class NoDblClickDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.srcElement.setAttribute('disabled', true);
    setTimeout(() => {
      event.srcElement.removeAttribute('disabled');
    }, 500);
  }
}

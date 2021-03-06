import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export class BaseUnsubscribe implements OnDestroy {
  unsubscribe$: Subject<any> = new Subject<any>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

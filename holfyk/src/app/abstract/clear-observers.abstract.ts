import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class ClearObservable implements OnDestroy {
  protected destroy$: Subject<boolean> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    console.log(
      `%c Unsibscribe from Observable >>> Success`,
      `color: grey; font-weight: 700`
    );
  }
}

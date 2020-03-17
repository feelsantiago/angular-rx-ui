import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShopUiService {
    private uiLoadingSubject: Subject<boolean>;

    private uiLoading$: Observable<boolean>;

    public get UiEventLoading$(): Observable<boolean> {
        return this.uiLoading$;
    }

    constructor() {
        this.uiLoadingSubject = new Subject();
        this.uiLoading$ = this.uiLoadingSubject.pipe(distinctUntilChanged());
    }

    public dispatchLoadingEvent(value: boolean): void {
        this.uiLoadingSubject.next(value);
    }
}

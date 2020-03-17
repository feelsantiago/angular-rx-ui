import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShopUiService {
    private uiSubject: BehaviorSubject<boolean>;

    private ui$: Observable<boolean>;

    private uiComplete$: Observable<boolean[]>;

    private uiLoadingSubject: Subject<boolean>;

    private uiLoading$: Observable<boolean>;

    public get UiEventChange$(): Observable<boolean> {
        return this.ui$;
    }

    public get UiEventLoading$(): Observable<boolean> {
        return this.uiLoading$;
    }

    constructor() {
        this.uiSubject = new BehaviorSubject(false);
        this.ui$ = this.uiSubject.pipe(distinctUntilChanged());

        this.uiLoadingSubject = new Subject();
        this.uiLoading$ = this.uiLoadingSubject.pipe(distinctUntilChanged());
    }

    // TODO: unsubscribe commands
    public addCommand(command$: Observable<boolean>): void {
        command$.subscribe((value) => this.uiSubject.next(value));
    }

    public dispatchLoadingEvent(value: boolean): void {
        this.uiLoadingSubject.next(value);
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShopUiService {
    private uiObservable: BehaviorSubject<boolean>;

    private uiLoadingObservable: Subject<boolean>;

    public get UiEventChange(): Observable<boolean> {
        return this.uiObservable.pipe(distinctUntilChanged());
    }

    public get UiEventLoading(): Observable<boolean> {
        return this.uiLoadingObservable.asObservable();
    }

    constructor() {
        this.uiObservable = new BehaviorSubject(false);
        this.uiLoadingObservable = new Subject();
    }

    public addCommand(command: Observable<boolean>): void {
        command.subscribe((value) => this.uiObservable.next(value));
    }

    public dispatchLoadingEvent(value: boolean): void {
        this.uiLoadingObservable.next(value);
    }
}

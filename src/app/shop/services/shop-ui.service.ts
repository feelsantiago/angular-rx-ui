import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { merge, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShopUiService {
    private uiObservables: BehaviorSubject<boolean>;

    public get UiEventChange(): Observable<boolean> {
        return this.uiObservables.pipe(distinctUntilChanged());
    }

    constructor() {
        this.uiObservables = new BehaviorSubject(false);
    }

    public addCommand(command: Observable<boolean>): void {
        command.subscribe((value) => this.uiObservables.next(value));
    }
}

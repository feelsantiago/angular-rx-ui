import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, scan, shareReplay, startWith } from 'rxjs/operators';
import { Invoice } from '../model/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceStateService {
    private state: Subject<Partial<Invoice>>;

    private stateObservable: Observable<Partial<Invoice>>;

    private initialState: Invoice;

    constructor() {
        this.initialState = new Invoice();
        this.state = new Subject();
        this.stateObservable = this.state.pipe(
            startWith(this.initialState),
            scan((acc, next) => ({ ...acc, ...next }), this.initialState),
            shareReplay(1),
        );
    }

    public getState(): Observable<Partial<Invoice>> {
        return this.stateObservable;
    }

    public getStateProperty<T extends keyof Invoice>(property?: T): Observable<Invoice[T]> {
        return this.state.pipe(map((invoice) => invoice[property]));
    }

    public updateState(invoice: Partial<Invoice>): void {
        this.state.next(invoice);
    }
}

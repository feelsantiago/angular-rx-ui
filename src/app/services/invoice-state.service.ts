import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { Invoice } from '../model/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceStateService {
    private state: BehaviorSubject<Partial<Invoice>>;

    private initialState: Invoice;

    constructor() {
        this.initialState = new Invoice();
        this.state = new BehaviorSubject(this.initialState);
    }

    public getState(): Observable<Partial<Invoice>> {
        return this.state.pipe(
            scan((acc, next) => {
                this.initialState = { ...acc, ...next };
                return this.initialState;
            }, this.initialState),
        );
    }

    public getStateProperty<T extends keyof Invoice>(property?: T): Observable<Invoice[T]> {
        return this.state.pipe(map((invoice) => invoice[property]));
    }

    public updateState(invoice: Partial<Invoice>): void {
        this.state.next(invoice);
    }
}

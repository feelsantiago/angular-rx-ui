import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { Invoice } from '../model/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceStateService {
    private state: BehaviorSubject<Partial<Invoice>>;

    constructor() {
        const a = new Invoice();
        this.state = new BehaviorSubject(a);
    }

    public getState(): Observable<Partial<Invoice>> {
        return this.state.pipe(scan((acc, next) => ({ ...acc, ...next })));
    }

    public getStateProperty<T extends keyof Invoice>(property?: T): Observable<Invoice[T]> {
        return this.state.pipe(map((invoice) => invoice[property]));
    }

    public updateState(invoice: Partial<Invoice>): void {
        this.state.next(invoice);
    }
}

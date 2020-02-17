import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Invoice } from '../model/invoice.model';
import { stateReducer } from '../utils/state.operators';

@Injectable({ providedIn: 'root' })
export class InvoiceStateService {
    private state: Subject<Partial<Invoice>>;

    private stateObservable: Observable<Partial<Invoice>>;

    private initialState: Invoice;

    constructor() {
        this.initialState = new Invoice();
        this.state = new Subject();
        this.stateObservable = this.state.pipe(stateReducer(this.initialState));
    }

    public getState(): Observable<Partial<Invoice>> {
        return this.stateObservable;
    }

    public getStateOneTime(): Observable<Partial<Invoice>> {
        return this.stateObservable.pipe(first());
    }

    public updateState(invoice: Partial<Invoice>): void {
        this.state.next(invoice);
    }
}

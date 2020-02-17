import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShopClient {
    private readonly woods = ['Maple', 'Mahogany', 'Basswood', 'Alder', 'Ash'];

    private readonly pickups = ['Single Coil', 'P-90', 'Mini-Humbucker', 'Humbucker'];

    private readonly quantity = [1, 2, 3];

    public getWoods(): Observable<string[]> {
        return this.get(this.woods, 'Pickups');
    }

    public getPickups(): Observable<string[]> {
        return this.get(this.pickups, 'Pickups');
    }

    public getQuantity(): Observable<number[]> {
        return this.get(this.quantity, 'Quantity', 3000);
    }

    private get<T>(values: T, type: string, requestTime = 2000): Observable<T> {
        console.log(`[GET] - ${type}`);
        return of(values).pipe(
            delay(requestTime),
            tap(() => console.log(`[GET] - ${type} - Status: Success`)),
        );
    }
}

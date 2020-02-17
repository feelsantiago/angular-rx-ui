import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShopClient {
    private readonly woods = ['Maple', 'Mahogany', 'Basswood', 'Alder', 'Ash'];

    private readonly pickups = ['Single Coil', 'P-90', 'Mini-Humbucker', 'Humbucker'];

    private readonly quantity = [1, 2, 3];

    public getWoods(): Observable<string[]> {
        console.log('[GET] - Woods');
        return of(this.woods).pipe(
            delay(2000),
            tap(() => console.log('[GET] - Woods - Status: Success')),
        );
    }

    public getPickups(): Observable<string[]> {
        console.log('[GET] - Pickups');
        return of(this.pickups).pipe(
            delay(2000),
            tap(() => console.log('[GET] - Pickups - Status: Success')),
        );
    }

    public getQuantity(): Observable<number[]> {
        console.log('[GET] - Quantity');
        return of(this.quantity).pipe(
            delay(3000),
            tap(() => console.log('[GET] - Quantity - Status: Success')),
        );
    }
}

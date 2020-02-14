import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShopClient {
    private readonly woods = ['Maple', 'Mahogany', 'Basswood', 'Alder', 'Ash'];

    private readonly pickups = ['Single Coil', 'P-90', 'Mini-Humbucker', 'Humbucker'];

    public getWoods(): Observable<string[]> {
        return of(this.woods).pipe(delay(2000));
    }

    public getPickups(): Observable<string[]> {
        return of(this.pickups).pipe(delay(2000));
    }
}

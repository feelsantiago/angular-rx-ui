import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShopClient {
    private readonly woods = ['Maple', 'Mahogany', 'Basswood', 'Alder', 'Ash'];

    public getWoodTypes(): Observable<Array<string>> {
        return of(this.woods).pipe(delay(2000));
    }
}

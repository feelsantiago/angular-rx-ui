import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter, debounce, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {
    public getOnFormValidEvent<T>(form: FormGroup): Observable<T> {
        const validFormObservable = form.statusChanges.pipe(filter((value) => value === 'VALID'));
        const submitFormObservable = form.valueChanges.pipe(
            debounce(() => validFormObservable),
            debounceTime(500),
        );

        return submitFormObservable;
    }
}

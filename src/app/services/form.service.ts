import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter, debounce, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {
    public getOnFormValidEvent<T>(form: FormGroup): Observable<T> {
        const validForm$ = form.statusChanges.pipe(filter((value) => value === 'VALID'));
        const submitForm$ = form.valueChanges.pipe(
            debounce(() => validForm$),
            debounceTime(500),
        );

        return submitForm$;
    }
}

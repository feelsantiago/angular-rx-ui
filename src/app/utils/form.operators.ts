import { Observable } from 'rxjs';
import { map, distinctUntilChanged, startWith } from 'rxjs/operators';

export const getFormStatus = (valid: boolean) => {
    return (source: Observable<string>) =>
        source.pipe(
            distinctUntilChanged(),
            map((value) => value !== 'INVALID'),
            startWith(valid),
        );
};

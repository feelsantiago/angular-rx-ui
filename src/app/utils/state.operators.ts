import { Observable } from 'rxjs';
import { startWith, scan, shareReplay } from 'rxjs/operators';

export const stateReducer = <T>(initialState: T) => {
    return (source: Observable<T>) =>
        source.pipe(
            startWith(initialState),
            scan((acc, next) => ({ ...acc, ...next }), initialState),
            shareReplay(1),
        );
};

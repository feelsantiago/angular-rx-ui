import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, combineLatest, merge } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { getFormStatus } from '../../utils/form.operators';

@Injectable({ providedIn: 'root' })
export class ShopFormService {
    private clientForm: FormGroup;

    private woodForm: FormGroup;

    private gearForm: FormGroup;

    private paintForm: FormGroup;

    private initialled: boolean;

    private validateForm$: Observable<boolean>;

    private validateStepForm$: Observable<boolean>;

    public get clientFormGroup(): FormGroup {
        return this.clientForm;
    }

    public get woodFormGroup(): FormGroup {
        return this.woodForm;
    }

    public get gearFormGroup(): FormGroup {
        return this.gearForm;
    }

    public get paintFormGroup(): FormGroup {
        return this.paintForm;
    }

    public get validateFormEvent$(): Observable<boolean> {
        if (!this.validateForm$) this.initUiEvents();

        return this.validateForm$;
    }

    public get validateStepFormEvent$(): Observable<boolean> {
        if (!this.validateStepForm$) this.initUiEvents();

        return this.validateStepForm$;
    }

    constructor(private readonly fb: FormBuilder) {
        this.initialled = false;
    }

    public init(): void {
        if (this.initialled) return;

        this.clientForm = this.setupClientForm();
        this.woodForm = this.setupWoodForm();
        this.gearForm = this.setupGearForm();
        this.paintForm = this.setupPaintForm();

        this.initialled = true;
    }

    public dispose(): void {
        this.clientForm = undefined;
        this.woodForm = undefined;
        this.gearForm = undefined;
        this.paintForm = undefined;

        this.initialled = false;
    }

    private initUiEvents(): void {
        if (!this.initialled) {
            this.init();
        }

        const { statusChanges: client$ } = this.clientForm;
        const { statusChanges: wood$ } = this.woodForm;
        const { statusChanges: gear$ } = this.gearForm;
        const { statusChanges: paint$ } = this.paintForm;

        this.validateForm$ = combineLatest(
            client$.pipe(getFormStatus(false)),
            wood$.pipe(getFormStatus(false)),
            gear$.pipe(getFormStatus(false)),
            paint$.pipe(getFormStatus(false)),
        ).pipe(
            map((result) => result.reduce((acc, next) => acc && next)),
            distinctUntilChanged(),
        );

        this.validateStepForm$ = merge(
            client$.pipe(getFormStatus(false)),
            wood$.pipe(getFormStatus(false)),
            gear$.pipe(getFormStatus(false)),
            paint$.pipe(getFormStatus(false)),
        ).pipe(distinctUntilChanged());
    }

    private setupClientForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    private setupWoodForm(): FormGroup {
        return this.fb.group({
            body: ['', Validators.required],
            neck: ['', Validators.required],
        });
    }

    private setupGearForm(): FormGroup {
        return this.fb.group({
            pickups: ['', Validators.required],
            quantity: ['', Validators.required],
        });
    }

    private setupPaintForm(): FormGroup {
        return this.fb.group({
            color: ['', Validators.required],
            paint: ['', Validators.required],
        });
    }
}

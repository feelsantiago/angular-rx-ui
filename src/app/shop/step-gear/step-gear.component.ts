import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, switchMap, first } from 'rxjs/operators';
import { merge, forkJoin } from 'rxjs';
import { getFormStatus } from '../../utils/form.operators';
import { InvoiceStateService } from '../../services/invoice-state.service';
import { FormService } from '../../services/form.service';
import { ShopUiService } from '../services/shop-ui.service';
import { ShopClient } from '../client/shop.client';

interface FormModel {
    pickups: string;
    quantity: number;
}

@Component({
    selector: 'app-step-gear',
    templateUrl: 'step-gear.component.html',
    styleUrls: ['step-gear.component.scss'],
})
export class StepGearComponent implements OnInit, OnDestroy {
    public pickups: Array<string> = [];

    public quantity: Array<number> = [];

    public gearForm: FormGroup;

    public subscriptions = new SubSink();

    constructor(
        private readonly shopClient: ShopClient,
        private readonly shopUiService: ShopUiService,
        private readonly invoiceState: InvoiceStateService,
        private readonly formService: FormService,
        private readonly fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.gearForm = this.setupForm();
        const { valid } = this.gearForm;

        this.shopUiService.addCommand(this.gearForm.statusChanges.pipe(getFormStatus(valid)));
        this.shopUiService.dispatchLoadingEvent(true);

        const pickupsObservable = this.shopClient.getPickups().pipe(
            tap((values) => {
                this.pickups = values;
            }),
        );

        const quantityObservable = this.shopClient.getQuantity().pipe(
            tap((values) => {
                this.quantity = values;
            }),
        );

        this.subscriptions.sink = forkJoin(pickupsObservable, quantityObservable)
            .pipe(
                switchMap(() => this.invoiceState.getState().pipe(first())),
                tap(() => this.shopUiService.dispatchLoadingEvent(false)),
            )
            .subscribe((state) => {
                console.log(state);
                const { pickups, quantity } = state;
                this.gearForm.setValue({ pickups, quantity });
            });

        this.subscriptions.sink = this.formService
            .getOnFormValidEvent<FormModel>(this.gearForm)
            .subscribe((values) => this.invoiceState.updateState(values));
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private setupForm(): FormGroup {
        return this.fb.group({
            pickups: ['', Validators.required],
            quantity: ['', Validators.required],
        });
    }
}

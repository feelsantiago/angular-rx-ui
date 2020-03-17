import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { FormGroup } from '@angular/forms';
import { tap, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { InvoiceStateService } from '../../services/invoice-state.service';
import { FormService } from '../../services/form.service';
import { ShopUiService } from '../services/shop-ui.service';
import { ShopClient } from '../client/shop.client';
import { ShopFormService } from '../services/shop-form.service';

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
        private readonly shopFormService: ShopFormService,
    ) {}

    public ngOnInit(): void {
        this.gearForm = this.shopFormService.gearFormGroup;
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
                switchMap(() => this.invoiceState.getStateOneTime()),
                tap(() => this.shopUiService.dispatchLoadingEvent(false)),
            )
            .subscribe((state) => {
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
}

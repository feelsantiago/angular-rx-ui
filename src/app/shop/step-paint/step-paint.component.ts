import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { tap, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { InvoiceStateService } from '../../services/invoice-state.service';
import { FormService } from '../../services/form.service';
import { ShopUiService } from '../services/shop-ui.service';
import { ShopClient } from '../client/shop.client';
import { ShopFormService } from '../services/shop-form.service';

interface FormModel {
    color: string;
    paint: string;
}

@Component({
    selector: 'app-step-paint',
    templateUrl: 'step-paint.component.html',
    styleUrls: ['step-paint.component.scss'],
})
export class StepPaintComponent implements OnInit, OnDestroy {
    public colors: Array<string> = [];

    public paints: Array<string> = [];

    public paintForm: FormGroup;

    public subscriptions = new SubSink();

    constructor(
        private readonly shopClient: ShopClient,
        private readonly shopUiService: ShopUiService,
        private readonly invoiceState: InvoiceStateService,
        private readonly formService: FormService,
        private readonly shopFormService: ShopFormService,
    ) {}

    public ngOnInit(): void {
        this.paintForm = this.shopFormService.paintFormGroup;
        this.shopUiService.dispatchLoadingEvent(true);

        const colorsObservable = this.shopClient.getColors().pipe(
            tap((values) => {
                this.colors = values;
            }),
        );

        const paintsObservable = this.shopClient.getPaints().pipe(
            tap((values) => {
                this.paints = values;
            }),
        );

        this.subscriptions.sink = forkJoin(colorsObservable, paintsObservable)
            .pipe(
                switchMap(() => this.invoiceState.getStateOneTime()),
                tap(() => this.shopUiService.dispatchLoadingEvent(false)),
            )
            .subscribe((state) => {
                const { color, paint } = state;
                this.paintForm.setValue({ color, paint });
            });

        this.subscriptions.sink = this.formService
            .getOnFormValidEvent<FormModel>(this.paintForm)
            .subscribe((values) => this.invoiceState.updateState(values));
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { tap, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { getFormStatus } from '../../utils/form.operators';
import { InvoiceStateService } from '../../services/invoice-state.service';
import { FormService } from '../../services/form.service';
import { ShopUiService } from '../services/shop-ui.service';
import { ShopClient } from '../client/shop.client';

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
        private readonly fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.paintForm = this.setupForm();
        const { valid } = this.paintForm;

        this.shopUiService.addCommand(this.paintForm.statusChanges.pipe(getFormStatus(valid)));
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

    private setupForm(): FormGroup {
        return this.fb.group({
            color: ['', Validators.required],
            paint: ['', Validators.required],
        });
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { tap, switchMap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { InvoiceStateService } from '../../services/invoice-state.service';
import { FormService } from '../../services/form.service';
import { ShopClient } from '../client/shop.client';
import { ShopUiService } from '../services/shop-ui.service';
import { ShopFormService } from '../services/shop-form.service';

interface FormModel {
    body: string;
    neck: string;
}

@Component({
    selector: 'app-step-wood',
    templateUrl: 'step-wood.component.html',
    styleUrls: ['step-wood.component.scss'],
})
export class StepWoodComponent implements OnInit, OnDestroy {
    public woods: Array<string> = [];

    public woodsForm: FormGroup;

    public subscriptions = new SubSink();

    constructor(
        private readonly shopClient: ShopClient,
        private readonly shopUiService: ShopUiService,
        private readonly invoiceState: InvoiceStateService,
        private readonly formService: FormService,
        private readonly shopFormService: ShopFormService,
    ) {}

    public ngOnInit(): void {
        this.woodsForm = this.shopFormService.woodFormGroup;
        this.shopUiService.dispatchLoadingEvent(true);

        this.subscriptions.sink = this.shopClient
            .getWoods()
            .pipe(
                tap(() => this.shopUiService.dispatchLoadingEvent(false)),
                switchMap((values) => {
                    this.woods = values;
                    return this.invoiceState.getStateOneTime();
                }),
            )
            .subscribe((state) => {
                const { body, neck } = state;
                this.woodsForm.setValue({ body, neck });
            });

        this.subscriptions.sink = this.formService
            .getOnFormValidEvent<FormModel>(this.woodsForm)
            .subscribe((values) => this.invoiceState.updateState(values));
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}

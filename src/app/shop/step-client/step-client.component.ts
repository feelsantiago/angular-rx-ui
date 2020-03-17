import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { FormService } from '../../services/form.service';
import { InvoiceStateService } from '../../services/invoice-state.service';
import { ShopFormService } from '../services/shop-form.service';

interface FormModel {
    name: string;
    email: string;
}

@Component({
    selector: 'app-step-client',
    templateUrl: 'step-client.component.html',
    styleUrls: ['step-client.component.scss'],
})
export class StepClientComponent implements OnInit, OnDestroy {
    public clientForm: FormGroup;

    public subscriptions = new SubSink();

    constructor(
        private readonly invoiceState: InvoiceStateService,
        private readonly formService: FormService,
        private readonly shopFormService: ShopFormService,
    ) {}

    public ngOnInit(): void {
        this.clientForm = this.shopFormService.clientFormGroup;

        this.subscriptions.sink = this.invoiceState.getStateOneTime().subscribe((state) => {
            const { name, email } = state;
            this.clientForm.setValue({ name, email });
        });

        this.subscriptions.sink = this.formService
            .getOnFormValidEvent<FormModel>(this.clientForm)
            .subscribe((values) => this.invoiceState.updateState(values));
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}

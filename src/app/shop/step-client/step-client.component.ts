import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { getFormStatus } from '../../utils/form.operators';
import { FormService } from '../../services/form.service';
import { InvoiceStateService } from '../../services/invoice-state.service';
import { ShopUiService } from '../services/shop-ui.service';

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
        private readonly shopUiService: ShopUiService,
        private readonly invoiceState: InvoiceStateService,
        private readonly formService: FormService,
        private readonly fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.clientForm = this.setupForm();
        const { valid } = this.clientForm;

        this.shopUiService.addCommand(this.clientForm.statusChanges.pipe(getFormStatus(valid)));

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

    private setupForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }
}

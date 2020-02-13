import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith, filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { combineLatest } from 'rxjs';
import { InvoiceStateService } from '../../services/invoice-state.service';
import { ShopUiService } from '../services/shop-ui.service';

@Component({
    selector: 'app-step-client',
    templateUrl: 'step-client.component.html',
    styleUrls: ['step-client.component.scss'],
})
export class StepClientComponent implements OnInit, OnDestroy {
    public clientForm: FormGroup;

    public subscriptions = new SubSink();

    private model: {
        name: string;
        email: string;
    } = { name: '', email: '' };

    constructor(
        private readonly shopUiService: ShopUiService,
        private readonly invoiceState: InvoiceStateService,
        private readonly fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.clientForm = this.setupForm();
        this.shopUiService.addCommand(
            this.clientForm.statusChanges.pipe(
                map((value) => value !== 'INVALID'),
                startWith(this.clientForm.valid),
            ),
        );

        this.subscriptions.sink = this.invoiceState.getState().subscribe((state) => {
            const { name, email } = state;
            this.model = { name, email };
        });

        const validFormObservable = this.clientForm.statusChanges.pipe(filter((value) => value === 'VALID'));
        const submitFormObservable = combineLatest(validFormObservable, this.clientForm.valueChanges);

        this.subscriptions.sink = submitFormObservable.subscribe(console.log);
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private setupForm(): FormGroup {
        return this.fb.group({
            name: [this.model.name, Validators.required],
            email: [this.model.email, [Validators.required, Validators.email]],
        });
    }
}

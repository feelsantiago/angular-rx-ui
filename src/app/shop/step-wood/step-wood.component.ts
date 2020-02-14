import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ShopClient } from '../client/shop.client';
import { ShopUiService } from '../services/shop-ui.service';

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
        private readonly formService: FormService,
        private readonly fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.woodsForm = this.setupForm();

        this.shopUiService.dispatchLoadingEvent(true);
        this.subscriptions.sink = this.shopClient
            .getWoods()
            .pipe(tap(() => this.shopUiService.dispatchLoadingEvent(false)))
            .subscribe((values) => {
                this.woods = values;
            });
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private setupForm(): FormGroup {
        return this.fb.group({
            body: ['', Validators.required],
            neck: ['', Validators.required],
        });
    }
}

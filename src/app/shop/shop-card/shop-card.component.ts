import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { ShopUiService } from '../services/shop-ui.service';
import { ShopFormService } from '../services/shop-form.service';

@Component({
    selector: 'app-shop-card',
    templateUrl: 'shop-card.component.html',
    styleUrls: ['shop-card.component.scss'],
})
export class ShopCardComponent implements OnInit, OnDestroy {
    public stepSelected = 0;

    public steps = [false, false, false, false];

    public stepTotal = this.steps.length - 1;

    public disableButton: boolean;

    public busy = false;

    private subscriptions = new SubSink();

    constructor(private readonly shopUiService: ShopUiService, private readonly shopFormService: ShopFormService) {}

    public ngOnInit(): void {
        this.shopFormService.init();

        this.subscriptions.sink = this.shopUiService.UiEventChange$.subscribe((value) => {
            this.disableButton = !value;
        });

        this.subscriptions.sink = this.shopUiService.UiEventLoading$.subscribe((value) => {
            this.busy = value;
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.shopFormService.dispose();
    }

    public onClickNextStepHandle(): void {
        if (this.stepSelected === this.stepTotal) return;

        this.steps[this.stepSelected] = true;
        this.stepSelected = ++this.stepSelected;
    }

    public onClickPreviousStepHandle(): void {
        if (this.stepSelected === 0) return;

        this.steps[this.stepSelected - 1] = false;
        this.stepSelected = --this.stepSelected;
    }
}

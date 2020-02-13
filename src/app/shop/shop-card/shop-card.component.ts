import { Component, OnInit } from '@angular/core';
import { ShopUiService } from '../services/shop-ui.service';

@Component({
    selector: 'app-shop-card',
    templateUrl: 'shop-card.component.html',
    styleUrls: ['shop-card.component.scss'],
})
export class ShopCardComponent implements OnInit {
    public stepSelected = 0;

    public steps = [false, false, false, false];

    public stepTotal = this.steps.length - 1;

    constructor(private readonly shopUiService: ShopUiService) {}

    public ngOnInit(): void {
        this.shopUiService.UiEventChange.subscribe(console.log);
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

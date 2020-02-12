import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shop-card',
    templateUrl: 'shop-card.component.html',
    styleUrls: ['shop-card.component.scss'],
})
export class ShopCardComponent implements OnInit {
    public stepSelected = 1;

    public stepTotal = 3;

    public steps = [false, false, false];

    public ngOnInit(): void {}

    public onClickNextStepHandle(): void {
        if (this.stepSelected === this.stepTotal) return;

        this.steps[this.stepSelected - 1] = true;
        this.stepSelected = ++this.stepSelected;
    }

    public onClickPreviousStepHandle(): void {
        if (this.stepSelected === 1) return;

        this.steps[this.stepSelected - 2] = false;
        this.stepSelected = --this.stepSelected;
    }
}

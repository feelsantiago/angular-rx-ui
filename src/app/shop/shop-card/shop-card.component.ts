import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shop-card',
    templateUrl: 'shop-card.component.html',
    styleUrls: ['shop-card.component.scss'],
})
export class ShopCardComponent implements OnInit {
    public stepSelected = 0;

    public steps = [false, false, false, false];

    public stepTotal = this.steps.length - 1;

    public ngOnInit(): void {}

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

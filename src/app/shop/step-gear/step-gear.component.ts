import { Component, OnInit } from '@angular/core';
import { ShopClient } from '../client/shop.client';

@Component({
    selector: 'app-step-gear',
    templateUrl: 'step-gear.component.html',
    styleUrls: ['step-gear.component.scss'],
})
export class StepGearComponent implements OnInit {
    constructor(private readonly shopClient: ShopClient) {}

    public ngOnInit(): void {
        this.shopClient.getWoods().subscribe(console.log);
    }
}

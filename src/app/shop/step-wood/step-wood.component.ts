import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { tap } from 'rxjs/operators';
import { ShopClient } from '../client/shop.client';
import { ShopUiService } from '../services/shop-ui.service';

@Component({
    selector: 'app-step-wood',
    templateUrl: 'step-wood.component.html',
    styleUrls: ['step-wood.component.scss'],
})
export class StepWoodComponent implements OnInit, OnDestroy {
    public woods: Array<string> = [];

    public subscriptions = new SubSink();

    constructor(private readonly shopClient: ShopClient, private readonly shopUiService: ShopUiService) {}

    public ngOnInit(): void {
        this.shopUiService.dispatchLoadingEvent(true);
        this.subscriptions.sink = this.shopClient
            .getWoodTypes()
            .pipe(tap(() => this.shopUiService.dispatchLoadingEvent(false)))
            .subscribe((values) => {
                this.woods = values;
            });
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}

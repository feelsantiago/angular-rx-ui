import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { ShopUiService } from '../shop/services/shop-ui.service';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
    public disableButton: boolean;

    public busy = false;

    private readonly subscriptions = new SubSink();

    constructor(private readonly shopUiService: ShopUiService) {}

    public ngOnInit(): void {
        this.subscriptions.sink = this.shopUiService.UiEventChange$.subscribe((value) => {
            this.disableButton = !value;
        });

        this.subscriptions.sink = this.shopUiService.UiEventLoading$.subscribe((value) => {
            this.busy = value;
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onCheckout(): void {
        alert('checkout');
    }
}

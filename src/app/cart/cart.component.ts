import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { ShopUiService } from '../shop/services/shop-ui.service';
import { ShopFormService } from '../shop/services/shop-form.service';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
    public disableButton = true;

    public busy = false;

    private readonly subscriptions = new SubSink();

    constructor(private readonly shopUiService: ShopUiService, private readonly shopFormService: ShopFormService) {}

    public ngOnInit(): void {
        this.subscriptions.sink = this.shopUiService.UiEventLoading$.subscribe((value) => {
            this.busy = value;
        });

        this.subscriptions.sink = this.shopFormService.validateFormEvent$.subscribe((value) => {
            this.disableButton = !value;
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onCheckout(): void {
        alert('checkout');
    }
}

import { Component, OnInit } from '@angular/core';
import { ShopUiService } from '../shop/services/shop-ui.service';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss'],
})
export class CartComponent implements OnInit {
    public disableButton: boolean;

    constructor(private readonly shopUiService: ShopUiService) {}

    public ngOnInit(): void {
        this.shopUiService.UiEventChange.subscribe((value) => {
            this.disableButton = !value;
        });
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { StepWoodComponent } from './step-wood/step-wood.component';
import { StepGearComponent } from './step-gear/step-gear.component';
import { StepPaintComponent } from './step-paint/step-paint.component';
import { StepClientComponent } from './step-client/step-client.component';

@NgModule({
    imports: [CommonModule],
    exports: [ShopCardComponent],
    declarations: [ShopCardComponent, StepClientComponent, StepWoodComponent, StepGearComponent, StepPaintComponent],
    providers: [],
})
export class ShopModule {}

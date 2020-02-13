import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { StepWoodComponent } from './step-wood/step-wood.component';
import { StepGearComponent } from './step-gear/step-gear.component';
import { StepPaintComponent } from './step-paint/step-paint.component';
import { StepClientComponent } from './step-client/step-client.component';
import { ShopUiService } from './services/shop-ui.service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    exports: [ShopCardComponent],
    declarations: [ShopCardComponent, StepClientComponent, StepWoodComponent, StepGearComponent, StepPaintComponent],
    providers: [ShopUiService],
})
export class ShopModule {}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ShopUiService } from '../services/shop-ui.service';

@Component({
    selector: 'app-step-client',
    templateUrl: 'step-client.component.html',
    styleUrls: ['step-client.component.scss'],
})
export class StepClientComponent implements OnInit {
    public clientForm: FormGroup;

    constructor(private readonly shopUiService: ShopUiService, private readonly fb: FormBuilder) {}

    public ngOnInit(): void {
        this.clientForm = this.setupForm();
        this.shopUiService.addCommand(this.clientForm.statusChanges.pipe(map((value) => value !== 'INVALID')));
    }

    private setupForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }
}

import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { AutoCompleteModule} from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    exports: [
        InputTextModule,
        InputTextareaModule,
		ButtonModule,
		RadioButtonModule,
		SelectButtonModule,
		CheckboxModule,
		DropdownModule,
		SelectItem,
		AutoCompleteModule,
		CalendarModule,
		TableModule,
		CardModule,
		ChartModule,
		ProgressSpinnerModule
    ]
})
export class NgPrimeModule { }

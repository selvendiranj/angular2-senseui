import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CalendarServcie } from './calendar.service';

import { CalendarComponent } from './calendar.component';

@NgModule({
    declarations: [
        CalendarComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: CalendarComponent }])
    ],
    exports: [
        CalendarComponent
    ],
    providers: [
        CalendarServcie
    ]
})

export class CalendarModule
{

}

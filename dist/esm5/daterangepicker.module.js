import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DaterangepickerComponent } from './daterangepicker.component';
import { DaterangepickerDirective } from './daterangepicker.directive';
import { LOCALE_CONFIG } from './daterangepicker.config';
import { LocaleService } from './locale.service';
var NgxDaterangepickerMd = /** @class */ (function () {
    function NgxDaterangepickerMd() {
    }
    NgxDaterangepickerMd_1 = NgxDaterangepickerMd;
    NgxDaterangepickerMd.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: NgxDaterangepickerMd_1,
            providers: [
                { provide: LOCALE_CONFIG, useValue: config },
                { provide: LocaleService, useClass: LocaleService, deps: [LOCALE_CONFIG] }
            ]
        };
    };
    var NgxDaterangepickerMd_1;
    NgxDaterangepickerMd = NgxDaterangepickerMd_1 = __decorate([
        NgModule({
            declarations: [
                DaterangepickerComponent,
                DaterangepickerDirective
            ],
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [],
            exports: [
                DaterangepickerComponent,
                DaterangepickerDirective
            ],
            entryComponents: [
                DaterangepickerComponent
            ]
        })
    ], NgxDaterangepickerMd);
    return NgxDaterangepickerMd;
}());
export { NgxDaterangepickerMd };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF3QixRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXFCakQ7SUFDRTtJQUNBLENBQUM7NkJBRlUsb0JBQW9CO0lBR3hCLDRCQUFPLEdBQWQsVUFBZSxNQUF5QjtRQUF6Qix1QkFBQSxFQUFBLFdBQXlCO1FBQ3RDLE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztnQkFDM0MsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUM7YUFDMUU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFYVSxvQkFBb0I7UUFuQmhDLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDWix3QkFBd0I7Z0JBQ3hCLHdCQUF3QjthQUN6QjtZQUNELE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsbUJBQW1CO2FBQ3BCO1lBQ0QsU0FBUyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUU7Z0JBQ1Asd0JBQXdCO2dCQUN4Qix3QkFBd0I7YUFDekI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2Ysd0JBQXdCO2FBQ3pCO1NBQ0YsQ0FBQztPQUNXLG9CQUFvQixDQVloQztJQUFELDJCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IERhdGVyYW5nZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZXJhbmdlcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZXJhbmdlcGlja2VyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IExvY2FsZUNvbmZpZywgTE9DQUxFX0NPTkZJRyB9IGZyb20gJy4vZGF0ZXJhbmdlcGlja2VyLmNvbmZpZyc7XHJcbmltcG9ydCB7IExvY2FsZVNlcnZpY2UgfSBmcm9tICcuL2xvY2FsZS5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQsXHJcbiAgICBEYXRlcmFuZ2VwaWNrZXJEaXJlY3RpdmVcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQsXHJcbiAgICBEYXRlcmFuZ2VwaWNrZXJEaXJlY3RpdmVcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RGF0ZXJhbmdlcGlja2VyTWQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IExvY2FsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ3hEYXRlcmFuZ2VwaWNrZXJNZD4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE5neERhdGVyYW5nZXBpY2tlck1kLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7IHByb3ZpZGU6IExPQ0FMRV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWd9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogTG9jYWxlU2VydmljZSwgdXNlQ2xhc3M6IExvY2FsZVNlcnZpY2UsIGRlcHM6IFtMT0NBTEVfQ09ORklHXX1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19
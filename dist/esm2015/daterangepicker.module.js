var NgxDaterangepickerMd_1;
import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DaterangepickerComponent } from './daterangepicker.component';
import { DaterangepickerDirective } from './daterangepicker.directive';
import { LOCALE_CONFIG } from './daterangepicker.config';
import { LocaleService } from './locale.service';
let NgxDaterangepickerMd = NgxDaterangepickerMd_1 = class NgxDaterangepickerMd {
    constructor() {
    }
    static forRoot(config = {}) {
        return {
            ngModule: NgxDaterangepickerMd_1,
            providers: [
                { provide: LOCALE_CONFIG, useValue: config },
                { provide: LocaleService, useClass: LocaleService, deps: [LOCALE_CONFIG] }
            ]
        };
    }
};
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
export { NgxDaterangepickerMd };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBd0IsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFnQixhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFxQmpELElBQWEsb0JBQW9CLDRCQUFqQyxNQUFhLG9CQUFvQjtJQUMvQjtJQUNBLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQXVCLEVBQUU7UUFDdEMsT0FBTztZQUNMLFFBQVEsRUFBRSxzQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUMzQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBQzthQUMxRTtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQVpZLG9CQUFvQjtJQW5CaEMsUUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUFFO1lBQ1osd0JBQXdCO1lBQ3hCLHdCQUF3QjtTQUN6QjtRQUNELE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixXQUFXO1lBQ1gsbUJBQW1CO1NBQ3BCO1FBQ0QsU0FBUyxFQUFFLEVBQUU7UUFDYixPQUFPLEVBQUU7WUFDUCx3QkFBd0I7WUFDeEIsd0JBQXdCO1NBQ3pCO1FBQ0QsZUFBZSxFQUFFO1lBQ2Ysd0JBQXdCO1NBQ3pCO0tBQ0YsQ0FBQztHQUNXLG9CQUFvQixDQVloQztTQVpZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7ICBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGVyYW5nZXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRlcmFuZ2VwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RhdGVyYW5nZXBpY2tlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBMb2NhbGVDb25maWcsIExPQ0FMRV9DT05GSUcgfSBmcm9tICcuL2RhdGVyYW5nZXBpY2tlci5jb25maWcnO1xyXG5pbXBvcnQgeyBMb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbGUuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50LFxyXG4gICAgRGF0ZXJhbmdlcGlja2VyRGlyZWN0aXZlXHJcbiAgXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW10sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50LFxyXG4gICAgRGF0ZXJhbmdlcGlja2VyRGlyZWN0aXZlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIERhdGVyYW5nZXBpY2tlckNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neERhdGVyYW5nZXBpY2tlck1kIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBMb2NhbGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4RGF0ZXJhbmdlcGlja2VyTWQ+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ3hEYXRlcmFuZ2VwaWNrZXJNZCxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiBMT0NBTEVfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnfSxcclxuICAgICAgICB7IHByb3ZpZGU6IExvY2FsZVNlcnZpY2UsIHVzZUNsYXNzOiBMb2NhbGVTZXJ2aWNlLCBkZXBzOiBbTE9DQUxFX0NPTkZJR119XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==
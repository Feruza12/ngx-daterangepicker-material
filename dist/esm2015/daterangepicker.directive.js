var DaterangepickerDirective_1;
import { __decorate } from "tslib";
import { Directive, ViewContainerRef, ComponentFactoryResolver, ElementRef, HostListener, forwardRef, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges, Input, DoCheck, KeyValueDiffer, KeyValueDiffers, Output, EventEmitter, Renderer2, HostBinding } from '@angular/core';
import { DaterangepickerComponent } from './daterangepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { LocaleService } from './locale.service';
const moment = _moment;
let DaterangepickerDirective = DaterangepickerDirective_1 = class DaterangepickerDirective {
    constructor(viewContainerRef, _changeDetectorRef, _componentFactoryResolver, _el, _renderer, differs, _localeService, elementRef) {
        this.viewContainerRef = viewContainerRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._el = _el;
        this._renderer = _renderer;
        this.differs = differs;
        this._localeService = _localeService;
        this.elementRef = elementRef;
        this._onChange = Function.prototype;
        this._onTouched = Function.prototype;
        this._validatorChange = Function.prototype;
        this.dateLimit = null;
        this.showCancel = false;
        this.lockStartDate = false;
        // timepicker variables
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.closeOnAutoApply = true;
        this._locale = {};
        this._endKey = 'endDate';
        this._startKey = 'startDate';
        this.notForChangesProperty = [
            'locale',
            'endKey',
            'startKey'
        ];
        this.onChange = new EventEmitter();
        this.rangeClicked = new EventEmitter();
        this.datesUpdated = new EventEmitter();
        this.startDateChanged = new EventEmitter();
        this.endDateChanged = new EventEmitter();
        this.drops = 'down';
        this.opens = 'auto';
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(DaterangepickerComponent);
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        this.picker = componentRef.instance;
        this.picker.inline = false; // set inline to false for all directive usage
    }
    set locale(value) {
        this._locale = Object.assign(Object.assign({}, this._localeService.config), value);
    }
    get locale() {
        return this._locale;
    }
    set startKey(value) {
        if (value !== null) {
            this._startKey = value;
        }
        else {
            this._startKey = 'startDate';
        }
    }
    set endKey(value) {
        if (value !== null) {
            this._endKey = value;
        }
        else {
            this._endKey = 'endDate';
        }
    }
    get value() {
        return this._value || null;
    }
    set value(val) {
        this._value = val;
        this._onChange(val);
        this._changeDetectorRef.markForCheck();
    }
    get disabled() { return this._disabled; }
    ngOnInit() {
        this.picker.startDateChanged.asObservable().subscribe((itemChanged) => {
            this.startDateChanged.emit(itemChanged);
        });
        this.picker.endDateChanged.asObservable().subscribe((itemChanged) => {
            this.endDateChanged.emit(itemChanged);
        });
        this.picker.rangeClicked.asObservable().subscribe((range) => {
            this.rangeClicked.emit(range);
        });
        this.picker.datesUpdated.asObservable().subscribe((range) => {
            this.datesUpdated.emit(range);
        });
        this.picker.choosedDate.asObservable().subscribe((change) => {
            if (change) {
                const value = {};
                value[this._startKey] = change.startDate;
                value[this._endKey] = change.endDate;
                this.value = value;
                this.onChange.emit(value);
                if (typeof change.chosenLabel === 'string') {
                    this._el.nativeElement.value = change.chosenLabel;
                }
            }
        });
        this.picker.firstMonthDayClass = this.firstMonthDayClass;
        this.picker.lastMonthDayClass = this.lastMonthDayClass;
        this.picker.emptyWeekRowClass = this.emptyWeekRowClass;
        this.picker.emptyWeekColumnClass = this.emptyWeekColumnClass;
        this.picker.firstDayOfNextMonthClass = this.firstDayOfNextMonthClass;
        this.picker.lastDayOfPreviousMonthClass = this.lastDayOfPreviousMonthClass;
        this.picker.drops = this.drops;
        this.picker.opens = this.opens;
        this.localeDiffer = this.differs.find(this.locale).create();
        this.picker.closeOnAutoApply = this.closeOnAutoApply;
    }
    ngOnChanges(changes) {
        for (const change in changes) {
            if (changes.hasOwnProperty(change)) {
                if (this.notForChangesProperty.indexOf(change) === -1) {
                    this.picker[change] = changes[change].currentValue;
                }
            }
        }
    }
    ngDoCheck() {
        if (this.localeDiffer) {
            const changes = this.localeDiffer.diff(this.locale);
            if (changes) {
                this.picker.updateLocale(this.locale);
            }
        }
    }
    onBlur() {
        this._onTouched();
    }
    open(event) {
        if (this.disabled) {
            return;
        }
        this.picker.show(event);
        setTimeout(() => {
            this.setPosition();
        });
    }
    hide(e) {
        this.picker.hide(e);
    }
    toggle(e) {
        if (this.picker.isShown) {
            this.hide(e);
        }
        else {
            this.open(e);
        }
    }
    clear() {
        this.picker.clear();
    }
    writeValue(value) {
        this.setValue(value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(state) {
        this._disabled = state;
    }
    setValue(val) {
        if (val) {
            this.value = val;
            if (val[this._startKey]) {
                this.picker.setStartDate(val[this._startKey]);
            }
            if (val[this._endKey]) {
                this.picker.setEndDate(val[this._endKey]);
            }
            this.picker.calculateChosenLabel();
            if (this.picker.chosenLabel) {
                this._el.nativeElement.value = this.picker.chosenLabel;
            }
        }
        else {
            this.picker.clear();
        }
    }
    /**
     * Set position of the calendar
     */
    setPosition() {
        let style;
        let containerTop;
        const container = this.picker.pickerContainer.nativeElement;
        const element = this._el.nativeElement;
        if (this.drops && this.drops === 'up') {
            containerTop = (element.offsetTop - container.clientHeight) + 'px';
        }
        else {
            containerTop = 'auto';
        }
        if (this.opens === 'left') {
            style = {
                top: containerTop,
                left: (element.offsetLeft - container.clientWidth + element.clientWidth) + 'px',
                right: 'auto'
            };
        }
        else if (this.opens === 'center') {
            style = {
                top: containerTop,
                left: (element.offsetLeft + element.clientWidth / 2
                    - container.clientWidth / 2) + 'px',
                right: 'auto'
            };
        }
        else if (this.opens === 'right') {
            style = {
                top: containerTop,
                left: element.offsetLeft + 'px',
                right: 'auto'
            };
        }
        else {
            const position = element.offsetLeft + element.clientWidth / 2 - container.clientWidth / 2;
            if (position < 0) {
                style = {
                    top: containerTop,
                    left: element.offsetLeft + 'px',
                    right: 'auto'
                };
            }
            else {
                style = {
                    top: containerTop,
                    left: position + 'px',
                    right: 'auto'
                };
            }
        }
        if (style) {
            this._renderer.setStyle(container, 'top', style.top);
            this._renderer.setStyle(container, 'left', style.left);
            this._renderer.setStyle(container, 'right', style.right);
        }
    }
    inputChanged(e) {
        if (e.target.tagName.toLowerCase() !== 'input') {
            return;
        }
        if (!e.target.value.length) {
            return;
        }
        const dateString = e.target.value.split(this.picker.locale.separator);
        let start = null, end = null;
        if (dateString.length === 2) {
            start = moment(dateString[0], this.picker.locale.format);
            end = moment(dateString[1], this.picker.locale.format);
        }
        if (this.singleDatePicker || start === null || end === null) {
            start = moment(e.target.value, this.picker.locale.format);
            end = start;
        }
        if (!start.isValid() || !end.isValid()) {
            return;
        }
        this.picker.setStartDate(start);
        this.picker.setEndDate(end);
        this.picker.updateView();
    }
    /**
     * For click outside of the calendar's container
     * @param event event object
     */
    outsideClick(event) {
        if (!event.target) {
            return;
        }
        if (event.target.classList.contains('ngx-daterangepicker-action')) {
            return;
        }
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.hide();
        }
    }
};
DaterangepickerDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver },
    { type: ElementRef },
    { type: Renderer2 },
    { type: KeyValueDiffers },
    { type: LocaleService },
    { type: ElementRef }
];
__decorate([
    Input()
], DaterangepickerDirective.prototype, "minDate", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "maxDate", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "autoApply", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "alwaysShowCalendars", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "showCustomRangeLabel", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "linkedCalendars", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "dateLimit", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "singleDatePicker", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "showWeekNumbers", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "showISOWeekNumbers", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "showDropdowns", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "isInvalidDate", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "isCustomDate", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "isTooltipDate", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "showClearButton", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "customRangeDirection", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "ranges", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "opens", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "drops", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "lastMonthDayClass", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "emptyWeekRowClass", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "emptyWeekColumnClass", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "firstDayOfNextMonthClass", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "lastDayOfPreviousMonthClass", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "keepCalendarOpeningWithRange", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "showRangeLabelOnInput", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "showCancel", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "lockStartDate", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "timePicker", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "timePicker24Hour", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "timePickerIncrement", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "timePickerSeconds", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "closeOnAutoApply", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "locale", null);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "_endKey", void 0);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "startKey", null);
__decorate([
    Input()
], DaterangepickerDirective.prototype, "endKey", null);
__decorate([
    Output('change')
], DaterangepickerDirective.prototype, "onChange", void 0);
__decorate([
    Output('rangeClicked')
], DaterangepickerDirective.prototype, "rangeClicked", void 0);
__decorate([
    Output('datesUpdated')
], DaterangepickerDirective.prototype, "datesUpdated", void 0);
__decorate([
    Output()
], DaterangepickerDirective.prototype, "startDateChanged", void 0);
__decorate([
    Output()
], DaterangepickerDirective.prototype, "endDateChanged", void 0);
__decorate([
    HostBinding('disabled')
], DaterangepickerDirective.prototype, "disabled", null);
__decorate([
    HostListener('document:click', ['$event'])
], DaterangepickerDirective.prototype, "outsideClick", null);
DaterangepickerDirective = DaterangepickerDirective_1 = __decorate([
    Directive({
        selector: 'input[ngxDaterangepickerMd]',
        host: {
            '(keyup.esc)': 'hide()',
            '(blur)': 'onBlur()',
            '(click)': 'open()',
            '(keyup)': 'inputChanged($event)'
        },
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DaterangepickerDirective_1), multi: true
            }
        ]
    })
], DaterangepickerDirective);
export { DaterangepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sU0FBUyxFQUNULGFBQWEsRUFDYixLQUFLLEVBQ0wsT0FBTyxFQUNQLGNBQWMsRUFDZCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFpQnZCLElBQWEsd0JBQXdCLGdDQUFyQyxNQUFhLHdCQUF3QjtJQXVIbkMsWUFDUyxnQkFBa0MsRUFDbEMsa0JBQXFDLEVBQ3BDLHlCQUFtRCxFQUNuRCxHQUFlLEVBQ2YsU0FBb0IsRUFDcEIsT0FBd0IsRUFDeEIsY0FBNkIsRUFDN0IsVUFBc0I7UUFQdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3BDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMEI7UUFDbkQsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTdIeEIsY0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDL0IsZUFBVSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDaEMscUJBQWdCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQWlCOUMsY0FBUyxHQUFXLElBQUksQ0FBQztRQXlDekIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQix1QkFBdUI7UUFFdkIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFbEMsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBRWhDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUMxQixxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDakMsWUFBTyxHQUFpQixFQUFFLENBQUM7UUFRbkIsWUFBTyxHQUFXLFNBQVMsQ0FBQztRQUM1QixjQUFTLEdBQVcsV0FBVyxDQUFDO1FBZXhDLDBCQUFxQixHQUFrQjtZQUNyQyxRQUFRO1lBQ1IsUUFBUTtZQUNSLFVBQVU7U0FDWCxDQUFDO1FBVWdCLGFBQVEsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QyxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hELGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEUscUJBQWdCLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUQsbUJBQWMsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVlsRSxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNwQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLE1BQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxNQUFNLEdBQThCLFlBQVksQ0FBQyxRQUFTLENBQUM7UUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsOENBQThDO0lBQzVFLENBQUM7SUE1RFEsSUFBSSxNQUFNLENBQUMsS0FBSztRQUN2QixJQUFJLENBQUMsT0FBTyxtQ0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBSyxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFJUSxJQUFJLFFBQVEsQ0FBQyxLQUFLO1FBQ3pCLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBQ1EsSUFBSSxNQUFNLENBQUMsS0FBSztRQUN2QixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDdEI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQU9ELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEdBQUc7UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBTXdCLElBQUksUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFtQmxFLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQWdCLEVBQUUsRUFBRTtZQUN6RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBZ0IsRUFBRSxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUMvRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO1lBQy9ELElBQUksTUFBTSxFQUFFO2dCQUNWLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO29CQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztpQkFDbkQ7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUM7UUFDckUsSUFBSSxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUM7UUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ3ZELENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDNUIsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQztpQkFDcEQ7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN2QztTQUNGO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFXO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDLENBQUU7UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUU7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDZDthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNELGdCQUFnQixDQUFDLEVBQUU7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNELGlCQUFpQixDQUFDLEVBQUU7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELGdCQUFnQixDQUFDLEtBQWM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUNTLFFBQVEsQ0FBQyxHQUFRO1FBQ3ZCLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDL0M7WUFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUMzQztZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNuQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO2dCQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7YUFDeEQ7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFDRDs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFJLEtBQUssQ0FBQztRQUNWLElBQUksWUFBWSxDQUFDO1FBQ2pCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQztRQUM1RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDckMsWUFBWSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3BFO2FBQU07WUFDTCxZQUFZLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTtZQUN6QixLQUFLLEdBQUc7Z0JBQ0osR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSTtnQkFDL0UsS0FBSyxFQUFFLE1BQU07YUFDaEIsQ0FBQztTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNoQyxLQUFLLEdBQUc7Z0JBQ04sR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUssT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDO3NCQUMzQyxTQUFTLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUk7Z0JBQzNDLEtBQUssRUFBRSxNQUFNO2FBQ2QsQ0FBQztTQUNMO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtZQUMvQixLQUFLLEdBQUc7Z0JBQ04sR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLElBQUksRUFBRSxPQUFPLENBQUMsVUFBVSxHQUFJLElBQUk7Z0JBQ2hDLEtBQUssRUFBRSxNQUFNO2FBQ2QsQ0FBQztTQUNMO2FBQU07WUFDTCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxHQUFLLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQzVGLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtnQkFDaEIsS0FBSyxHQUFHO29CQUNOLEdBQUcsRUFBRSxZQUFZO29CQUNqQixJQUFJLEVBQUUsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJO29CQUMvQixLQUFLLEVBQUUsTUFBTTtpQkFDZCxDQUFDO2FBQ0g7aUJBQ0k7Z0JBQ0gsS0FBSyxHQUFHO29CQUNKLEdBQUcsRUFBRSxZQUFZO29CQUNqQixJQUFJLEVBQUUsUUFBUSxHQUFHLElBQUk7b0JBQ3JCLEtBQUssRUFBRSxNQUFNO2lCQUNoQixDQUFDO2FBQ0g7U0FDRjtRQUNELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBQ0QsWUFBWSxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtZQUM5QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzFCLE9BQU87U0FDUjtRQUNELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzNCLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pELEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQzNELEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN0QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRTNCLENBQUM7SUFDRDs7O09BR0c7SUFFSCxZQUFZLENBQUMsS0FBSztRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO1lBQ2pFLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBck80QixnQkFBZ0I7WUFDZCxpQkFBaUI7WUFDVCx3QkFBd0I7WUFDOUMsVUFBVTtZQUNKLFNBQVM7WUFDWCxlQUFlO1lBQ1IsYUFBYTtZQUNqQixVQUFVOztBQXRIaEM7SUFEQyxLQUFLLEVBQUU7eURBQ2U7QUFFdkI7SUFEQyxLQUFLLEVBQUU7eURBQ2U7QUFFdkI7SUFEQyxLQUFLLEVBQUU7MkRBQ1c7QUFFbkI7SUFEQyxLQUFLLEVBQUU7cUVBQ3FCO0FBRTdCO0lBREMsS0FBSyxFQUFFO3NFQUNzQjtBQUU5QjtJQURDLEtBQUssRUFBRTtpRUFDaUI7QUFFekI7SUFEQyxLQUFLLEVBQUU7MkRBQ2lCO0FBRXpCO0lBREMsS0FBSyxFQUFFO2tFQUNrQjtBQUUxQjtJQURDLEtBQUssRUFBRTtpRUFDaUI7QUFFekI7SUFEQyxLQUFLLEVBQUU7b0VBQ29CO0FBRTVCO0lBREMsS0FBSyxFQUFFOytEQUNlO0FBRXZCO0lBREMsS0FBSyxFQUFFOytEQUNnQjtBQUV4QjtJQURDLEtBQUssRUFBRTs4REFDZTtBQUV2QjtJQURDLEtBQUssRUFBRTsrREFDZ0I7QUFFeEI7SUFEQyxLQUFLLEVBQUU7aUVBQ2lCO0FBRXpCO0lBREMsS0FBSyxFQUFFO3NFQUNzQjtBQUU5QjtJQURDLEtBQUssRUFBRTt3REFDSTtBQUVaO0lBREMsS0FBSyxFQUFFO3VEQUNNO0FBRWQ7SUFEQyxLQUFLLEVBQUU7dURBQ007QUFHZDtJQURDLEtBQUssRUFBRTttRUFDa0I7QUFFMUI7SUFEQyxLQUFLLEVBQUU7bUVBQ2tCO0FBRTFCO0lBREMsS0FBSyxFQUFFO3NFQUNxQjtBQUU3QjtJQURDLEtBQUssRUFBRTswRUFDeUI7QUFFakM7SUFEQyxLQUFLLEVBQUU7NkVBQzRCO0FBRXBDO0lBREMsS0FBSyxFQUFFOzhFQUM4QjtBQUV0QztJQURDLEtBQUssRUFBRTt1RUFDdUI7QUFFL0I7SUFEQyxLQUFLLEVBQUU7NERBQ29CO0FBRTVCO0lBREMsS0FBSyxFQUFFOytEQUN1QjtBQUcvQjtJQURDLEtBQUssRUFBRTs0REFDb0I7QUFFNUI7SUFEQyxLQUFLLEVBQUU7a0VBQzBCO0FBRWxDO0lBREMsS0FBSyxFQUFFO3FFQUN3QjtBQUVoQztJQURDLEtBQUssRUFBRTttRUFDMkI7QUFDMUI7SUFBUixLQUFLLEVBQUU7a0VBQXlCO0FBRXhCO0lBQVIsS0FBSyxFQUFFO3NEQUVQO0FBS0Q7SUFEQyxLQUFLLEVBQUU7eURBQzRCO0FBRTNCO0lBQVIsS0FBSyxFQUFFO3dEQU1QO0FBQ1E7SUFBUixLQUFLLEVBQUU7c0RBTVA7QUFlaUI7SUFBakIsTUFBTSxDQUFDLFFBQVEsQ0FBQzswREFBcUQ7QUFDOUM7SUFBdkIsTUFBTSxDQUFDLGNBQWMsQ0FBQzs4REFBeUQ7QUFDeEQ7SUFBdkIsTUFBTSxDQUFDLGNBQWMsQ0FBQzs4REFBeUQ7QUFDdEU7SUFBVCxNQUFNLEVBQUU7a0VBQTZEO0FBQzVEO0lBQVQsTUFBTSxFQUFFO2dFQUEyRDtBQUMzQztJQUF4QixXQUFXLENBQUMsVUFBVSxDQUFDO3dEQUEwQztBQTBObEU7SUFEQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0REFhMUM7QUE1VlUsd0JBQXdCO0lBZnBDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw2QkFBNkI7UUFDdkMsSUFBSSxFQUFFO1lBQ0osYUFBYSxFQUFFLFFBQVE7WUFDdkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsU0FBUyxFQUFFLHNCQUFzQjtTQUNsQztRQUNELFNBQVMsRUFBRTtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQXdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSTthQUNyRTtTQUNKO0tBQ0EsQ0FBQztHQUNXLHdCQUF3QixDQTZWcEM7U0E3Vlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgRG9DaGVjayxcclxuICBLZXlWYWx1ZURpZmZlcixcclxuICBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBSZW5kZXJlcjIsXHJcbiAgSG9zdEJpbmRpbmdcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcmFuZ2VwaWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCAqIGFzIF9tb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgTG9jYWxlQ29uZmlnIH0gZnJvbSAnLi9kYXRlcmFuZ2VwaWNrZXIuY29uZmlnJztcclxuaW1wb3J0IHsgTG9jYWxlU2VydmljZSB9IGZyb20gJy4vbG9jYWxlLnNlcnZpY2UnO1xyXG5jb25zdCBtb21lbnQgPSBfbW9tZW50O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ3hEYXRlcmFuZ2VwaWNrZXJNZF0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICcoa2V5dXAuZXNjKSc6ICdoaWRlKCknLFxyXG4gICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXHJcbiAgICAnKGNsaWNrKSc6ICdvcGVuKCknLFxyXG4gICAgJyhrZXl1cCknOiAnaW5wdXRDaGFuZ2VkKCRldmVudCknXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSksIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbl1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBEb0NoZWNrIHtcclxuICBwdWJsaWMgcGlja2VyOiBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG4gIHByaXZhdGUgX3ZhbGlkYXRvckNoYW5nZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF92YWx1ZTogYW55O1xyXG4gIHByaXZhdGUgbG9jYWxlRGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47XHJcbiAgQElucHV0KClcclxuICBtaW5EYXRlOiBfbW9tZW50Lk1vbWVudFxyXG4gIEBJbnB1dCgpXHJcbiAgbWF4RGF0ZTogX21vbWVudC5Nb21lbnRcclxuICBASW5wdXQoKVxyXG4gIGF1dG9BcHBseTogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIGFsd2F5c1Nob3dDYWxlbmRhcnM6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBzaG93Q3VzdG9tUmFuZ2VMYWJlbDogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIGxpbmtlZENhbGVuZGFyczogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIGRhdGVMaW1pdDogbnVtYmVyID0gbnVsbDtcclxuICBASW5wdXQoKVxyXG4gIHNpbmdsZURhdGVQaWNrZXI6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBzaG93V2Vla051bWJlcnM6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBzaG93SVNPV2Vla051bWJlcnM6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBzaG93RHJvcGRvd25zOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpXHJcbiAgaXNJbnZhbGlkRGF0ZTogRnVuY3Rpb247XHJcbiAgQElucHV0KClcclxuICBpc0N1c3RvbURhdGU6IEZ1bmN0aW9uO1xyXG4gIEBJbnB1dCgpXHJcbiAgaXNUb29sdGlwRGF0ZTogRnVuY3Rpb247XHJcbiAgQElucHV0KClcclxuICBzaG93Q2xlYXJCdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBjdXN0b21SYW5nZURpcmVjdGlvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIHJhbmdlczogYW55O1xyXG4gIEBJbnB1dCgpXHJcbiAgb3BlbnM6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGRyb3BzOiBzdHJpbmc7XHJcbiAgZmlyc3RNb250aERheUNsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBsYXN0TW9udGhEYXlDbGFzczogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgZW1wdHlXZWVrUm93Q2xhc3M6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGVtcHR5V2Vla0NvbHVtbkNsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBmaXJzdERheU9mTmV4dE1vbnRoQ2xhc3M6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGxhc3REYXlPZlByZXZpb3VzTW9udGhDbGFzczogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAga2VlcENhbGVuZGFyT3BlbmluZ1dpdGhSYW5nZTogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIHNob3dSYW5nZUxhYmVsT25JbnB1dDogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIHNob3dDYW5jZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKVxyXG4gIGxvY2tTdGFydERhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvLyB0aW1lcGlja2VyIHZhcmlhYmxlc1xyXG4gIEBJbnB1dCgpXHJcbiAgdGltZVBpY2tlcjogQm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgdGltZVBpY2tlcjI0SG91cjogQm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgdGltZVBpY2tlckluY3JlbWVudDogbnVtYmVyID0gMTtcclxuICBASW5wdXQoKVxyXG4gIHRpbWVQaWNrZXJTZWNvbmRzOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgY2xvc2VPbkF1dG9BcHBseSA9IHRydWU7XHJcbiAgX2xvY2FsZTogTG9jYWxlQ29uZmlnID0ge307XHJcbiAgQElucHV0KCkgc2V0IGxvY2FsZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fbG9jYWxlID0gey4uLnRoaXMuX2xvY2FsZVNlcnZpY2UuY29uZmlnLCAuLi52YWx1ZX07XHJcbiAgfVxyXG4gIGdldCBsb2NhbGUoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgcHJpdmF0ZSBfZW5kS2V5OiBzdHJpbmcgPSAnZW5kRGF0ZSc7XHJcbiAgcHJpdmF0ZSBfc3RhcnRLZXk6IHN0cmluZyA9ICdzdGFydERhdGUnO1xyXG4gIEBJbnB1dCgpIHNldCBzdGFydEtleSh2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX3N0YXJ0S2V5ID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zdGFydEtleSA9ICdzdGFydERhdGUnO1xyXG4gICAgfVxyXG4gIH1cclxuICBASW5wdXQoKSBzZXQgZW5kS2V5KHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5fZW5kS2V5ID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9lbmRLZXkgPSAnZW5kRGF0ZSc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG5vdEZvckNoYW5nZXNQcm9wZXJ0eTogQXJyYXk8c3RyaW5nPiA9IFtcclxuICAgICdsb2NhbGUnLFxyXG4gICAgJ2VuZEtleScsXHJcbiAgICAnc3RhcnRLZXknXHJcbiAgXTtcclxuXHJcbiAgZ2V0IHZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlIHx8IG51bGw7XHJcbiAgfVxyXG4gIHNldCB2YWx1ZSh2YWwpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xyXG4gICAgdGhpcy5fb25DaGFuZ2UodmFsKTtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuICBAT3V0cHV0KCdjaGFuZ2UnKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgncmFuZ2VDbGlja2VkJykgcmFuZ2VDbGlja2VkOiBFdmVudEVtaXR0ZXI8T2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCdkYXRlc1VwZGF0ZWQnKSBkYXRlc1VwZGF0ZWQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBzdGFydERhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8T2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZW5kRGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBIb3N0QmluZGluZygnZGlzYWJsZWQnKSBnZXQgZGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwdWJsaWMgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgICBwcml2YXRlIF9sb2NhbGVTZXJ2aWNlOiBMb2NhbGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRyb3BzID0gJ2Rvd24nO1xyXG4gICAgdGhpcy5vcGVucyA9ICdhdXRvJztcclxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50KTtcclxuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG4gICAgdGhpcy5waWNrZXIgPSAoPERhdGVyYW5nZXBpY2tlckNvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG4gICAgdGhpcy5waWNrZXIuaW5saW5lID0gZmFsc2U7IC8vIHNldCBpbmxpbmUgdG8gZmFsc2UgZm9yIGFsbCBkaXJlY3RpdmUgdXNhZ2VcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnBpY2tlci5zdGFydERhdGVDaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoaXRlbUNoYW5nZWQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZUNoYW5nZWQuZW1pdChpdGVtQ2hhbmdlZCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucGlja2VyLmVuZERhdGVDaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoaXRlbUNoYW5nZWQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmVuZERhdGVDaGFuZ2VkLmVtaXQoaXRlbUNoYW5nZWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBpY2tlci5yYW5nZUNsaWNrZWQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChyYW5nZTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMucmFuZ2VDbGlja2VkLmVtaXQocmFuZ2UpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBpY2tlci5kYXRlc1VwZGF0ZWQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChyYW5nZTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuZGF0ZXNVcGRhdGVkLmVtaXQocmFuZ2UpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBpY2tlci5jaG9vc2VkRGF0ZS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGNoYW5nZTogYW55KSA9PiB7XHJcbiAgICAgIGlmIChjaGFuZ2UpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHt9O1xyXG4gICAgICAgIHZhbHVlW3RoaXMuX3N0YXJ0S2V5XSA9IGNoYW5nZS5zdGFydERhdGU7XHJcbiAgICAgICAgdmFsdWVbdGhpcy5fZW5kS2V5XSA9IGNoYW5nZS5lbmREYXRlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2hhbmdlLmNob3NlbkxhYmVsID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IGNoYW5nZS5jaG9zZW5MYWJlbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5waWNrZXIuZmlyc3RNb250aERheUNsYXNzID0gdGhpcy5maXJzdE1vbnRoRGF5Q2xhc3M7XHJcbiAgICB0aGlzLnBpY2tlci5sYXN0TW9udGhEYXlDbGFzcyA9IHRoaXMubGFzdE1vbnRoRGF5Q2xhc3M7XHJcbiAgICB0aGlzLnBpY2tlci5lbXB0eVdlZWtSb3dDbGFzcyA9IHRoaXMuZW1wdHlXZWVrUm93Q2xhc3M7XHJcbiAgICB0aGlzLnBpY2tlci5lbXB0eVdlZWtDb2x1bW5DbGFzcyA9IHRoaXMuZW1wdHlXZWVrQ29sdW1uQ2xhc3M7XHJcbiAgICB0aGlzLnBpY2tlci5maXJzdERheU9mTmV4dE1vbnRoQ2xhc3MgPSB0aGlzLmZpcnN0RGF5T2ZOZXh0TW9udGhDbGFzcztcclxuICAgIHRoaXMucGlja2VyLmxhc3REYXlPZlByZXZpb3VzTW9udGhDbGFzcyA9IHRoaXMubGFzdERheU9mUHJldmlvdXNNb250aENsYXNzO1xyXG4gICAgdGhpcy5waWNrZXIuZHJvcHMgPSB0aGlzLmRyb3BzO1xyXG4gICAgdGhpcy5waWNrZXIub3BlbnMgPSB0aGlzLm9wZW5zO1xyXG4gICAgdGhpcy5sb2NhbGVEaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLmxvY2FsZSkuY3JlYXRlKCk7XHJcbiAgICB0aGlzLnBpY2tlci5jbG9zZU9uQXV0b0FwcGx5ID0gdGhpcy5jbG9zZU9uQXV0b0FwcGx5O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQgIHtcclxuICAgIGZvciAoY29uc3QgY2hhbmdlIGluIGNoYW5nZXMpIHtcclxuICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoY2hhbmdlKSkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vdEZvckNoYW5nZXNQcm9wZXJ0eS5pbmRleE9mKGNoYW5nZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLnBpY2tlcltjaGFuZ2VdID0gY2hhbmdlc1tjaGFuZ2VdLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIGlmICh0aGlzLmxvY2FsZURpZmZlcikge1xyXG4gICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5sb2NhbGVEaWZmZXIuZGlmZih0aGlzLmxvY2FsZSk7XHJcbiAgICAgIGlmIChjaGFuZ2VzKSB7XHJcbiAgICAgICAgdGhpcy5waWNrZXIudXBkYXRlTG9jYWxlKHRoaXMubG9jYWxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBvcGVuKGV2ZW50PzogYW55KSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnBpY2tlci5zaG93KGV2ZW50KTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhpZGUoZT8pIHtcclxuICAgIHRoaXMucGlja2VyLmhpZGUoZSk7XHJcbiAgfVxyXG4gIHRvZ2dsZShlPykge1xyXG4gICAgaWYgKHRoaXMucGlja2VyLmlzU2hvd24pIHtcclxuICAgICAgdGhpcy5oaWRlKGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcGVuKGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnBpY2tlci5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcclxuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XHJcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShzdGF0ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSBzdGF0ZTtcclxufVxyXG4gIHByaXZhdGUgc2V0VmFsdWUodmFsOiBhbnkpIHtcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcclxuICAgICAgaWYgKHZhbFt0aGlzLl9zdGFydEtleV0pIHtcclxuICAgICAgICB0aGlzLnBpY2tlci5zZXRTdGFydERhdGUodmFsW3RoaXMuX3N0YXJ0S2V5XSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZhbFt0aGlzLl9lbmRLZXldKSB7XHJcbiAgICAgICAgdGhpcy5waWNrZXIuc2V0RW5kRGF0ZSh2YWxbdGhpcy5fZW5kS2V5XSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5waWNrZXIuY2FsY3VsYXRlQ2hvc2VuTGFiZWwoKTtcclxuICAgICAgaWYgKHRoaXMucGlja2VyLmNob3NlbkxhYmVsKSB7XHJcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMucGlja2VyLmNob3NlbkxhYmVsO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBpY2tlci5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBTZXQgcG9zaXRpb24gb2YgdGhlIGNhbGVuZGFyXHJcbiAgICovXHJcbiAgc2V0UG9zaXRpb24oKSB7XHJcbiAgICBsZXQgc3R5bGU7XHJcbiAgICBsZXQgY29udGFpbmVyVG9wO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5waWNrZXIucGlja2VyQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcclxuICAgIGlmICh0aGlzLmRyb3BzICYmIHRoaXMuZHJvcHMgPT09ICd1cCcpIHtcclxuICAgICAgY29udGFpbmVyVG9wID0gKGVsZW1lbnQub2Zmc2V0VG9wIC0gY29udGFpbmVyLmNsaWVudEhlaWdodCkgKyAncHgnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29udGFpbmVyVG9wID0gJ2F1dG8nO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3BlbnMgPT09ICdsZWZ0Jykge1xyXG4gICAgICBzdHlsZSA9IHtcclxuICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wLFxyXG4gICAgICAgICAgbGVmdDogKGVsZW1lbnQub2Zmc2V0TGVmdCAtIGNvbnRhaW5lci5jbGllbnRXaWR0aCArIGVsZW1lbnQuY2xpZW50V2lkdGgpICsgJ3B4JyxcclxuICAgICAgICAgIHJpZ2h0OiAnYXV0bydcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vcGVucyA9PT0gJ2NlbnRlcicpIHtcclxuICAgICAgICBzdHlsZSA9IHtcclxuICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wLFxyXG4gICAgICAgICAgbGVmdDogKGVsZW1lbnQub2Zmc2V0TGVmdCAgKyAgZWxlbWVudC5jbGllbnRXaWR0aCAvIDJcclxuICAgICAgICAgICAgICAgICAgLSBjb250YWluZXIuY2xpZW50V2lkdGggLyAyKSArICdweCcsXHJcbiAgICAgICAgICByaWdodDogJ2F1dG8nXHJcbiAgICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vcGVucyA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgIHN0eWxlID0ge1xyXG4gICAgICAgICAgdG9wOiBjb250YWluZXJUb3AsXHJcbiAgICAgICAgICBsZWZ0OiBlbGVtZW50Lm9mZnNldExlZnQgICsgJ3B4JyxcclxuICAgICAgICAgIHJpZ2h0OiAnYXV0bydcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcG9zaXRpb24gPSBlbGVtZW50Lm9mZnNldExlZnQgICsgIGVsZW1lbnQuY2xpZW50V2lkdGggLyAyIC0gY29udGFpbmVyLmNsaWVudFdpZHRoIC8gMjtcclxuICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xyXG4gICAgICAgIHN0eWxlID0ge1xyXG4gICAgICAgICAgdG9wOiBjb250YWluZXJUb3AsXHJcbiAgICAgICAgICBsZWZ0OiBlbGVtZW50Lm9mZnNldExlZnQgKyAncHgnLFxyXG4gICAgICAgICAgcmlnaHQ6ICdhdXRvJ1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiBwb3NpdGlvbiArICdweCcsXHJcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bydcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc3R5bGUpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAndG9wJywgc3R5bGUudG9wKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAnbGVmdCcsIHN0eWxlLmxlZnQpO1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICdyaWdodCcsIHN0eWxlLnJpZ2h0KTtcclxuICAgIH1cclxuICB9XHJcbiAgaW5wdXRDaGFuZ2VkKGUpIHtcclxuICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdpbnB1dCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFlLnRhcmdldC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IGUudGFyZ2V0LnZhbHVlLnNwbGl0KHRoaXMucGlja2VyLmxvY2FsZS5zZXBhcmF0b3IpO1xyXG4gICAgbGV0IHN0YXJ0ID0gbnVsbCwgZW5kID0gbnVsbDtcclxuICAgIGlmIChkYXRlU3RyaW5nLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICBzdGFydCA9IG1vbWVudChkYXRlU3RyaW5nWzBdLCB0aGlzLnBpY2tlci5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgZW5kID0gbW9tZW50KGRhdGVTdHJpbmdbMV0sIHRoaXMucGlja2VyLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlciB8fCBzdGFydCA9PT0gbnVsbCB8fCBlbmQgPT09IG51bGwpIHtcclxuICAgICAgc3RhcnQgPSBtb21lbnQoZS50YXJnZXQudmFsdWUsIHRoaXMucGlja2VyLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgICBlbmQgPSBzdGFydDtcclxuICAgIH1cclxuICAgIGlmICghc3RhcnQuaXNWYWxpZCgpIHx8ICFlbmQuaXNWYWxpZCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucGlja2VyLnNldFN0YXJ0RGF0ZShzdGFydCk7XHJcbiAgICB0aGlzLnBpY2tlci5zZXRFbmREYXRlKGVuZCk7XHJcbiAgICB0aGlzLnBpY2tlci51cGRhdGVWaWV3KCk7XHJcblxyXG4gIH1cclxuICAvKipcclxuICAgKiBGb3IgY2xpY2sgb3V0c2lkZSBvZiB0aGUgY2FsZW5kYXIncyBjb250YWluZXJcclxuICAgKiBAcGFyYW0gZXZlbnQgZXZlbnQgb2JqZWN0XHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gIG91dHNpZGVDbGljayhldmVudCk6IHZvaWQge1xyXG4gICAgaWYgKCFldmVudC50YXJnZXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZ3gtZGF0ZXJhbmdlcGlja2VyLWFjdGlvbicpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
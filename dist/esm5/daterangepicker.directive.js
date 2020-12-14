import { __assign, __decorate } from "tslib";
import { Directive, ViewContainerRef, ComponentFactoryResolver, ElementRef, HostListener, forwardRef, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges, Input, DoCheck, KeyValueDiffer, KeyValueDiffers, Output, EventEmitter, Renderer2, HostBinding } from '@angular/core';
import { DaterangepickerComponent } from './daterangepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { LocaleService } from './locale.service';
var moment = _moment;
var DaterangepickerDirective = /** @class */ (function () {
    function DaterangepickerDirective(viewContainerRef, _changeDetectorRef, _componentFactoryResolver, _el, _renderer, differs, _localeService, elementRef) {
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
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(DaterangepickerComponent);
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        this.picker = componentRef.instance;
        this.picker.inline = false; // set inline to false for all directive usage
    }
    DaterangepickerDirective_1 = DaterangepickerDirective;
    Object.defineProperty(DaterangepickerDirective.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (value) {
            this._locale = __assign(__assign({}, this._localeService.config), value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaterangepickerDirective.prototype, "startKey", {
        set: function (value) {
            if (value !== null) {
                this._startKey = value;
            }
            else {
                this._startKey = 'startDate';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaterangepickerDirective.prototype, "endKey", {
        set: function (value) {
            if (value !== null) {
                this._endKey = value;
            }
            else {
                this._endKey = 'endDate';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaterangepickerDirective.prototype, "value", {
        get: function () {
            return this._value || null;
        },
        set: function (val) {
            this._value = val;
            this._onChange(val);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaterangepickerDirective.prototype, "disabled", {
        get: function () { return this._disabled; },
        enumerable: true,
        configurable: true
    });
    DaterangepickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.picker.startDateChanged.asObservable().subscribe(function (itemChanged) {
            _this.startDateChanged.emit(itemChanged);
        });
        this.picker.endDateChanged.asObservable().subscribe(function (itemChanged) {
            _this.endDateChanged.emit(itemChanged);
        });
        this.picker.rangeClicked.asObservable().subscribe(function (range) {
            _this.rangeClicked.emit(range);
        });
        this.picker.datesUpdated.asObservable().subscribe(function (range) {
            _this.datesUpdated.emit(range);
        });
        this.picker.choosedDate.asObservable().subscribe(function (change) {
            if (change) {
                var value = {};
                value[_this._startKey] = change.startDate;
                value[_this._endKey] = change.endDate;
                _this.value = value;
                _this.onChange.emit(value);
                if (typeof change.chosenLabel === 'string') {
                    _this._el.nativeElement.value = change.chosenLabel;
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
    };
    DaterangepickerDirective.prototype.ngOnChanges = function (changes) {
        for (var change in changes) {
            if (changes.hasOwnProperty(change)) {
                if (this.notForChangesProperty.indexOf(change) === -1) {
                    this.picker[change] = changes[change].currentValue;
                }
            }
        }
    };
    DaterangepickerDirective.prototype.ngDoCheck = function () {
        if (this.localeDiffer) {
            var changes = this.localeDiffer.diff(this.locale);
            if (changes) {
                this.picker.updateLocale(this.locale);
            }
        }
    };
    DaterangepickerDirective.prototype.onBlur = function () {
        this._onTouched();
    };
    DaterangepickerDirective.prototype.open = function (event) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.picker.show(event);
        setTimeout(function () {
            _this.setPosition();
        });
    };
    DaterangepickerDirective.prototype.hide = function (e) {
        this.picker.hide(e);
    };
    DaterangepickerDirective.prototype.toggle = function (e) {
        if (this.picker.isShown) {
            this.hide(e);
        }
        else {
            this.open(e);
        }
    };
    DaterangepickerDirective.prototype.clear = function () {
        this.picker.clear();
    };
    DaterangepickerDirective.prototype.writeValue = function (value) {
        this.setValue(value);
    };
    DaterangepickerDirective.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    DaterangepickerDirective.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    DaterangepickerDirective.prototype.setDisabledState = function (state) {
        this._disabled = state;
    };
    DaterangepickerDirective.prototype.setValue = function (val) {
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
    };
    /**
     * Set position of the calendar
     */
    DaterangepickerDirective.prototype.setPosition = function () {
        var style;
        var containerTop;
        var container = this.picker.pickerContainer.nativeElement;
        var element = this._el.nativeElement;
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
            var position = element.offsetLeft + element.clientWidth / 2 - container.clientWidth / 2;
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
    };
    DaterangepickerDirective.prototype.inputChanged = function (e) {
        if (e.target.tagName.toLowerCase() !== 'input') {
            return;
        }
        if (!e.target.value.length) {
            return;
        }
        var dateString = e.target.value.split(this.picker.locale.separator);
        var start = null, end = null;
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
    };
    /**
     * For click outside of the calendar's container
     * @param event event object
     */
    DaterangepickerDirective.prototype.outsideClick = function (event) {
        if (!event.target) {
            return;
        }
        if (event.target.classList.contains('ngx-daterangepicker-action')) {
            return;
        }
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.hide();
        }
    };
    var DaterangepickerDirective_1;
    DaterangepickerDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ChangeDetectorRef },
        { type: ComponentFactoryResolver },
        { type: ElementRef },
        { type: Renderer2 },
        { type: KeyValueDiffers },
        { type: LocaleService },
        { type: ElementRef }
    ]; };
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
                    useExisting: forwardRef(function () { return DaterangepickerDirective_1; }), multi: true
                }
            ]
        })
    ], DaterangepickerDirective);
    return DaterangepickerDirective;
}());
export { DaterangepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixTQUFTLEVBQ1QsYUFBYSxFQUNiLEtBQUssRUFDTCxPQUFPLEVBQ1AsY0FBYyxFQUNkLGVBQWUsRUFDZixNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQWlCdkI7SUF1SEUsa0NBQ1MsZ0JBQWtDLEVBQ2xDLGtCQUFxQyxFQUNwQyx5QkFBbUQsRUFDbkQsR0FBZSxFQUNmLFNBQW9CLEVBQ3BCLE9BQXdCLEVBQ3hCLGNBQTZCLEVBQzdCLFVBQXNCO1FBUHZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNwQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTBCO1FBQ25ELFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FB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QUF3QjtRQWZwQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLElBQUksRUFBRTtnQkFDSixhQUFhLEVBQUUsUUFBUTtnQkFDdkIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFNBQVMsRUFBRSxRQUFRO2dCQUNuQixTQUFTLEVBQUUsc0JBQXNCO2FBQ2xDO1lBQ0QsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLDBCQUF3QixFQUF4QixDQUF3QixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUk7aUJBQ3JFO2FBQ0o7U0FDQSxDQUFDO09BQ1csd0JBQXdCLENBNlZwQztJQUFELCtCQUFDO0NBQUEsQUE3VkQsSUE2VkM7U0E3Vlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgRG9DaGVjayxcclxuICBLZXlWYWx1ZURpZmZlcixcclxuICBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBSZW5kZXJlcjIsXHJcbiAgSG9zdEJpbmRpbmdcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcmFuZ2VwaWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCAqIGFzIF9tb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgTG9jYWxlQ29uZmlnIH0gZnJvbSAnLi9kYXRlcmFuZ2VwaWNrZXIuY29uZmlnJztcclxuaW1wb3J0IHsgTG9jYWxlU2VydmljZSB9IGZyb20gJy4vbG9jYWxlLnNlcnZpY2UnO1xyXG5jb25zdCBtb21lbnQgPSBfbW9tZW50O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ3hEYXRlcmFuZ2VwaWNrZXJNZF0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICcoa2V5dXAuZXNjKSc6ICdoaWRlKCknLFxyXG4gICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXHJcbiAgICAnKGNsaWNrKSc6ICdvcGVuKCknLFxyXG4gICAgJyhrZXl1cCknOiAnaW5wdXRDaGFuZ2VkKCRldmVudCknXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSksIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbl1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBEb0NoZWNrIHtcclxuICBwdWJsaWMgcGlja2VyOiBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG4gIHByaXZhdGUgX3ZhbGlkYXRvckNoYW5nZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF92YWx1ZTogYW55O1xyXG4gIHByaXZhdGUgbG9jYWxlRGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47XHJcbiAgQElucHV0KClcclxuICBtaW5EYXRlOiBfbW9tZW50Lk1vbWVudFxyXG4gIEBJbnB1dCgpXHJcbiAgbWF4RGF0ZTogX21vbWVudC5Nb21lbnRcclxuICBASW5wdXQoKVxyXG4gIGF1dG9BcHBseTogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIGFsd2F5c1Nob3dDYWxlbmRhcnM6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBzaG93Q3VzdG9tUmFuZ2VMYWJlbDogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIGxpbmtlZENhbGVuZGFyczogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIGRhdGVMaW1pdDogbnVtYmVyID0gbnVsbDtcclxuICBASW5wdXQoKVxyXG4gIHNpbmdsZURhdGVQaWNrZXI6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBzaG93V2Vla051bWJlcnM6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBzaG93SVNPV2Vla051bWJlcnM6IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBzaG93RHJvcGRvd25zOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpXHJcbiAgaXNJbnZhbGlkRGF0ZTogRnVuY3Rpb247XHJcbiAgQElucHV0KClcclxuICBpc0N1c3RvbURhdGU6IEZ1bmN0aW9uO1xyXG4gIEBJbnB1dCgpXHJcbiAgaXNUb29sdGlwRGF0ZTogRnVuY3Rpb247XHJcbiAgQElucHV0KClcclxuICBzaG93Q2xlYXJCdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KClcclxuICBjdXN0b21SYW5nZURpcmVjdGlvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIHJhbmdlczogYW55O1xyXG4gIEBJbnB1dCgpXHJcbiAgb3BlbnM6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGRyb3BzOiBzdHJpbmc7XHJcbiAgZmlyc3RNb250aERheUNsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBsYXN0TW9udGhEYXlDbGFzczogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgZW1wdHlXZWVrUm93Q2xhc3M6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGVtcHR5V2Vla0NvbHVtbkNsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBmaXJzdERheU9mTmV4dE1vbnRoQ2xhc3M6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGxhc3REYXlPZlByZXZpb3VzTW9udGhDbGFzczogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAga2VlcENhbGVuZGFyT3BlbmluZ1dpdGhSYW5nZTogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIHNob3dSYW5nZUxhYmVsT25JbnB1dDogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIHNob3dDYW5jZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKVxyXG4gIGxvY2tTdGFydERhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvLyB0aW1lcGlja2VyIHZhcmlhYmxlc1xyXG4gIEBJbnB1dCgpXHJcbiAgdGltZVBpY2tlcjogQm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgdGltZVBpY2tlcjI0SG91cjogQm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgdGltZVBpY2tlckluY3JlbWVudDogbnVtYmVyID0gMTtcclxuICBASW5wdXQoKVxyXG4gIHRpbWVQaWNrZXJTZWNvbmRzOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgY2xvc2VPbkF1dG9BcHBseSA9IHRydWU7XHJcbiAgX2xvY2FsZTogTG9jYWxlQ29uZmlnID0ge307XHJcbiAgQElucHV0KCkgc2V0IGxvY2FsZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fbG9jYWxlID0gey4uLnRoaXMuX2xvY2FsZVNlcnZpY2UuY29uZmlnLCAuLi52YWx1ZX07XHJcbiAgfVxyXG4gIGdldCBsb2NhbGUoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgcHJpdmF0ZSBfZW5kS2V5OiBzdHJpbmcgPSAnZW5kRGF0ZSc7XHJcbiAgcHJpdmF0ZSBfc3RhcnRLZXk6IHN0cmluZyA9ICdzdGFydERhdGUnO1xyXG4gIEBJbnB1dCgpIHNldCBzdGFydEtleSh2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX3N0YXJ0S2V5ID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zdGFydEtleSA9ICdzdGFydERhdGUnO1xyXG4gICAgfVxyXG4gIH1cclxuICBASW5wdXQoKSBzZXQgZW5kS2V5KHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5fZW5kS2V5ID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9lbmRLZXkgPSAnZW5kRGF0ZSc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG5vdEZvckNoYW5nZXNQcm9wZXJ0eTogQXJyYXk8c3RyaW5nPiA9IFtcclxuICAgICdsb2NhbGUnLFxyXG4gICAgJ2VuZEtleScsXHJcbiAgICAnc3RhcnRLZXknXHJcbiAgXTtcclxuXHJcbiAgZ2V0IHZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlIHx8IG51bGw7XHJcbiAgfVxyXG4gIHNldCB2YWx1ZSh2YWwpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xyXG4gICAgdGhpcy5fb25DaGFuZ2UodmFsKTtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuICBAT3V0cHV0KCdjaGFuZ2UnKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgncmFuZ2VDbGlja2VkJykgcmFuZ2VDbGlja2VkOiBFdmVudEVtaXR0ZXI8T2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCdkYXRlc1VwZGF0ZWQnKSBkYXRlc1VwZGF0ZWQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBzdGFydERhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8T2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZW5kRGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBIb3N0QmluZGluZygnZGlzYWJsZWQnKSBnZXQgZGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwdWJsaWMgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgICBwcml2YXRlIF9sb2NhbGVTZXJ2aWNlOiBMb2NhbGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRyb3BzID0gJ2Rvd24nO1xyXG4gICAgdGhpcy5vcGVucyA9ICdhdXRvJztcclxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50KTtcclxuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG4gICAgdGhpcy5waWNrZXIgPSAoPERhdGVyYW5nZXBpY2tlckNvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG4gICAgdGhpcy5waWNrZXIuaW5saW5lID0gZmFsc2U7IC8vIHNldCBpbmxpbmUgdG8gZmFsc2UgZm9yIGFsbCBkaXJlY3RpdmUgdXNhZ2VcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnBpY2tlci5zdGFydERhdGVDaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoaXRlbUNoYW5nZWQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZUNoYW5nZWQuZW1pdChpdGVtQ2hhbmdlZCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucGlja2VyLmVuZERhdGVDaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoaXRlbUNoYW5nZWQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmVuZERhdGVDaGFuZ2VkLmVtaXQoaXRlbUNoYW5nZWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBpY2tlci5yYW5nZUNsaWNrZWQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChyYW5nZTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMucmFuZ2VDbGlja2VkLmVtaXQocmFuZ2UpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBpY2tlci5kYXRlc1VwZGF0ZWQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChyYW5nZTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuZGF0ZXNVcGRhdGVkLmVtaXQocmFuZ2UpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBpY2tlci5jaG9vc2VkRGF0ZS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGNoYW5nZTogYW55KSA9PiB7XHJcbiAgICAgIGlmIChjaGFuZ2UpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHt9O1xyXG4gICAgICAgIHZhbHVlW3RoaXMuX3N0YXJ0S2V5XSA9IGNoYW5nZS5zdGFydERhdGU7XHJcbiAgICAgICAgdmFsdWVbdGhpcy5fZW5kS2V5XSA9IGNoYW5nZS5lbmREYXRlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2hhbmdlLmNob3NlbkxhYmVsID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IGNoYW5nZS5jaG9zZW5MYWJlbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5waWNrZXIuZmlyc3RNb250aERheUNsYXNzID0gdGhpcy5maXJzdE1vbnRoRGF5Q2xhc3M7XHJcbiAgICB0aGlzLnBpY2tlci5sYXN0TW9udGhEYXlDbGFzcyA9IHRoaXMubGFzdE1vbnRoRGF5Q2xhc3M7XHJcbiAgICB0aGlzLnBpY2tlci5lbXB0eVdlZWtSb3dDbGFzcyA9IHRoaXMuZW1wdHlXZWVrUm93Q2xhc3M7XHJcbiAgICB0aGlzLnBpY2tlci5lbXB0eVdlZWtDb2x1bW5DbGFzcyA9IHRoaXMuZW1wdHlXZWVrQ29sdW1uQ2xhc3M7XHJcbiAgICB0aGlzLnBpY2tlci5maXJzdERheU9mTmV4dE1vbnRoQ2xhc3MgPSB0aGlzLmZpcnN0RGF5T2ZOZXh0TW9udGhDbGFzcztcclxuICAgIHRoaXMucGlja2VyLmxhc3REYXlPZlByZXZpb3VzTW9udGhDbGFzcyA9IHRoaXMubGFzdERheU9mUHJldmlvdXNNb250aENsYXNzO1xyXG4gICAgdGhpcy5waWNrZXIuZHJvcHMgPSB0aGlzLmRyb3BzO1xyXG4gICAgdGhpcy5waWNrZXIub3BlbnMgPSB0aGlzLm9wZW5zO1xyXG4gICAgdGhpcy5sb2NhbGVEaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLmxvY2FsZSkuY3JlYXRlKCk7XHJcbiAgICB0aGlzLnBpY2tlci5jbG9zZU9uQXV0b0FwcGx5ID0gdGhpcy5jbG9zZU9uQXV0b0FwcGx5O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQgIHtcclxuICAgIGZvciAoY29uc3QgY2hhbmdlIGluIGNoYW5nZXMpIHtcclxuICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoY2hhbmdlKSkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vdEZvckNoYW5nZXNQcm9wZXJ0eS5pbmRleE9mKGNoYW5nZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLnBpY2tlcltjaGFuZ2VdID0gY2hhbmdlc1tjaGFuZ2VdLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIGlmICh0aGlzLmxvY2FsZURpZmZlcikge1xyXG4gICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5sb2NhbGVEaWZmZXIuZGlmZih0aGlzLmxvY2FsZSk7XHJcbiAgICAgIGlmIChjaGFuZ2VzKSB7XHJcbiAgICAgICAgdGhpcy5waWNrZXIudXBkYXRlTG9jYWxlKHRoaXMubG9jYWxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25CbHVyKCkge1xyXG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBvcGVuKGV2ZW50PzogYW55KSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnBpY2tlci5zaG93KGV2ZW50KTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhpZGUoZT8pIHtcclxuICAgIHRoaXMucGlja2VyLmhpZGUoZSk7XHJcbiAgfVxyXG4gIHRvZ2dsZShlPykge1xyXG4gICAgaWYgKHRoaXMucGlja2VyLmlzU2hvd24pIHtcclxuICAgICAgdGhpcy5oaWRlKGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcGVuKGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnBpY2tlci5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcclxuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XHJcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShzdGF0ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSBzdGF0ZTtcclxufVxyXG4gIHByaXZhdGUgc2V0VmFsdWUodmFsOiBhbnkpIHtcclxuICAgIGlmICh2YWwpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcclxuICAgICAgaWYgKHZhbFt0aGlzLl9zdGFydEtleV0pIHtcclxuICAgICAgICB0aGlzLnBpY2tlci5zZXRTdGFydERhdGUodmFsW3RoaXMuX3N0YXJ0S2V5XSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZhbFt0aGlzLl9lbmRLZXldKSB7XHJcbiAgICAgICAgdGhpcy5waWNrZXIuc2V0RW5kRGF0ZSh2YWxbdGhpcy5fZW5kS2V5XSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5waWNrZXIuY2FsY3VsYXRlQ2hvc2VuTGFiZWwoKTtcclxuICAgICAgaWYgKHRoaXMucGlja2VyLmNob3NlbkxhYmVsKSB7XHJcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMucGlja2VyLmNob3NlbkxhYmVsO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBpY2tlci5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBTZXQgcG9zaXRpb24gb2YgdGhlIGNhbGVuZGFyXHJcbiAgICovXHJcbiAgc2V0UG9zaXRpb24oKSB7XHJcbiAgICBsZXQgc3R5bGU7XHJcbiAgICBsZXQgY29udGFpbmVyVG9wO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5waWNrZXIucGlja2VyQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcclxuICAgIGlmICh0aGlzLmRyb3BzICYmIHRoaXMuZHJvcHMgPT09ICd1cCcpIHtcclxuICAgICAgY29udGFpbmVyVG9wID0gKGVsZW1lbnQub2Zmc2V0VG9wIC0gY29udGFpbmVyLmNsaWVudEhlaWdodCkgKyAncHgnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29udGFpbmVyVG9wID0gJ2F1dG8nO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3BlbnMgPT09ICdsZWZ0Jykge1xyXG4gICAgICBzdHlsZSA9IHtcclxuICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wLFxyXG4gICAgICAgICAgbGVmdDogKGVsZW1lbnQub2Zmc2V0TGVmdCAtIGNvbnRhaW5lci5jbGllbnRXaWR0aCArIGVsZW1lbnQuY2xpZW50V2lkdGgpICsgJ3B4JyxcclxuICAgICAgICAgIHJpZ2h0OiAnYXV0bydcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vcGVucyA9PT0gJ2NlbnRlcicpIHtcclxuICAgICAgICBzdHlsZSA9IHtcclxuICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wLFxyXG4gICAgICAgICAgbGVmdDogKGVsZW1lbnQub2Zmc2V0TGVmdCAgKyAgZWxlbWVudC5jbGllbnRXaWR0aCAvIDJcclxuICAgICAgICAgICAgICAgICAgLSBjb250YWluZXIuY2xpZW50V2lkdGggLyAyKSArICdweCcsXHJcbiAgICAgICAgICByaWdodDogJ2F1dG8nXHJcbiAgICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vcGVucyA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgIHN0eWxlID0ge1xyXG4gICAgICAgICAgdG9wOiBjb250YWluZXJUb3AsXHJcbiAgICAgICAgICBsZWZ0OiBlbGVtZW50Lm9mZnNldExlZnQgICsgJ3B4JyxcclxuICAgICAgICAgIHJpZ2h0OiAnYXV0bydcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcG9zaXRpb24gPSBlbGVtZW50Lm9mZnNldExlZnQgICsgIGVsZW1lbnQuY2xpZW50V2lkdGggLyAyIC0gY29udGFpbmVyLmNsaWVudFdpZHRoIC8gMjtcclxuICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xyXG4gICAgICAgIHN0eWxlID0ge1xyXG4gICAgICAgICAgdG9wOiBjb250YWluZXJUb3AsXHJcbiAgICAgICAgICBsZWZ0OiBlbGVtZW50Lm9mZnNldExlZnQgKyAncHgnLFxyXG4gICAgICAgICAgcmlnaHQ6ICdhdXRvJ1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHRvcDogY29udGFpbmVyVG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiBwb3NpdGlvbiArICdweCcsXHJcbiAgICAgICAgICAgIHJpZ2h0OiAnYXV0bydcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc3R5bGUpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAndG9wJywgc3R5bGUudG9wKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAnbGVmdCcsIHN0eWxlLmxlZnQpO1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShjb250YWluZXIsICdyaWdodCcsIHN0eWxlLnJpZ2h0KTtcclxuICAgIH1cclxuICB9XHJcbiAgaW5wdXRDaGFuZ2VkKGUpIHtcclxuICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdpbnB1dCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFlLnRhcmdldC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IGUudGFyZ2V0LnZhbHVlLnNwbGl0KHRoaXMucGlja2VyLmxvY2FsZS5zZXBhcmF0b3IpO1xyXG4gICAgbGV0IHN0YXJ0ID0gbnVsbCwgZW5kID0gbnVsbDtcclxuICAgIGlmIChkYXRlU3RyaW5nLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICBzdGFydCA9IG1vbWVudChkYXRlU3RyaW5nWzBdLCB0aGlzLnBpY2tlci5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgZW5kID0gbW9tZW50KGRhdGVTdHJpbmdbMV0sIHRoaXMucGlja2VyLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlciB8fCBzdGFydCA9PT0gbnVsbCB8fCBlbmQgPT09IG51bGwpIHtcclxuICAgICAgc3RhcnQgPSBtb21lbnQoZS50YXJnZXQudmFsdWUsIHRoaXMucGlja2VyLmxvY2FsZS5mb3JtYXQpO1xyXG4gICAgICBlbmQgPSBzdGFydDtcclxuICAgIH1cclxuICAgIGlmICghc3RhcnQuaXNWYWxpZCgpIHx8ICFlbmQuaXNWYWxpZCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucGlja2VyLnNldFN0YXJ0RGF0ZShzdGFydCk7XHJcbiAgICB0aGlzLnBpY2tlci5zZXRFbmREYXRlKGVuZCk7XHJcbiAgICB0aGlzLnBpY2tlci51cGRhdGVWaWV3KCk7XHJcblxyXG4gIH1cclxuICAvKipcclxuICAgKiBGb3IgY2xpY2sgb3V0c2lkZSBvZiB0aGUgY2FsZW5kYXIncyBjb250YWluZXJcclxuICAgKiBAcGFyYW0gZXZlbnQgZXZlbnQgb2JqZWN0XHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gIG91dHNpZGVDbGljayhldmVudCk6IHZvaWQge1xyXG4gICAgaWYgKCFldmVudC50YXJnZXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZ3gtZGF0ZXJhbmdlcGlja2VyLWFjdGlvbicpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
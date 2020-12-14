import { __assign, __decorate, __read, __spread } from "tslib";
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { LocaleService } from './locale.service';
var moment = _moment;
export var SideEnum;
(function (SideEnum) {
    SideEnum["left"] = "left";
    SideEnum["right"] = "right";
})(SideEnum || (SideEnum = {}));
var DaterangepickerComponent = /** @class */ (function () {
    function DaterangepickerComponent(el, _ref, _localeService) {
        this.el = el;
        this._ref = _ref;
        this._localeService = _localeService;
        this._old = { start: null, end: null };
        this.calendarVariables = { left: {}, right: {} };
        this.tooltiptext = []; // for storing tooltiptext
        this.timepickerVariables = { left: {}, right: {} };
        this.daterangepicker = { start: new FormControl(), end: new FormControl() };
        this.applyBtn = { disabled: false };
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.dateLimit = null;
        // used in template for compile time support of enum values.
        this.sideEnum = SideEnum;
        this.minDate = null;
        this.maxDate = null;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.showISOWeekNumbers = false;
        this.linkedCalendars = false;
        this.autoUpdateInput = true;
        this.alwaysShowCalendars = false;
        this.maxSpan = false;
        this.lockStartDate = false;
        // timepicker variables
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        // end of timepicker variables
        this.showClearButton = false;
        this.firstMonthDayClass = null;
        this.lastMonthDayClass = null;
        this.emptyWeekRowClass = null;
        this.emptyWeekColumnClass = null;
        this.firstDayOfNextMonthClass = null;
        this.lastDayOfPreviousMonthClass = null;
        this._locale = {};
        // custom ranges
        this._ranges = {};
        this.showCancel = false;
        this.keepCalendarOpeningWithRange = false;
        this.showRangeLabelOnInput = false;
        this.customRangeDirection = false;
        this.rangesArray = [];
        // some state information
        this.isShown = false;
        this.inline = true;
        this.leftCalendar = {};
        this.rightCalendar = {};
        this.showCalInRanges = false;
        this.nowHoveredDate = null;
        this.pickingDate = false;
        this.options = {}; // should get some opt from user
        this.closeOnAutoApply = true;
        this.choosedDate = new EventEmitter();
        this.rangeClicked = new EventEmitter();
        this.datesUpdated = new EventEmitter();
        this.startDateChanged = new EventEmitter();
        this.endDateChanged = new EventEmitter();
    }
    DaterangepickerComponent_1 = DaterangepickerComponent;
    Object.defineProperty(DaterangepickerComponent.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (value) {
            this._locale = __assign(__assign({}, this._localeService.config), value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaterangepickerComponent.prototype, "ranges", {
        get: function () {
            return this._ranges;
        },
        set: function (value) {
            this._ranges = value;
            this.renderRanges();
        },
        enumerable: true,
        configurable: true
    });
    DaterangepickerComponent.prototype.ngOnInit = function () {
        this._buildLocale();
        var daysOfWeek = __spread(this.locale.daysOfWeek);
        this.locale.firstDay = this.locale.firstDay % 7;
        if (this.locale.firstDay !== 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                daysOfWeek.push(daysOfWeek.shift());
                iterator--;
            }
        }
        this.locale.daysOfWeek = daysOfWeek;
        if (this.inline) {
            this._old.start = this.startDate.clone();
            this._old.end = this.endDate.clone();
        }
        if (this.startDate && this.timePicker) {
            this.setStartDate(this.startDate);
            this.renderTimePicker(SideEnum.left);
        }
        if (this.endDate && this.timePicker) {
            this.setEndDate(this.endDate);
            this.renderTimePicker(SideEnum.right);
        }
        this.updateMonthsInView();
        this.renderCalendar(SideEnum.left);
        this.renderCalendar(SideEnum.right);
        this.renderRanges();
    };
    DaterangepickerComponent.prototype.renderRanges = function () {
        this.rangesArray = [];
        var start, end;
        if (typeof this.ranges === 'object') {
            for (var range in this.ranges) {
                if (this.ranges[range]) {
                    if (typeof this.ranges[range][0] === 'string') {
                        start = moment(this.ranges[range][0], this.locale.format);
                    }
                    else {
                        start = moment(this.ranges[range][0]);
                    }
                    if (typeof this.ranges[range][1] === 'string') {
                        end = moment(this.ranges[range][1], this.locale.format);
                    }
                    else {
                        end = moment(this.ranges[range][1]);
                    }
                    // If the start or end date exceed those allowed by the minDate or maxSpan
                    // options, shorten the range to the allowable period.
                    if (this.minDate && start.isBefore(this.minDate)) {
                        start = this.minDate.clone();
                    }
                    var maxDate = this.maxDate;
                    if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate)) {
                        maxDate = start.clone().add(this.maxSpan);
                    }
                    if (maxDate && end.isAfter(maxDate)) {
                        end = maxDate.clone();
                    }
                    // If the end of the range is before the minimum or the start of the range is
                    // after the maximum, don't display this range option at all.
                    if ((this.minDate && end.isBefore(this.minDate, this.timePicker ? 'minute' : 'day'))
                        || (maxDate && start.isAfter(maxDate, this.timePicker ? 'minute' : 'day'))) {
                        continue;
                    }
                    // Support unicode chars in the range names.
                    var elem = document.createElement('textarea');
                    elem.innerHTML = range;
                    var rangeHtml = elem.value;
                    this.ranges[rangeHtml] = [start, end];
                }
            }
            for (var range in this.ranges) {
                if (this.ranges[range]) {
                    this.rangesArray.push(range);
                }
            }
            if (this.showCustomRangeLabel) {
                this.rangesArray.push(this.locale.customRangeLabel);
            }
            this.showCalInRanges = (!this.rangesArray.length) || this.alwaysShowCalendars;
            if (!this.timePicker) {
                this.startDate = this.startDate.startOf('day');
                this.endDate = this.endDate.endOf('day');
            }
        }
    };
    DaterangepickerComponent.prototype.renderTimePicker = function (side) {
        var selected, minDate;
        var maxDate = this.maxDate;
        if (side === SideEnum.left) {
            selected = this.startDate.clone(),
                minDate = this.minDate;
        }
        else if (side === SideEnum.right && this.endDate) {
            selected = this.endDate.clone(),
                minDate = this.startDate;
        }
        else if (side === SideEnum.right && !this.endDate) {
            // don't have an end date, use the start date then put the selected time for the right side as the time
            selected = this._getDateWithTime(this.startDate, SideEnum.right);
            if (selected.isBefore(this.startDate)) {
                selected = this.startDate.clone(); //set it back to the start date the time was backwards
            }
            minDate = this.startDate;
        }
        var start = this.timePicker24Hour ? 0 : 1;
        var end = this.timePicker24Hour ? 23 : 12;
        this.timepickerVariables[side] = {
            hours: [],
            minutes: [],
            minutesLabel: [],
            seconds: [],
            secondsLabel: [],
            disabledHours: [],
            disabledMinutes: [],
            disabledSeconds: [],
            selectedHour: 0,
            selectedMinute: 0,
            selectedSecond: 0,
        };
        // generate hours
        for (var i = start; i <= end; i++) {
            var i_in_24 = i;
            if (!this.timePicker24Hour) {
                i_in_24 = selected.hour() >= 12 ? (i === 12 ? 12 : i + 12) : (i === 12 ? 0 : i);
            }
            var time = selected.clone().hour(i_in_24);
            var disabled = false;
            if (minDate && time.minute(59).isBefore(minDate)) {
                disabled = true;
            }
            if (maxDate && time.minute(0).isAfter(maxDate)) {
                disabled = true;
            }
            this.timepickerVariables[side].hours.push(i);
            if (i_in_24 === selected.hour() && !disabled) {
                this.timepickerVariables[side].selectedHour = i;
            }
            else if (disabled) {
                this.timepickerVariables[side].disabledHours.push(i);
            }
        }
        // generate minutes
        for (var i = 0; i < 60; i += this.timePickerIncrement) {
            var padded = i < 10 ? '0' + i : i;
            var time = selected.clone().minute(i);
            var disabled = false;
            if (minDate && time.second(59).isBefore(minDate)) {
                disabled = true;
            }
            if (maxDate && time.second(0).isAfter(maxDate)) {
                disabled = true;
            }
            this.timepickerVariables[side].minutes.push(i);
            this.timepickerVariables[side].minutesLabel.push(padded);
            if (selected.minute() === i && !disabled) {
                this.timepickerVariables[side].selectedMinute = i;
            }
            else if (disabled) {
                this.timepickerVariables[side].disabledMinutes.push(i);
            }
        }
        // generate seconds
        if (this.timePickerSeconds) {
            for (var i = 0; i < 60; i++) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().second(i);
                var disabled = false;
                if (minDate && time.isBefore(minDate)) {
                    disabled = true;
                }
                if (maxDate && time.isAfter(maxDate)) {
                    disabled = true;
                }
                this.timepickerVariables[side].seconds.push(i);
                this.timepickerVariables[side].secondsLabel.push(padded);
                if (selected.second() === i && !disabled) {
                    this.timepickerVariables[side].selectedSecond = i;
                }
                else if (disabled) {
                    this.timepickerVariables[side].disabledSeconds.push(i);
                }
            }
        }
        // generate AM/PM
        if (!this.timePicker24Hour) {
            var am_html = '';
            var pm_html = '';
            if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate)) {
                this.timepickerVariables[side].amDisabled = true;
            }
            if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate)) {
                this.timepickerVariables[side].pmDisabled = true;
            }
            if (selected.hour() >= 12) {
                this.timepickerVariables[side].ampmModel = 'PM';
            }
            else {
                this.timepickerVariables[side].ampmModel = 'AM';
            }
        }
        this.timepickerVariables[side].selected = selected;
    };
    DaterangepickerComponent.prototype.renderCalendar = function (side) {
        var mainCalendar = (side === SideEnum.left) ? this.leftCalendar : this.rightCalendar;
        var month = mainCalendar.month.month();
        var year = mainCalendar.month.year();
        var hour = mainCalendar.month.hour();
        var minute = mainCalendar.month.minute();
        var second = mainCalendar.month.second();
        var daysInMonth = moment([year, month]).daysInMonth();
        var firstDay = moment([year, month, 1]);
        var lastDay = moment([year, month, daysInMonth]);
        var lastMonth = moment(firstDay).subtract(1, 'month').month();
        var lastYear = moment(firstDay).subtract(1, 'month').year();
        var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
        var dayOfWeek = firstDay.day();
        // initialize a 6 rows x 7 columns array for the calendar
        var calendar = [];
        calendar.firstDay = firstDay;
        calendar.lastDay = lastDay;
        for (var i = 0; i < 6; i++) {
            calendar[i] = [];
        }
        // populate the calendar with date objects
        var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
        if (startDay > daysInLastMonth) {
            startDay -= 7;
        }
        if (dayOfWeek === this.locale.firstDay) {
            startDay = daysInLastMonth - 6;
        }
        var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
        for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
            if (i > 0 && col % 7 === 0) {
                col = 0;
                row++;
            }
            calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
            curDate.hour(12);
            if (this.minDate && calendar[row][col].format('YYYY-MM-DD') === this.minDate.format('YYYY-MM-DD') &&
                calendar[row][col].isBefore(this.minDate) && side === 'left') {
                calendar[row][col] = this.minDate.clone();
            }
            if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') === this.maxDate.format('YYYY-MM-DD') &&
                calendar[row][col].isAfter(this.maxDate) && side === 'right') {
                calendar[row][col] = this.maxDate.clone();
            }
        }
        // make the calendar object available to hoverDate/clickDate
        if (side === SideEnum.left) {
            this.leftCalendar.calendar = calendar;
        }
        else {
            this.rightCalendar.calendar = calendar;
        }
        //
        // Display the calendar
        //
        var minDate = side === 'left' ? this.minDate : this.startDate;
        var maxDate = this.maxDate;
        // adjust maxDate to reflect the dateLimit setting in order to
        // grey out end dates beyond the dateLimit
        if (this.endDate === null && this.dateLimit) {
            var maxLimit = this.startDate.clone().add(this.dateLimit, 'day').endOf('day');
            if (!maxDate || maxLimit.isBefore(maxDate)) {
                maxDate = maxLimit;
            }
        }
        this.calendarVariables[side] = {
            month: month,
            year: year,
            hour: hour,
            minute: minute,
            second: second,
            daysInMonth: daysInMonth,
            firstDay: firstDay,
            lastDay: lastDay,
            lastMonth: lastMonth,
            lastYear: lastYear,
            daysInLastMonth: daysInLastMonth,
            dayOfWeek: dayOfWeek,
            // other vars
            calRows: Array.from(Array(6).keys()),
            calCols: Array.from(Array(7).keys()),
            classes: {},
            minDate: minDate,
            maxDate: maxDate,
            calendar: calendar
        };
        if (this.showDropdowns) {
            var currentMonth = calendar[1][1].month();
            var currentYear = calendar[1][1].year();
            var realCurrentYear = moment().year();
            var maxYear = (maxDate && maxDate.year()) || (realCurrentYear + 5);
            var minYear = (minDate && minDate.year()) || (realCurrentYear - 50);
            var inMinYear = currentYear === minYear;
            var inMaxYear = currentYear === maxYear;
            var years = [];
            for (var y = minYear; y <= maxYear; y++) {
                years.push(y);
            }
            this.calendarVariables[side].dropdowns = {
                currentMonth: currentMonth,
                currentYear: currentYear,
                maxYear: maxYear,
                minYear: minYear,
                inMinYear: inMinYear,
                inMaxYear: inMaxYear,
                monthArrays: Array.from(Array(12).keys()),
                yearArrays: years
            };
        }
        this._buildCells(calendar, side);
    };
    DaterangepickerComponent.prototype.setStartDate = function (startDate) {
        if (typeof startDate === 'string') {
            this.startDate = moment(startDate, this.locale.format);
        }
        if (typeof startDate === 'object') {
            this.pickingDate = true;
            this.startDate = moment(startDate);
        }
        if (!this.timePicker) {
            this.pickingDate = true;
            this.startDate = this.startDate.startOf('day');
        }
        if (this.timePicker && this.timePickerIncrement) {
            this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        }
        if (this.minDate && this.startDate.isBefore(this.minDate)) {
            this.startDate = this.minDate.clone();
            if (this.timePicker && this.timePickerIncrement) {
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }
        }
        if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
            this.startDate = this.maxDate.clone();
            if (this.timePicker && this.timePickerIncrement) {
                this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }
        }
        if (!this.isShown) {
            this.updateElement();
        }
        this.startDateChanged.emit({ startDate: this.startDate });
        this.updateMonthsInView();
    };
    DaterangepickerComponent.prototype.setEndDate = function (endDate) {
        if (typeof endDate === 'string') {
            this.endDate = moment(endDate, this.locale.format);
        }
        if (typeof endDate === 'object') {
            this.pickingDate = false;
            this.endDate = moment(endDate);
        }
        if (!this.timePicker) {
            this.pickingDate = false;
            this.endDate = this.endDate.add(1, 'd').startOf('day').subtract(1, 'second');
        }
        if (this.timePicker && this.timePickerIncrement) {
            this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        }
        if (this.endDate.isBefore(this.startDate)) {
            this.endDate = this.startDate.clone();
        }
        if (this.maxDate && this.endDate.isAfter(this.maxDate)) {
            this.endDate = this.maxDate.clone();
        }
        if (this.dateLimit && this.startDate.clone().add(this.dateLimit, 'day').isBefore(this.endDate)) {
            this.endDate = this.startDate.clone().add(this.dateLimit, 'day');
        }
        if (!this.isShown) {
            // this.updateElement();
        }
        this.endDateChanged.emit({ endDate: this.endDate });
        this.updateMonthsInView();
    };
    DaterangepickerComponent.prototype.isInvalidDate = function (date) {
        return false;
    };
    DaterangepickerComponent.prototype.isCustomDate = function (date) {
        return false;
    };
    DaterangepickerComponent.prototype.isTooltipDate = function (date) {
        return null;
    };
    DaterangepickerComponent.prototype.updateView = function () {
        if (this.timePicker) {
            this.renderTimePicker(SideEnum.left);
            this.renderTimePicker(SideEnum.right);
        }
        this.updateMonthsInView();
        this.updateCalendars();
    };
    DaterangepickerComponent.prototype.updateMonthsInView = function () {
        if (this.endDate) {
            // if both dates are visible already, do nothing
            if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                ((this.startDate && this.leftCalendar && this.startDate.format('YYYY-MM') === this.leftCalendar.month.format('YYYY-MM')) ||
                    (this.startDate && this.rightCalendar && this.startDate.format('YYYY-MM') === this.rightCalendar.month.format('YYYY-MM')))
                &&
                    (this.endDate.format('YYYY-MM') === this.leftCalendar.month.format('YYYY-MM') ||
                        this.endDate.format('YYYY-MM') === this.rightCalendar.month.format('YYYY-MM'))) {
                return;
            }
            if (this.startDate) {
                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() !== this.startDate.month() ||
                    this.endDate.year() !== this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                }
                else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
        }
        else {
            if (this.leftCalendar.month.format('YYYY-MM') !== this.startDate.format('YYYY-MM') &&
                this.rightCalendar.month.format('YYYY-MM') !== this.startDate.format('YYYY-MM')) {
                this.leftCalendar.month = this.startDate.clone().date(2);
                this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
            }
        }
        if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
            this.rightCalendar.month = this.maxDate.clone().date(2);
            this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
        }
    };
    /**
     *  This is responsible for updating the calendars
     */
    DaterangepickerComponent.prototype.updateCalendars = function () {
        this.renderCalendar(SideEnum.left);
        this.renderCalendar(SideEnum.right);
        if (this.endDate === null) {
            return;
        }
        this.calculateChosenLabel();
    };
    DaterangepickerComponent.prototype.updateElement = function () {
        var format = this.locale.displayFormat ? this.locale.displayFormat : this.locale.format;
        if (!this.singleDatePicker && this.autoUpdateInput) {
            if (this.startDate && this.endDate) {
                // if we use ranges and should show range label on input
                if (this.rangesArray.length && this.showRangeLabelOnInput === true && this.chosenRange &&
                    this.locale.customRangeLabel !== this.chosenRange) {
                    this.chosenLabel = this.chosenRange;
                }
                else {
                    this.chosenLabel = this.startDate.format(format) +
                        this.locale.separator + this.endDate.format(format);
                }
            }
        }
        else if (this.autoUpdateInput) {
            this.chosenLabel = this.startDate.format(format);
        }
    };
    DaterangepickerComponent.prototype.remove = function () {
        this.isShown = false;
    };
    /**
     * this should calculate the label
     */
    DaterangepickerComponent.prototype.calculateChosenLabel = function () {
        if (!this.locale || !this.locale.separator) {
            this._buildLocale();
        }
        var customRange = true;
        var i = 0;
        if (this.rangesArray.length > 0) {
            for (var range in this.ranges) {
                if (this.ranges[range]) {
                    if (this.timePicker) {
                        var format = this.timePickerSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm';
                        // ignore times when comparing dates if time picker seconds is not enabled
                        if (this.startDate.format(format) === this.ranges[range][0].format(format)
                            && this.endDate.format(format) === this.ranges[range][1].format(format)) {
                            customRange = false;
                            this.chosenRange = this.rangesArray[i];
                            break;
                        }
                    }
                    else {
                        // ignore times when comparing dates if time picker is not enabled
                        if (this.startDate.format('YYYY-MM-DD') === this.ranges[range][0].format('YYYY-MM-DD')
                            && this.endDate.format('YYYY-MM-DD') === this.ranges[range][1].format('YYYY-MM-DD')) {
                            customRange = false;
                            this.chosenRange = this.rangesArray[i];
                            break;
                        }
                    }
                    i++;
                }
            }
            if (customRange) {
                if (this.showCustomRangeLabel) {
                    this.chosenRange = this.locale.customRangeLabel;
                }
                else {
                    this.chosenRange = null;
                }
                // if custom label: show calendar
                this.showCalInRanges = true;
            }
        }
        this.updateElement();
    };
    DaterangepickerComponent.prototype.clickApply = function (e) {
        if (!this.singleDatePicker && this.startDate && !this.endDate) {
            this.endDate = this._getDateWithTime(this.startDate, SideEnum.right);
            this.calculateChosenLabel();
        }
        if (this.isInvalidDate && this.startDate && this.endDate) {
            // get if there are invalid date between range
            var d = this.startDate.clone();
            while (d.isBefore(this.endDate)) {
                if (this.isInvalidDate(d)) {
                    this.endDate = d.subtract(1, 'days');
                    this.calculateChosenLabel();
                    break;
                }
                d.add(1, 'days');
            }
        }
        if (this.chosenLabel) {
            this.choosedDate.emit({ chosenLabel: this.chosenLabel, startDate: this.startDate, endDate: this.endDate });
        }
        this.datesUpdated.emit({ startDate: this.startDate, endDate: this.endDate });
        if (e || (this.closeOnAutoApply && !e)) {
            this.hide();
        }
    };
    DaterangepickerComponent.prototype.clickCancel = function (e) {
        this.startDate = this._old.start;
        this.endDate = this._old.end;
        if (this.inline) {
            this.updateView();
        }
        this.hide();
    };
    /**
     * called when month is changed
     * @param monthEvent get value in event.target.value
     * @param side left or right
     */
    DaterangepickerComponent.prototype.monthChanged = function (monthEvent, side) {
        var year = this.calendarVariables[side].dropdowns.currentYear;
        var month = parseInt(monthEvent.target.value, 10);
        this.monthOrYearChanged(month, year, side);
    };
    /**
     * called when year is changed
     * @param yearEvent get value in event.target.value
     * @param side left or right
     */
    DaterangepickerComponent.prototype.yearChanged = function (yearEvent, side) {
        var month = this.calendarVariables[side].dropdowns.currentMonth;
        var year = parseInt(yearEvent.target.value, 10);
        this.monthOrYearChanged(month, year, side);
    };
    /**
     * called when time is changed
     * @param timeEvent  an event
     * @param side left or right
     */
    DaterangepickerComponent.prototype.timeChanged = function (timeEvent, side) {
        var hour = parseInt(this.timepickerVariables[side].selectedHour, 10);
        var minute = parseInt(this.timepickerVariables[side].selectedMinute, 10);
        var second = this.timePickerSeconds ? parseInt(this.timepickerVariables[side].selectedSecond, 10) : 0;
        if (!this.timePicker24Hour) {
            var ampm = this.timepickerVariables[side].ampmModel;
            if (ampm === 'PM' && hour < 12) {
                hour += 12;
            }
            if (ampm === 'AM' && hour === 12) {
                hour = 0;
            }
        }
        if (side === SideEnum.left) {
            var start = this.startDate.clone();
            start.hour(hour);
            start.minute(minute);
            start.second(second);
            this.setStartDate(start);
            if (this.singleDatePicker) {
                this.endDate = this.startDate.clone();
            }
            else if (this.endDate && this.endDate.format('YYYY-MM-DD') === start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                this.setEndDate(start.clone());
            }
            else if (!this.endDate && this.timePicker) {
                var startClone = this._getDateWithTime(start, SideEnum.right);
                if (startClone.isBefore(start)) {
                    this.timepickerVariables[SideEnum.right].selectedHour = hour;
                    this.timepickerVariables[SideEnum.right].selectedMinute = minute;
                    this.timepickerVariables[SideEnum.right].selectedSecond = second;
                }
            }
        }
        else if (this.endDate) {
            var end = this.endDate.clone();
            end.hour(hour);
            end.minute(minute);
            end.second(second);
            this.setEndDate(end);
        }
        // update the calendars so all clickable dates reflect the new time component
        this.updateCalendars();
        // re-render the time pickers because changing one selection can affect what's enabled in another
        this.renderTimePicker(SideEnum.left);
        this.renderTimePicker(SideEnum.right);
        if (this.autoApply) {
            this.clickApply();
        }
    };
    /**
     *  call when month or year changed
     * @param month month number 0 -11
     * @param year year eg: 1995
     * @param side left or right
     */
    DaterangepickerComponent.prototype.monthOrYearChanged = function (month, year, side) {
        var isLeft = side === SideEnum.left;
        if (!isLeft) {
            if (year < this.startDate.year() || (year === this.startDate.year() && month < this.startDate.month())) {
                month = this.startDate.month();
                year = this.startDate.year();
            }
        }
        if (this.minDate) {
            if (year < this.minDate.year() || (year === this.minDate.year() && month < this.minDate.month())) {
                month = this.minDate.month();
                year = this.minDate.year();
            }
        }
        if (this.maxDate) {
            if (year > this.maxDate.year() || (year === this.maxDate.year() && month > this.maxDate.month())) {
                month = this.maxDate.month();
                year = this.maxDate.year();
            }
        }
        this.calendarVariables[side].dropdowns.currentYear = year;
        this.calendarVariables[side].dropdowns.currentMonth = month;
        if (isLeft) {
            this.leftCalendar.month.month(month).year(year);
            if (this.linkedCalendars) {
                this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            }
        }
        else {
            this.rightCalendar.month.month(month).year(year);
            if (this.linkedCalendars) {
                this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
        }
        this.updateCalendars();
    };
    /**
     * Click on previous month
     * @param side left or right calendar
     */
    DaterangepickerComponent.prototype.clickPrev = function (side) {
        if (side === SideEnum.left) {
            this.leftCalendar.month.subtract(1, 'month');
            if (this.linkedCalendars) {
                this.rightCalendar.month.subtract(1, 'month');
            }
        }
        else {
            this.rightCalendar.month.subtract(1, 'month');
        }
        this.updateCalendars();
    };
    /**
     * Click on next month
     * @param side left or right calendar
     */
    DaterangepickerComponent.prototype.clickNext = function (side) {
        if (side === SideEnum.left) {
            this.leftCalendar.month.add(1, 'month');
        }
        else {
            this.rightCalendar.month.add(1, 'month');
            if (this.linkedCalendars) {
                this.leftCalendar.month.add(1, 'month');
            }
        }
        this.updateCalendars();
    };
    /**
     * When hovering a date
     * @param e event: get value by e.target.value
     * @param side left or right
     * @param row row position of the current date clicked
     * @param col col position of the current date clicked
     */
    DaterangepickerComponent.prototype.hoverDate = function (e, side, row, col) {
        var leftCalDate = this.calendarVariables.left.calendar[row][col];
        var rightCalDate = this.calendarVariables.right.calendar[row][col];
        if (this.pickingDate) {
            this.nowHoveredDate = side === SideEnum.left ? leftCalDate : rightCalDate;
            this.renderCalendar(SideEnum.left);
            this.renderCalendar(SideEnum.right);
        }
        var tooltip = side === SideEnum.left ? this.tooltiptext[leftCalDate] : this.tooltiptext[rightCalDate];
        if (tooltip.length > 0) {
            e.target.setAttribute('title', tooltip);
        }
    };
    /**
     * When selecting a date
     * @param e event: get value by e.target.value
     * @param side left or right
     * @param row row position of the current date clicked
     * @param col col position of the current date clicked
     */
    DaterangepickerComponent.prototype.clickDate = function (e, side, row, col) {
        if (e.target.tagName === 'TD') {
            if (!e.target.classList.contains('available')) {
                return;
            }
        }
        else if (e.target.tagName === 'SPAN') {
            if (!e.target.parentElement.classList.contains('available')) {
                return;
            }
        }
        if (this.rangesArray.length) {
            this.chosenRange = this.locale.customRangeLabel;
        }
        var date = side === SideEnum.left ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
        if ((this.endDate || (date.isBefore(this.startDate, 'day')
            && this.customRangeDirection === false)) && this.lockStartDate === false) { // picking start
            if (this.timePicker) {
                date = this._getDateWithTime(date, SideEnum.left);
            }
            this.endDate = null;
            this.setStartDate(date.clone());
        }
        else if (!this.endDate && date.isBefore(this.startDate) && this.customRangeDirection === false) {
            // special case: clicking the same date for start/end,
            // but the time of the end date is before the start date
            this.setEndDate(this.startDate.clone());
        }
        else { // picking end
            if (this.timePicker) {
                date = this._getDateWithTime(date, SideEnum.right);
            }
            if (date.isBefore(this.startDate, 'day') === true && this.customRangeDirection === true) {
                this.setEndDate(this.startDate);
                this.setStartDate(date.clone());
            }
            else {
                this.setEndDate(date.clone());
            }
            if (this.autoApply) {
                this.calculateChosenLabel();
            }
        }
        if (this.singleDatePicker) {
            this.setEndDate(this.startDate);
            this.updateElement();
            if (this.autoApply) {
                this.clickApply();
            }
        }
        this.updateView();
        if (this.autoApply && this.startDate && this.endDate) {
            this.clickApply();
        }
        // This is to cancel the blur event handler if the mouse was in one of the inputs
        e.stopPropagation();
    };
    /**
     *  Click on the custom range
     * @param e: Event
     * @param label
     */
    DaterangepickerComponent.prototype.clickRange = function (e, label) {
        this.chosenRange = label;
        if (label === this.locale.customRangeLabel) {
            this.isShown = true; // show calendars
            this.showCalInRanges = true;
        }
        else {
            var dates = this.ranges[label];
            this.startDate = dates[0].clone();
            this.endDate = dates[1].clone();
            if (this.showRangeLabelOnInput && label !== this.locale.customRangeLabel) {
                this.chosenLabel = label;
            }
            else {
                this.calculateChosenLabel();
            }
            this.showCalInRanges = (!this.rangesArray.length) || this.alwaysShowCalendars;
            if (!this.timePicker) {
                this.startDate.startOf('day');
                this.endDate.endOf('day');
            }
            if (!this.alwaysShowCalendars) {
                this.isShown = false; // hide calendars
            }
            this.rangeClicked.emit({ label: label, dates: dates });
            if (!this.keepCalendarOpeningWithRange || this.autoApply) {
                this.clickApply();
            }
            else {
                if (!this.alwaysShowCalendars) {
                    return this.clickApply();
                }
                if (this.maxDate && this.maxDate.isSame(dates[0], 'month')) {
                    this.rightCalendar.month.month(dates[0].month());
                    this.rightCalendar.month.year(dates[0].year());
                    this.leftCalendar.month.month(dates[0].month() - 1);
                    this.leftCalendar.month.year(dates[1].year());
                }
                else {
                    this.leftCalendar.month.month(dates[0].month());
                    this.leftCalendar.month.year(dates[0].year());
                    // get the next year
                    var nextMonth = dates[0].clone().add(1, 'month');
                    this.rightCalendar.month.month(nextMonth.month());
                    this.rightCalendar.month.year(nextMonth.year());
                }
                this.updateCalendars();
                if (this.timePicker) {
                    this.renderTimePicker(SideEnum.left);
                    this.renderTimePicker(SideEnum.right);
                }
            }
        }
    };
    DaterangepickerComponent.prototype.show = function (e) {
        if (this.isShown) {
            return;
        }
        this._old.start = this.startDate.clone();
        this._old.end = this.endDate.clone();
        this.isShown = true;
        this.updateView();
    };
    DaterangepickerComponent.prototype.hide = function (e) {
        if (!this.isShown) {
            return;
        }
        // incomplete date selection, revert to last values
        if (!this.endDate) {
            if (this._old.start) {
                this.startDate = this._old.start.clone();
            }
            if (this._old.end) {
                this.endDate = this._old.end.clone();
            }
        }
        // if a new date range was selected, invoke the user callback function
        if (!this.startDate.isSame(this._old.start) || !this.endDate.isSame(this._old.end)) {
            // this.callback(this.startDate, this.endDate, this.chosenLabel);
        }
        // if picker is attached to a text input, update it
        this.updateElement();
        this.isShown = false;
        this._ref.detectChanges();
    };
    /**
     * handle click on all element in the component, useful for outside of click
     * @param e event
     */
    DaterangepickerComponent.prototype.handleInternalClick = function (e) {
        e.stopPropagation();
    };
    /**
     * update the locale options
     * @param locale
     */
    DaterangepickerComponent.prototype.updateLocale = function (locale) {
        for (var key in locale) {
            if (locale.hasOwnProperty(key)) {
                this.locale[key] = locale[key];
                if (key === 'customRangeLabel') {
                    this.renderRanges();
                }
            }
        }
    };
    /**
     *  clear the daterange picker
     */
    DaterangepickerComponent.prototype.clear = function () {
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.choosedDate.emit({ chosenLabel: '', startDate: null, endDate: null });
        this.datesUpdated.emit({ startDate: null, endDate: null });
        this.hide();
    };
    /**
     * Find out if the selected range should be disabled if it doesn't
     * fit into minDate and maxDate limitations.
     */
    DaterangepickerComponent.prototype.disableRange = function (range) {
        var _this = this;
        if (range === this.locale.customRangeLabel) {
            return false;
        }
        var rangeMarkers = this.ranges[range];
        var areBothBefore = rangeMarkers.every(function (date) {
            if (!_this.minDate) {
                return false;
            }
            return date.isBefore(_this.minDate);
        });
        var areBothAfter = rangeMarkers.every(function (date) {
            if (!_this.maxDate) {
                return false;
            }
            return date.isAfter(_this.maxDate);
        });
        return (areBothBefore || areBothAfter);
    };
    /**
     *
     * @param date the date to add time
     * @param side left or right
     */
    DaterangepickerComponent.prototype._getDateWithTime = function (date, side) {
        var hour = parseInt(this.timepickerVariables[side].selectedHour, 10);
        if (!this.timePicker24Hour) {
            var ampm = this.timepickerVariables[side].ampmModel;
            if (ampm === 'PM' && hour < 12) {
                hour += 12;
            }
            if (ampm === 'AM' && hour === 12) {
                hour = 0;
            }
        }
        var minute = parseInt(this.timepickerVariables[side].selectedMinute, 10);
        var second = this.timePickerSeconds ? parseInt(this.timepickerVariables[side].selectedSecond, 10) : 0;
        return date.clone().hour(hour).minute(minute).second(second);
    };
    /**
     *  build the locale config
     */
    DaterangepickerComponent.prototype._buildLocale = function () {
        this.locale = __assign(__assign({}, this._localeService.config), this.locale);
        if (!this.locale.format) {
            if (this.timePicker) {
                this.locale.format = moment.localeData().longDateFormat('lll');
            }
            else {
                this.locale.format = moment.localeData().longDateFormat('L');
            }
        }
    };
    DaterangepickerComponent.prototype._buildCells = function (calendar, side) {
        var _this = this;
        var _loop_1 = function (row) {
            this_1.calendarVariables[side].classes[row] = {};
            var rowClasses = [];
            if (this_1.emptyWeekRowClass &&
                Array.from(Array(7).keys()).some(function (i) { return calendar[row][i].month() !== _this.calendarVariables[side].month; })) {
                rowClasses.push(this_1.emptyWeekRowClass);
            }
            for (var col = 0; col < 7; col++) {
                var classes = [];
                // empty week row class
                if (this_1.emptyWeekColumnClass) {
                    if (calendar[row][col].month() !== this_1.calendarVariables[side].month) {
                        classes.push(this_1.emptyWeekColumnClass);
                    }
                }
                // highlight today's date
                if (calendar[row][col].isSame(new Date(), 'day')) {
                    classes.push('today');
                }
                // highlight weekends
                if (calendar[row][col].isoWeekday() > 5) {
                    classes.push('weekend');
                }
                // grey out the dates in other months displayed at beginning and end of this calendar
                if (calendar[row][col].month() !== calendar[1][1].month()) {
                    classes.push('off');
                    // mark the last day of the previous month in this calendar
                    if (this_1.lastDayOfPreviousMonthClass && (calendar[row][col].month() < calendar[1][1].month() ||
                        calendar[1][1].month() === 0) && calendar[row][col].date() === this_1.calendarVariables[side].daysInLastMonth) {
                        classes.push(this_1.lastDayOfPreviousMonthClass);
                    }
                    // mark the first day of the next month in this calendar
                    if (this_1.firstDayOfNextMonthClass && (calendar[row][col].month() > calendar[1][1].month() ||
                        calendar[row][col].month() === 0) && calendar[row][col].date() === 1) {
                        classes.push(this_1.firstDayOfNextMonthClass);
                    }
                }
                // mark the first day of the current month with a custom class
                if (this_1.firstMonthDayClass && calendar[row][col].month() === calendar[1][1].month() &&
                    calendar[row][col].date() === calendar.firstDay.date()) {
                    classes.push(this_1.firstMonthDayClass);
                }
                // mark the last day of the current month with a custom class
                if (this_1.lastMonthDayClass && calendar[row][col].month() === calendar[1][1].month() &&
                    calendar[row][col].date() === calendar.lastDay.date()) {
                    classes.push(this_1.lastMonthDayClass);
                }
                // don't allow selection of dates before the minimum date
                if (this_1.minDate && calendar[row][col].isBefore(this_1.minDate, 'day')) {
                    classes.push('off', 'disabled');
                }
                // don't allow selection of dates after the maximum date
                if (this_1.calendarVariables[side].maxDate && calendar[row][col].isAfter(this_1.calendarVariables[side].maxDate, 'day')) {
                    classes.push('off', 'disabled');
                }
                // don't allow selection of date if a custom function decides it's invalid
                if (this_1.isInvalidDate(calendar[row][col])) {
                    classes.push('off', 'disabled', 'invalid');
                }
                // highlight the currently selected start date
                if (this_1.startDate && calendar[row][col].format('YYYY-MM-DD') === this_1.startDate.format('YYYY-MM-DD')) {
                    classes.push('active', 'start-date');
                }
                // highlight the currently selected end date
                if (this_1.endDate != null && calendar[row][col].format('YYYY-MM-DD') === this_1.endDate.format('YYYY-MM-DD')) {
                    classes.push('active', 'end-date');
                }
                // highlight dates in-between the selected dates
                if (((this_1.nowHoveredDate != null && this_1.pickingDate) || this_1.endDate != null) &&
                    (calendar[row][col] > this_1.startDate &&
                        (calendar[row][col] < this_1.endDate || (calendar[row][col] < this_1.nowHoveredDate && this_1.pickingDate))) &&
                    (!classes.find(function (el) { return el === 'off'; }))) {
                    classes.push('in-range');
                }
                // apply custom classes for this date
                var isCustom = this_1.isCustomDate(calendar[row][col]);
                if (isCustom !== false) {
                    if (typeof isCustom === 'string') {
                        classes.push(isCustom);
                    }
                    else {
                        Array.prototype.push.apply(classes, isCustom);
                    }
                }
                // apply custom tooltip for this date
                var isTooltip = this_1.isTooltipDate(calendar[row][col]);
                if (isTooltip) {
                    if (typeof isTooltip === 'string') {
                        this_1.tooltiptext[calendar[row][col]] = isTooltip; // setting tooltiptext for custom date
                    }
                    else {
                        this_1.tooltiptext[calendar[row][col]] = 'Put the tooltip as the returned value of isTooltipDate';
                    }
                }
                else {
                    this_1.tooltiptext[calendar[row][col]] = '';
                }
                // store classes var
                var cname = '', disabled = false;
                for (var i = 0; i < classes.length; i++) {
                    cname += classes[i] + ' ';
                    if (classes[i] === 'disabled') {
                        disabled = true;
                    }
                }
                if (!disabled) {
                    cname += 'available';
                }
                this_1.calendarVariables[side].classes[row][col] = cname.replace(/^\s+|\s+$/g, '');
            }
            this_1.calendarVariables[side].classes[row].classList = rowClasses.join(' ');
        };
        var this_1 = this;
        for (var row = 0; row < 6; row++) {
            _loop_1(row);
        }
    };
    var DaterangepickerComponent_1;
    DaterangepickerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: LocaleService }
    ]; };
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "startDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "endDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "dateLimit", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "minDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "maxDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "autoApply", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "singleDatePicker", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "showDropdowns", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "showWeekNumbers", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "showISOWeekNumbers", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "linkedCalendars", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "autoUpdateInput", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "alwaysShowCalendars", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "maxSpan", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "lockStartDate", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "timePicker", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "timePicker24Hour", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "timePickerIncrement", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "timePickerSeconds", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "showClearButton", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "firstMonthDayClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "lastMonthDayClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "emptyWeekRowClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "emptyWeekColumnClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "firstDayOfNextMonthClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "lastDayOfPreviousMonthClass", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "locale", null);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "ranges", null);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "showCustomRangeLabel", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "showCancel", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "keepCalendarOpeningWithRange", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "showRangeLabelOnInput", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "customRangeDirection", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "drops", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "opens", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "closeOnAutoApply", void 0);
    __decorate([
        Output()
    ], DaterangepickerComponent.prototype, "choosedDate", void 0);
    __decorate([
        Output()
    ], DaterangepickerComponent.prototype, "rangeClicked", void 0);
    __decorate([
        Output()
    ], DaterangepickerComponent.prototype, "datesUpdated", void 0);
    __decorate([
        Output()
    ], DaterangepickerComponent.prototype, "startDateChanged", void 0);
    __decorate([
        Output()
    ], DaterangepickerComponent.prototype, "endDateChanged", void 0);
    __decorate([
        ViewChild('pickerContainer', { static: true })
    ], DaterangepickerComponent.prototype, "pickerContainer", void 0);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "isInvalidDate", null);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "isCustomDate", null);
    __decorate([
        Input()
    ], DaterangepickerComponent.prototype, "isTooltipDate", null);
    DaterangepickerComponent = DaterangepickerComponent_1 = __decorate([
        Component({
            selector: 'ngx-daterangepicker-material',
            template: "<div class=\"md-drppicker\" #pickerContainer\r\n[ngClass]=\"{\r\n    ltr: locale.direction === 'ltr',\r\n    rtl: this.locale.direction === 'rtl',\r\n    'shown': isShown || inline,\r\n    'hidden': !isShown && !inline,\r\n    'inline': inline,\r\n    'double': !singleDatePicker && showCalInRanges,\r\n    'show-ranges': rangesArray.length\r\n}\" [class]=\"'drops-' + drops + '-' + opens\">\r\n    <div class=\"ranges\">\r\n        <ul>\r\n          <li *ngFor=\"let range of rangesArray\">\r\n            <button type=\"button\"\r\n                    (click)=\"clickRange($event, range)\"\r\n                    [disabled]=\"disableRange(range)\"\r\n                    [ngClass]=\"{'active': range === chosenRange}\">{{range}}</button>\r\n          </li>\r\n        </ul>\r\n    </div>\r\n    <div class=\"calendar\" [ngClass]=\"{right: singleDatePicker, left: !singleDatePicker}\"\r\n        *ngIf=\"showCalInRanges\">\r\n        <div class=\"calendar-table\">\r\n            <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\r\n                <thead>\r\n                    <tr>\r\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\r\n                        <ng-container *ngIf=\"!calendarVariables.left.minDate || calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) && (!this.linkedCalendars || true)\">\r\n                            <th (click)=\"clickPrev(sideEnum.left)\" class=\"prev available\" >\r\n                            </th>\r\n                        </ng-container>\r\n                        <ng-container *ngIf=\"!(!calendarVariables.left.minDate || calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) && (!this.linkedCalendars || true))\">\r\n                            <th></th>\r\n                        </ng-container>\r\n                        <th colspan=\"5\" class=\"month drp-animate\">\r\n                            <ng-container *ngIf=\"showDropdowns && calendarVariables.left.dropdowns\">\r\n                                <div class=\"dropdowns\">\r\n                                        {{this.locale.monthNames[calendarVariables?.left?.calendar[1][1].month()]}}\r\n                                        <select class=\"monthselect\" (change)=\"monthChanged($event, sideEnum.left)\">\r\n                                                <option\r\n                                                [disabled]=\"(calendarVariables.left.dropdowns.inMinYear && m < calendarVariables.left.minDate.month()) || (calendarVariables.left.dropdowns.inMaxYear && m > calendarVariables.left.maxDate.month())\"\r\n                                                *ngFor=\"let m of calendarVariables.left.dropdowns.monthArrays\" [value]=\"m\" [selected]=\"calendarVariables.left.dropdowns.currentMonth == m\">\r\n                                                    {{locale.monthNames[m]}}\r\n                                                </option>\r\n                                        </select>\r\n                                </div>\r\n                                <div class=\"dropdowns\">\r\n                                    {{ calendarVariables?.left?.calendar[1][1].format(\" YYYY\")}}\r\n                                    <select class=\"yearselect\"  (change)=\"yearChanged($event, sideEnum.left)\">\r\n                                        <option *ngFor=\"let y of calendarVariables.left.dropdowns.yearArrays\" [selected]=\"y === calendarVariables.left.dropdowns.currentYear\">\r\n                                            {{y}}\r\n                                        </option>\r\n                                    </select>\r\n                                </div>\r\n                            </ng-container>\r\n                            <ng-container *ngIf=\"!showDropdowns || !calendarVariables.left.dropdowns\">\r\n                                    {{this.locale.monthNames[calendarVariables?.left?.calendar[1][1].month()]}}  {{ calendarVariables?.left?.calendar[1][1].format(\" YYYY\")}}\r\n                            </ng-container>\r\n                        </th>\r\n                        <ng-container *ngIf=\"(!calendarVariables.left.maxDate || calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) && (!linkedCalendars || singleDatePicker )\">\r\n                            <th class=\"next available\" (click)=\"clickNext(sideEnum.left)\">\r\n                            </th>\r\n                        </ng-container>\r\n                        <ng-container *ngIf=\"!((!calendarVariables.left.maxDate || calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) && (!linkedCalendars || singleDatePicker ))\">\r\n                            <th></th>\r\n                        </ng-container>\r\n                    </tr>\r\n                    <tr class='week-days'>\r\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\"><span>{{this.locale.weekLabel}}</span></th>\r\n                        <th *ngFor=\"let dayofweek of locale.daysOfWeek\"><span>{{dayofweek}}</span></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody class=\"drp-animate\">\r\n                    <tr *ngFor=\"let row of calendarVariables.left.calRows\" [class]=\"calendarVariables.left.classes[row].classList\">\r\n                        <!-- add week number -->\r\n                        <td  class=\"week\" *ngIf=\"showWeekNumbers\">\r\n                            <span>{{calendarVariables.left.calendar[row][0].week()}}</span>\r\n                        </td>\r\n                        <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\r\n                            <span>{{calendarVariables.left.calendar[row][0].isoWeek()}}</span>\r\n                        </td>\r\n                        <!-- cal -->\r\n                        <td *ngFor=\"let col of calendarVariables.left.calCols\" [class]=\"calendarVariables.left.classes[row][col]\" (click)=\"clickDate($event, sideEnum.left, row, col)\" (mouseenter)=\"hoverDate($event, sideEnum.left, row, col)\">\r\n                            <span>{{calendarVariables.left.calendar[row][col].date()}}</span>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"calendar-time\" *ngIf=\"timePicker\">\r\n            <div class=\"select\">\r\n                <select class=\"hourselect select-item\" [disabled]=\"!startDate\" [(ngModel)]=\"timepickerVariables.left.selectedHour\" (ngModelChange)=\"timeChanged($event, sideEnum.left)\">\r\n                    <option *ngFor=\"let i of timepickerVariables.left.hours\"\r\n                    [value]=\"i\"\r\n                    [disabled]=\"timepickerVariables.left.disabledHours.indexOf(i) > -1\">{{i}}</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"select\">\r\n                <select class=\"select-item minuteselect\" [disabled]=\"!startDate\" [(ngModel)]=\"timepickerVariables.left.selectedMinute\" (ngModelChange)=\"timeChanged($event, sideEnum.left)\">\r\n                    <option *ngFor=\"let i of timepickerVariables.left.minutes; let index = index;\"\r\n                    [value]=\"i\"\r\n                    [disabled]=\"timepickerVariables.left.disabledMinutes.indexOf(i) > -1\">{{timepickerVariables.left.minutesLabel[index]}}</option>\r\n                </select>\r\n                <span class=\"select-highlight\"></span>\r\n                <span class=\"select-bar\"></span>\r\n            </div>\r\n            <div class=\"select\">\r\n                <select class=\"select-item secondselect\" *ngIf=\"timePickerSeconds\" [disabled]=\"!startDate\" [(ngModel)]=\"timepickerVariables.left.selectedSecond\" (ngModelChange)=\"timeChanged($event, sideEnum.left)\">\r\n                    <option *ngFor=\"let i of timepickerVariables.left.seconds; let index = index;\"\r\n                    [value]=\"i\"\r\n                    [disabled]=\"timepickerVariables.left.disabledSeconds.indexOf(i) > -1\">{{timepickerVariables.left.secondsLabel[index]}}</option>\r\n                </select>\r\n                <span class=\"select-highlight\"></span>\r\n                <span class=\"select-bar\"></span>\r\n            </div>\r\n            <div class=\"select\">\r\n                <select class=\"select-item ampmselect\" *ngIf=\"!timePicker24Hour\" [(ngModel)]=\"timepickerVariables.left.ampmModel\" (ngModelChange)=\"timeChanged($event, sideEnum.left)\">\r\n                    <option value=\"AM\" [disabled]=\"timepickerVariables.left.amDisabled\">AM</option>\r\n                    <option value=\"PM\"  [disabled]=\"timepickerVariables.left.pmDisabled\">PM</option>\r\n                </select>\r\n                <span class=\"select-highlight\"></span>\r\n                <span class=\"select-bar\"></span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"calendar right\"\r\n        *ngIf=\"showCalInRanges && !singleDatePicker\"\r\n        >\r\n        <div class=\"calendar-table\">\r\n            <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\r\n                <thead>\r\n                    <tr>\r\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\r\n                        <ng-container *ngIf=\"(!calendarVariables.right.minDate || calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) && (!this.linkedCalendars)\">\r\n                            <th (click)=\"clickPrev(sideEnum.right)\" class=\"prev available\" >\r\n                            </th>\r\n                        </ng-container>\r\n                        <ng-container *ngIf=\"!((!calendarVariables.right.minDate || calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) && (!this.linkedCalendars))\">\r\n                            <th></th>\r\n                        </ng-container>\r\n                        <th colspan=\"5\" class=\"month\">\r\n                            <ng-container *ngIf=\"showDropdowns && calendarVariables.right.dropdowns\">\r\n                                <div class=\"dropdowns\">\r\n                                    {{this.locale.monthNames[calendarVariables?.right?.calendar[1][1].month()]}}\r\n                                    <select class=\"monthselect\" (change)=\"monthChanged($event, sideEnum.right)\">\r\n                                            <option\r\n                                            [disabled]=\"(calendarVariables.right.dropdowns.inMinYear && calendarVariables.right.minDate && m < calendarVariables.right.minDate.month()) || (calendarVariables.right.dropdowns.inMaxYear && calendarVariables.right.maxDate && m > calendarVariables.right.maxDate.month())\"\r\n                                            *ngFor=\"let m of calendarVariables.right.dropdowns.monthArrays\" [value]=\"m\" [selected]=\"calendarVariables.right.dropdowns.currentMonth == m\">\r\n                                                {{locale.monthNames[m]}}\r\n                                            </option>\r\n                                    </select>\r\n                                </div>\r\n                                <div class=\"dropdowns\">\r\n                                        {{ calendarVariables?.right?.calendar[1][1].format(\" YYYY\")}}\r\n                                        <select class=\"yearselect\" (change)=\"yearChanged($event, sideEnum.right)\">\r\n                                        <option *ngFor=\"let y of calendarVariables.right.dropdowns.yearArrays\" [selected]=\"y === calendarVariables.right.dropdowns.currentYear\">\r\n                                            {{y}}\r\n                                        </option>\r\n                                    </select>\r\n                                </div>\r\n                            </ng-container>\r\n                            <ng-container *ngIf=\"!showDropdowns || !calendarVariables.right.dropdowns\">\r\n                                    {{this.locale.monthNames[calendarVariables?.right?.calendar[1][1].month()]}}  {{ calendarVariables?.right?.calendar[1][1].format(\" YYYY\")}}\r\n                            </ng-container>\r\n                        </th>\r\n                            <ng-container *ngIf=\"!calendarVariables.right.maxDate || calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) && (!linkedCalendars || singleDatePicker || true)\">\r\n                                <th class=\"next available\" (click)=\"clickNext(sideEnum.right)\">\r\n                                </th>\r\n                            </ng-container>\r\n                            <ng-container *ngIf=\"!(!calendarVariables.right.maxDate || calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) && (!linkedCalendars || singleDatePicker || true))\">\r\n                                <th></th>\r\n                            </ng-container>\r\n                    </tr>\r\n\r\n                    <tr class='week-days'>\r\n                        <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\"><span>{{this.locale.weekLabel}}</span></th>\r\n                        <th *ngFor=\"let dayofweek of locale.daysOfWeek\"><span>{{dayofweek}}</span></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let row of calendarVariables.right.calRows\" [class]=\"calendarVariables.right.classes[row].classList\">\r\n                        <td class=\"week\" *ngIf=\"showWeekNumbers\">\r\n                            <span>{{calendarVariables.right.calendar[row][0].week()}}</span>\r\n                        </td>\r\n                        <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\r\n                            <span>{{calendarVariables.right.calendar[row][0].isoWeek()}}</span>\r\n                        </td>\r\n                        <td *ngFor=\"let col of calendarVariables.right.calCols\" [class]=\"calendarVariables.right.classes[row][col]\" (click)=\"clickDate($event, sideEnum.right, row, col)\" (mouseenter)=\"hoverDate($event, sideEnum.right, row, col)\">\r\n                            <span>{{calendarVariables.right.calendar[row][col].date()}}</span>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"calendar-time\" *ngIf=\"timePicker\">\r\n            <div class=\"select\">\r\n                <select class=\"select-item hourselect\" [disabled]=\"!startDate\" [(ngModel)]=\"timepickerVariables.right.selectedHour\" (ngModelChange)=\"timeChanged($event, sideEnum.right)\">\r\n                    <option *ngFor=\"let i of timepickerVariables.right.hours\"\r\n                    [value]=\"i\"\r\n                    [disabled]=\"timepickerVariables.right.disabledHours.indexOf(i) > -1\">{{i}}</option>\r\n                </select>\r\n                <span class=\"select-highlight\"></span>\r\n                <span class=\"select-bar\"></span>\r\n            </div>\r\n            <div class=\"select\">\r\n                <select class=\"select-item minuteselect\" [disabled]=\"!startDate\" [(ngModel)]=\"timepickerVariables.right.selectedMinute\" (ngModelChange)=\"timeChanged($event, sideEnum.right)\">\r\n                    <option *ngFor=\"let i of timepickerVariables.right.minutes; let index = index;\"\r\n                    [value]=\"i\"\r\n                    [disabled]=\"timepickerVariables.right.disabledMinutes.indexOf(i) > -1\">{{timepickerVariables.right.minutesLabel[index]}}</option>\r\n                </select>\r\n                <span class=\"select-highlight\"></span>\r\n                <span class=\"select-bar\"></span>\r\n            </div>\r\n            <div class=\"select\">\r\n                <select *ngIf=\"timePickerSeconds\" class=\"select-item secondselect\" [disabled]=\"!startDate\" [(ngModel)]=\"timepickerVariables.right.selectedSecond\" (ngModelChange)=\"timeChanged($event, sideEnum.right)\">\r\n                    <option *ngFor=\"let i of timepickerVariables.right.seconds; let index = index;\"\r\n                    [value]=\"i\"\r\n                    [disabled]=\"timepickerVariables.right.disabledSeconds.indexOf(i) > -1\">{{timepickerVariables.right.secondsLabel[index]}}</option>\r\n                </select>\r\n                <span class=\"select-highlight\"></span>\r\n                <span class=\"select-bar\"></span>\r\n            </div>\r\n            <div class=\"select\">\r\n                <select *ngIf=\"!timePicker24Hour\" class=\"select-item ampmselect\" [(ngModel)]=\"timepickerVariables.right.ampmModel\" (ngModelChange)=\"timeChanged($event, sideEnum.right)\">\r\n                    <option value=\"AM\" [disabled]=\"timepickerVariables.right.amDisabled\">AM</option>\r\n                    <option value=\"PM\"  [disabled]=\"timepickerVariables.right.pmDisabled\">PM</option>\r\n                </select>\r\n                <span class=\"select-highlight\"></span>\r\n                <span class=\"select-bar\"></span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"buttons\" *ngIf=\"!autoApply && ( !rangesArray.length || (showCalInRanges && !singleDatePicker))\">\r\n        <div class=\"buttons_input\">\r\n            <button  *ngIf=\"showClearButton\" class=\"btn btn-default clear\" type=\"button\" (click)=\"clear()\" [title]=\"locale.clearLabel\">\r\n                {{locale.clearLabel}}\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 -5 24 24\"><path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/></svg>\r\n            </button>\r\n            <button class=\"btn btn-default\" *ngIf=\"showCancel\" type=\"button\" (click)=\"clickCancel($event)\">{{locale.cancelLabel}}</button>\r\n            <button class=\"btn\"  [disabled]=\"applyBtn.disabled\" type=\"button\" (click)=\"clickApply($event)\">{{locale.applyLabel}}</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
            host: {
                '(click)': 'handleInternalClick($event)',
            },
            encapsulation: ViewEncapsulation.None,
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return DaterangepickerComponent_1; }),
                    multi: true
                }],
            styles: [".md-drppicker{position:absolute;font-family:Roboto,sans-serif;color:inherit;border-radius:4px;width:278px;padding:4px;margin-top:-10px;overflow:hidden;z-index:1000;font-size:14px;background-color:#fff;box-shadow:0 2px 4px 0 rgba(0,0,0,.16),0 2px 8px 0 rgba(0,0,0,.12)}.md-drppicker.double{width:auto}.md-drppicker.inline{position:relative;display:inline-block}.md-drppicker:after,.md-drppicker:before{position:absolute;display:inline-block;border-bottom-color:rgba(0,0,0,.2);content:\"\"}.md-drppicker.openscenter:after,.md-drppicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.md-drppicker.single .calendar,.md-drppicker.single .ranges{float:none}.md-drppicker.shown{transform:scale(1);transition:.1s ease-in-out;transform-origin:0 0;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md-drppicker.shown.drops-up-left{transform-origin:100% 100%}.md-drppicker.shown.drops-up-right{transform-origin:0 100%}.md-drppicker.shown.drops-down-left{transform-origin:100% 0}.md-drppicker.shown.drops-down-right{transform-origin:0 0}.md-drppicker.shown.drops-down-center{transform-origin:NaN%}.md-drppicker.shown.drops-up-center{transform-origin:50%}.md-drppicker.shown .calendar{display:block}.md-drppicker.hidden{transition:.1s;transform:scale(0);transform-origin:0 0;cursor:default;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md-drppicker.hidden.drops-up-left{transform-origin:100% 100%}.md-drppicker.hidden.drops-up-right{transform-origin:0 100%}.md-drppicker.hidden.drops-down-left{transform-origin:100% 0}.md-drppicker.hidden.drops-down-right{transform-origin:0 0}.md-drppicker.hidden.drops-down-center{transform-origin:50% 0}.md-drppicker.hidden.drops-up-center{transform-origin:50% 100%}.md-drppicker.hidden .calendar{display:none}.md-drppicker .calendar{max-width:270px;margin:4px}.md-drppicker .calendar.single .calendar-table{border:none}.md-drppicker .calendar td,.md-drppicker .calendar th{padding:0;white-space:nowrap;text-align:center;min-width:32px}.md-drppicker .calendar td span,.md-drppicker .calendar th span{pointer-events:none}.md-drppicker .calendar-table{border:1px solid #fff;padding:4px;border-radius:4px;background-color:#fff}.md-drppicker table{width:100%;margin:0}.md-drppicker th{color:#988c8c}.md-drppicker td,.md-drppicker th{text-align:center;border-radius:4px;border:1px solid transparent;white-space:nowrap;cursor:pointer;height:2em;width:2em}.md-drppicker td.available.prev,.md-drppicker th.available.prev{display:block;background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMy43IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMuNyA2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0zLjcsMC43TDEuNCwzbDIuMywyLjNMMyw2TDAsM2wzLTNMMy43LDAuN3oiLz4NCjwvZz4NCjwvc3ZnPg0K);background-repeat:no-repeat;background-size:.5em;background-position:center;opacity:.8;transition:background-color .2s;border-radius:2em}.md-drppicker td.available.prev:hover,.md-drppicker th.available.prev:hover{margin:0}.md-drppicker td.available.next,.md-drppicker th.available.next{transform:rotate(180deg);display:block;background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMy43IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMuNyA2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0zLjcsMC43TDEuNCwzbDIuMywyLjNMMyw2TDAsM2wzLTNMMy43LDAuN3oiLz4NCjwvZz4NCjwvc3ZnPg0K);background-repeat:no-repeat;background-size:.5em;background-position:center;opacity:.8;transition:background-color .2s;border-radius:2em}.md-drppicker td.available.next:hover,.md-drppicker th.available.next:hover{margin:0;transform:rotate(180deg)}.md-drppicker td.available:hover,.md-drppicker th.available:hover{background-color:#eee;border-color:transparent;color:inherit;background-repeat:no-repeat;background-size:.5em;background-position:center;margin:.25em 0;opacity:.8;border-radius:2em;transform:scale(1);transition:450ms cubic-bezier(.23,1,.32,1)}.md-drppicker td.week,.md-drppicker th.week{font-size:80%;color:#ccc}.md-drppicker td{margin:.25em 0;opacity:.8;transition:450ms cubic-bezier(.23,1,.32,1);border-radius:2em;transform:scale(1)}.md-drppicker td.off,.md-drppicker td.off.end-date,.md-drppicker td.off.in-range,.md-drppicker td.off.start-date{background-color:#fff;border-color:transparent;color:#999}.md-drppicker td.in-range{background-color:#dde2e4;border-color:transparent;color:#000;border-radius:0}.md-drppicker td.start-date{border-radius:2em 0 0 2em}.md-drppicker td.end-date{border-radius:0 2em 2em 0}.md-drppicker td.start-date.end-date{border-radius:4px}.md-drppicker td.active{transition:background .3s ease-out;background:rgba(0,0,0,.1)}.md-drppicker td.active,.md-drppicker td.active:hover{background-color:#3f51b5;border-color:transparent;color:#fff}.md-drppicker th.month{width:auto}.md-drppicker option.disabled,.md-drppicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.md-drppicker .dropdowns{background-repeat:no-repeat;background-size:10px;background-position-y:center;background-position-x:right;width:50px;background-image:url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI1NSAyNTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI1NSAyNTU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iYXJyb3ctZHJvcC1kb3duIj4KCQk8cG9seWdvbiBwb2ludHM9IjAsNjMuNzUgMTI3LjUsMTkxLjI1IDI1NSw2My43NSAgICIgZmlsbD0iIzk4OGM4YyIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)}.md-drppicker .dropdowns select{display:inline-block;background-color:rgba(255,255,255,.9);width:100%;padding:5px;border:1px solid #f2f2f2;border-radius:2px;height:3rem}.md-drppicker .dropdowns select.ampmselect,.md-drppicker .dropdowns select.hourselect,.md-drppicker .dropdowns select.minuteselect,.md-drppicker .dropdowns select.secondselect{width:50px;margin:0 auto;background:#eee;border:1px solid #eee;padding:2px;outline:0;font-size:12px}.md-drppicker .dropdowns select.monthselect,.md-drppicker .dropdowns select.yearselect{font-size:12px;height:auto;cursor:pointer;opacity:0;position:absolute;top:0;left:0;margin:0;padding:0}.md-drppicker th.month>div{position:relative;display:inline-block}.md-drppicker .calendar-time{text-align:center;margin:4px auto 0;line-height:30px;position:relative}.md-drppicker .calendar-time .select{display:inline}.md-drppicker .calendar-time .select .select-item{display:inline-block;width:auto;position:relative;font-family:inherit;background-color:transparent;padding:10px 10px 10px 0;font-size:18px;border-radius:0;border:none;border-bottom:1px solid rgba(0,0,0,.12)}.md-drppicker .calendar-time .select .select-item:after{position:absolute;top:18px;right:10px;width:0;height:0;padding:0;content:\"\";border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid rgba(0,0,0,.12);pointer-events:none}.md-drppicker .calendar-time .select .select-item:focus{outline:0}.md-drppicker .calendar-time .select .select-item .select-label{color:rgba(0,0,0,.26);font-size:16px;font-weight:400;position:absolute;pointer-events:none;left:0;top:10px;transition:.2s}.md-drppicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.md-drppicker .label-input{border:1px solid #ccc;border-radius:4px;color:#555;height:30px;line-height:30px;display:block;vertical-align:middle;margin:0 auto 5px;padding:0 0 0 28px;width:100%}.md-drppicker .label-input.active{border:1px solid #08c;border-radius:4px}.md-drppicker .md-drppicker_input{position:relative;padding:0 30px 0 0}.md-drppicker .md-drppicker_input i,.md-drppicker .md-drppicker_input svg{position:absolute;left:8px;top:8px}.md-drppicker.rtl .label-input{padding-right:28px;padding-left:6px}.md-drppicker.rtl .md-drppicker_input i,.md-drppicker.rtl .md-drppicker_input svg{left:auto;right:8px}.md-drppicker .show-ranges .drp-calendar.left{border-left:1px solid #ddd}.md-drppicker .ranges{float:none;text-align:left;margin:0}.md-drppicker .ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.md-drppicker .ranges ul li{font-size:12px}.md-drppicker .ranges ul li button{padding:8px 12px;width:100%;background:0 0;border:none;text-align:left;cursor:pointer}.md-drppicker .ranges ul li button.active{background-color:#3f51b5;color:#fff}.md-drppicker .ranges ul li button[disabled]{opacity:.3}.md-drppicker .ranges ul li button:active{background:0 0}.md-drppicker .ranges ul li:hover{background-color:#eee}.md-drppicker .show-calendar .ranges{margin-top:8px}.md-drppicker [hidden]{display:none}.md-drppicker .buttons{text-align:right;margin:0 5px 5px 0}.md-drppicker .btn{position:relative;overflow:hidden;border-width:0;outline:0;padding:0 6px;cursor:pointer;border-radius:2px;box-shadow:0 1px 4px rgba(0,0,0,.6);background-color:#3f51b5;color:#ecf0f1;transition:background-color .4s;height:auto;text-transform:uppercase;line-height:36px;border:none}.md-drppicker .btn:focus,.md-drppicker .btn:hover{background-color:#3f51b5}.md-drppicker .btn>*{position:relative}.md-drppicker .btn span{display:block;padding:12px 24px}.md-drppicker .btn:before{content:\"\";position:absolute;top:50%;left:50%;display:block;width:0;padding-top:0;border-radius:100%;background-color:rgba(236,240,241,.3);transform:translate(-50%,-50%)}.md-drppicker .btn:active:before{width:120%;padding-top:120%;transition:width .2s ease-out,padding-top .2s ease-out}.md-drppicker .btn:disabled{opacity:.5}.md-drppicker .btn.btn-default{color:#000;background-color:#dcdcdc}.md-drppicker .clear{box-shadow:none;background-color:#fff!important}.md-drppicker .clear svg{color:#eb3232;fill:currentColor}@media (min-width:564px){.md-drppicker{width:auto}.md-drppicker.single .calendar.left{clear:none}.md-drppicker.ltr{direction:ltr;text-align:left}.md-drppicker.ltr .calendar.left{clear:left}.md-drppicker.ltr .calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;padding-right:12px}.md-drppicker.ltr .calendar.right{margin-left:0}.md-drppicker.ltr .calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.ltr .left .md-drppicker_input,.md-drppicker.ltr .right .md-drppicker_input{padding-right:35px}.md-drppicker.ltr .calendar,.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl{direction:rtl;text-align:right}.md-drppicker.rtl .calendar.left{clear:right;margin-left:0}.md-drppicker.rtl .calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.rtl .calendar.right{margin-right:0}.md-drppicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.rtl .calendar.left .calendar-table,.md-drppicker.rtl .left .md-drppicker_input{padding-left:12px}.md-drppicker.rtl .calendar,.md-drppicker.rtl .ranges{text-align:right;float:right}.drp-animate{transform:translate(0);transition:transform .2s,opacity .2s}.drp-animate.drp-picker-site-this{transition-timing-function:linear}.drp-animate.drp-animate-right{transform:translateX(10%);opacity:0}.drp-animate.drp-animate-left{transform:translateX(-10%);opacity:0}}@media (min-width:730px){.md-drppicker .ranges{width:auto}.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl .ranges{float:right}.md-drppicker .calendar.left{clear:none!important}}"]
        })
    ], DaterangepickerComponent);
    return DaterangepickerComponent;
}());
export { DaterangepickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SixPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QixNQUFNLENBQU4sSUFBWSxRQUdYO0FBSEQsV0FBWSxRQUFRO0lBQ2hCLHlCQUFhLENBQUE7SUFDYiwyQkFBZSxDQUFBO0FBQ25CLENBQUMsRUFIVyxRQUFRLEtBQVIsUUFBUSxRQUduQjtBQWdCRDtJQXFISSxrQ0FDWSxFQUFjLEVBQ2QsSUFBdUIsRUFDdkIsY0FBNkI7UUFGN0IsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBdkhqQyxTQUFJLEdBQTJCLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFFaEUsc0JBQWlCLEdBQTRCLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFDbkUsZ0JBQVcsR0FBRyxFQUFFLENBQUMsQ0FBRSwwQkFBMEI7UUFDN0Msd0JBQW1CLEdBQTRCLEVB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LEtBQUssRUFBRTsyRUFDc0I7SUFFOUI7UUFEQyxLQUFLLEVBQUU7MEVBQ3FCO0lBYXBCO1FBQVIsS0FBSyxFQUFFOzJEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7MkRBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTtzRUFBeUI7SUFDdkI7UUFBVCxNQUFNLEVBQUU7aUVBQW1DO0lBQ2xDO1FBQVQsTUFBTSxFQUFFO2tFQUFvQztJQUNuQztRQUFULE1BQU0sRUFBRTtrRUFBb0M7SUFDbkM7UUFBVCxNQUFNLEVBQUU7c0VBQXdDO0lBQ3ZDO1FBQVQsTUFBTSxFQUFFO29FQUFzQztJQUNDO1FBQS9DLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztxRUFBNkI7SUF3YTVFO1FBREMsS0FBSyxFQUFFO2lFQUdQO0lBRUQ7UUFEQyxLQUFLLEVBQUU7Z0VBR1A7SUFFRDtRQURDLEtBQUssRUFBRTtpRUFHUDtJQXJpQlEsd0JBQXdCO1FBZHBDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSw4QkFBOEI7WUFFeEMsODRqQkFBK0M7WUFDL0MsSUFBSSxFQUFFO2dCQUNOLFNBQVMsRUFBRSw2QkFBNkI7YUFDdkM7WUFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxTQUFTLEVBQUUsQ0FBQztvQkFDUixPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSwwQkFBd0IsRUFBeEIsQ0FBd0IsQ0FBQztvQkFDdkQsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQzs7U0FDTCxDQUFDO09BQ1csd0JBQXdCLENBa3ZDcEM7SUFBRCwrQkFBQztDQUFBLEFBbHZDRCxJQWt2Q0M7U0FsdkNZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0ICogYXMgX21vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgeyBMb2NhbGVDb25maWcgfSBmcm9tICcuL2RhdGVyYW5nZXBpY2tlci5jb25maWcnO1xyXG5pbXBvcnQgeyBMb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbGUuc2VydmljZSc7XHJcblxyXG5jb25zdCBtb21lbnQgPSBfbW9tZW50O1xyXG5cclxuZXhwb3J0IGVudW0gU2lkZUVudW0ge1xyXG4gICAgbGVmdCA9ICdsZWZ0JyxcclxuICAgIHJpZ2h0ID0gJ3JpZ2h0J1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LWRhdGVyYW5nZXBpY2tlci1tYXRlcmlhbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9kYXRlcmFuZ2VwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlcmFuZ2VwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgaG9zdDoge1xyXG4gICAgJyhjbGljayknOiAnaGFuZGxlSW50ZXJuYWxDbGljaygkZXZlbnQpJyxcclxuICAgIH0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gICAgcHJvdmlkZXJzOiBbe1xyXG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVyYW5nZXBpY2tlckNvbXBvbmVudCksXHJcbiAgICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBfb2xkOiB7c3RhcnQ6IGFueSwgZW5kOiBhbnl9ID0ge3N0YXJ0OiBudWxsLCBlbmQ6IG51bGx9O1xyXG4gICAgY2hvc2VuTGFiZWw6IHN0cmluZztcclxuICAgIGNhbGVuZGFyVmFyaWFibGVzOiB7bGVmdDogYW55LCByaWdodDogYW55fSA9IHtsZWZ0OiB7fSwgcmlnaHQ6IHt9fTtcclxuICAgIHRvb2x0aXB0ZXh0ID0gW107ICAvLyBmb3Igc3RvcmluZyB0b29sdGlwdGV4dFxyXG4gICAgdGltZXBpY2tlclZhcmlhYmxlczoge2xlZnQ6IGFueSwgcmlnaHQ6IGFueX0gPSB7bGVmdDoge30sIHJpZ2h0OiB7fX07XHJcbiAgICBkYXRlcmFuZ2VwaWNrZXI6IHtzdGFydDogRm9ybUNvbnRyb2wsIGVuZDogRm9ybUNvbnRyb2x9ID0ge3N0YXJ0OiBuZXcgRm9ybUNvbnRyb2woKSwgZW5kOiBuZXcgRm9ybUNvbnRyb2woKX07XHJcbiAgICBhcHBseUJ0bjoge2Rpc2FibGVkOiBib29sZWFufSA9IHtkaXNhYmxlZDogZmFsc2V9O1xyXG4gICAgQElucHV0KClcclxuICAgIHN0YXJ0RGF0ZSA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgQElucHV0KClcclxuICAgIGVuZERhdGUgPSBtb21lbnQoKS5lbmRPZignZGF5Jyk7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGRhdGVMaW1pdDogbnVtYmVyID0gbnVsbDtcclxuICAgIC8vIHVzZWQgaW4gdGVtcGxhdGUgZm9yIGNvbXBpbGUgdGltZSBzdXBwb3J0IG9mIGVudW0gdmFsdWVzLlxyXG4gICAgc2lkZUVudW0gPSBTaWRlRW51bTtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgbWluRGF0ZTogX21vbWVudC5Nb21lbnQgPSBudWxsO1xyXG4gICAgQElucHV0KClcclxuICAgIG1heERhdGU6IF9tb21lbnQuTW9tZW50ID0gbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBhdXRvQXBwbHk6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBzaW5nbGVEYXRlUGlja2VyOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2hvd0Ryb3Bkb3duczogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KClcclxuICAgIHNob3dXZWVrTnVtYmVyczogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KClcclxuICAgIHNob3dJU09XZWVrTnVtYmVyczogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KClcclxuICAgIGxpbmtlZENhbGVuZGFyczogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KClcclxuICAgIGF1dG9VcGRhdGVJbnB1dDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgYWx3YXlzU2hvd0NhbGVuZGFyczogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KClcclxuICAgIG1heFNwYW46IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBsb2NrU3RhcnREYXRlOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyB0aW1lcGlja2VyIHZhcmlhYmxlc1xyXG4gICAgQElucHV0KClcclxuICAgIHRpbWVQaWNrZXI6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICB0aW1lUGlja2VyMjRIb3VyOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgdGltZVBpY2tlckluY3JlbWVudCA9IDE7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgdGltZVBpY2tlclNlY29uZHM6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vIGVuZCBvZiB0aW1lcGlja2VyIHZhcmlhYmxlc1xyXG4gICAgQElucHV0KClcclxuICAgIHNob3dDbGVhckJ1dHRvbjogQm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KClcclxuICAgIGZpcnN0TW9udGhEYXlDbGFzczogc3RyaW5nID0gbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBsYXN0TW9udGhEYXlDbGFzczogc3RyaW5nID0gbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBlbXB0eVdlZWtSb3dDbGFzczogc3RyaW5nID0gbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBlbXB0eVdlZWtDb2x1bW5DbGFzczogc3RyaW5nID0gbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBmaXJzdERheU9mTmV4dE1vbnRoQ2xhc3M6IHN0cmluZyA9IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgbGFzdERheU9mUHJldmlvdXNNb250aENsYXNzOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIF9sb2NhbGU6IExvY2FsZUNvbmZpZyA9IHt9O1xyXG4gICAgQElucHV0KCkgc2V0IGxvY2FsZSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9sb2NhbGUgPSB7Li4udGhpcy5fbG9jYWxlU2VydmljZS5jb25maWcsIC4uLnZhbHVlfTtcclxuICAgIH1cclxuICAgIGdldCBsb2NhbGUoKTogYW55IHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcclxuICAgIH1cclxuICAgIC8vIGN1c3RvbSByYW5nZXNcclxuICAgIF9yYW5nZXM6IGFueSA9IHt9O1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCByYW5nZXModmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9yYW5nZXMgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnJlbmRlclJhbmdlcygpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJhbmdlcygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5nZXM7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNob3dDdXN0b21SYW5nZUxhYmVsOiBib29sZWFuO1xyXG4gICAgQElucHV0KClcclxuICAgIHNob3dDYW5jZWwgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBrZWVwQ2FsZW5kYXJPcGVuaW5nV2l0aFJhbmdlID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2hvd1JhbmdlTGFiZWxPbklucHV0ID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgY3VzdG9tUmFuZ2VEaXJlY3Rpb24gPSBmYWxzZTtcclxuICAgIGNob3NlblJhbmdlOiBzdHJpbmc7XHJcbiAgICByYW5nZXNBcnJheTogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAgIC8vIHNvbWUgc3RhdGUgaW5mb3JtYXRpb25cclxuICAgIGlzU2hvd246IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlubGluZSA9IHRydWU7XHJcbiAgICBsZWZ0Q2FsZW5kYXI6IGFueSA9IHt9O1xyXG4gICAgcmlnaHRDYWxlbmRhcjogYW55ID0ge307XHJcbiAgICBzaG93Q2FsSW5SYW5nZXM6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIG5vd0hvdmVyZWREYXRlID0gbnVsbDtcclxuICAgIHBpY2tpbmdEYXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBvcHRpb25zOiBhbnkgPSB7fSA7IC8vIHNob3VsZCBnZXQgc29tZSBvcHQgZnJvbSB1c2VyXHJcbiAgICBASW5wdXQoKSBkcm9wczogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgb3BlbnM6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGNsb3NlT25BdXRvQXBwbHkgPSB0cnVlO1xyXG4gICAgQE91dHB1dCgpIGNob29zZWREYXRlOiBFdmVudEVtaXR0ZXI8T2JqZWN0PjtcclxuICAgIEBPdXRwdXQoKSByYW5nZUNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+O1xyXG4gICAgQE91dHB1dCgpIGRhdGVzVXBkYXRlZDogRXZlbnRFbWl0dGVyPE9iamVjdD47XHJcbiAgICBAT3V0cHV0KCkgc3RhcnREYXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPE9iamVjdD47XHJcbiAgICBAT3V0cHV0KCkgZW5kRGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+O1xyXG4gICAgQFZpZXdDaGlsZCgncGlja2VyQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgcGlja2VyQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBfcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBwcml2YXRlIF9sb2NhbGVTZXJ2aWNlOiBMb2NhbGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmNob29zZWREYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIHRoaXMucmFuZ2VDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIHRoaXMuZGF0ZXNVcGRhdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgICAgICB0aGlzLmVuZERhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuX2J1aWxkTG9jYWxlKCk7XHJcbiAgICAgICAgY29uc3QgZGF5c09mV2VlayA9IFsuLi50aGlzLmxvY2FsZS5kYXlzT2ZXZWVrXTtcclxuICAgICAgICB0aGlzLmxvY2FsZS5maXJzdERheSA9IHRoaXMubG9jYWxlLmZpcnN0RGF5ICUgNztcclxuICAgICAgICBpZiAodGhpcy5sb2NhbGUuZmlyc3REYXkgIT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZXJhdG9yID0gdGhpcy5sb2NhbGUuZmlyc3REYXk7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoaXRlcmF0b3IgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlzT2ZXZWVrLnB1c2goZGF5c09mV2Vlay5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2NhbGUuZGF5c09mV2VlayA9IGRheXNPZldlZWs7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29sZC5zdGFydCA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX29sZC5lbmQgPSB0aGlzLmVuZERhdGUuY2xvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAmJiB0aGlzLnRpbWVQaWNrZXIpIHtcclxuICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKHRoaXMuc3RhcnREYXRlKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyVGltZVBpY2tlcihTaWRlRW51bS5sZWZ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVuZERhdGUgJiYgdGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICB0aGlzLnNldEVuZERhdGUodGhpcy5lbmREYXRlKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyVGltZVBpY2tlcihTaWRlRW51bS5yaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZU1vbnRoc0luVmlldygpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoU2lkZUVudW0ubGVmdCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihTaWRlRW51bS5yaWdodCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJSYW5nZXMoKTtcclxuICAgIH1cclxuICAgIHJlbmRlclJhbmdlcygpIHtcclxuICAgICAgICB0aGlzLnJhbmdlc0FycmF5ID0gW107XHJcbiAgICAgICAgbGV0IHN0YXJ0LCBlbmQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJhbmdlcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCByYW5nZSBpbiB0aGlzLnJhbmdlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2VzW3JhbmdlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5yYW5nZXNbcmFuZ2VdWzBdID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IG1vbWVudCh0aGlzLnJhbmdlc1tyYW5nZV1bMF0sIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBtb21lbnQodGhpcy5yYW5nZXNbcmFuZ2VdWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJhbmdlc1tyYW5nZV1bMV0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IG1vbWVudCh0aGlzLnJhbmdlc1tyYW5nZV1bMV0sIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gbW9tZW50KHRoaXMucmFuZ2VzW3JhbmdlXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzdGFydCBvciBlbmQgZGF0ZSBleGNlZWQgdGhvc2UgYWxsb3dlZCBieSB0aGUgbWluRGF0ZSBvciBtYXhTcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb3B0aW9ucywgc2hvcnRlbiB0aGUgcmFuZ2UgdG8gdGhlIGFsbG93YWJsZSBwZXJpb2QuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiBzdGFydC5pc0JlZm9yZSh0aGlzLm1pbkRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5taW5EYXRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heFNwYW4gJiYgbWF4RGF0ZSAmJiBzdGFydC5jbG9uZSgpLmFkZCh0aGlzLm1heFNwYW4pLmlzQWZ0ZXIobWF4RGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZSA9IHN0YXJ0LmNsb25lKCkuYWRkKHRoaXMubWF4U3Bhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXhEYXRlICYmIGVuZC5pc0FmdGVyKG1heERhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IG1heERhdGUuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGVuZCBvZiB0aGUgcmFuZ2UgaXMgYmVmb3JlIHRoZSBtaW5pbXVtIG9yIHRoZSBzdGFydCBvZiB0aGUgcmFuZ2UgaXNcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZnRlciB0aGUgbWF4aW11bSwgZG9uJ3QgZGlzcGxheSB0aGlzIHJhbmdlIG9wdGlvbiBhdCBhbGwuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGlzLm1pbkRhdGUgJiYgZW5kLmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgdGhpcy50aW1lUGlja2VyID8gJ21pbnV0ZScgOiAnZGF5JykpXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgKG1heERhdGUgJiYgc3RhcnQuaXNBZnRlcihtYXhEYXRlLCB0aGlzLnRpbWVQaWNrZXIgPyAnbWludXRlJyA6ICdkYXknKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQgdW5pY29kZSBjaGFycyBpbiB0aGUgcmFuZ2UgbmFtZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSByYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZUh0bWwgPSBlbGVtLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VzW3JhbmdlSHRtbF0gPSBbc3RhcnQsIGVuZF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCByYW5nZSBpbiB0aGlzLnJhbmdlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2VzW3JhbmdlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VzQXJyYXkucHVzaChyYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0N1c3RvbVJhbmdlTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VzQXJyYXkucHVzaCh0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNob3dDYWxJblJhbmdlcyA9ICghdGhpcy5yYW5nZXNBcnJheS5sZW5ndGgpIHx8IHRoaXMuYWx3YXlzU2hvd0NhbGVuZGFycztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUuc3RhcnRPZignZGF5Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLmVuZERhdGUuZW5kT2YoJ2RheScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHJlbmRlclRpbWVQaWNrZXIoc2lkZTogU2lkZUVudW0pIHsgICAgICAgIFxyXG4gICAgICAgIGxldCBzZWxlY3RlZCwgbWluRGF0ZTtcclxuICAgICAgICBjb25zdCBtYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xyXG4gICAgICAgIGlmIChzaWRlID09PSBTaWRlRW51bS5sZWZ0KSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKSxcclxuICAgICAgICAgICAgbWluRGF0ZSA9IHRoaXMubWluRGF0ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNpZGUgPT09IFNpZGVFbnVtLnJpZ2h0ICYmIHRoaXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpLFxyXG4gICAgICAgICAgICBtaW5EYXRlID0gdGhpcy5zdGFydERhdGU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzaWRlID09PSBTaWRlRW51bS5yaWdodCAmJiAhdGhpcy5lbmREYXRlKSB7XHJcbiAgICAgICAgICAgIC8vIGRvbid0IGhhdmUgYW4gZW5kIGRhdGUsIHVzZSB0aGUgc3RhcnQgZGF0ZSB0aGVuIHB1dCB0aGUgc2VsZWN0ZWQgdGltZSBmb3IgdGhlIHJpZ2h0IHNpZGUgYXMgdGhlIHRpbWVcclxuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLl9nZXREYXRlV2l0aFRpbWUodGhpcy5zdGFydERhdGUsIFNpZGVFbnVtLnJpZ2h0KTtcclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWQuaXNCZWZvcmUodGhpcy5zdGFydERhdGUpKXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTsgIC8vc2V0IGl0IGJhY2sgdG8gdGhlIHN0YXJ0IGRhdGUgdGhlIHRpbWUgd2FzIGJhY2t3YXJkc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1pbkRhdGUgPSB0aGlzLnN0YXJ0RGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLnRpbWVQaWNrZXIyNEhvdXIgPyAwIDogMTtcclxuICAgICAgICBjb25zdCBlbmQgPSB0aGlzLnRpbWVQaWNrZXIyNEhvdXIgPyAyMyA6IDEyO1xyXG4gICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXSA9IHtcclxuICAgICAgICAgICAgaG91cnM6IFtdLFxyXG4gICAgICAgICAgICBtaW51dGVzOiBbXSxcclxuICAgICAgICAgICAgbWludXRlc0xhYmVsOiBbXSxcclxuICAgICAgICAgICAgc2Vjb25kczogW10sXHJcbiAgICAgICAgICAgIHNlY29uZHNMYWJlbDogW10sXHJcbiAgICAgICAgICAgIGRpc2FibGVkSG91cnM6IFtdLFxyXG4gICAgICAgICAgICBkaXNhYmxlZE1pbnV0ZXM6IFtdLFxyXG4gICAgICAgICAgICBkaXNhYmxlZFNlY29uZHM6IFtdLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEhvdXI6IDAsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkTWludXRlOiAwLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFNlY29uZDogMCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIGhvdXJzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpX2luXzI0ID0gaTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIyNEhvdXIpIHtcclxuICAgICAgICAgICAgICAgIGlfaW5fMjQgPSBzZWxlY3RlZC5ob3VyKCkgPj0gMTIgPyAoaSA9PT0gMTIgPyAxMiA6IGkgKyAxMikgOiAoaSA9PT0gMTIgPyAwIDogaSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBzZWxlY3RlZC5jbG9uZSgpLmhvdXIoaV9pbl8yNCk7XHJcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobWluRGF0ZSAmJiB0aW1lLm1pbnV0ZSg1OSkuaXNCZWZvcmUobWluRGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiB0aW1lLm1pbnV0ZSgwKS5pc0FmdGVyKG1heERhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5ob3Vycy5wdXNoKGkpO1xyXG4gICAgICAgICAgICBpZiAoaV9pbl8yNCA9PT0gc2VsZWN0ZWQuaG91cigpICYmICFkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLnNlbGVjdGVkSG91ciA9IGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5kaXNhYmxlZEhvdXJzLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgbWludXRlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkgKz0gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhZGRlZCA9IGkgPCAxMCA/ICcwJyArIGkgOiBpO1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lID0gc2VsZWN0ZWQuY2xvbmUoKS5taW51dGUoaSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKG1pbkRhdGUgJiYgdGltZS5zZWNvbmQoNTkpLmlzQmVmb3JlKG1pbkRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1heERhdGUgJiYgdGltZS5zZWNvbmQoMCkuaXNBZnRlcihtYXhEYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5taW51dGVzLnB1c2goaSk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5taW51dGVzTGFiZWwucHVzaChwYWRkZWQpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQubWludXRlKCkgPT09IGkgJiYgIWRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2VsZWN0ZWRNaW51dGUgPSBpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uZGlzYWJsZWRNaW51dGVzLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUgc2Vjb25kc1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXJTZWNvbmRzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFkZGVkID0gaSA8IDEwID8gJzAnICsgaSA6IGk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gc2VsZWN0ZWQuY2xvbmUoKS5zZWNvbmQoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAobWluRGF0ZSAmJiB0aW1lLmlzQmVmb3JlKG1pbkRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1heERhdGUgJiYgdGltZS5pc0FmdGVyKG1heERhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5zZWNvbmRzLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2Vjb25kc0xhYmVsLnB1c2gocGFkZGVkKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC5zZWNvbmQoKSA9PT0gaSAmJiAhZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2VsZWN0ZWRTZWNvbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5kaXNhYmxlZFNlY29uZHMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnZW5lcmF0ZSBBTS9QTVxyXG4gICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhbV9odG1sID0gJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IHBtX2h0bWwgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmIChtaW5EYXRlICYmIHNlbGVjdGVkLmNsb25lKCkuaG91cigxMikubWludXRlKDApLnNlY29uZCgwKS5pc0JlZm9yZShtaW5EYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLmFtRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWF4RGF0ZSAmJiBzZWxlY3RlZC5jbG9uZSgpLmhvdXIoMCkubWludXRlKDApLnNlY29uZCgwKS5pc0FmdGVyKG1heERhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0ucG1EaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmhvdXIoKSA+PSAxMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLmFtcG1Nb2RlbCA9ICdQTSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uYW1wbU1vZGVsID0gJ0FNJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcclxuICAgIH1cclxuICAgIHJlbmRlckNhbGVuZGFyKHNpZGU6IFNpZGVFbnVtKSB7IC8vIHNpZGUgZW51bVxyXG4gICAgICAgIGNvbnN0IG1haW5DYWxlbmRhcjogYW55ID0gKCBzaWRlID09PSBTaWRlRW51bS5sZWZ0ICkgPyB0aGlzLmxlZnRDYWxlbmRhciA6IHRoaXMucmlnaHRDYWxlbmRhcjtcclxuICAgICAgICBjb25zdCBtb250aCA9IG1haW5DYWxlbmRhci5tb250aC5tb250aCgpO1xyXG4gICAgICAgIGNvbnN0IHllYXIgPSBtYWluQ2FsZW5kYXIubW9udGgueWVhcigpO1xyXG4gICAgICAgIGNvbnN0IGhvdXIgPSBtYWluQ2FsZW5kYXIubW9udGguaG91cigpO1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZSA9IG1haW5DYWxlbmRhci5tb250aC5taW51dGUoKTtcclxuICAgICAgICBjb25zdCBzZWNvbmQgPSBtYWluQ2FsZW5kYXIubW9udGguc2Vjb25kKCk7XHJcbiAgICAgICAgY29uc3QgZGF5c0luTW9udGggPSBtb21lbnQoW3llYXIsIG1vbnRoXSkuZGF5c0luTW9udGgoKTtcclxuICAgICAgICBjb25zdCBmaXJzdERheSA9IG1vbWVudChbeWVhciwgbW9udGgsIDFdKTtcclxuICAgICAgICBjb25zdCBsYXN0RGF5ID0gbW9tZW50KFt5ZWFyLCBtb250aCwgZGF5c0luTW9udGhdKTtcclxuICAgICAgICBjb25zdCBsYXN0TW9udGggPSBtb21lbnQoZmlyc3REYXkpLnN1YnRyYWN0KDEsICdtb250aCcpLm1vbnRoKCk7XHJcbiAgICAgICAgY29uc3QgbGFzdFllYXIgPSBtb21lbnQoZmlyc3REYXkpLnN1YnRyYWN0KDEsICdtb250aCcpLnllYXIoKTtcclxuICAgICAgICBjb25zdCBkYXlzSW5MYXN0TW9udGggPSBtb21lbnQoW2xhc3RZZWFyLCBsYXN0TW9udGhdKS5kYXlzSW5Nb250aCgpO1xyXG4gICAgICAgIGNvbnN0IGRheU9mV2VlayA9IGZpcnN0RGF5LmRheSgpO1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgYSA2IHJvd3MgeCA3IGNvbHVtbnMgYXJyYXkgZm9yIHRoZSBjYWxlbmRhclxyXG4gICAgICAgIGNvbnN0IGNhbGVuZGFyOiBhbnkgPSBbXTtcclxuICAgICAgICBjYWxlbmRhci5maXJzdERheSA9IGZpcnN0RGF5O1xyXG4gICAgICAgIGNhbGVuZGFyLmxhc3REYXkgPSBsYXN0RGF5O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICBjYWxlbmRhcltpXSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGNhbGVuZGFyIHdpdGggZGF0ZSBvYmplY3RzXHJcbiAgICAgICAgbGV0IHN0YXJ0RGF5ID0gZGF5c0luTGFzdE1vbnRoIC0gZGF5T2ZXZWVrICsgdGhpcy5sb2NhbGUuZmlyc3REYXkgKyAxO1xyXG4gICAgICAgIGlmIChzdGFydERheSA+IGRheXNJbkxhc3RNb250aCkge1xyXG4gICAgICAgICAgICBzdGFydERheSAtPSA3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRheU9mV2VlayA9PT0gdGhpcy5sb2NhbGUuZmlyc3REYXkpIHtcclxuICAgICAgICAgICAgc3RhcnREYXkgPSBkYXlzSW5MYXN0TW9udGggLSA2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1ckRhdGUgPSBtb21lbnQoW2xhc3RZZWFyLCBsYXN0TW9udGgsIHN0YXJ0RGF5LCAxMiwgbWludXRlLCBzZWNvbmRdKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGNvbCA9IDAsIHJvdyA9IDA7IGkgPCA0MjsgaSsrLCBjb2wrKywgY3VyRGF0ZSA9IG1vbWVudChjdXJEYXRlKS5hZGQoMjQsICdob3VyJykpIHtcclxuICAgICAgICAgICAgaWYgKGkgPiAwICYmIGNvbCAlIDcgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgICAgICAgICByb3crKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxlbmRhcltyb3ddW2NvbF0gPSBjdXJEYXRlLmNsb25lKCkuaG91cihob3VyKS5taW51dGUobWludXRlKS5zZWNvbmQoc2Vjb25kKTtcclxuICAgICAgICAgICAgY3VyRGF0ZS5ob3VyKDEyKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgY2FsZW5kYXJbcm93XVtjb2xdLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSB0aGlzLm1pbkRhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykgJiZcclxuICAgICAgICAgICAgY2FsZW5kYXJbcm93XVtjb2xdLmlzQmVmb3JlKHRoaXMubWluRGF0ZSkgJiYgc2lkZSA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhcltyb3ddW2NvbF0gPSB0aGlzLm1pbkRhdGUuY2xvbmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiBjYWxlbmRhcltyb3ddW2NvbF0uZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHRoaXMubWF4RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSAmJlxyXG4gICAgICAgICAgICBjYWxlbmRhcltyb3ddW2NvbF0uaXNBZnRlcih0aGlzLm1heERhdGUpICYmIHNpZGUgPT09ICdyaWdodCcpIHtcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXSA9IHRoaXMubWF4RGF0ZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBtYWtlIHRoZSBjYWxlbmRhciBvYmplY3QgYXZhaWxhYmxlIHRvIGhvdmVyRGF0ZS9jbGlja0RhdGVcclxuICAgICAgICBpZiAoc2lkZSA9PT0gU2lkZUVudW0ubGVmdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5jYWxlbmRhciA9IGNhbGVuZGFyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5jYWxlbmRhciA9IGNhbGVuZGFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIERpc3BsYXkgdGhlIGNhbGVuZGFyXHJcbiAgICAgICAgLy9cclxuICAgICAgICBjb25zdCBtaW5EYXRlID0gc2lkZSA9PT0gJ2xlZnQnID8gdGhpcy5taW5EYXRlIDogdGhpcy5zdGFydERhdGU7XHJcbiAgICAgICAgbGV0IG1heERhdGUgPSB0aGlzLm1heERhdGU7XHJcbiAgICAgICAgLy8gYWRqdXN0IG1heERhdGUgdG8gcmVmbGVjdCB0aGUgZGF0ZUxpbWl0IHNldHRpbmcgaW4gb3JkZXIgdG9cclxuICAgICAgICAvLyBncmV5IG91dCBlbmQgZGF0ZXMgYmV5b25kIHRoZSBkYXRlTGltaXRcclxuICAgICAgICBpZiAodGhpcy5lbmREYXRlID09PSBudWxsICYmIHRoaXMuZGF0ZUxpbWl0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heExpbWl0ID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5hZGQodGhpcy5kYXRlTGltaXQsICdkYXknKS5lbmRPZignZGF5Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1heERhdGUgfHwgbWF4TGltaXQuaXNCZWZvcmUobWF4RGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIG1heERhdGUgPSBtYXhMaW1pdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdID0ge1xyXG4gICAgICAgICAgICBtb250aDogbW9udGgsXHJcbiAgICAgICAgICAgIHllYXI6IHllYXIsXHJcbiAgICAgICAgICAgIGhvdXI6IGhvdXIsXHJcbiAgICAgICAgICAgIG1pbnV0ZTogbWludXRlLFxyXG4gICAgICAgICAgICBzZWNvbmQ6IHNlY29uZCxcclxuICAgICAgICAgICAgZGF5c0luTW9udGg6IGRheXNJbk1vbnRoLFxyXG4gICAgICAgICAgICBmaXJzdERheTogZmlyc3REYXksXHJcbiAgICAgICAgICAgIGxhc3REYXk6IGxhc3REYXksXHJcbiAgICAgICAgICAgIGxhc3RNb250aDogbGFzdE1vbnRoLFxyXG4gICAgICAgICAgICBsYXN0WWVhcjogbGFzdFllYXIsXHJcbiAgICAgICAgICAgIGRheXNJbkxhc3RNb250aDogZGF5c0luTGFzdE1vbnRoLFxyXG4gICAgICAgICAgICBkYXlPZldlZWs6IGRheU9mV2VlayxcclxuICAgICAgICAgICAgLy8gb3RoZXIgdmFyc1xyXG4gICAgICAgICAgICBjYWxSb3dzOiBBcnJheS5mcm9tKEFycmF5KDYpLmtleXMoKSksXHJcbiAgICAgICAgICAgIGNhbENvbHM6IEFycmF5LmZyb20oQXJyYXkoNykua2V5cygpKSxcclxuICAgICAgICAgICAgY2xhc3Nlczoge30sXHJcbiAgICAgICAgICAgIG1pbkRhdGU6IG1pbkRhdGUsXHJcbiAgICAgICAgICAgIG1heERhdGU6IG1heERhdGUsXHJcbiAgICAgICAgICAgIGNhbGVuZGFyOiBjYWxlbmRhclxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd0Ryb3Bkb3ducykge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TW9udGggPSBjYWxlbmRhclsxXVsxXS5tb250aCgpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50WWVhciA9IGNhbGVuZGFyWzFdWzFdLnllYXIoKTtcclxuICAgICAgICAgICAgY29uc3QgcmVhbEN1cnJlbnRZZWFyID0gbW9tZW50KCkueWVhcigpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhZZWFyID0gKG1heERhdGUgJiYgbWF4RGF0ZS55ZWFyKCkpIHx8IChyZWFsQ3VycmVudFllYXIgKyA1KTtcclxuICAgICAgICAgICAgY29uc3QgbWluWWVhciA9IChtaW5EYXRlICYmIG1pbkRhdGUueWVhcigpKSB8fCAocmVhbEN1cnJlbnRZZWFyIC0gNTApO1xyXG4gICAgICAgICAgICBjb25zdCBpbk1pblllYXIgPSBjdXJyZW50WWVhciA9PT0gbWluWWVhcjtcclxuICAgICAgICAgICAgY29uc3QgaW5NYXhZZWFyID0gY3VycmVudFllYXIgPT09IG1heFllYXI7XHJcbiAgICAgICAgICAgIGNvbnN0IHllYXJzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSBtaW5ZZWFyOyB5IDw9IG1heFllYXI7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgeWVhcnMucHVzaCh5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLmRyb3Bkb3ducyA9IHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRNb250aDogY3VycmVudE1vbnRoLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudFllYXI6IGN1cnJlbnRZZWFyLFxyXG4gICAgICAgICAgICAgICAgbWF4WWVhcjogbWF4WWVhcixcclxuICAgICAgICAgICAgICAgIG1pblllYXI6IG1pblllYXIsXHJcbiAgICAgICAgICAgICAgICBpbk1pblllYXI6IGluTWluWWVhcixcclxuICAgICAgICAgICAgICAgIGluTWF4WWVhcjogaW5NYXhZZWFyLFxyXG4gICAgICAgICAgICAgICAgbW9udGhBcnJheXM6IEFycmF5LmZyb20oQXJyYXkoMTIpLmtleXMoKSksXHJcbiAgICAgICAgICAgICAgICB5ZWFyQXJyYXlzOiB5ZWFyc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYnVpbGRDZWxscyhjYWxlbmRhciwgc2lkZSk7XHJcbiAgICB9XHJcbiAgICBzZXRTdGFydERhdGUoc3RhcnREYXRlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydERhdGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gbW9tZW50KHN0YXJ0RGF0ZSwgdGhpcy5sb2NhbGUuZm9ybWF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnREYXRlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnBpY2tpbmdEYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBtb21lbnQoc3RhcnREYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVQaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5waWNraW5nRGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUuc3RhcnRPZignZGF5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyICYmIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5taW51dGUoTWF0aC5yb3VuZCh0aGlzLnN0YXJ0RGF0ZS5taW51dGUoKSAvIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkgKiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdGhpcy5zdGFydERhdGUuaXNCZWZvcmUodGhpcy5taW5EYXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMubWluRGF0ZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyICYmIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGUubWludXRlKE1hdGgucm91bmQodGhpcy5zdGFydERhdGUubWludXRlKCkgLyB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpICogdGhpcy50aW1lUGlja2VySW5jcmVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5zdGFydERhdGUuaXNBZnRlcih0aGlzLm1heERhdGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5tYXhEYXRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIgJiYgdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5taW51dGUoTWF0aC5mbG9vcih0aGlzLnN0YXJ0RGF0ZS5taW51dGUoKSAvIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkgKiB0aGlzLnRpbWVQaWNrZXJJbmNyZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNTaG93bikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGFydERhdGVDaGFuZ2VkLmVtaXQoe3N0YXJ0RGF0ZTogdGhpcy5zdGFydERhdGV9KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1vbnRoc0luVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEVuZERhdGUoZW5kRGF0ZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kRGF0ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gbW9tZW50KGVuZERhdGUsIHRoaXMubG9jYWxlLmZvcm1hdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVuZERhdGUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2luZ0RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gbW9tZW50KGVuZERhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLnBpY2tpbmdEYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuZW5kRGF0ZS5hZGQoMSwgJ2QnKS5zdGFydE9mKCdkYXknKS5zdWJ0cmFjdCgxLCAnc2Vjb25kJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyICYmIHRoaXMudGltZVBpY2tlckluY3JlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUubWludXRlKE1hdGgucm91bmQodGhpcy5lbmREYXRlLm1pbnV0ZSgpIC8gdGhpcy50aW1lUGlja2VySW5jcmVtZW50KSAqIHRoaXMudGltZVBpY2tlckluY3JlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZS5pc0JlZm9yZSh0aGlzLnN0YXJ0RGF0ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5lbmREYXRlLmlzQWZ0ZXIodGhpcy5tYXhEYXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLm1heERhdGUuY2xvbmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRhdGVMaW1pdCAmJiB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmFkZCh0aGlzLmRhdGVMaW1pdCwgJ2RheScpLmlzQmVmb3JlKHRoaXMuZW5kRGF0ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKS5hZGQodGhpcy5kYXRlTGltaXQsICdkYXknKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNTaG93bikge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbmREYXRlQ2hhbmdlZC5lbWl0KHtlbmREYXRlOiB0aGlzLmVuZERhdGV9KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1vbnRoc0luVmlldygpO1xyXG4gICAgfVxyXG4gICAgQElucHV0KClcclxuICAgIGlzSW52YWxpZERhdGUoZGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIEBJbnB1dCgpXHJcbiAgICBpc0N1c3RvbURhdGUoZGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIEBJbnB1dCgpXHJcbiAgICBpc1Rvb2x0aXBEYXRlKGRhdGUpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZpZXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoU2lkZUVudW0ubGVmdCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGltZVBpY2tlcihTaWRlRW51bS5yaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlTW9udGhzSW5WaWV3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNb250aHNJblZpZXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICAvLyBpZiBib3RoIGRhdGVzIGFyZSB2aXNpYmxlIGFscmVhZHksIGRvIG5vdGhpbmdcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNpbmdsZURhdGVQaWNrZXIgJiYgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggJiYgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoICYmXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMuc3RhcnREYXRlICYmIHRoaXMubGVmdENhbGVuZGFyICYmIHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTScpID09PSB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSkgfHxcclxuICAgICAgICAgICAgICAgICh0aGlzLnN0YXJ0RGF0ZSAmJiB0aGlzLnJpZ2h0Q2FsZW5kYXIgJiYgdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NJykgPT09IHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSkpXHJcbiAgICAgICAgICAgICAgICAmJlxyXG4gICAgICAgICAgICAgICAgKHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0nKSA9PT0gdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGguZm9ybWF0KCdZWVlZLU1NJykgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0nKSA9PT0gdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmZvcm1hdCgnWVlZWS1NTScpKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aCA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCkuZGF0ZSgyKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5saW5rZWRDYWxlbmRhcnMgJiYgKHRoaXMuZW5kRGF0ZS5tb250aCgpICE9PSB0aGlzLnN0YXJ0RGF0ZS5tb250aCgpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlLnllYXIoKSAhPT0gdGhpcy5zdGFydERhdGUueWVhcigpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMuZW5kRGF0ZS5jbG9uZSgpLmRhdGUoMik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmRhdGUoMikuYWRkKDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnRDYWxlbmRhci5tb250aC5mb3JtYXQoJ1lZWVktTU0nKSAhPT0gdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NJykgJiZcclxuICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmZvcm1hdCgnWVlZWS1NTScpICE9PSB0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmRhdGUoMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpLmRhdGUoMikuYWRkKDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5saW5rZWRDYWxlbmRhcnMgJiYgIXRoaXMuc2luZ2xlRGF0ZVBpY2tlciAmJiB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGggPiB0aGlzLm1heERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoID0gdGhpcy5tYXhEYXRlLmNsb25lKCkuZGF0ZSgyKTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Q2FsZW5kYXIubW9udGggPSB0aGlzLm1heERhdGUuY2xvbmUoKS5kYXRlKDIpLnN1YnRyYWN0KDEsICdtb250aCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogIFRoaXMgaXMgcmVzcG9uc2libGUgZm9yIHVwZGF0aW5nIHRoZSBjYWxlbmRhcnNcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ2FsZW5kYXJzKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoU2lkZUVudW0ubGVmdCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihTaWRlRW51bS5yaWdodCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVuZERhdGUgPT09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlRWxlbWVudCgpIHtcclxuICAgICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLmxvY2FsZS5kaXNwbGF5Rm9ybWF0ID8gdGhpcy5sb2NhbGUuZGlzcGxheUZvcm1hdCA6IHRoaXMubG9jYWxlLmZvcm1hdDtcclxuICAgICAgICBpZiAoIXRoaXMuc2luZ2xlRGF0ZVBpY2tlciAmJiB0aGlzLmF1dG9VcGRhdGVJbnB1dCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydERhdGUgJiYgdGhpcy5lbmREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSB1c2UgcmFuZ2VzIGFuZCBzaG91bGQgc2hvdyByYW5nZSBsYWJlbCBvbiBpbnB1dFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2VzQXJyYXkubGVuZ3RoICYmIHRoaXMuc2hvd1JhbmdlTGFiZWxPbklucHV0ID09PSB0cnVlICYmIHRoaXMuY2hvc2VuUmFuZ2UgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsICE9PSB0aGlzLmNob3NlblJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9zZW5MYWJlbCA9IHRoaXMuY2hvc2VuUmFuZ2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSB0aGlzLnN0YXJ0RGF0ZS5mb3JtYXQoZm9ybWF0KSArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuc2VwYXJhdG9yICsgdGhpcy5lbmREYXRlLmZvcm1hdChmb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICggdGhpcy5hdXRvVXBkYXRlSW5wdXQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaG9zZW5MYWJlbCA9IHRoaXMuc3RhcnREYXRlLmZvcm1hdChmb3JtYXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3duID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHRoaXMgc2hvdWxkIGNhbGN1bGF0ZSB0aGUgbGFiZWxcclxuICAgICAqL1xyXG4gICAgY2FsY3VsYXRlQ2hvc2VuTGFiZWwgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5sb2NhbGUgfHwgIXRoaXMubG9jYWxlLnNlcGFyYXRvcikge1xyXG4gICAgICAgICAgICB0aGlzLl9idWlsZExvY2FsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY3VzdG9tUmFuZ2UgPSB0cnVlO1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBpZiAodGhpcy5yYW5nZXNBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmFuZ2UgaW4gdGhpcy5yYW5nZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJhbmdlc1tyYW5nZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMudGltZVBpY2tlclNlY29uZHMgPyAnWVlZWS1NTS1ERCBISDptbTpzcycgOiAnWVlZWS1NTS1ERCBISDptbSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSB0aW1lcyB3aGVuIGNvbXBhcmluZyBkYXRlcyBpZiB0aW1lIHBpY2tlciBzZWNvbmRzIGlzIG5vdCBlbmFibGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFydERhdGUuZm9ybWF0KGZvcm1hdCkgPT09IHRoaXMucmFuZ2VzW3JhbmdlXVswXS5mb3JtYXQoZm9ybWF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmVuZERhdGUuZm9ybWF0KGZvcm1hdCkgPT09IHRoaXMucmFuZ2VzW3JhbmdlXVsxXS5mb3JtYXQoZm9ybWF0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuUmFuZ2UgPSB0aGlzLnJhbmdlc0FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgdGltZXMgd2hlbiBjb21wYXJpbmcgZGF0ZXMgaWYgdGltZSBwaWNrZXIgaXMgbm90IGVuYWJsZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSB0aGlzLnJhbmdlc1tyYW5nZV1bMF0uZm9ybWF0KCdZWVlZLU1NLUREJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmVuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykgPT09IHRoaXMucmFuZ2VzW3JhbmdlXVsxXS5mb3JtYXQoJ1lZWVktTU0tREQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuUmFuZ2UgPSB0aGlzLnJhbmdlc0FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21SYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0N1c3RvbVJhbmdlTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNob3NlblJhbmdlID0gdGhpcy5sb2NhbGUuY3VzdG9tUmFuZ2VMYWJlbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9zZW5SYW5nZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBjdXN0b20gbGFiZWw6IHNob3cgY2FsZW5kYXJcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NhbEluUmFuZ2VzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tBcHBseShlPykge1xyXG4gICAgICAgIGlmICghdGhpcy5zaW5nbGVEYXRlUGlja2VyICYmIHRoaXMuc3RhcnREYXRlICYmICF0aGlzLmVuZERhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5fZ2V0RGF0ZVdpdGhUaW1lKHRoaXMuc3RhcnREYXRlLCBTaWRlRW51bS5yaWdodCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUNob3NlbkxhYmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzSW52YWxpZERhdGUgJiYgdGhpcy5zdGFydERhdGUgJiYgdGhpcy5lbmREYXRlKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCBpZiB0aGVyZSBhcmUgaW52YWxpZCBkYXRlIGJldHdlZW4gcmFuZ2VcclxuICAgICAgICAgICAgY29uc3QgZCA9IHRoaXMuc3RhcnREYXRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChkLmlzQmVmb3JlKHRoaXMuZW5kRGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW52YWxpZERhdGUoZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBkLnN1YnRyYWN0KDEsICdkYXlzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZC5hZGQoMSwgJ2RheXMnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jaG9zZW5MYWJlbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNob29zZWREYXRlLmVtaXQoe2Nob3NlbkxhYmVsOiB0aGlzLmNob3NlbkxhYmVsLCBzdGFydERhdGU6IHRoaXMuc3RhcnREYXRlLCBlbmREYXRlOiB0aGlzLmVuZERhdGV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZXNVcGRhdGVkLmVtaXQoe3N0YXJ0RGF0ZTogdGhpcy5zdGFydERhdGUsIGVuZERhdGU6IHRoaXMuZW5kRGF0ZX0pO1xyXG4gICAgICAgIGlmIChlIHx8ICh0aGlzLmNsb3NlT25BdXRvQXBwbHkgJiYgIWUpKSB7XHJcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDYW5jZWwoZSkge1xyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gdGhpcy5fb2xkLnN0YXJ0O1xyXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IHRoaXMuX29sZC5lbmQ7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGVkIHdoZW4gbW9udGggaXMgY2hhbmdlZFxyXG4gICAgICogQHBhcmFtIG1vbnRoRXZlbnQgZ2V0IHZhbHVlIGluIGV2ZW50LnRhcmdldC52YWx1ZVxyXG4gICAgICogQHBhcmFtIHNpZGUgbGVmdCBvciByaWdodFxyXG4gICAgICovXHJcbiAgICBtb250aENoYW5nZWQobW9udGhFdmVudDogYW55LCBzaWRlOiBTaWRlRW51bSkge1xyXG4gICAgICAgIGNvbnN0IHllYXIgPSB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLmRyb3Bkb3ducy5jdXJyZW50WWVhcjtcclxuICAgICAgICBjb25zdCBtb250aCA9IHBhcnNlSW50KG1vbnRoRXZlbnQudGFyZ2V0LnZhbHVlLCAxMCk7XHJcbiAgICAgICAgdGhpcy5tb250aE9yWWVhckNoYW5nZWQobW9udGgsIHllYXIsIHNpZGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsZWQgd2hlbiB5ZWFyIGlzIGNoYW5nZWRcclxuICAgICAqIEBwYXJhbSB5ZWFyRXZlbnQgZ2V0IHZhbHVlIGluIGV2ZW50LnRhcmdldC52YWx1ZVxyXG4gICAgICogQHBhcmFtIHNpZGUgbGVmdCBvciByaWdodFxyXG4gICAgICovXHJcbiAgICB5ZWFyQ2hhbmdlZCh5ZWFyRXZlbnQ6IGFueSwgc2lkZTogU2lkZUVudW0pIHtcclxuICAgICAgICBjb25zdCBtb250aCA9IHRoaXMuY2FsZW5kYXJWYXJpYWJsZXNbc2lkZV0uZHJvcGRvd25zLmN1cnJlbnRNb250aDtcclxuICAgICAgICBjb25zdCB5ZWFyID0gcGFyc2VJbnQoeWVhckV2ZW50LnRhcmdldC52YWx1ZSwgMTApO1xyXG4gICAgICAgIHRoaXMubW9udGhPclllYXJDaGFuZ2VkKG1vbnRoLCB5ZWFyLCBzaWRlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGVkIHdoZW4gdGltZSBpcyBjaGFuZ2VkXHJcbiAgICAgKiBAcGFyYW0gdGltZUV2ZW50ICBhbiBldmVudFxyXG4gICAgICogQHBhcmFtIHNpZGUgbGVmdCBvciByaWdodFxyXG4gICAgICovXHJcbiAgICB0aW1lQ2hhbmdlZCh0aW1lRXZlbnQ6IGFueSwgc2lkZTogU2lkZUVudW0pIHtcclxuICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5zZWxlY3RlZEhvdXIsIDEwKTtcclxuICAgICAgICBjb25zdCBtaW51dGUgPSBwYXJzZUludCh0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2VsZWN0ZWRNaW51dGUsIDEwKTtcclxuICAgICAgICBjb25zdCBzZWNvbmQgPSB0aGlzLnRpbWVQaWNrZXJTZWNvbmRzID8gcGFyc2VJbnQodGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLnNlbGVjdGVkU2Vjb25kLCAxMCkgOiAwO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMudGltZVBpY2tlcjI0SG91cikge1xyXG4gICAgICAgICAgICBjb25zdCBhbXBtID0gdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLmFtcG1Nb2RlbDtcclxuICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdQTScgJiYgaG91ciA8IDEyKSB7XHJcbiAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbXBtID09PSAnQU0nICYmIGhvdXIgPT09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICBob3VyID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNpZGUgPT09IFNpZGVFbnVtLmxlZnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLnN0YXJ0RGF0ZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBzdGFydC5ob3VyKGhvdXIpO1xyXG4gICAgICAgICAgICBzdGFydC5taW51dGUobWludXRlKTtcclxuICAgICAgICAgICAgc3RhcnQuc2Vjb25kKHNlY29uZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVuZERhdGUgJiYgdGhpcy5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpID09PSBzdGFydC5mb3JtYXQoJ1lZWVktTU0tREQnKSAmJiB0aGlzLmVuZERhdGUuaXNCZWZvcmUoc3RhcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZERhdGUoc3RhcnQuY2xvbmUoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZighdGhpcy5lbmREYXRlICYmIHRoaXMudGltZVBpY2tlcil7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydENsb25lID0gdGhpcy5fZ2V0RGF0ZVdpdGhUaW1lKHN0YXJ0LCBTaWRlRW51bS5yaWdodCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHN0YXJ0Q2xvbmUuaXNCZWZvcmUoc3RhcnQpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbU2lkZUVudW0ucmlnaHRdLnNlbGVjdGVkSG91ciA9IGhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcGlja2VyVmFyaWFibGVzW1NpZGVFbnVtLnJpZ2h0XS5zZWxlY3RlZE1pbnV0ZSA9IG1pbnV0ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbU2lkZUVudW0ucmlnaHRdLnNlbGVjdGVkU2Vjb25kID0gc2Vjb25kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVuZERhdGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZW5kID0gdGhpcy5lbmREYXRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGVuZC5ob3VyKGhvdXIpO1xyXG4gICAgICAgICAgICBlbmQubWludXRlKG1pbnV0ZSk7XHJcbiAgICAgICAgICAgIGVuZC5zZWNvbmQoc2Vjb25kKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNhbGVuZGFycyBzbyBhbGwgY2xpY2thYmxlIGRhdGVzIHJlZmxlY3QgdGhlIG5ldyB0aW1lIGNvbXBvbmVudFxyXG4gICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XHJcblxyXG4gICAgICAgIC8vIHJlLXJlbmRlciB0aGUgdGltZSBwaWNrZXJzIGJlY2F1c2UgY2hhbmdpbmcgb25lIHNlbGVjdGlvbiBjYW4gYWZmZWN0IHdoYXQncyBlbmFibGVkIGluIGFub3RoZXJcclxuICAgICAgICB0aGlzLnJlbmRlclRpbWVQaWNrZXIoU2lkZUVudW0ubGVmdCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKFNpZGVFbnVtLnJpZ2h0KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b0FwcGx5KSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWNrQXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICBjYWxsIHdoZW4gbW9udGggb3IgeWVhciBjaGFuZ2VkXHJcbiAgICAgKiBAcGFyYW0gbW9udGggbW9udGggbnVtYmVyIDAgLTExXHJcbiAgICAgKiBAcGFyYW0geWVhciB5ZWFyIGVnOiAxOTk1XHJcbiAgICAgKiBAcGFyYW0gc2lkZSBsZWZ0IG9yIHJpZ2h0XHJcbiAgICAgKi9cclxuICAgIG1vbnRoT3JZZWFyQ2hhbmdlZChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIsIHNpZGU6IFNpZGVFbnVtKSB7XHJcbiAgICAgICAgY29uc3QgaXNMZWZ0ID0gc2lkZSA9PT0gU2lkZUVudW0ubGVmdDtcclxuXHJcbiAgICAgICAgaWYgKCFpc0xlZnQpIHtcclxuICAgICAgICAgICAgaWYgKHllYXIgPCB0aGlzLnN0YXJ0RGF0ZS55ZWFyKCkgfHwgKHllYXIgPT09IHRoaXMuc3RhcnREYXRlLnllYXIoKSAmJiBtb250aCA8IHRoaXMuc3RhcnREYXRlLm1vbnRoKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aCA9IHRoaXMuc3RhcnREYXRlLm1vbnRoKCk7XHJcbiAgICAgICAgICAgICAgICB5ZWFyID0gdGhpcy5zdGFydERhdGUueWVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5taW5EYXRlKSB7XHJcbiAgICAgICAgICAgIGlmICh5ZWFyIDwgdGhpcy5taW5EYXRlLnllYXIoKSB8fCAoeWVhciA9PT0gdGhpcy5taW5EYXRlLnllYXIoKSAmJiBtb250aCA8IHRoaXMubWluRGF0ZS5tb250aCgpKSkge1xyXG4gICAgICAgICAgICAgICAgbW9udGggPSB0aGlzLm1pbkRhdGUubW9udGgoKTtcclxuICAgICAgICAgICAgICAgIHllYXIgPSB0aGlzLm1pbkRhdGUueWVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlKSB7XHJcbiAgICAgICAgICAgIGlmICh5ZWFyID4gdGhpcy5tYXhEYXRlLnllYXIoKSB8fCAoeWVhciA9PT0gdGhpcy5tYXhEYXRlLnllYXIoKSAmJiBtb250aCA+IHRoaXMubWF4RGF0ZS5tb250aCgpKSkge1xyXG4gICAgICAgICAgICAgICAgbW9udGggPSB0aGlzLm1heERhdGUubW9udGgoKTtcclxuICAgICAgICAgICAgICAgIHllYXIgPSB0aGlzLm1heERhdGUueWVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsZW5kYXJWYXJpYWJsZXNbc2lkZV0uZHJvcGRvd25zLmN1cnJlbnRZZWFyID0geWVhcjtcclxuICAgICAgICB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLmRyb3Bkb3ducy5jdXJyZW50TW9udGggPSBtb250aDtcclxuICAgICAgICBpZiAoaXNMZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLm1vbnRoKG1vbnRoKS55ZWFyKHllYXIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aCA9IHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLmNsb25lKCkuYWRkKDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLm1vbnRoKG1vbnRoKS55ZWFyKHllYXIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoID0gdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmNsb25lKCkuc3VidHJhY3QoMSwgJ21vbnRoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsaWNrIG9uIHByZXZpb3VzIG1vbnRoXHJcbiAgICAgKiBAcGFyYW0gc2lkZSBsZWZ0IG9yIHJpZ2h0IGNhbGVuZGFyXHJcbiAgICAgKi9cclxuICAgIGNsaWNrUHJldihzaWRlOiBTaWRlRW51bSkge1xyXG4gICAgICAgIGlmIChzaWRlID09PSBTaWRlRW51bS5sZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLnN1YnRyYWN0KDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saW5rZWRDYWxlbmRhcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5zdWJ0cmFjdCgxLCAnbW9udGgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5zdWJ0cmFjdCgxLCAnbW9udGgnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2xpY2sgb24gbmV4dCBtb250aFxyXG4gICAgICogQHBhcmFtIHNpZGUgbGVmdCBvciByaWdodCBjYWxlbmRhclxyXG4gICAgICovXHJcbiAgICBjbGlja05leHQoc2lkZTogU2lkZUVudW0pIHtcclxuICAgICAgICBpZiAoc2lkZSA9PT0gU2lkZUVudW0ubGVmdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5hZGQoMSwgJ21vbnRoJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENhbGVuZGFyLm1vbnRoLmFkZCgxLCAnbW9udGgnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlua2VkQ2FsZW5kYXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5hZGQoMSwgJ21vbnRoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxlbmRhcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gaG92ZXJpbmcgYSBkYXRlXHJcbiAgICAgKiBAcGFyYW0gZSBldmVudDogZ2V0IHZhbHVlIGJ5IGUudGFyZ2V0LnZhbHVlXHJcbiAgICAgKiBAcGFyYW0gc2lkZSBsZWZ0IG9yIHJpZ2h0XHJcbiAgICAgKiBAcGFyYW0gcm93IHJvdyBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBkYXRlIGNsaWNrZWRcclxuICAgICAqIEBwYXJhbSBjb2wgY29sIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGRhdGUgY2xpY2tlZFxyXG4gICAgICovXHJcbiAgICBob3ZlckRhdGUoZSwgc2lkZTogU2lkZUVudW0sIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcikge1xyXG4gICAgICBjb25zdCBsZWZ0Q2FsRGF0ZSA9IHRoaXMuY2FsZW5kYXJWYXJpYWJsZXMubGVmdC5jYWxlbmRhcltyb3ddW2NvbF07XHJcbiAgICAgIGNvbnN0IHJpZ2h0Q2FsRGF0ZSA9IHRoaXMuY2FsZW5kYXJWYXJpYWJsZXMucmlnaHQuY2FsZW5kYXJbcm93XVtjb2xdO1xyXG4gICAgICBpZiAodGhpcy5waWNraW5nRGF0ZSkge1xyXG4gICAgICAgIHRoaXMubm93SG92ZXJlZERhdGUgPSBzaWRlID09PSBTaWRlRW51bS5sZWZ0ID8gbGVmdENhbERhdGUgOiByaWdodENhbERhdGU7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihTaWRlRW51bS5sZWZ0KTtcclxuICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyKFNpZGVFbnVtLnJpZ2h0KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0b29sdGlwID0gc2lkZSA9PT0gU2lkZUVudW0ubGVmdCA/IHRoaXMudG9vbHRpcHRleHRbbGVmdENhbERhdGVdIDogdGhpcy50b29sdGlwdGV4dFtyaWdodENhbERhdGVdO1xyXG4gICAgICAgICAgaWYgKHRvb2x0aXAubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdG9vbHRpcCk7XHJcbiAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gc2VsZWN0aW5nIGEgZGF0ZVxyXG4gICAgICogQHBhcmFtIGUgZXZlbnQ6IGdldCB2YWx1ZSBieSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICogQHBhcmFtIHNpZGUgbGVmdCBvciByaWdodFxyXG4gICAgICogQHBhcmFtIHJvdyByb3cgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgZGF0ZSBjbGlja2VkXHJcbiAgICAgKiBAcGFyYW0gY29sIGNvbCBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBkYXRlIGNsaWNrZWRcclxuICAgICAqL1xyXG4gICAgY2xpY2tEYXRlKGUsIHNpZGU6IFNpZGVFbnVtLCByb3c6IG51bWJlciwgY29sOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJykge1xyXG4gICAgICAgICAgICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXZhaWxhYmxlJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1NQQU4nKSB7XHJcbiAgICAgICAgICAgIGlmICghZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2F2YWlsYWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hvc2VuUmFuZ2UgPSB0aGlzLmxvY2FsZS5jdXN0b21SYW5nZUxhYmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRhdGUgPSBzaWRlID09PSAgU2lkZUVudW0ubGVmdCA/IHRoaXMubGVmdENhbGVuZGFyLmNhbGVuZGFyW3Jvd11bY29sXSA6IHRoaXMucmlnaHRDYWxlbmRhci5jYWxlbmRhcltyb3ddW2NvbF07XHJcblxyXG4gICAgICAgIGlmICgodGhpcy5lbmREYXRlIHx8IChkYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlLCAnZGF5JylcclxuICAgICAgICAgICYmIHRoaXMuY3VzdG9tUmFuZ2VEaXJlY3Rpb24gPT09IGZhbHNlKSApICYmIHRoaXMubG9ja1N0YXJ0RGF0ZSA9PT0gZmFsc2UpIHsgLy8gcGlja2luZyBzdGFydFxyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5fZ2V0RGF0ZVdpdGhUaW1lKGRhdGUsIFNpZGVFbnVtLmxlZnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKGRhdGUuY2xvbmUoKSk7XHJcbiAgICAgICAgfSAgZWxzZSBpZiAoIXRoaXMuZW5kRGF0ZSAmJiBkYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlKSAmJiB0aGlzLmN1c3RvbVJhbmdlRGlyZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2U6IGNsaWNraW5nIHRoZSBzYW1lIGRhdGUgZm9yIHN0YXJ0L2VuZCxcclxuICAgICAgICAgICAgLy8gYnV0IHRoZSB0aW1lIG9mIHRoZSBlbmQgZGF0ZSBpcyBiZWZvcmUgdGhlIHN0YXJ0IGRhdGVcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKHRoaXMuc3RhcnREYXRlLmNsb25lKCkpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIHBpY2tpbmcgZW5kXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLl9nZXREYXRlV2l0aFRpbWUoZGF0ZSwgU2lkZUVudW0ucmlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRlLmlzQmVmb3JlKHRoaXMuc3RhcnREYXRlLCAnZGF5JykgPT09IHRydWUgJiYgdGhpcy5jdXN0b21SYW5nZURpcmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKHRoaXMuc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKGRhdGUuY2xvbmUoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZERhdGUoZGF0ZS5jbG9uZSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b0FwcGx5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUNob3NlbkxhYmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZURhdGVQaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKHRoaXMuc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9BcHBseSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0FwcGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hdXRvQXBwbHkgJiYgdGhpcy5zdGFydERhdGUgJiYgdGhpcy5lbmREYXRlKSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWNrQXBwbHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgaXMgdG8gY2FuY2VsIHRoZSBibHVyIGV2ZW50IGhhbmRsZXIgaWYgdGhlIG1vdXNlIHdhcyBpbiBvbmUgb2YgdGhlIGlucHV0c1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAgQ2xpY2sgb24gdGhlIGN1c3RvbSByYW5nZVxyXG4gICAgICogQHBhcmFtIGU6IEV2ZW50XHJcbiAgICAgKiBAcGFyYW0gbGFiZWxcclxuICAgICAqL1xyXG4gICAgY2xpY2tSYW5nZShlLCBsYWJlbCkge1xyXG4gICAgICAgIHRoaXMuY2hvc2VuUmFuZ2UgPSBsYWJlbDtcclxuICAgICAgICBpZiAobGFiZWwgPT09IHRoaXMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3duICA9IHRydWU7IC8vIHNob3cgY2FsZW5kYXJzXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NhbEluUmFuZ2VzID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlcyA9IHRoaXMucmFuZ2VzW2xhYmVsXTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBkYXRlc1swXS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBkYXRlc1sxXS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93UmFuZ2VMYWJlbE9uSW5wdXQgJiYgbGFiZWwgIT09IHRoaXMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hvc2VuTGFiZWwgPSBsYWJlbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQ2hvc2VuTGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNob3dDYWxJblJhbmdlcyA9ICghdGhpcy5yYW5nZXNBcnJheS5sZW5ndGgpIHx8IHRoaXMuYWx3YXlzU2hvd0NhbGVuZGFycztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zdGFydE9mKCdkYXknKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZS5lbmRPZignZGF5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hbHdheXNTaG93Q2FsZW5kYXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2hvd24gID0gZmFsc2U7IC8vIGhpZGUgY2FsZW5kYXJzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yYW5nZUNsaWNrZWQuZW1pdCh7bGFiZWw6IGxhYmVsLCBkYXRlczogZGF0ZXN9KTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmtlZXBDYWxlbmRhck9wZW5pbmdXaXRoUmFuZ2UgfHwgdGhpcy5hdXRvQXBwbHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tBcHBseSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFsd2F5c1Nob3dDYWxlbmRhcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHRoaXMuY2xpY2tBcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aGlzLm1heERhdGUuaXNTYW1lKGRhdGVzWzBdLCAnbW9udGgnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC5tb250aChkYXRlc1swXS5tb250aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGgueWVhcihkYXRlc1swXS55ZWFyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdENhbGVuZGFyLm1vbnRoLm1vbnRoKGRhdGVzWzBdLm1vbnRoKCkgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC55ZWFyKGRhdGVzWzFdLnllYXIoKSApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC5tb250aChkYXRlc1swXS5tb250aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRDYWxlbmRhci5tb250aC55ZWFyKGRhdGVzWzBdLnllYXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBuZXh0IHllYXJcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0TW9udGggPSBkYXRlc1swXS5jbG9uZSgpLmFkZCgxLCAnbW9udGgnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0Q2FsZW5kYXIubW9udGgubW9udGgobmV4dE1vbnRoLm1vbnRoKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaHRDYWxlbmRhci5tb250aC55ZWFyKG5leHRNb250aC55ZWFyKCkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FsZW5kYXJzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUaW1lUGlja2VyKFNpZGVFbnVtLmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGltZVBpY2tlcihTaWRlRW51bS5yaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc2hvdyhlPykge1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvd24pIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5fb2xkLnN0YXJ0ID0gdGhpcy5zdGFydERhdGUuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLl9vbGQuZW5kID0gdGhpcy5lbmREYXRlLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKGU/KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbmNvbXBsZXRlIGRhdGUgc2VsZWN0aW9uLCByZXZlcnQgdG8gbGFzdCB2YWx1ZXNcclxuICAgICAgICBpZiAoIXRoaXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb2xkLnN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHRoaXMuX29sZC5zdGFydC5jbG9uZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vbGQuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZERhdGUgPSB0aGlzLl9vbGQuZW5kLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIGEgbmV3IGRhdGUgcmFuZ2Ugd2FzIHNlbGVjdGVkLCBpbnZva2UgdGhlIHVzZXIgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAgICBpZiAoIXRoaXMuc3RhcnREYXRlLmlzU2FtZSh0aGlzLl9vbGQuc3RhcnQpIHx8ICF0aGlzLmVuZERhdGUuaXNTYW1lKHRoaXMuX29sZC5lbmQpKSB7XHJcbiAgICAgICAgICAgLy8gdGhpcy5jYWxsYmFjayh0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlLCB0aGlzLmNob3NlbkxhYmVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIHBpY2tlciBpcyBhdHRhY2hlZCB0byBhIHRleHQgaW5wdXQsIHVwZGF0ZSBpdFxyXG4gICAgICAgIHRoaXMudXBkYXRlRWxlbWVudCgpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3JlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlIGNsaWNrIG9uIGFsbCBlbGVtZW50IGluIHRoZSBjb21wb25lbnQsIHVzZWZ1bCBmb3Igb3V0c2lkZSBvZiBjbGlja1xyXG4gICAgICogQHBhcmFtIGUgZXZlbnRcclxuICAgICAqL1xyXG4gICAgaGFuZGxlSW50ZXJuYWxDbGljayhlKSB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlIHRoZSBsb2NhbGUgb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIGxvY2FsZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVMb2NhbGUobG9jYWxlKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbG9jYWxlKSB7XHJcbiAgICAgICAgICBpZiAobG9jYWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbGVba2V5XSA9IGxvY2FsZVtrZXldO1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnY3VzdG9tUmFuZ2VMYWJlbCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUmFuZ2VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICBjbGVhciB0aGUgZGF0ZXJhbmdlIHBpY2tlclxyXG4gICAgICovXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IG1vbWVudCgpLmVuZE9mKCdkYXknKTtcclxuICAgICAgICB0aGlzLmNob29zZWREYXRlLmVtaXQoe2Nob3NlbkxhYmVsOiAnJywgc3RhcnREYXRlOiBudWxsLCBlbmREYXRlOiBudWxsfSk7XHJcbiAgICAgICAgdGhpcy5kYXRlc1VwZGF0ZWQuZW1pdCh7c3RhcnREYXRlOiBudWxsLCBlbmREYXRlOiBudWxsfSk7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIG91dCBpZiB0aGUgc2VsZWN0ZWQgcmFuZ2Ugc2hvdWxkIGJlIGRpc2FibGVkIGlmIGl0IGRvZXNuJ3RcclxuICAgICAqIGZpdCBpbnRvIG1pbkRhdGUgYW5kIG1heERhdGUgbGltaXRhdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVSYW5nZShyYW5nZSkge1xyXG4gICAgICBpZiAocmFuZ2UgPT09IHRoaXMubG9jYWxlLmN1c3RvbVJhbmdlTGFiZWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcmFuZ2VNYXJrZXJzID0gdGhpcy5yYW5nZXNbcmFuZ2VdO1xyXG4gICAgICBjb25zdCBhcmVCb3RoQmVmb3JlID0gcmFuZ2VNYXJrZXJzLmV2ZXJ5KCBkYXRlID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMubWluRGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRlLmlzQmVmb3JlKHRoaXMubWluRGF0ZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgYXJlQm90aEFmdGVyID0gcmFuZ2VNYXJrZXJzLmV2ZXJ5KCBkYXRlID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMubWF4RGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRlLmlzQWZ0ZXIodGhpcy5tYXhEYXRlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiAoYXJlQm90aEJlZm9yZSB8fCBhcmVCb3RoQWZ0ZXIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gYWRkIHRpbWVcclxuICAgICAqIEBwYXJhbSBzaWRlIGxlZnQgb3IgcmlnaHRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0RGF0ZVdpdGhUaW1lKGRhdGUsIHNpZGU6IFNpZGVFbnVtKTogX21vbWVudC5Nb21lbnQge1xyXG4gICAgICAgIGxldCBob3VyID0gcGFyc2VJbnQodGhpcy50aW1lcGlja2VyVmFyaWFibGVzW3NpZGVdLnNlbGVjdGVkSG91ciwgMTApO1xyXG4gICAgICAgIGlmICghdGhpcy50aW1lUGlja2VyMjRIb3VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFtcG0gPSB0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uYW1wbU1vZGVsO1xyXG4gICAgICAgICAgICBpZiAoYW1wbSA9PT0gJ1BNJyAmJiBob3VyIDwgMTIpIHtcclxuICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFtcG0gPT09ICdBTScgJiYgaG91ciA9PT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1pbnV0ZSA9IHBhcnNlSW50KHRoaXMudGltZXBpY2tlclZhcmlhYmxlc1tzaWRlXS5zZWxlY3RlZE1pbnV0ZSwgMTApO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZCA9IHRoaXMudGltZVBpY2tlclNlY29uZHMgPyBwYXJzZUludCh0aGlzLnRpbWVwaWNrZXJWYXJpYWJsZXNbc2lkZV0uc2VsZWN0ZWRTZWNvbmQsIDEwKSA6IDA7XHJcbiAgICAgICAgcmV0dXJuIGRhdGUuY2xvbmUoKS5ob3VyKGhvdXIpLm1pbnV0ZShtaW51dGUpLnNlY29uZChzZWNvbmQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAgYnVpbGQgdGhlIGxvY2FsZSBjb25maWdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYnVpbGRMb2NhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhbGUgPSB7Li4udGhpcy5fbG9jYWxlU2VydmljZS5jb25maWcsIC4uLnRoaXMubG9jYWxlfTtcclxuICAgICAgICAgaWYgKCF0aGlzLmxvY2FsZS5mb3JtYXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUuZm9ybWF0ID0gbW9tZW50LmxvY2FsZURhdGEoKS5sb25nRGF0ZUZvcm1hdCgnbGxsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZS5mb3JtYXQgPSBtb21lbnQubG9jYWxlRGF0YSgpLmxvbmdEYXRlRm9ybWF0KCdMJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9idWlsZENlbGxzKGNhbGVuZGFyLCBzaWRlOiBTaWRlRW51bSkge1xyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDY7IHJvdysrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJWYXJpYWJsZXNbc2lkZV0uY2xhc3Nlc1tyb3ddID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IHJvd0NsYXNzZXMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbXB0eVdlZWtSb3dDbGFzcyAmJlxyXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShBcnJheSg3KS5rZXlzKCkpLnNvbWUoaSA9PiBjYWxlbmRhcltyb3ddW2ldLm1vbnRoKCkgIT09IHRoaXMuY2FsZW5kYXJWYXJpYWJsZXNbc2lkZV0ubW9udGgpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcm93Q2xhc3Nlcy5wdXNoKHRoaXMuZW1wdHlXZWVrUm93Q2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDc7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW107XHJcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSB3ZWVrIHJvdyBjbGFzc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1wdHlXZWVrQ29sdW1uQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsZW5kYXJbcm93XVtjb2xdLm1vbnRoKCkgIT09IHRoaXMuY2FsZW5kYXJWYXJpYWJsZXNbc2lkZV0ubW9udGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMuZW1wdHlXZWVrQ29sdW1uQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCB0b2RheSdzIGRhdGVcclxuICAgICAgICAgICAgICAgIGlmIChjYWxlbmRhcltyb3ddW2NvbF0uaXNTYW1lKG5ldyBEYXRlKCksICdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgndG9kYXknKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCB3ZWVrZW5kc1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGVuZGFyW3Jvd11bY29sXS5pc29XZWVrZGF5KCkgPiA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCd3ZWVrZW5kJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBncmV5IG91dCB0aGUgZGF0ZXMgaW4gb3RoZXIgbW9udGhzIGRpc3BsYXllZCBhdCBiZWdpbm5pbmcgYW5kIGVuZCBvZiB0aGlzIGNhbGVuZGFyXHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsZW5kYXJbcm93XVtjb2xdLm1vbnRoKCkgIT09IGNhbGVuZGFyWzFdWzFdLm1vbnRoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ29mZicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBtYXJrIHRoZSBsYXN0IGRheSBvZiB0aGUgcHJldmlvdXMgbW9udGggaW4gdGhpcyBjYWxlbmRhclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RGF5T2ZQcmV2aW91c01vbnRoQ2xhc3MgJiYgKGNhbGVuZGFyW3Jvd11bY29sXS5tb250aCgpIDwgY2FsZW5kYXJbMV1bMV0ubW9udGgoKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhclsxXVsxXS5tb250aCgpID09PSAwKSAmJiBjYWxlbmRhcltyb3ddW2NvbF0uZGF0ZSgpID09PSB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLmRheXNJbkxhc3RNb250aFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2godGhpcy5sYXN0RGF5T2ZQcmV2aW91c01vbnRoQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFyayB0aGUgZmlyc3QgZGF5IG9mIHRoZSBuZXh0IG1vbnRoIGluIHRoaXMgY2FsZW5kYXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REYXlPZk5leHRNb250aENsYXNzICYmIChjYWxlbmRhcltyb3ddW2NvbF0ubW9udGgoKSA+IGNhbGVuZGFyWzFdWzFdLm1vbnRoKCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJbcm93XVtjb2xdLm1vbnRoKCkgPT09IDApICYmIGNhbGVuZGFyW3Jvd11bY29sXS5kYXRlKCkgPT09IDFcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMuZmlyc3REYXlPZk5leHRNb250aENsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBtYXJrIHRoZSBmaXJzdCBkYXkgb2YgdGhlIGN1cnJlbnQgbW9udGggd2l0aCBhIGN1c3RvbSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RNb250aERheUNsYXNzICYmIGNhbGVuZGFyW3Jvd11bY29sXS5tb250aCgpID09PSBjYWxlbmRhclsxXVsxXS5tb250aCgpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJbcm93XVtjb2xdLmRhdGUoKSA9PT0gY2FsZW5kYXIuZmlyc3REYXkuZGF0ZSgpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2godGhpcy5maXJzdE1vbnRoRGF5Q2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbWFyayB0aGUgbGFzdCBkYXkgb2YgdGhlIGN1cnJlbnQgbW9udGggd2l0aCBhIGN1c3RvbSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE1vbnRoRGF5Q2xhc3MgJiYgY2FsZW5kYXJbcm93XVtjb2xdLm1vbnRoKCkgPT09IGNhbGVuZGFyWzFdWzFdLm1vbnRoKCkgJiZcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXS5kYXRlKCkgPT09IGNhbGVuZGFyLmxhc3REYXkuZGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMubGFzdE1vbnRoRGF5Q2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZG9uJ3QgYWxsb3cgc2VsZWN0aW9uIG9mIGRhdGVzIGJlZm9yZSB0aGUgbWluaW11bSBkYXRlXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlICYmIGNhbGVuZGFyW3Jvd11bY29sXS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUsICdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnb2ZmJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBhbGxvdyBzZWxlY3Rpb24gb2YgZGF0ZXMgYWZ0ZXIgdGhlIG1heGltdW0gZGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXJWYXJpYWJsZXNbc2lkZV0ubWF4RGF0ZSAmJiBjYWxlbmRhcltyb3ddW2NvbF0uaXNBZnRlcih0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLm1heERhdGUsICdkYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnb2ZmJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBhbGxvdyBzZWxlY3Rpb24gb2YgZGF0ZSBpZiBhIGN1c3RvbSBmdW5jdGlvbiBkZWNpZGVzIGl0J3MgaW52YWxpZFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnZhbGlkRGF0ZShjYWxlbmRhcltyb3ddW2NvbF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdvZmYnLCAnZGlzYWJsZWQnLCAnaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgc3RhcnQgZGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnREYXRlICYmIGNhbGVuZGFyW3Jvd11bY29sXS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2FjdGl2ZScsICdzdGFydC1kYXRlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBoaWdobGlnaHQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBlbmQgZGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSAhPSBudWxsICYmIGNhbGVuZGFyW3Jvd11bY29sXS5mb3JtYXQoJ1lZWVktTU0tREQnKSA9PT0gdGhpcy5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdhY3RpdmUnLCAnZW5kLWRhdGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCBkYXRlcyBpbi1iZXR3ZWVuIHRoZSBzZWxlY3RlZCBkYXRlc1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5ub3dIb3ZlcmVkRGF0ZSAhPSBudWxsICYmIHRoaXMucGlja2luZ0RhdGUpIHx8IHRoaXMuZW5kRGF0ZSAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICApICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyW3Jvd11bY29sXSA+IHRoaXMuc3RhcnREYXRlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcltyb3ddW2NvbF0gPCB0aGlzLmVuZERhdGUgfHwgKGNhbGVuZGFyW3Jvd11bY29sXSA8IHRoaXMubm93SG92ZXJlZERhdGUgJiYgdGhpcy5waWNraW5nRGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhY2xhc3Nlcy5maW5kKGVsID0+IGVsID09PSAnb2ZmJylcclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnaW4tcmFuZ2UnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGFwcGx5IGN1c3RvbSBjbGFzc2VzIGZvciB0aGlzIGRhdGVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQ3VzdG9tID0gdGhpcy5pc0N1c3RvbURhdGUoY2FsZW5kYXJbcm93XVtjb2xdKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0N1c3RvbSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlzQ3VzdG9tID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goaXNDdXN0b20pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNsYXNzZXMsIGlzQ3VzdG9tKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBhcHBseSBjdXN0b20gdG9vbHRpcCBmb3IgdGhpcyBkYXRlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1Rvb2x0aXAgPSB0aGlzLmlzVG9vbHRpcERhdGUoY2FsZW5kYXJbcm93XVtjb2xdKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1Rvb2x0aXApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlzVG9vbHRpcCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b29sdGlwdGV4dFtjYWxlbmRhcltyb3ddW2NvbF1dID0gaXNUb29sdGlwOyAvLyBzZXR0aW5nIHRvb2x0aXB0ZXh0IGZvciBjdXN0b20gZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcHRleHRbY2FsZW5kYXJbcm93XVtjb2xdXSA9ICdQdXQgdGhlIHRvb2x0aXAgYXMgdGhlIHJldHVybmVkIHZhbHVlIG9mIGlzVG9vbHRpcERhdGUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcHRleHRbY2FsZW5kYXJbcm93XVtjb2xdXSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgY2xhc3NlcyB2YXJcclxuICAgICAgICAgICAgICAgIGxldCBjbmFtZSA9ICcnLCBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY25hbWUgKz0gY2xhc3Nlc1tpXSArICcgJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3Nlc1tpXSA9PT0gJ2Rpc2FibGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNuYW1lICs9ICdhdmFpbGFibGUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhclZhcmlhYmxlc1tzaWRlXS5jbGFzc2VzW3Jvd11bY29sXSA9IGNuYW1lLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyVmFyaWFibGVzW3NpZGVdLmNsYXNzZXNbcm93XS5jbGFzc0xpc3QgPSByb3dDbGFzc2VzLmpvaW4oJyAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
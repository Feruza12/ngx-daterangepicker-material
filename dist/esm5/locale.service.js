import { __assign, __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { LOCALE_CONFIG, DefaultLocaleConfig } from './daterangepicker.config';
var LocaleService = /** @class */ (function () {
    function LocaleService(_config) {
        this._config = _config;
    }
    Object.defineProperty(LocaleService.prototype, "config", {
        get: function () {
            if (!this._config) {
                return DefaultLocaleConfig;
            }
            return __assign(__assign({}, DefaultLocaleConfig), this._config);
        },
        enumerable: true,
        configurable: true
    });
    LocaleService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_CONFIG,] }] }
    ]; };
    LocaleService = __decorate([
        Injectable(),
        __param(0, Inject(LOCALE_CONFIG))
    ], LocaleService);
    return LocaleService;
}());
export { LocaleService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXJhbmdlcGlja2VyLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibG9jYWxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFHNUY7SUFDRSx1QkFBMkMsT0FBcUI7UUFBckIsWUFBTyxHQUFQLE9BQU8sQ0FBYztJQUFHLENBQUM7SUFFcEUsc0JBQUksaUNBQU07YUFBVjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNqQixPQUFPLG1CQUFtQixDQUFDO2FBQzVCO1lBRUQsNkJBQVksbUJBQW1CLEdBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNwRCxDQUFDOzs7T0FBQTs7Z0RBUlksTUFBTSxTQUFDLGFBQWE7O0lBRHRCLGFBQWE7UUFEekIsVUFBVSxFQUFFO1FBRUUsV0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUE7T0FEdkIsYUFBYSxDQVV6QjtJQUFELG9CQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMT0NBTEVfQ09ORklHLCBEZWZhdWx0TG9jYWxlQ29uZmlnLCBMb2NhbGVDb25maWcgfSBmcm9tICcuL2RhdGVyYW5nZXBpY2tlci5jb25maWcnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTG9jYWxlU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IExvY2FsZUNvbmZpZykge31cclxuXHJcbiAgZ2V0IGNvbmZpZygpIHtcclxuICAgIGlmICghdGhpcy5fY29uZmlnKSB7XHJcbiAgICAgIHJldHVybiBEZWZhdWx0TG9jYWxlQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Li4uIERlZmF1bHRMb2NhbGVDb25maWcsIC4uLnRoaXMuX2NvbmZpZ307XHJcbiAgfVxyXG59XHJcbiJdfQ==
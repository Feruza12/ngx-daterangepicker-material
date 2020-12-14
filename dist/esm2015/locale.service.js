import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { LOCALE_CONFIG, DefaultLocaleConfig } from './daterangepicker.config';
let LocaleService = class LocaleService {
    constructor(_config) {
        this._config = _config;
    }
    get config() {
        if (!this._config) {
            return DefaultLocaleConfig;
        }
        return Object.assign(Object.assign({}, DefaultLocaleConfig), this._config);
    }
};
LocaleService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [LOCALE_CONFIG,] }] }
];
LocaleService = __decorate([
    Injectable(),
    __param(0, Inject(LOCALE_CONFIG))
], LocaleService);
export { LocaleService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXJhbmdlcGlja2VyLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibG9jYWxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQWdCLE1BQU0sMEJBQTBCLENBQUM7QUFHNUYsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN4QixZQUEyQyxPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO0lBQUcsQ0FBQztJQUVwRSxJQUFJLE1BQU07UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLG1CQUFtQixDQUFDO1NBQzVCO1FBRUQsdUNBQVksbUJBQW1CLEdBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtJQUNwRCxDQUFDO0NBQ0YsQ0FBQTs7NENBVGMsTUFBTSxTQUFDLGFBQWE7O0FBRHRCLGFBQWE7SUFEekIsVUFBVSxFQUFFO0lBRUUsV0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUE7R0FEdkIsYUFBYSxDQVV6QjtTQVZZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTE9DQUxFX0NPTkZJRywgRGVmYXVsdExvY2FsZUNvbmZpZywgTG9jYWxlQ29uZmlnIH0gZnJvbSAnLi9kYXRlcmFuZ2VwaWNrZXIuY29uZmlnJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvY2FsZVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBMb2NhbGVDb25maWcpIHt9XHJcblxyXG4gIGdldCBjb25maWcoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbmZpZykge1xyXG4gICAgICByZXR1cm4gRGVmYXVsdExvY2FsZUNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gey4uLiBEZWZhdWx0TG9jYWxlQ29uZmlnLCAuLi50aGlzLl9jb25maWd9O1xyXG4gIH1cclxufVxyXG4iXX0=
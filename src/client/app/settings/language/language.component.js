System.register(["@angular/core", "@angular/router", "../../core/gamepad.service", "../../core/configuration"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, gamepad_service_1, configuration_1, LanguageComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (gamepad_service_1_1) {
                gamepad_service_1 = gamepad_service_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            }
        ],
        execute: function () {
            LanguageComponent = /** @class */ (function () {
                function LanguageComponent(router, configuration, gamepadService) {
                    this.router = router;
                    this.configuration = configuration;
                    this.gamepadService = gamepadService;
                    this.subscriptions = [];
                }
                Object.defineProperty(LanguageComponent.prototype, "lang", {
                    get: function () {
                        return this.configuration.lang || 'en';
                    },
                    enumerable: true,
                    configurable: true
                });
                LanguageComponent.prototype.ngOnInit = function () {
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                LanguageComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                LanguageComponent.prototype.click = function (lang) {
                    this.configuration.lang = lang;
                    this.router.navigateByUrl('/settings');
                };
                LanguageComponent.prototype.buttonDown = function (event) {
                    switch (event.button) {
                        case 'tab':
                            this.configuration.lang = this.lang == 'en' ? 'vi' : 'en';
                            return true;
                        case 'ls1':
                            this.router.navigateByUrl('/settings');
                            return true;
                        case 'l':
                        case 'u':
                            this.configuration.lang = 'en';
                            return true;
                        case 'r':
                        case 'd':
                            this.configuration.lang = 'vi';
                            return true;
                        case 'select':
                            this.configuration.lang = this.lang == 'en' ? 'vi' : 'en';
                            return true;
                        case 'start':
                            this.router.navigateByUrl('/settings');
                            return true;
                    }
                    return false;
                };
                LanguageComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'language.component.html'
                    }),
                    __metadata("design:paramtypes", [router_1.Router,
                        configuration_1.Configuration,
                        gamepad_service_1.GamepadService])
                ], LanguageComponent);
                return LanguageComponent;
            }());
            exports_1("LanguageComponent", LanguageComponent);
        }
    };
});

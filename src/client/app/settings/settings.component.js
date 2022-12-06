System.register(["@angular/core", "@angular/router", "../core/gamepad.service"], function (exports_1, context_1) {
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
    var core_1, router_1, gamepad_service_1, SettingsComponent, Option;
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
            }
        ],
        execute: function () {
            SettingsComponent = /** @class */ (function () {
                function SettingsComponent(router, gamepadService) {
                    this.router = router;
                    this.gamepadService = gamepadService;
                    this.subscriptions = [];
                    this.Option = Option;
                    this.option = Option.controller;
                }
                SettingsComponent.prototype.ngOnInit = function () {
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                SettingsComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                SettingsComponent.prototype.buttonDown = function (event) {
                    switch (event.button) {
                        case 'tab':
                            this.option = this.option == Option.language ? Option.controller : Option.language;
                            return true;
                        case 'ls1':
                            this.router.navigateByUrl('/');
                            return true;
                        case 'l':
                        case 'u':
                            this.option = Option.controller;
                            return true;
                        case 'r':
                        case 'd':
                            this.option = Option.language;
                            return true;
                        case 'start':
                            switch (this.option) {
                                case Option.controller:
                                    this.router.navigateByUrl('/settings/controller');
                                    break;
                                case Option.language:
                                    this.router.navigateByUrl('/settings/language');
                                    break;
                            }
                            return true;
                    }
                    return false;
                };
                SettingsComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'settings.component.html'
                    }),
                    __metadata("design:paramtypes", [router_1.Router,
                        gamepad_service_1.GamepadService])
                ], SettingsComponent);
                return SettingsComponent;
            }());
            exports_1("SettingsComponent", SettingsComponent);
            (function (Option) {
                Option[Option["controller"] = 0] = "controller";
                Option[Option["language"] = 1] = "language";
            })(Option || (Option = {}));
        }
    };
});

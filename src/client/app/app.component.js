System.register(["@angular/core", "@angular/router", "./core/gamepad.service", "./core/fullscreen.service"], function (exports_1, context_1) {
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
    var core_1, router_1, gamepad_service_1, fullscreen_service_1, AppComponent;
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
            function (fullscreen_service_1_1) {
                fullscreen_service_1 = fullscreen_service_1_1;
            }
        ],
        execute: function () {
            AppComponent = /** @class */ (function () {
                function AppComponent(router, fullscreenService, gamepadService) {
                    this.router = router;
                    this.fullscreenService = fullscreenService;
                    this.gamepadService = gamepadService;
                    this.name = 'NES';
                }
                AppComponent.prototype.keyDown = function (event) {
                    if (this.gamepadService.keyDown(event)) {
                        event.preventDefault();
                    }
                };
                AppComponent.prototype.keyUp = function (event) {
                    if (this.gamepadService.keyUp(event)) {
                        event.preventDefault();
                    }
                };
                Object.defineProperty(AppComponent.prototype, "fullscreenSupported", {
                    get: function () {
                        return this.fullscreenService.supported;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppComponent.prototype, "fullscreened", {
                    get: function () {
                        return this.fullscreenService.fullscreened;
                    },
                    enumerable: true,
                    configurable: true
                });
                AppComponent.prototype.toggleFullscreen = function () {
                    var html = document.getElementsByTagName('html');
                    if (html && html.length == 1) {
                        this.fullscreenService.toggle(html[0]);
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app.component.html',
                        host: {
                            '(document:keydown)': 'keyDown($event)',
                            '(document:keyup)': 'keyUp($event)'
                        }
                    }),
                    __metadata("design:paramtypes", [router_1.Router,
                        fullscreen_service_1.FullscreenService,
                        gamepad_service_1.GamepadService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    };
});

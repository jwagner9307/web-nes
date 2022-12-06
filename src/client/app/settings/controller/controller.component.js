System.register(["@angular/core", "@angular/router", "../../core/configuration", "../../core/gamepad.service"], function (exports_1, context_1) {
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
    var core_1, router_1, configuration_1, gamepad_service_1, ControllerComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            },
            function (gamepad_service_1_1) {
                gamepad_service_1 = gamepad_service_1_1;
            }
        ],
        execute: function () {
            ControllerComponent = /** @class */ (function () {
                function ControllerComponent(router, configuration, gamepadService) {
                    this.router = router;
                    this.configuration = configuration;
                    this.gamepadService = gamepadService;
                    this.subscriptions = [];
                    this.state = { selectedButton: null };
                }
                ControllerComponent.prototype.ngOnInit = function () {
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                ControllerComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                Object.defineProperty(ControllerComponent.prototype, "keyboardMapModified", {
                    get: function () {
                        return this.configuration.keyboardMapModified;
                    },
                    enumerable: true,
                    configurable: true
                });
                ControllerComponent.prototype.resetKeyboardMap = function () {
                    this.configuration.resetKeyboardMap();
                };
                ControllerComponent.prototype.buttonDown = function (event) {
                    if (event.button == 'ls1') {
                        this.router.navigateByUrl('/settings');
                        return true;
                    }
                };
                ControllerComponent.prototype.keyDown = function (event) {
                    if (event.keyCode == 27) { // ESC
                        this.router.navigateByUrl('/settings');
                        event.preventDefault();
                    }
                    else if (event.keyCode == 9) { // TAB
                        if (typeof this.state.selectedButton === 'number') {
                            switch (this.state.selectedButton) {
                                case 'u':
                                    this.state.selectedButton = 'l';
                                    break;
                                case 'l':
                                    this.state.selectedButton = 'd';
                                    break;
                                case 'd':
                                    this.state.selectedButton = 'r';
                                    break;
                                case 'r':
                                    this.state.selectedButton = 'select';
                                    break;
                                case 'select':
                                    this.state.selectedButton = 'start';
                                    break;
                                case 'start':
                                    this.state.selectedButton = 'B';
                                    break;
                                case 'B':
                                    this.state.selectedButton = 'A';
                                    break;
                                case 'A':
                                    this.state.selectedButton = 'b';
                                    break;
                                case 'b':
                                    this.state.selectedButton = 'a';
                                    break;
                                case 'a':
                                default:
                                    this.state.selectedButton = 'u';
                            }
                        }
                        else {
                            this.state.selectedButton = 'u';
                        }
                        event.preventDefault();
                        return true;
                    }
                    else if (typeof this.state.selectedButton === 'number') {
                        var button = this.configuration.buttonOfKey(event.keyCode);
                        if (!button) {
                            this.configuration.setKeyboardMap(this.state.selectedButton, event.keyCode);
                            event.preventDefault();
                        }
                    }
                };
                ControllerComponent = __decorate([
                    core_1.Component({
                        selector: 'controller',
                        templateUrl: 'controller.component.html',
                        host: {
                            '(document:keydown)': 'keyDown($event)'
                        },
                    }),
                    __metadata("design:paramtypes", [router_1.Router,
                        configuration_1.Configuration,
                        gamepad_service_1.GamepadService])
                ], ControllerComponent);
                return ControllerComponent;
            }());
            exports_1("ControllerComponent", ControllerComponent);
        }
    };
});

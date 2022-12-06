System.register(["@angular/core", "../../../core/configuration", "../../../core/gamepad.service"], function (exports_1, context_1) {
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
    var core_1, configuration_1, gamepad_service_1, PasscodeComponentInput;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            },
            function (gamepad_service_1_1) {
                gamepad_service_1 = gamepad_service_1_1;
            }
        ],
        execute: function () {
            PasscodeComponentInput = /** @class */ (function () {
                function PasscodeComponentInput(configuration, gamepadService) {
                    this.configuration = configuration;
                    this.gamepadService = gamepadService;
                    this.subscriptions = [];
                    this.select = new core_1.EventEmitter();
                    this.selected = 0;
                    this.digits = [0, 0, 0, 0];
                }
                Object.defineProperty(PasscodeComponentInput.prototype, "passcode", {
                    get: function () {
                        return this.digits.join('');
                    },
                    set: function (value) {
                        value = (value || '').trim();
                        for (var i = 0; i < 4; i += 1) {
                            var c = value.charCodeAt(i);
                            this.digits[i] = (c >= 0x30 && c <= 0x39) ? c - 0x30 : 0;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                PasscodeComponentInput.prototype.ngOnInit = function () {
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                PasscodeComponentInput.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                PasscodeComponentInput.prototype.selectDigit = function (index) {
                    this.selected = index;
                };
                PasscodeComponentInput.prototype.add = function (add) {
                    var value = this.digits[this.selected] + add;
                    if (value < 0) {
                        value = 9;
                    }
                    else if (value > 9) {
                        value = 0;
                    }
                    this.digits[this.selected] = value;
                };
                PasscodeComponentInput.prototype.buttonDown = function (event) {
                    switch (event.button) {
                        case 'l':
                            if (this.selected > 0) {
                                this.selected -= 1;
                            }
                            else {
                                this.selected = 3;
                            }
                            return true;
                        case 'u':
                            this.add(-1);
                            return true;
                        case 'd':
                            this.add(1);
                            ;
                            return true;
                        case 'r':
                            if (this.selected < 3) {
                                this.selected += 1;
                            }
                            else {
                                this.selected = 0;
                            }
                            return true;
                        case 'start':
                            this.select.emit(this.passcode);
                            return true;
                    }
                    return false;
                };
                PasscodeComponentInput.prototype.keyPress = function (event) {
                    var value = String.fromCharCode(event.which);
                    if (value.length == 1 && value >= '0' && value <= '9') {
                        var number = parseInt(value);
                        this.digits[this.selected] = number;
                        this.selected = (this.selected + 1) % 4;
                        event.preventDefault();
                    }
                };
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], PasscodeComponentInput.prototype, "select", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], PasscodeComponentInput.prototype, "game", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Boolean)
                ], PasscodeComponentInput.prototype, "passcodeInvalid", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String),
                    __metadata("design:paramtypes", [String])
                ], PasscodeComponentInput.prototype, "passcode", null);
                PasscodeComponentInput = __decorate([
                    core_1.Component({
                        selector: 'passcode-input',
                        templateUrl: 'passcode-input.component.html',
                        host: {
                            '(document:keypress)': 'keyPress($event)'
                        }
                    }),
                    __metadata("design:paramtypes", [configuration_1.Configuration,
                        gamepad_service_1.GamepadService])
                ], PasscodeComponentInput);
                return PasscodeComponentInput;
            }());
            exports_1("PasscodeComponentInput", PasscodeComponentInput);
        }
    };
});

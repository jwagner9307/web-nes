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
    var core_1, configuration_1, gamepad_service_1, UsernameInputComponent, letters;
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
            UsernameInputComponent = /** @class */ (function () {
                function UsernameInputComponent(configuration, gamepadService) {
                    this.configuration = configuration;
                    this.gamepadService = gamepadService;
                    this.subscriptions = [];
                    this.select = new core_1.EventEmitter();
                    this.index = 0;
                    this.offset = 0;
                    this.fullChars = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
                    this.viewChars = [' ', ' ', ' ', ' '];
                    var username = configuration.username || '';
                    for (var i = 0; i < this.fullChars.length; i += 1) {
                        var c = username.charAt(i);
                        this.fullChars[i] = c || ' ';
                    }
                    this.viewChars = this.fullChars.slice(0, 4);
                }
                UsernameInputComponent.prototype.ngOnInit = function () {
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                UsernameInputComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                UsernameInputComponent.prototype.selectIndex = function (index) {
                    this.index = index;
                    if (this.offset > this.index) {
                        this.offset = this.index;
                        this.viewChars = this.fullChars.slice(this.offset, this.offset + 4);
                    }
                    else if (this.offset < this.index - 3) {
                        this.offset = Math.min(this.index - 3, this.fullChars.length - 4);
                        this.viewChars = this.fullChars.slice(this.offset, this.offset + 4);
                    }
                };
                UsernameInputComponent.prototype.buttonDown = function (event) {
                    switch (event.button) {
                        case 'l':
                            this.shift(-1);
                            return true;
                        case 'u':
                            this.update(-1);
                            return true;
                        case 'd':
                            this.update(1);
                            return true;
                        case 'r':
                            this.shift(1);
                            return true;
                        case 'start':
                            this.select.emit(this.configuration.username);
                            return true;
                    }
                    return false;
                };
                UsernameInputComponent.prototype.keyDown = function (event) {
                    if (event.keyCode == 8) { // backspace
                        if (this.index > 0) {
                            for (var i = this.index - 1; i < this.fullChars.length; i += 1) {
                                this.fullChars[i] = this.fullChars[i + 1];
                            }
                            this.fullChars[this.fullChars.length - 1] = ' ';
                            this.viewChars = this.fullChars.slice(this.offset, this.offset + 4);
                            this.shift(-1);
                            this.save();
                        }
                        event.preventDefault();
                    }
                    else if (event.keyCode == 46) { // delete
                        if (this.index < this.fullChars.length - 1) {
                            for (var i = this.index + 1; i < this.fullChars.length; i += 1) {
                                this.fullChars[i] = this.fullChars[i + 1];
                            }
                            this.fullChars[this.fullChars.length - 1] = ' ';
                            this.viewChars = this.fullChars.slice(this.offset, this.offset + 4);
                            this.save();
                        }
                        event.preventDefault();
                    }
                };
                UsernameInputComponent.prototype.keyPress = function (event) {
                    if (event.which != 127 && event.which >= 32) {
                        var value = String.fromCharCode(event.which);
                        if (value.length == 1) {
                            this.update(0, value);
                            this.shift(1);
                            event.preventDefault();
                        }
                    }
                };
                UsernameInputComponent.prototype.update = function (letterAdd, value) {
                    var char = this.fullChars[this.index];
                    var letterIndex = letters.indexOf(char);
                    if (value) {
                        char = value;
                        ;
                    }
                    else if (letterIndex < 0) {
                        char = ' ';
                    }
                    else {
                        letterIndex += letterAdd;
                        if (letterIndex < 0) {
                            letterIndex = letters.length - 1;
                        }
                        else if (letterIndex >= letters.length) {
                            letterIndex = 0;
                        }
                        char = letters.charAt(letterIndex);
                    }
                    if (this.fullChars[this.index] != char) {
                        this.fullChars[this.index] = char;
                        this.viewChars[this.index - this.offset] = char;
                        this.save();
                    }
                };
                UsernameInputComponent.prototype.save = function () {
                    var username = this.fullChars.join('').trim().replace('  ', ' ');
                    if (this.configuration.username != username) {
                        this.configuration.username = username;
                    }
                };
                UsernameInputComponent.prototype.shift = function (value) {
                    var index = this.index + value;
                    if (index < 0 || index >= this.fullChars.length)
                        return;
                    this.selectIndex(index);
                };
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], UsernameInputComponent.prototype, "select", void 0);
                UsernameInputComponent = __decorate([
                    core_1.Component({
                        selector: 'username-input',
                        templateUrl: 'username-input.component.html',
                        host: {
                            '(document:keypress)': 'keyPress($event)',
                            '(document:keydown)': 'keyDown($event)'
                        }
                    }),
                    __metadata("design:paramtypes", [configuration_1.Configuration,
                        gamepad_service_1.GamepadService])
                ], UsernameInputComponent);
                return UsernameInputComponent;
            }());
            exports_1("UsernameInputComponent", UsernameInputComponent);
            letters = ' 0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
        }
    };
});

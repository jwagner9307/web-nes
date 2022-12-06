System.register(["@angular/core", "./configuration"], function (exports_1, context_1) {
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
    var core_1, configuration_1, _getGamepads, getGamepads, axisDelay, GamepadService, ButtonEventType, GamepadState, gamepadMap;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            }
        ],
        execute: function () {
            _getGamepads = navigator.getGamepads || navigator.webkitGetGamepads;
            getGamepads = _getGamepads ? _getGamepads.bind(navigator) : null;
            axisDelay = 150;
            GamepadService = /** @class */ (function () {
                function GamepadService(configuration) {
                    this.configuration = configuration;
                    this.keyDownCallbacks = [];
                    this.keyUpCallbacks = [];
                    this.padState1 = new GamepadState(1);
                    this.padState2 = new GamepadState(2);
                }
                GamepadService.prototype.on = function (eventType, callback) {
                    var _this = this;
                    switch (eventType) {
                        case ButtonEventType.buttonDown:
                            this.keyDownCallbacks.push(callback);
                            return {
                                unsubscribe: function () {
                                    for (var i = _this.keyDownCallbacks.length - 1; i >= 0; i -= 1) {
                                        var s = _this.keyDownCallbacks[i];
                                        if (s === callback) {
                                            _this.keyDownCallbacks.splice(i, 1);
                                        }
                                    }
                                }
                            };
                        case ButtonEventType.buttonUp:
                            this.keyUpCallbacks.push(callback);
                            return {
                                unsubscribe: function () {
                                    for (var i = _this.keyUpCallbacks.length - 1; i >= 0; i -= 1) {
                                        var s = _this.keyUpCallbacks[i];
                                        if (s === callback) {
                                            _this.keyUpCallbacks.splice(i, 1);
                                        }
                                    }
                                }
                            };
                        default:
                            return null;
                    }
                };
                GamepadService.prototype.keyDown = function (event) {
                    var buttonEvent = this.getButtonEvent(event);
                    return buttonEvent ? this.fireButtonDown(buttonEvent) : false;
                };
                GamepadService.prototype.keyUp = function (event) {
                    var buttonEvent = this.getButtonEvent(event);
                    return buttonEvent ? this.fireButtonUp(buttonEvent) : false;
                };
                GamepadService.prototype.frame = function () {
                    if (getGamepads) {
                        var pads = getGamepads();
                        for (var i = 0; i < pads.length && i < 2; i += 1) {
                            var state = i == 0 ? this.padState1 : this.padState2;
                            var pad = pads[i];
                            if (pad) {
                                this.checkGamepad(pad, state);
                            }
                        }
                    }
                };
                GamepadService.prototype.checkGamepad = function (pad, state) {
                    var _this = this;
                    // left - right
                    {
                        if (pad.axes[0] < -0.5) {
                            if (state.axis0) {
                                if (state.axis0 == -1) {
                                    if (Date.now() - state.axis0Time >= axisDelay) {
                                        state.axis0 = 0;
                                    }
                                }
                                else if (state.axis0 == 1) {
                                    state.axis0 = 0;
                                    this.fireButtonUp({
                                        player: state.player,
                                        button: 'r',
                                        isNesButton: true
                                    });
                                }
                            }
                            if (state.axis0 == 0) {
                                state.axis0 = -1;
                                state.axis0Time = Date.now();
                                this.fireButtonDown({
                                    player: state.player,
                                    button: 'l',
                                    isNesButton: true
                                });
                            }
                        }
                        else if (pad.axes[0] > 0.5) {
                            if (state.axis0) {
                                if (state.axis0 == -1) {
                                    state.axis0 = 0;
                                    this.fireButtonUp({
                                        player: state.player,
                                        button: 'l',
                                        isNesButton: true
                                    });
                                }
                                else if (state.axis0 == 1) {
                                    if (Date.now() - state.axis0Time >= axisDelay) {
                                        state.axis0 = 0;
                                    }
                                }
                            }
                            if (state.axis0 == 0) {
                                state.axis0 = 1;
                                state.axis0Time = Date.now();
                                this.fireButtonDown({
                                    player: state.player,
                                    button: 'r',
                                    isNesButton: true
                                });
                            }
                        }
                        else if (state.axis0) {
                            this.fireButtonUp({
                                player: state.player,
                                button: state.axis0 == -1 ? 'l' : 'r',
                                isNesButton: true
                            });
                            state.axis0 = 0;
                        }
                    }
                    // up - down
                    {
                        if (pad.axes[1] < -0.5) {
                            if (state.axis1) {
                                if (state.axis1 == -1) {
                                    if (Date.now() - state.axis1Time >= axisDelay) {
                                        state.axis1 = 0;
                                    }
                                }
                                else if (state.axis1 == 1) {
                                    state.axis1 = 0;
                                    this.fireButtonUp({
                                        player: state.player,
                                        button: 'd',
                                        isNesButton: true
                                    });
                                }
                            }
                            if (state.axis1 == 0) {
                                state.axis1 = -1;
                                state.axis1Time = Date.now();
                                this.fireButtonDown({
                                    player: state.player,
                                    button: 'u',
                                    isNesButton: true
                                });
                            }
                        }
                        else if (pad.axes[1] > 0.5) {
                            if (state.axis1) {
                                if (state.axis1 == -1) {
                                    state.axis1 = 0;
                                    this.fireButtonUp({
                                        player: state.player,
                                        button: 'u',
                                        isNesButton: true
                                    });
                                }
                                else if (state.axis1 == 1) {
                                    if (Date.now() - state.axis1Time >= axisDelay) {
                                        state.axis1 = 0;
                                    }
                                }
                            }
                            if (state.axis1 == 0) {
                                state.axis1 = 1;
                                state.axis1Time = Date.now();
                                this.fireButtonDown({
                                    player: state.player,
                                    button: 'd',
                                    isNesButton: true
                                });
                            }
                        }
                        else if (state.axis1) {
                            this.fireButtonUp({
                                player: state.player,
                                button: state.axis1 == -1 ? 'u' : 'd',
                                isNesButton: true
                            });
                            state.axis1 = 0;
                        }
                    }
                    // 0 1 2 3
                    pad.buttons.forEach(function (button, index) {
                        var value = gamepadMap[index];
                        if (value) {
                            if (button.pressed) {
                                if (!state.buttons[index]) {
                                    state.buttons[index] = true;
                                    _this.fireButtonDown({
                                        player: state.player,
                                        button: value,
                                        isNesButton: !value.startsWith('ls') && !value.startsWith('rs')
                                    });
                                }
                            }
                            else {
                                if (state.buttons[index]) {
                                    state.buttons[index] = false;
                                    _this.fireButtonUp({
                                        player: state.player,
                                        button: value,
                                        isNesButton: !value.startsWith('ls') && !value.startsWith('rs')
                                    });
                                }
                            }
                        }
                    });
                };
                GamepadService.prototype.getButtonEvent = function (event) {
                    var button = this.configuration.buttonOfKey(event.keyCode);
                    if (button) {
                        return {
                            player: 1,
                            button: button,
                            isNesButton: true
                        };
                    }
                    else if (event.keyCode == 9) { // TAB
                        return {
                            player: 1,
                            button: 'tab'
                        };
                    }
                    else if (event.keyCode == 27) { // ESC
                        return {
                            player: 1,
                            button: 'ls1'
                        };
                    }
                    return null;
                };
                GamepadService.prototype.fireButtonDown = function (buttonEvent) {
                    for (var i = this.keyDownCallbacks.length - 1; i >= 0; i -= 1) {
                        var callback = this.keyDownCallbacks[i];
                        if (callback(buttonEvent)) {
                            return true;
                        }
                    }
                    return false;
                };
                GamepadService.prototype.fireButtonUp = function (buttonEvent) {
                    for (var i = this.keyUpCallbacks.length - 1; i >= 0; i -= 1) {
                        var callback = this.keyUpCallbacks[i];
                        if (callback(buttonEvent)) {
                            return true;
                        }
                    }
                    return false;
                };
                GamepadService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [configuration_1.Configuration])
                ], GamepadService);
                return GamepadService;
            }());
            exports_1("GamepadService", GamepadService);
            (function (ButtonEventType) {
                ButtonEventType[ButtonEventType["buttonDown"] = 0] = "buttonDown";
                ButtonEventType[ButtonEventType["buttonUp"] = 1] = "buttonUp";
            })(ButtonEventType || (ButtonEventType = {}));
            exports_1("ButtonEventType", ButtonEventType);
            GamepadState = /** @class */ (function () {
                function GamepadState(player) {
                    this.player = player;
                    this.axis0 = 0;
                    this.axis0Time = 0;
                    this.axis1 = 0;
                    this.axis1Time = 0;
                    this.buttons = [
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false
                    ];
                }
                return GamepadState;
            }());
            gamepadMap = {
                0: 'B',
                1: 'a',
                2: 'b',
                3: 'A',
                4: 'ls1',
                5: 'rs1',
                8: 'select',
                9: 'start'
            };
        }
    };
});

System.register(["@angular/core", "rxjs/BehaviorSubject", "tsnes", "../core/configuration", "./gamepad.service"], function (exports_1, context_1) {
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
    var core_1, BehaviorSubject_1, tsnes_1, configuration_1, gamepad_service_1, PlayingStatus, interval, PlayingService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (tsnes_1_1) {
                tsnes_1 = tsnes_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            },
            function (gamepad_service_1_1) {
                gamepad_service_1 = gamepad_service_1_1;
            }
        ],
        execute: function () {
            (function (PlayingStatus) {
                PlayingStatus[PlayingStatus["waiting"] = 1] = "waiting";
                PlayingStatus[PlayingStatus["ready"] = 2] = "ready";
                PlayingStatus[PlayingStatus["running"] = 3] = "running";
                PlayingStatus[PlayingStatus["paused"] = 4] = "paused";
                PlayingStatus[PlayingStatus["error"] = 5] = "error";
            })(PlayingStatus || (PlayingStatus = {}));
            exports_1("PlayingStatus", PlayingStatus);
            interval = 50;
            PlayingService = /** @class */ (function () {
                function PlayingService(configuration, gamepadService) {
                    var _this = this;
                    this.configuration = configuration;
                    this.gamepadService = gamepadService;
                    this._name = new BehaviorSubject_1.BehaviorSubject(null);
                    this._status = new BehaviorSubject_1.BehaviorSubject(null);
                    this._coverImage = new BehaviorSubject_1.BehaviorSubject(null);
                    this._output = new BehaviorSubject_1.BehaviorSubject(null);
                    this.emulator = new tsnes_1.Emulator();
                    this.speaker = new tsnes_1.Speaker();
                    this.emulator.onsample = this.speaker.push.bind(this.speaker);
                    this.emulator.onerror = function (error) { return _this._status.next(PlayingStatus.error); };
                    this.speaker.onbufferunderrun = function () { return _this.emulator.frame(); };
                    this.startTimer();
                }
                Object.defineProperty(PlayingService.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PlayingService.prototype, "status", {
                    get: function () {
                        return this._status;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PlayingService.prototype, "statusValue", {
                    get: function () {
                        return this._status.getValue();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PlayingService.prototype, "coverImage", {
                    get: function () {
                        return this._coverImage;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PlayingService.prototype, "output", {
                    get: function () {
                        return this._output;
                    },
                    enumerable: true,
                    configurable: true
                });
                PlayingService.prototype.load = function (name, rom) {
                    var _this = this;
                    this.emulator.load(rom);
                    this._name.next(name);
                    this._status.next(PlayingStatus.ready);
                    this._coverImage.next(null);
                    this._output.next(null);
                    this.configuration.playing = name;
                    var img = new Image();
                    img.onload = function () {
                        if (_this._name.getValue() == name && img.complete && img.naturalHeight !== 0) {
                            _this._coverImage.next(img);
                        }
                    };
                    img.src = window.location.protocol + '//' + window.location.host + '/screen/' + name + '.png';
                };
                PlayingService.prototype.start = function () {
                    if (this._status.getValue() != PlayingStatus.ready)
                        return;
                    this.requestAnimation();
                    this._status.next(PlayingStatus.running);
                };
                PlayingService.prototype.pause = function () {
                    if (this._status.getValue() != PlayingStatus.running)
                        return;
                    this.speaker.close();
                    this.cancelAnimation();
                    this._status.next(PlayingStatus.paused);
                };
                PlayingService.prototype.resume = function () {
                    if (this._status.getValue() != PlayingStatus.paused)
                        return;
                    this.requestAnimation();
                    this._status.next(PlayingStatus.running);
                };
                PlayingService.prototype.stop = function () {
                    var status = this._status.getValue();
                    if (status != PlayingStatus.running && status != PlayingStatus.paused)
                        return;
                    this.speaker.close();
                    this.cancelAnimation();
                    this._status.next(PlayingStatus.ready);
                    this._output.next(null);
                };
                PlayingService.prototype.buttonDown = function (player, button) {
                    this.emulator.buttonDown(player, button);
                };
                PlayingService.prototype.buttonUp = function (player, button) {
                    this.emulator.buttonUp(player, button);
                };
                PlayingService.prototype.startTimer = function () {
                    if (!this.intervalId) {
                        this.intervalId = window.setInterval(this.gamepadService.frame.bind(this.gamepadService), interval);
                    }
                };
                PlayingService.prototype.stopTimer = function () {
                    if (this.intervalId) {
                        window.clearInterval(this.intervalId);
                        this.intervalId = 0;
                    }
                };
                PlayingService.prototype.requestAnimation = function () {
                    this.animationRequestId = window.requestAnimationFrame(this.onAnimation.bind(this));
                    this.stopTimer();
                };
                PlayingService.prototype.cancelAnimation = function () {
                    if (this.animationRequestId) {
                        window.cancelAnimationFrame(this.animationRequestId);
                        this.animationRequestId = 0;
                    }
                    this.startTimer();
                };
                PlayingService.prototype.onAnimation = function () {
                    this.gamepadService.frame();
                    if (this._status.getValue() == PlayingStatus.running) {
                        this.requestAnimation();
                        if (this.emulator.frame()) {
                            this._output.next(this.emulator.pull());
                        }
                        else {
                            this._status.next(PlayingStatus.error);
                        }
                    }
                };
                PlayingService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [configuration_1.Configuration,
                        gamepad_service_1.GamepadService])
                ], PlayingService);
                return PlayingService;
            }());
            exports_1("PlayingService", PlayingService);
        }
    };
});

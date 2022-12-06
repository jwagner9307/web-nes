System.register(["@angular/core", "../../../core/configuration", "../../../core/playing.service", "../../../room/room.service", "../../../core/gamepad.service"], function (exports_1, context_1) {
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
    var core_1, configuration_1, playing_service_1, room_service_1, gamepad_service_1, ScreenComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            },
            function (playing_service_1_1) {
                playing_service_1 = playing_service_1_1;
            },
            function (room_service_1_1) {
                room_service_1 = room_service_1_1;
            },
            function (gamepad_service_1_1) {
                gamepad_service_1 = gamepad_service_1_1;
            }
        ],
        execute: function () {
            ScreenComponent = /** @class */ (function () {
                function ScreenComponent(configuration, playingService, gamepadService, roomService) {
                    this.configuration = configuration;
                    this.playingService = playingService;
                    this.gamepadService = gamepadService;
                    this.roomService = roomService;
                    this.subscriptions = [];
                    this.status = null;
                    this.coverImage = null;
                    this.frame = null;
                }
                ScreenComponent.prototype.ngOnInit = function () {
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonUp, this.buttonUp.bind(this)));
                };
                ScreenComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.context = this.canvas.nativeElement.getContext('2d');
                    this.imageData = this.context.getImageData(0, 0, 256, 240);
                    this.context.fillStyle = 'black';
                    this.context.fillRect(0, 0, 256, 240);
                    for (var i = 3; i < this.imageData.data.length - 3; i += 4) {
                        this.imageData.data[i] = 0xFF; // alpha
                    }
                    this.subscriptions.push(this.playingService.coverImage.subscribe(function (image) {
                        if (_this.coverImage !== image) {
                            _this.coverImage = image;
                            _this.draw();
                        }
                    }));
                    if (this.mode == 'master') {
                        this.subscriptions.push(this.playingService.status.subscribe(function (status) {
                            if (_this.status != status) {
                                _this.status = status;
                                _this.draw();
                            }
                        }));
                        this.subscriptions.push(this.playingService.output.subscribe(function (output) {
                            _this.frame = output ? output.video : null;
                            _this.draw();
                        }));
                    }
                    else if (this.mode == 'mirror') {
                        this.subscriptions.push(this.roomService.mirrorStatus.subscribe(function (status) {
                            if (_this.status != status) {
                                _this.status = status;
                                _this.draw();
                            }
                        }));
                        this.subscriptions.push(this.roomService.mirrorOutput.subscribe(function (output) {
                            _this.frame = output ? output.video : null;
                            _this.draw();
                            if (output && output.audio) {
                                _this.playingService.speaker.play(output.audio);
                            }
                        }));
                    }
                    this.draw();
                    this.layout();
                };
                ScreenComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                ScreenComponent.prototype.clickScreen = function () {
                    if (this.mode == 'master') {
                        switch (this.status) {
                            case playing_service_1.PlayingStatus.ready:
                                this.playingService.start();
                                break;
                            case playing_service_1.PlayingStatus.running:
                                this.playingService.pause();
                                break;
                            case playing_service_1.PlayingStatus.paused:
                                this.playingService.resume();
                                break;
                        }
                    }
                    else if (this.mode == 'mirror') {
                        switch (this.status) {
                            case playing_service_1.PlayingStatus.running:
                                this.roomService.sendRequest('pause');
                                break;
                            case playing_service_1.PlayingStatus.paused:
                                this.roomService.sendRequest('resume');
                                break;
                        }
                    }
                };
                ScreenComponent.prototype.buttonDown = function (event) {
                    if (this.status == playing_service_1.PlayingStatus.running) {
                        if (event.isNesButton) {
                            if (this.mode == 'master') {
                                this.playingService.buttonDown(event.player, event.button);
                            }
                            else if (this.mode == 'mirror') {
                                this.roomService.sendButtonDown(event.button);
                            }
                            return true;
                        }
                    }
                    else if (event.button == 'start') {
                        if (this.status == playing_service_1.PlayingStatus.ready) {
                            if (this.mode == 'master') {
                                this.playingService.start();
                                return true;
                            }
                        }
                        else if (this.status == playing_service_1.PlayingStatus.paused) {
                            if (this.mode == 'master') {
                                this.playingService.resume();
                            }
                            else if (this.mode == 'mirror') {
                                this.roomService.sendRequest('resume');
                            }
                            return true;
                        }
                    }
                    return false;
                };
                ScreenComponent.prototype.buttonUp = function (event) {
                    if (event.isNesButton) {
                        if (this.mode == 'master') {
                            this.playingService.buttonUp(event.player, event.button);
                        }
                        else if (this.mode == 'mirror') {
                            this.roomService.sendButtonUp(event.button);
                        }
                        return true;
                    }
                    return false;
                };
                ScreenComponent.prototype.keyPress = function (event) {
                    if (this.status != playing_service_1.PlayingStatus.running)
                        return;
                    event.preventDefault();
                };
                ScreenComponent.prototype.layout = function () {
                    var canvas = this.canvas.nativeElement;
                    var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], width = w.innerWidth || e.clientWidth || g.clientWidth, height = w.innerHeight || e.clientHeight || g.clientHeight;
                    var parentRatio = width / height;
                    var desiredRatio = 256 / 240;
                    canvas.style.zoom = (desiredRatio < parentRatio) ? (height - 20) / 240 : (width - 20) / 256;
                };
                ScreenComponent.prototype.draw = function () {
                    switch (this.status) {
                        case playing_service_1.PlayingStatus.waiting:
                            this.drawText('⌛', 'DarkOrange');
                            break;
                        case playing_service_1.PlayingStatus.ready:
                            this.drawText(this.mode == 'mirror' ? '⌛' : '▶', 'Green');
                            break;
                        case playing_service_1.PlayingStatus.running:
                            this.drawBackground();
                            break;
                        case playing_service_1.PlayingStatus.paused:
                            this.drawText('||', 'DarkOrange');
                            break;
                        case playing_service_1.PlayingStatus.error:
                            this.drawText('!', 'DarkRed');
                            break;
                    }
                };
                ScreenComponent.prototype.drawBackground = function () {
                    if (!this.context)
                        return;
                    if (this.frame) {
                        var data = this.imageData.data;
                        var buffer = this.frame;
                        for (var i = 0; i < 256 * 240; i += 1) {
                            var pixel = buffer[i];
                            var j = i * 4;
                            data[j] = pixel & 0xFF;
                            data[j + 1] = (pixel >> 8) & 0xFF;
                            data[j + 2] = (pixel >> 16) & 0xFF;
                        }
                        this.context.putImageData(this.imageData, 0, 0);
                    }
                    else if (this.coverImage) {
                        this.context.drawImage(this.coverImage, 0, 0);
                    }
                    else {
                        this.context.fillStyle = 'black';
                        this.context.fillRect(0, 0, 256, 240);
                    }
                };
                ScreenComponent.prototype.drawText = function (text, color) {
                    if (!this.context)
                        return;
                    this.drawBackground();
                    this.context.beginPath();
                    this.context.rect(0, 0, 256, 240);
                    this.context.fillStyle = 'rgba(0,0,0,0.5)';
                    this.context.fill();
                    this.context.closePath();
                    /*this.context.beginPath();
                    this.context.ellipse(128, 120, 25, 25, 0, 0, 2 * Math.PI);
                    this.context.fillStyle = 'LightGray';
                    this.context.fill();
                    this.context.closePath();*/
                    this.context.font = '30px Verdana';
                    this.context.fillStyle = color;
                    this.context.textAlign = 'center';
                    this.context.textBaseline = 'middle';
                    this.context.fillText(text, 128, 120);
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], ScreenComponent.prototype, "name", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], ScreenComponent.prototype, "mode", void 0);
                __decorate([
                    core_1.ViewChild('canvas'),
                    __metadata("design:type", core_1.ElementRef)
                ], ScreenComponent.prototype, "canvas", void 0);
                ScreenComponent = __decorate([
                    core_1.Component({
                        selector: 'screen',
                        templateUrl: 'screen.component.html',
                        styleUrls: ['screen.component.css'],
                        host: {
                            '(document:keypress)': 'keyPress($event)',
                            '(window:resize)': 'layout($event)'
                        },
                    }),
                    __metadata("design:paramtypes", [configuration_1.Configuration,
                        playing_service_1.PlayingService,
                        gamepad_service_1.GamepadService,
                        room_service_1.RoomService])
                ], ScreenComponent);
                return ScreenComponent;
            }());
            exports_1("ScreenComponent", ScreenComponent);
        }
    };
});

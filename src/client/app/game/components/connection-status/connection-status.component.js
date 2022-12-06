System.register(["@angular/core", "../../../core/configuration", "../../../core/gamepad.service", "../../../room/room.model", "../../../room/room.service"], function (exports_1, context_1) {
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
    var core_1, configuration_1, gamepad_service_1, room_model_1, room_service_1, ConnectionStatusComponent, Option;
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
            },
            function (room_model_1_1) {
                room_model_1 = room_model_1_1;
            },
            function (room_service_1_1) {
                room_service_1 = room_service_1_1;
            }
        ],
        execute: function () {
            ConnectionStatusComponent = /** @class */ (function () {
                function ConnectionStatusComponent(configuration, gamepadService, roomService) {
                    this.configuration = configuration;
                    this.gamepadService = gamepadService;
                    this.roomService = roomService;
                    this.subscriptions = [];
                    this.abandon = new core_1.EventEmitter();
                    this.Option = Option;
                    this.RoomStatus = room_model_1.RoomStatus;
                    this.status = null;
                    this.room = null;
                    this.selected = null;
                }
                ConnectionStatusComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.subscriptions.push(this.roomService.status.subscribe(function (status) {
                        _this.status = status;
                        switch (status) {
                            case room_model_1.RoomStatus.abandoned:
                                _this.selected = Option.cancel;
                                break;
                            case room_model_1.RoomStatus.serverFailed:
                            case room_model_1.RoomStatus.serverDisconnected:
                            case room_model_1.RoomStatus.peerDisconnected:
                                _this.selected = Option.retry;
                                break;
                            default:
                                _this.selected = null;
                                break;
                        }
                    }));
                    this.subscriptions.push(this.roomService.room.subscribe(function (room) { return _this.room = room; }));
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                ConnectionStatusComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                ConnectionStatusComponent.prototype.buttonDown = function (event) {
                    switch (event.button) {
                        case 'tab':
                            return this.tab();
                        case 'l':
                        case 'u':
                        case 'r':
                        case 'd':
                        case 'select':
                            return this.tab();
                        case 'start':
                            if (this.selected === Option.retry) {
                                this.retry();
                            }
                            else if (this.selected === Option.cancel) {
                                this.cancel();
                            }
                            return true;
                    }
                    return false;
                };
                ConnectionStatusComponent.prototype.tab = function () {
                    switch (this.status) {
                        case room_model_1.RoomStatus.serverConnect:
                        case room_model_1.RoomStatus.serverConnected:
                        case room_model_1.RoomStatus.serverWaiting:
                        case room_model_1.RoomStatus.peerConnect:
                        case room_model_1.RoomStatus.peerReconnect:
                        case room_model_1.RoomStatus.abandoned:
                            this.selected = Option.cancel;
                            break;
                        case room_model_1.RoomStatus.serverFailed:
                        case room_model_1.RoomStatus.serverDisconnected:
                        case room_model_1.RoomStatus.peerDisconnected:
                            if (this.selected === Option.retry) {
                                this.selected = Option.cancel;
                            }
                            else {
                                this.selected = Option.retry;
                            }
                            break;
                    }
                    return true;
                };
                ConnectionStatusComponent.prototype.retry = function () {
                    if (this.room && this.room.id) {
                        this.roomService.reconnect();
                    }
                    else {
                        this.roomService.reset();
                    }
                };
                ConnectionStatusComponent.prototype.cancel = function () {
                    this.abandon.emit();
                };
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], ConnectionStatusComponent.prototype, "abandon", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], ConnectionStatusComponent.prototype, "game", void 0);
                ConnectionStatusComponent = __decorate([
                    core_1.Component({
                        selector: 'connection-status',
                        templateUrl: 'connection-status.component.html'
                    }),
                    __metadata("design:paramtypes", [configuration_1.Configuration,
                        gamepad_service_1.GamepadService,
                        room_service_1.RoomService])
                ], ConnectionStatusComponent);
                return ConnectionStatusComponent;
            }());
            exports_1("ConnectionStatusComponent", ConnectionStatusComponent);
            (function (Option) {
                Option[Option["retry"] = 0] = "retry";
                Option[Option["cancel"] = 1] = "cancel";
            })(Option || (Option = {}));
        }
    };
});

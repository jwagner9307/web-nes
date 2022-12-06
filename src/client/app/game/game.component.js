System.register(["@angular/core", "@angular/router", "./game.model", "./game.service", "../core/playing.service", "../room/room.model", "../room/room.service", "../core/configuration", "../core/gamepad.service"], function (exports_1, context_1) {
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
    var core_1, router_1, game_model_1, game_service_1, playing_service_1, room_model_1, room_service_1, configuration_1, gamepad_service_1, GameComponent, Option;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (game_model_1_1) {
                game_model_1 = game_model_1_1;
            },
            function (game_service_1_1) {
                game_service_1 = game_service_1_1;
            },
            function (playing_service_1_1) {
                playing_service_1 = playing_service_1_1;
            },
            function (room_model_1_1) {
                room_model_1 = room_model_1_1;
            },
            function (room_service_1_1) {
                room_service_1 = room_service_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            },
            function (gamepad_service_1_1) {
                gamepad_service_1 = gamepad_service_1_1;
            }
        ],
        execute: function () {
            GameComponent = /** @class */ (function () {
                function GameComponent(route, router, configuration, gameService, roomService, playingService, gamepadService) {
                    this.route = route;
                    this.router = router;
                    this.configuration = configuration;
                    this.gameService = gameService;
                    this.roomService = roomService;
                    this.playingService = playingService;
                    this.gamepadService = gamepadService;
                    this.subscriptions = [];
                    this.name = null;
                    this.game = null;
                    this.message = null;
                    this.PlayingMode = game_model_1.PlayingMode;
                    this.playingMode = null;
                    this.RoomStatus = room_model_1.RoomStatus;
                    this.roomStatus = null;
                    this.room = null;
                    this.Option = Option;
                    this.showingExitQuery = false;
                    this.showingUsernameInput = false;
                    this.showingPasscodeInput = false;
                    this.passcode = null;
                }
                GameComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.subscriptions.push(this.route.params.subscribe(function (params) {
                        _this.name = params.name;
                        _this.gameService.getGame(_this.name)
                            .then(function (game) {
                            _this.game = game;
                            if (!game.multiplayer) {
                                _this.playingMode = game_model_1.PlayingMode.singleplayer;
                            }
                            _this.gameService.getRom(game.name)
                                .then(function (rom) { return _this.playingService.load(game.name, rom); });
                        })
                            .catch(function (error) {
                            _this.game = null;
                            _this.message = error.message;
                        });
                    }));
                    this.subscriptions.push(this.roomService.status.subscribe(function (roomStatus) {
                        _this.roomStatus = roomStatus;
                        if (_this.roomStatus == room_model_1.RoomStatus.passcodeInvalid) {
                            _this.showingPasscodeInput = true;
                        }
                    }));
                    this.subscriptions.push(this.roomService.room.subscribe(function (room) { return _this.room = room; }));
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                GameComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                    this.playingService.pause();
                    this.roomService.abandon();
                };
                GameComponent.prototype.back = function () {
                    if (!this.showingExitQuery && this.room) {
                        if (this.showingMasterScreen) {
                            this.playingService.pause();
                            this.showingExitQuery = true;
                            this.option = Option.no;
                            return;
                        }
                        else if (this.showingMirrorScreen) {
                            this.roomService.sendRequest('pause');
                            this.showingExitQuery = true;
                            this.option = Option.no;
                            return;
                        }
                    }
                    this.showingExitQuery = false;
                    if (this.playingMode == game_model_1.PlayingMode.singleplayer) {
                        this.playingService.pause();
                        this.router.navigateByUrl('/');
                    }
                    else if (this.playingMode == game_model_1.PlayingMode.multiplayer) {
                        if (this.roomStatus || this.showingUsernameInput || this.showingPasscodeInput) {
                            this.roomStatus = null;
                            this.showingUsernameInput = false;
                            this.showingPasscodeInput = false;
                            this.passcode = null;
                            if (!this.configuration.username || this.configuration.username.length == 0) {
                                this.playingMode = null;
                            }
                        }
                        else {
                            this.playingMode = null;
                        }
                        this.playingService.pause();
                        this.roomService.abandon();
                    }
                    else {
                        this.router.navigateByUrl('/');
                    }
                };
                Object.defineProperty(GameComponent.prototype, "showingPlayingModeInput", {
                    get: function () {
                        return this.game && this.game.multiplayer &&
                            this.playingMode == null;
                    },
                    enumerable: true,
                    configurable: true
                });
                GameComponent.prototype.selectPlayingMode = function (mode) {
                    this.playingMode = mode;
                    if (this.playingMode == game_model_1.PlayingMode.multiplayer) {
                        if (!this.configuration.username || this.configuration.username.length == 0) {
                            this.showingUsernameInput = true;
                        }
                    }
                };
                Object.defineProperty(GameComponent.prototype, "showingRoomOptionInput", {
                    get: function () {
                        return this.game && this.game.multiplayer &&
                            this.playingMode == game_model_1.PlayingMode.multiplayer &&
                            this.roomStatus === null &&
                            !this.showingUsernameInput &&
                            !this.showingPasscodeInput;
                    },
                    enumerable: true,
                    configurable: true
                });
                GameComponent.prototype.selectRoomOption = function (option) {
                    switch (option) {
                        case game_model_1.RoomOption.username:
                            this.showingUsernameInput = true;
                            break;
                        case game_model_1.RoomOption.anyone:
                            this.roomService.connectAnyone(this.name);
                            break;
                        case game_model_1.RoomOption.create:
                            this.roomService.createPrivate(this.name);
                            break;
                        case game_model_1.RoomOption.join:
                            this.showingPasscodeInput = true;
                            break;
                    }
                };
                GameComponent.prototype.selectUsername = function () {
                    this.showingUsernameInput = false;
                };
                GameComponent.prototype.selectPasscode = function (passcode) {
                    this.showingPasscodeInput = false;
                    this.passcode = passcode;
                    this.roomService.joinPrivate(this.name, passcode);
                };
                Object.defineProperty(GameComponent.prototype, "showingConnectionStatus", {
                    get: function () {
                        return this.game &&
                            this.playingMode == game_model_1.PlayingMode.multiplayer &&
                            this.roomStatus !== null &&
                            this.roomStatus != room_model_1.RoomStatus.peerConnected &&
                            !this.showingPasscodeInput;
                    },
                    enumerable: true,
                    configurable: true
                });
                GameComponent.prototype.selectAbandon = function () {
                    this.roomService.abandon();
                };
                Object.defineProperty(GameComponent.prototype, "showingMasterScreen", {
                    get: function () {
                        return this.game && (this.playingMode == game_model_1.PlayingMode.singleplayer || (this.playingMode == game_model_1.PlayingMode.multiplayer &&
                            this.room && this.room.asmaster &&
                            this.roomStatus == room_model_1.RoomStatus.peerConnected));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameComponent.prototype, "showingMirrorScreen", {
                    get: function () {
                        return this.game &&
                            this.playingMode == game_model_1.PlayingMode.multiplayer &&
                            this.room && !this.room.asmaster &&
                            this.roomStatus == room_model_1.RoomStatus.peerConnected;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameComponent.prototype, "playerI", {
                    get: function () {
                        if (this.game &&
                            this.playingMode == game_model_1.PlayingMode.multiplayer &&
                            this.room) {
                            if (this.room.asmaster) {
                                if (this.room.this) {
                                    return this.room.this;
                                }
                            }
                            else {
                                if (this.room.that) {
                                    return this.room.that;
                                }
                            }
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameComponent.prototype, "playerII", {
                    get: function () {
                        if (this.game &&
                            this.playingMode == game_model_1.PlayingMode.multiplayer &&
                            this.room) {
                            if (this.room.asmaster) {
                                if (this.room.that) {
                                    return this.room.that;
                                }
                            }
                            else {
                                if (this.room.this) {
                                    return this.room.this;
                                }
                            }
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                GameComponent.prototype.buttonDown = function (event) {
                    if (event.button == 'ls1') {
                        this.back();
                        return true;
                    }
                    else if (this.showingExitQuery) {
                        switch (event.button) {
                            case 'tab':
                                this.option = this.option ? 0 : 1;
                                return true;
                            case 'l':
                            case 'u':
                                this.option = Option.yes;
                                return true;
                            case 'r':
                            case 'd':
                                this.option = Option.no;
                                return true;
                            case 'start':
                                if (this.option == Option.yes) {
                                    this.back();
                                }
                                else {
                                    this.showingExitQuery = false;
                                }
                                return true;
                        }
                    }
                    return false;
                };
                GameComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'game.component.html'
                    }),
                    __metadata("design:paramtypes", [router_1.ActivatedRoute,
                        router_1.Router,
                        configuration_1.Configuration,
                        game_service_1.GameService,
                        room_service_1.RoomService,
                        playing_service_1.PlayingService,
                        gamepad_service_1.GamepadService])
                ], GameComponent);
                return GameComponent;
            }());
            exports_1("GameComponent", GameComponent);
            (function (Option) {
                Option[Option["yes"] = 0] = "yes";
                Option[Option["no"] = 1] = "no";
            })(Option || (Option = {}));
            ;
        }
    };
});

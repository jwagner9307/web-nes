System.register(["@angular/core", "@angular/router", "./game.service", "../core/configuration", "../core/playing.service", "../core/gamepad.service"], function (exports_1, context_1) {
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
    var core_1, router_1, game_service_1, configuration_1, playing_service_1, gamepad_service_1, GameListComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (game_service_1_1) {
                game_service_1 = game_service_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            },
            function (playing_service_1_1) {
                playing_service_1 = playing_service_1_1;
            },
            function (gamepad_service_1_1) {
                gamepad_service_1 = gamepad_service_1_1;
            }
        ],
        execute: function () {
            GameListComponent = /** @class */ (function () {
                function GameListComponent(router, configuration, gamepadService, gameService, playingService) {
                    var _this = this;
                    this.router = router;
                    this.configuration = configuration;
                    this.gamepadService = gamepadService;
                    this.gameService = gameService;
                    this.playingService = playingService;
                    this.subscriptions = [];
                    this.games = null;
                    this.selectedIndex = null;
                    this.movedToSelected = false;
                    gameService.getGames()
                        .then(function (games) {
                        _this.games = games;
                        if (_this.selectedIndex === null) {
                            if (_this.configuration.playing) {
                                for (var i = 0; i < games.length; i += 1) {
                                    if (games[i].name == _this.configuration.playing) {
                                        _this.selectedIndex = i;
                                        break;
                                    }
                                }
                            }
                            else {
                                _this.selectedIndex = 0;
                            }
                        }
                        if (_this.selectedIndex > _this.games.length - 1) {
                            _this.selectedIndex = _this.games.length - 1;
                        }
                    });
                }
                GameListComponent.prototype.ngOnInit = function () {
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                GameListComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                GameListComponent.prototype.ngAfterViewChecked = function () {
                    if (!this.movedToSelected && this.selectedIndex) {
                        this.movedToSelected = true;
                        this.moveToViewIfRequired();
                    }
                };
                GameListComponent.prototype.buttonDown = function (event) {
                    switch (event.button) {
                        case 'tab':
                            if (this.games) {
                                if (this.selectedIndex < this.games.length - 1) {
                                    this.selectedIndex += 1;
                                }
                                else {
                                    this.selectedIndex = 0;
                                }
                                this.moveToViewIfRequired();
                                return true;
                            }
                            return false;
                        case 'ls1':
                            this.router.navigateByUrl('/settings');
                            return true;
                        case 'l':
                            if (this.selectedIndex > 0) {
                                this.selectedIndex -= 1;
                                this.moveToViewIfRequired();
                                return true;
                            }
                            break;
                        case 'r':
                            if (this.games && this.selectedIndex < this.games.length - 1) {
                                this.selectedIndex += 1;
                                this.moveToViewIfRequired();
                                return true;
                            }
                            break;
                        case 'u':
                            if (this.selectedIndex > 0) {
                                this.selectedIndex -= this.getCellsPerRow();
                                if (this.selectedIndex < 0) {
                                    this.selectedIndex = 0;
                                }
                                this.moveToViewIfRequired();
                                return true;
                            }
                            break;
                        case 'd':
                            if (this.games && this.selectedIndex < this.games.length - 1) {
                                this.selectedIndex += this.getCellsPerRow();
                                if (this.selectedIndex > this.games.length - 1) {
                                    this.selectedIndex = this.games.length - 1;
                                }
                                this.moveToViewIfRequired();
                                return true;
                            }
                            break;
                        case 'start':
                            if (this.games && this.selectedIndex < this.games.length - 1) {
                                var game = this.games[this.selectedIndex];
                                this.router.navigateByUrl('/' + encodeURIComponent(game.name));
                                return true;
                            }
                            break;
                    }
                    return false;
                };
                GameListComponent.prototype.moveToViewIfRequired = function () {
                    var e = document.getElementById('cover-' + this.selectedIndex);
                    if (!e)
                        return;
                    var rect = e.getBoundingClientRect();
                    var visible = (rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */);
                    if (!visible) {
                        if (this.selectedIndex < this.getCellsPerRow()) {
                            document.body.scrollTop = 0;
                            document.documentElement.scrollTop = 0;
                        }
                        else {
                            e.scrollIntoView();
                        }
                    }
                };
                GameListComponent.prototype.getCellsPerRow = function () {
                    if (!this.games || !this.games.length)
                        return 0;
                    var top = document.getElementById('cover-0').getBoundingClientRect().top;
                    var count = 1;
                    for (var i = 1; i < this.games.length; i += 1) {
                        var e = document.getElementById('cover-' + i);
                        if (e.getBoundingClientRect().top > top) {
                            return i;
                        }
                    }
                    return count;
                };
                GameListComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'game-list.component.html',
                    }),
                    __metadata("design:paramtypes", [router_1.Router,
                        configuration_1.Configuration,
                        gamepad_service_1.GamepadService,
                        game_service_1.GameService,
                        playing_service_1.PlayingService])
                ], GameListComponent);
                return GameListComponent;
            }());
            exports_1("GameListComponent", GameListComponent);
        }
    };
});

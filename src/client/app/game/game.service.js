System.register(["@angular/core", "@angular/http"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, http_1, GameService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            GameService = /** @class */ (function () {
                function GameService(http) {
                    this.http = http;
                }
                GameService.prototype.getGames = function () {
                    var _this = this;
                    if (!this.games) {
                        return this.http.request('/api/games/')
                            .toPromise()
                            .then(function (res) {
                            _this.games = res.json();
                            return _this.games;
                        });
                    }
                    else {
                        return Promise.resolve(this.games);
                    }
                };
                GameService.prototype.getGame = function (name) {
                    var _this = this;
                    if (!this.games) {
                        return this.http.request('/api/games/')
                            .toPromise()
                            .then(function (res) {
                            _this.games = res.json();
                            if (_this.games) {
                                for (var i = 0; i < _this.games.length; i += 1) {
                                    var game = _this.games[i];
                                    if (game.name == name) {
                                        return game;
                                    }
                                }
                            }
                            throw new Error('Game "' + name + '" is not available.');
                        });
                    }
                    else {
                        for (var i = 0; i < this.games.length; i += 1) {
                            var game = this.games[i];
                            if (game.name == name) {
                                return Promise.resolve(game);
                            }
                        }
                        return Promise.reject(new Error('Game "' + name + '" is not available.'));
                    }
                };
                GameService.prototype.getRom = function (name) {
                    return this.http.get('roms/' + name + '.nes', { responseType: http_1.ResponseContentType.ArrayBuffer })
                        .toPromise()
                        .then(function (res) { return res.arrayBuffer(); });
                };
                GameService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(http_1.Http)),
                    __metadata("design:paramtypes", [http_1.Http])
                ], GameService);
                return GameService;
            }());
            exports_1("GameService", GameService);
        }
    };
});

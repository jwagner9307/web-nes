System.register(["@angular/core", "@angular/common", "rxjs/BehaviorSubject", "./socket"], function (exports_1, context_1) {
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
    var core_1, common_1, BehaviorSubject_1, socket_1, SocketService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (socket_1_1) {
                socket_1 = socket_1_1;
            }
        ],
        execute: function () {
            SocketService = /** @class */ (function () {
                function SocketService(baseHref) {
                    var _this = this;
                    this.baseHref = baseHref;
                    this.emitters = {};
                    if (this.baseHref.endsWith('/')) {
                        this.baseHref = this.baseHref.substring(0, this.baseHref.length - 1);
                    }
                    this.socket = new socket_1.Socket(window.location.protocol.replace('http', 'ws')
                        + '//' + window.location.host
                        + this.baseHref
                        + '/.socket', { tickingSeconds: 5 });
                    this._status = new BehaviorSubject_1.BehaviorSubject('closed');
                    this.socket.onopen = function () { return _this._status.next('connected'); };
                    this.socket.onclose = function (event) {
                        _this._status.next('closed');
                    };
                    this.socket.onmessage = function (message) {
                        if (message.name) {
                            _this.getEmitter(message.name).emit(message.value);
                        }
                    };
                }
                Object.defineProperty(SocketService.prototype, "status", {
                    get: function () {
                        return this._status;
                    },
                    enumerable: true,
                    configurable: true
                });
                SocketService.prototype.socketReady = function () {
                    switch (this._status.getValue()) {
                        case 'connected':
                            return Promise.resolve(this.socket);
                        case 'connecting':
                            return this.waitSocket();
                        default:
                            if (this.socket.connect()) {
                                this._status.next('connecting');
                                return this.waitSocket();
                            }
                            else {
                                return Promise.reject(new Error('Failed to connect to server'));
                            }
                    }
                };
                SocketService.prototype.socketConnected = function () {
                    if (this._status.getValue() == 'connected') {
                        return this.socket;
                    }
                    return null;
                };
                SocketService.prototype.subscribe = function (name, callback) {
                    return this.getEmitter(name).subscribe(callback);
                };
                SocketService.prototype.getEmitter = function (name) {
                    var emitter = this.emitters[name];
                    if (!emitter) {
                        emitter = new core_1.EventEmitter();
                        this.emitters[name] = emitter;
                    }
                    return emitter;
                };
                SocketService.prototype.waitSocket = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var subscription = _this.status.subscribe(function (status) {
                            if (status == 'connected') {
                                subscription.unsubscribe();
                                resolve(_this.socket);
                            }
                            else if (status == 'closed') {
                                subscription.unsubscribe();
                                reject(new Error('Failed to connect to server'));
                            }
                        });
                    });
                };
                SocketService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(common_1.APP_BASE_HREF)),
                    __metadata("design:paramtypes", [String])
                ], SocketService);
                return SocketService;
            }());
            exports_1("SocketService", SocketService);
        }
    };
});

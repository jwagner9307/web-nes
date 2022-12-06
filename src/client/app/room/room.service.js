System.register(["@angular/core", "../core/socket.service", "rxjs/BehaviorSubject", "./room.model", "../core/socket", "../core/playing.service", "./output-processor", "./input-processor", "../core/configuration"], function (exports_1, context_1) {
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
    var core_1, socket_service_1, BehaviorSubject_1, room_model_1, socket_1, playing_service_1, output_processor_1, input_processor_1, configuration_1, RoomService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            },
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (room_model_1_1) {
                room_model_1 = room_model_1_1;
            },
            function (socket_1_1) {
                socket_1 = socket_1_1;
            },
            function (playing_service_1_1) {
                playing_service_1 = playing_service_1_1;
            },
            function (output_processor_1_1) {
                output_processor_1 = output_processor_1_1;
            },
            function (input_processor_1_1) {
                input_processor_1 = input_processor_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            }
        ],
        execute: function () {
            RoomService = /** @class */ (function () {
                function RoomService(configuration, playingService, socketService) {
                    var _this = this;
                    this.configuration = configuration;
                    this.playingService = playingService;
                    this.socketService = socketService;
                    this._status = new BehaviorSubject_1.BehaviorSubject(null);
                    this._room = new BehaviorSubject_1.BehaviorSubject(null);
                    this._mirrorStatus = new BehaviorSubject_1.BehaviorSubject(null);
                    this._mirrorOutput = new BehaviorSubject_1.BehaviorSubject(null);
                    this.outputProcessor = null;
                    this.inputProcessor = null;
                    if (this.configuration.mirrorRoom && this.configuration.username) {
                        var room = {
                            game: this.configuration.mirrorRoom.game,
                            asmaster: false,
                            this: this.configuration.username,
                            id: this.configuration.mirrorRoom.id
                        };
                        this._status.next(room_model_1.RoomStatus.peerDisconnected);
                        this._room.next(room);
                    }
                    this.socketService.status.subscribe(function (status) {
                        if (status == 'closed') {
                            var status_1 = _this._status.getValue();
                            switch (status_1) {
                                case room_model_1.RoomStatus.serverConnect:
                                    _this._status.next(room_model_1.RoomStatus.serverFailed);
                                    break;
                                case room_model_1.RoomStatus.serverWaiting:
                                case room_model_1.RoomStatus.peerConnect:
                                case room_model_1.RoomStatus.peerWaiting:
                                case room_model_1.RoomStatus.peerReconnect:
                                    _this._status.next(room_model_1.RoomStatus.serverDisconnected);
                                    break;
                            }
                        }
                    });
                    this.playingService.status.subscribe(function (status) {
                        var room = _this._room.getValue();
                        if (_this.peer && room && room.asmaster && (status == playing_service_1.PlayingStatus.ready ||
                            status == playing_service_1.PlayingStatus.running ||
                            status == playing_service_1.PlayingStatus.paused)) {
                            _this.peerSend('status', status);
                        }
                    });
                    this.playingService.output.subscribe(function (output) {
                        var room = _this._room.getValue();
                        if (_this.peer &&
                            room &&
                            room.asmaster &&
                            _this._status.getValue() == room_model_1.RoomStatus.peerConnected) {
                            if (!_this.outputProcessor) {
                                _this.outputProcessor = new output_processor_1.default();
                            }
                            var result = _this.outputProcessor.process(output);
                            if (result) {
                                _this.peerSend('output', result);
                            }
                        }
                    });
                    this.socketService.subscribe('room', function (data) {
                        var room = _this._room.getValue();
                        var response = data;
                        switch (response.status) {
                            case 'created':
                                if (!room) {
                                    room = {
                                        game: response.game,
                                        asmaster: true,
                                        this: response.this,
                                    };
                                    if (response.passcode) {
                                        room.passcode = response.passcode;
                                    }
                                    _this._status.next(room_model_1.RoomStatus.serverWaiting);
                                    _this._room.next(room);
                                }
                                break;
                            case 'masterJoined':
                                if (room && room.asmaster &&
                                    room.game == response.game &&
                                    room.this == response.this &&
                                    (!room.id || room.id == response.id)) {
                                    room.that = response.that;
                                    room.id = response.id;
                                    _this._status.next(room_model_1.RoomStatus.peerWaiting);
                                    _this._room.next(room);
                                }
                                break;
                            case 'mirrorJoined':
                                if (!room) {
                                    room = {
                                        game: response.game,
                                        asmaster: false,
                                        this: response.this,
                                        that: response.that,
                                        id: response.id
                                    };
                                    _this.configuration.mirrorRoom = {
                                        game: room.game,
                                        id: room.id
                                    };
                                    _this._status.next(room_model_1.RoomStatus.peerConnect);
                                    _this._room.next(room);
                                    _this.peerOffer();
                                }
                                else if (room && !room.asmaster &&
                                    room.game == response.game &&
                                    room.this == response.this &&
                                    room.id == response.id) {
                                    _this._status.next(room_model_1.RoomStatus.peerConnect);
                                    if (room.that != response.that) {
                                        room.that = response.that;
                                        _this._room.next(room);
                                    }
                                    _this.peerOffer();
                                }
                                break;
                            case 'reconnect':
                                if (room &&
                                    room.game == response.game &&
                                    room.this == response.this &&
                                    room.id == response.id) {
                                    _this._status.next(room_model_1.RoomStatus.peerReconnect);
                                }
                                break;
                            case 'passcodeInvalid':
                                if (!room) {
                                    _this._status.next(room_model_1.RoomStatus.passcodeInvalid);
                                }
                                break;
                            case 'roomIdInvalid':
                                if (room &&
                                    room.game == response.game &&
                                    room.this == response.this &&
                                    room.id == response.id) {
                                    _this._status.next(room_model_1.RoomStatus.roomIdInvalid);
                                }
                                break;
                            case 'abandoned':
                                if (room &&
                                    room.game == response.game &&
                                    room.this == response.this &&
                                    room.id == response.id &&
                                    _this._status.getValue() != room_model_1.RoomStatus.abandoned) {
                                    _this._status.next(room_model_1.RoomStatus.abandoned);
                                }
                                break;
                        }
                    });
                    this.socketService.subscribe('room.signal', function (data) {
                        if (_this.peer) {
                            _this.peer.signal(data);
                        }
                        else {
                            var room = _this._room.getValue();
                            if (room && room.asmaster) {
                                _this.peerAnswer(data);
                            }
                        }
                    });
                }
                Object.defineProperty(RoomService.prototype, "status", {
                    get: function () {
                        return this._status;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RoomService.prototype, "room", {
                    get: function () {
                        return this._room;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RoomService.prototype, "mirrorStatus", {
                    get: function () {
                        return this._mirrorStatus;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RoomService.prototype, "mirrorOutput", {
                    get: function () {
                        return this._mirrorOutput;
                    },
                    enumerable: true,
                    configurable: true
                });
                // To Server
                RoomService.prototype.connectAnyone = function (game) {
                    if (this._status.getValue() !== null)
                        return;
                    this.connect({
                        type: 'anyone',
                        game: game,
                        username: this.configuration.username
                    });
                };
                RoomService.prototype.createPrivate = function (game) {
                    if (this._status.getValue() !== null)
                        return;
                    this.connect({
                        type: 'create',
                        game: game,
                        username: this.configuration.username
                    });
                };
                RoomService.prototype.joinPrivate = function (game, passcode) {
                    var status = this._status.getValue();
                    if (status !== null && status !== room_model_1.RoomStatus.passcodeInvalid)
                        return;
                    this.connect({
                        type: 'join',
                        game: game,
                        username: this.configuration.username,
                        passcode: passcode
                    });
                };
                RoomService.prototype.reconnect = function () {
                    var room = this._room.getValue();
                    if (room && room.id) {
                        this.connect({
                            type: room.asmaster ? 'masterReconnect' : 'mirrorReconnect',
                            game: room.game,
                            username: room.this,
                            id: room.id
                        });
                    }
                };
                RoomService.prototype.connect = function (request) {
                    var _this = this;
                    this._status.next(room_model_1.RoomStatus.serverConnect);
                    this.socketService.socketReady()
                        .then(function (socket) {
                        _this._status.next(room_model_1.RoomStatus.serverConnected);
                        socket.send({ name: 'room', value: request });
                    })
                        .catch(function (error) {
                        _this._status.next(room_model_1.RoomStatus.serverFailed);
                    });
                };
                RoomService.prototype.reset = function () {
                    this.configuration.mirrorRoom = null;
                    this._status.next(null);
                    var room = this._room.getValue();
                    if (room) {
                        this._room.next(null);
                    }
                    if (this.peer) {
                        this.peer.destroy();
                        this.peer = null;
                    }
                };
                RoomService.prototype.abandon = function () {
                    var room = this._room.getValue();
                    if (room) {
                        // Tell the peer that I has abandoned the game if connected.
                        var status_2 = this._status.getValue();
                        if (this.peer && status_2 == room_model_1.RoomStatus.peerConnected) {
                            this.peerSend('abandoned');
                        }
                        // Tell the peer that I has abandoned the game if connted.
                        var socket = this.socketService.socketConnected();
                        if (socket) {
                            var args = {
                                type: 'abandon',
                                game: room.game,
                                username: room.this,
                                id: room.id || undefined
                            };
                            socket.send({
                                name: 'room',
                                value: args
                            });
                        }
                    }
                    // clean up everything
                    this.reset();
                };
                // Slave to Master
                RoomService.prototype.sendButtonDown = function (button) {
                    this.peerSend('buttonDown', button);
                };
                RoomService.prototype.sendButtonUp = function (button) {
                    this.peerSend('buttonUp', button);
                };
                RoomService.prototype.sendRequest = function (value) {
                    this.peerSend('request', value);
                };
                // Mirror connects to the Master.
                RoomService.prototype.peerOffer = function () {
                    var _this = this;
                    this.peer = new window.SimplePeer({ initiator: true, trickle: false });
                    this.peerOnEvents();
                    this.peer.on('data', function (data) {
                        var status = _this._status.getValue();
                        if (status == room_model_1.RoomStatus.peerConnect) {
                            status = room_model_1.RoomStatus.peerConnected;
                            _this._status.next(status);
                        }
                        var message = socket_1.Socket.deserialize(data);
                        if (!message)
                            return;
                        switch (message.type) {
                            case 'abandoned':
                                if (status !== null && status != room_model_1.RoomStatus.abandoned) {
                                    _this._status.next(room_model_1.RoomStatus.abandoned);
                                }
                                break;
                            case 'status':
                                if (message.data && typeof playing_service_1.PlayingStatus[message.data]) {
                                    _this._mirrorStatus.next(message.data);
                                }
                                break;
                            case 'output':
                                if (message.data && message.data.frame && message.data.audio8) {
                                    if (!_this.inputProcessor) {
                                        _this.inputProcessor = new input_processor_1.default();
                                    }
                                    var output = _this.inputProcessor.process(message.data);
                                    if (output) {
                                        _this._mirrorOutput.next(output);
                                    }
                                }
                                break;
                        }
                    });
                };
                // Master answers to the Mirror.
                RoomService.prototype.peerAnswer = function (signalData) {
                    var _this = this;
                    this.peer = new window.SimplePeer({ initiator: false, trickle: false });
                    this.peerOnEvents();
                    this.peer.on('connect', function () {
                        var room = _this._room.getValue();
                        if (room) {
                            _this._status.next(room_model_1.RoomStatus.peerConnected);
                            _this.peerSend('status', playing_service_1.PlayingStatus.ready);
                        }
                    });
                    this.peer.on('data', function (data) {
                        var message = socket_1.Socket.deserialize(data);
                        if (!message)
                            return;
                        switch (message.type) {
                            case 'abandoned':
                                _this.playingService.pause();
                                var status_3 = _this._status.getValue();
                                if (status_3 !== null && status_3 != room_model_1.RoomStatus.abandoned) {
                                    _this._status.next(room_model_1.RoomStatus.abandoned);
                                }
                                break;
                            case 'request':
                                switch (message.data) {
                                    case 'pause':
                                        _this.playingService.pause();
                                        break;
                                    case 'resume':
                                        _this.playingService.resume();
                                        break;
                                }
                                break;
                            case 'buttonDown':
                                if (message.data) {
                                    _this.playingService.buttonDown(2, message.data);
                                }
                                break;
                            case 'buttonUp':
                                if (message.data) {
                                    _this.playingService.buttonUp(2, message.data);
                                }
                                break;
                        }
                    });
                    this.peer.signal(signalData);
                };
                RoomService.prototype.peerOnEvents = function () {
                    var _this = this;
                    this.peer.on('signal', function (data) {
                        _this.socketService.socketReady()
                            .then(function (socket) {
                            var room = _this._room.getValue();
                            if (room && room.id) {
                                socket.send({
                                    name: 'room.signal',
                                    value: {
                                        id: room.id,
                                        signal: data
                                    }
                                });
                            }
                        })
                            .catch(function (error) {
                            _this.peer.destroy();
                            _this.peer = null;
                            _this._status.next(room_model_1.RoomStatus.peerDisconnected);
                        });
                    });
                    this.peer.on('close', this.peerClosed.bind(this));
                };
                RoomService.prototype.peerSend = function (type, data) {
                    if (this.peer) {
                        var d = socket_1.Socket.serialize({ type: type, data: data });
                        try {
                            this.peer.send(d);
                        }
                        catch (e) {
                            //this.peerClosed();
                        }
                    }
                };
                RoomService.prototype.peerClosed = function () {
                    this.playingService.pause();
                    this.inputProcessor = null;
                    this.outputProcessor = null;
                    if (this.peer) {
                        this.peer.destroy();
                        this.peer = null;
                    }
                    var status = this._status.getValue();
                    if (status !== null && status != room_model_1.RoomStatus.abandoned) {
                        this._status.next(room_model_1.RoomStatus.peerDisconnected);
                    }
                };
                RoomService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [configuration_1.Configuration,
                        playing_service_1.PlayingService,
                        socket_service_1.SocketService])
                ], RoomService);
                return RoomService;
            }());
            exports_1("RoomService", RoomService);
        }
    };
});

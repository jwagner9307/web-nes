System.register(["pako", "xson.js"], function (exports_1, context_1) {
    "use strict";
    var pako, xson, Socket;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pako_1) {
                pako = pako_1;
            },
            function (xson_1) {
                xson = xson_1;
            }
        ],
        execute: function () {
            Socket = /** @class */ (function () {
                function Socket(url, options) {
                    if (options === void 0) { options = {}; }
                    var _this = this;
                    this.url = url;
                    this._socket = null;
                    this._onopen = null;
                    this._onmessage = null;
                    this._onerror = null;
                    this._onclose = null;
                    this.status = 'closed';
                    if (options.connect) {
                        this.connect();
                    }
                    if (options.tickingSeconds && options.tickingSeconds > 0) {
                        var duration_1 = options.tickingSeconds * 1000;
                        var tick_1 = function () {
                            if (_this._socket && _this.status == 'connected') {
                                _this.send('tick');
                            }
                            setTimeout(tick_1, duration_1);
                        };
                        tick_1();
                    }
                }
                Socket.prototype.send = function (data) {
                    this._socket.send(Socket.serialize(data));
                };
                Socket.prototype.connect = function (params) {
                    if (params === void 0) { params = {}; }
                    if (this.status == 'closed') {
                        this.status = 'connecting';
                        var url_1 = this.url;
                        Object.keys(params).forEach(function (name) {
                            url_1 += (url_1.indexOf('?') > 0) ? '&' : '?';
                            url_1 += name + '=' + params[name];
                        });
                        var socket = new WebSocket(url_1);
                        socket.binaryType = 'arraybuffer';
                        this.socket = socket;
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                Socket.prototype.close = function () {
                    if (this.status != 'closed') {
                        this.status = 'closed';
                        this._socket.onclose = function () { };
                        this._socket.close();
                    }
                };
                Object.defineProperty(Socket.prototype, "socket", {
                    set: function (socket) {
                        this._socket = socket;
                        if (this._socket) {
                            if (this._onopen)
                                this._socket.onopen = this._onopen;
                            if (this._onmessage)
                                this._socket.onmessage = this._onmessage;
                            if (this._onerror)
                                this._socket.onerror = this._onerror;
                            if (this._onclose)
                                this._socket.onclose = this._onclose;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Socket.prototype, "onopen", {
                    set: function (callback) {
                        var _this = this;
                        this._onopen = function (event) {
                            _this.status = 'connected';
                            if (callback) {
                                callback(event);
                            }
                        };
                        if (this._socket) {
                            this._socket.onopen = this._onopen;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Socket.prototype, "onmessage", {
                    set: function (callback) {
                        this._onmessage = function (event) {
                            if (callback) {
                                var data = Socket.deserialize(event.data);
                                if (data) {
                                    callback(data);
                                }
                            }
                        };
                        if (this._socket) {
                            this._socket.onmessage = this._onmessage;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Socket.prototype, "onerror", {
                    set: function (callback) {
                        this._onerror = function (event) {
                            if (callback) {
                                callback(event);
                            }
                            console.log(event);
                        };
                        if (this._socket) {
                            this._socket.onerror = this._onerror;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Socket.prototype, "onclose", {
                    set: function (callback) {
                        var _this = this;
                        this._onclose = function (event) {
                            _this.status = 'closed';
                            if (callback) {
                                callback(event);
                            }
                        };
                        if (this._socket) {
                            this._socket.onclose = this._onclose;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Socket.serialize = function (data) {
                    var decompressed = xson.serialize(data);
                    var compressed = pako.deflateRaw(new Uint8Array(decompressed, 0)).buffer;
                    var p;
                    if (compressed.byteLength < decompressed.byteLength) {
                        p = {
                            encoding: 'deflate',
                            data: compressed
                        };
                    }
                    else {
                        p = {
                            encoding: 'none',
                            data: data
                        };
                    }
                    return xson.serialize(p);
                };
                Socket.deserialize = function (msg) {
                    var p = xson.deserialize(msg);
                    if (p.encoding && p.data) {
                        if (p.encoding == 'none') {
                            return p.data;
                        }
                        else if (p.encoding == 'deflate') {
                            var decompressed = pako.inflateRaw(new Uint8Array(p.data));
                            return xson.deserialize(decompressed);
                        }
                    }
                    return null;
                };
                return Socket;
            }());
            exports_1("Socket", Socket);
        }
    };
});

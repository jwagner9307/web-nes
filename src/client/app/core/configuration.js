System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, Configuration, defaultKeyboardMap;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            Configuration = /** @class */ (function () {
                function Configuration() {
                    this._username = '';
                    this._playing = '';
                    this.keyboardMap = {};
                    this.setDefaultKeyboardMap();
                    this.load();
                }
                Object.defineProperty(Configuration.prototype, "lang", {
                    get: function () {
                        return this._lang;
                    },
                    set: function (value) {
                        if (this._lang !== value) {
                            this._lang = value;
                            this.save();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Configuration.prototype, "username", {
                    get: function () {
                        return this._username;
                    },
                    set: function (value) {
                        if (this._username !== value) {
                            this._username = value;
                            this.save();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Configuration.prototype, "playing", {
                    get: function () {
                        return this._playing;
                    },
                    set: function (value) {
                        if (this._playing !== value) {
                            this._playing = value;
                            this.save();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Configuration.prototype, "mirrorRoom", {
                    get: function () {
                        return this._mirrorRoom;
                    },
                    set: function (value) {
                        if (value) {
                            if (!this._mirrorRoom ||
                                this._mirrorRoom.game != value.game ||
                                this._mirrorRoom.id != value.id) {
                                this._mirrorRoom = {
                                    game: value.game,
                                    id: value.id
                                };
                                this.save();
                            }
                        }
                        else if (this._mirrorRoom) {
                            this._mirrorRoom = null;
                            this.save();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Configuration.prototype, "keyboardMapModified", {
                    get: function () {
                        for (var button in this.keyboardMap) {
                            if (this.keyboardMap[button] !== defaultKeyboardMap[button]) {
                                return true;
                            }
                        }
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Configuration.prototype.keyOfButton = function (button) {
                    return this.keyboardMap[button];
                };
                Configuration.prototype.buttonOfKey = function (keyboardKey) {
                    for (var button in this.keyboardMap) {
                        if (keyboardKey === this.keyboardMap[button]) {
                            return button;
                        }
                    }
                    return undefined;
                };
                Configuration.prototype.setKeyboardMap = function (button, keyboardKey) {
                    if (this.keyboardMap[button] !== undefined &&
                        this.keyboardMap[button] !== keyboardKey) {
                        this.keyboardMap[button] = keyboardKey;
                        this.save();
                    }
                };
                Configuration.prototype.resetKeyboardMap = function () {
                    this.setDefaultKeyboardMap();
                    this.save();
                };
                Configuration.prototype.setDefaultKeyboardMap = function () {
                    var _this = this;
                    Object.keys(defaultKeyboardMap).forEach(function (button) {
                        _this.keyboardMap[button] = defaultKeyboardMap[button];
                    });
                };
                Configuration.prototype.load = function () {
                    var _this = this;
                    if (localStorage && typeof localStorage.getItem === 'function') {
                        var settingsText = localStorage.getItem('settings');
                        try {
                            var settings_1 = JSON.parse(settingsText);
                            if (typeof settings_1.lang === 'string') {
                                this._lang = settings_1.lang;
                            }
                            if (typeof settings_1.username === 'string') {
                                this._username = settings_1.username;
                            }
                            if (typeof settings_1.playing === 'string') {
                                this._playing = settings_1.playing;
                            }
                            if (settings_1.mirrorRoom &&
                                typeof settings_1.mirrorRoom.game === 'string' &&
                                typeof settings_1.mirrorRoom.id === 'string') {
                                this._mirrorRoom = settings_1.mirrorRoom;
                            }
                            if (typeof settings_1.keyboardMap === 'object') {
                                Object.keys(this.keyboardMap).forEach(function (button) {
                                    var value = settings_1.keyboardMap[button];
                                    if (typeof value === 'number') {
                                        _this.keyboardMap[button] = value;
                                    }
                                });
                            }
                        }
                        catch (e) { }
                    }
                };
                Configuration.prototype.save = function () {
                    if (localStorage && typeof localStorage.setItem === 'function') {
                        try {
                            localStorage.setItem('settings', JSON.stringify({
                                lang: this.lang,
                                username: this.username,
                                playing: this.playing,
                                keyboardMap: this.keyboardMap,
                                mirrorRoom: this.mirrorRoom
                            }));
                        }
                        catch (e) { }
                    }
                };
                Configuration = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [])
                ], Configuration);
                return Configuration;
            }());
            exports_1("Configuration", Configuration);
            defaultKeyboardMap = {};
            defaultKeyboardMap.a = 88; // X
            defaultKeyboardMap.b = 90; // Z
            defaultKeyboardMap.select = 16; // Right Shift
            defaultKeyboardMap.start = 13; // Enter
            defaultKeyboardMap.u = 38; // Up
            defaultKeyboardMap.d = 40; // Down
            defaultKeyboardMap.l = 37; // Left
            defaultKeyboardMap.r = 39; // Right
            defaultKeyboardMap.A = 83; // S
            defaultKeyboardMap.B = 65; // A
        }
    };
});

System.register(["@angular/core", "../../core/configuration"], function (exports_1, context_1) {
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
    var core_1, configuration_1, KeyboardComponent, codeNames;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            }
        ],
        execute: function () {
            KeyboardComponent = /** @class */ (function () {
                function KeyboardComponent(configuration) {
                    this.configuration = configuration;
                }
                Object.defineProperty(KeyboardComponent.prototype, "state", {
                    get: function () {
                        return this._state || { selectedButton: null };
                    },
                    set: function (value) {
                        this._state = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                KeyboardComponent.prototype.codeName = function (button) {
                    var code = this.configuration.keyOfButton(button);
                    return codeNames[code] || ('#' + code);
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [Object])
                ], KeyboardComponent.prototype, "state", null);
                KeyboardComponent = __decorate([
                    core_1.Component({
                        selector: 'keyboard',
                        templateUrl: 'keyboard.component.svg.html',
                        styles: ['svg { max-width: 100%; display: inline-block; }']
                    }),
                    __metadata("design:paramtypes", [configuration_1.Configuration])
                ], KeyboardComponent);
                return KeyboardComponent;
            }());
            exports_1("KeyboardComponent", KeyboardComponent);
            codeNames = {
                8: 'back\nspace',
                9: 'tab',
                13: 'enter',
                16: 'shift',
                17: 'ctrl',
                18: 'alt',
                19: 'pause',
                20: 'caps',
                27: 'esc',
                33: 'page\nup',
                34: 'page\ndown',
                35: 'end',
                36: 'home',
                37: '←',
                38: '↑',
                39: '→',
                40: '↓',
                45: 'insert',
                46: 'delete',
                48: '0',
                49: '1',
                50: '2',
                51: '3',
                52: '4',
                53: '5',
                54: '6',
                55: '7',
                56: '8',
                57: '9',
                65: 'A',
                66: 'B',
                67: 'C',
                68: 'D',
                69: 'E',
                70: 'F',
                71: 'G',
                72: 'H',
                73: 'I',
                74: 'J',
                75: 'K',
                76: 'L',
                77: 'M',
                78: 'N',
                79: 'O',
                80: 'P',
                81: 'Q',
                82: 'R',
                83: 'S',
                84: 'T',
                85: 'U',
                86: 'V',
                87: 'W',
                88: 'X',
                89: 'Y',
                90: 'Z',
                91: 'left\n⌘',
                92: 'right\n⌘',
                93: 'select',
                96: 'pad 0',
                97: 'pad 1',
                98: 'pad 2',
                99: 'pad 3',
                100: 'pad 4',
                101: 'pad 5',
                102: 'pad 6',
                103: 'pad 7',
                104: 'pad 8',
                105: 'pad 9',
                106: 'pad *',
                107: 'pad +',
                109: 'pad -',
                110: 'pad .',
                111: 'pad /',
                112: 'F1',
                113: 'F2',
                114: 'F3',
                115: 'F4',
                116: 'F5',
                117: 'F6',
                118: 'F7',
                119: 'F8',
                120: 'F9',
                121: 'F10',
                122: 'F11',
                123: 'F12',
                144: 'num\nlock',
                145: 'scroll\nlock',
                186: ';',
                187: '=',
                188: ',',
                189: '-',
                190: '.',
                191: '/',
                192: '`',
                219: '[',
                220: '\\',
                221: ']',
                222: '\''
            };
        }
    };
});

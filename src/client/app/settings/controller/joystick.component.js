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
    var core_1, JoystickComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            JoystickComponent = /** @class */ (function () {
                function JoystickComponent() {
                }
                Object.defineProperty(JoystickComponent.prototype, "state", {
                    get: function () {
                        return this._state || { selectedButton: null };
                    },
                    set: function (value) {
                        this._state = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                JoystickComponent.prototype.clickOutside = function (button, event) {
                    if (this.state && this.state.selectedButton === button) {
                        if (event && event.target instanceof SVGElement
                            && (event.target.getAttribute('class') || '').indexOf('selected') >= 0) {
                            return;
                        }
                        this.state.selectedButton = null;
                    }
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [Object])
                ], JoystickComponent.prototype, "state", null);
                JoystickComponent = __decorate([
                    core_1.Component({
                        selector: 'joystick',
                        templateUrl: 'joystick.component.svg.html',
                        styles: ['svg { max-width: 100%; display: inline-block; }']
                    })
                ], JoystickComponent);
                return JoystickComponent;
            }());
            exports_1("JoystickComponent", JoystickComponent);
        }
    };
});

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
    var core_1, OverlayButtonComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            OverlayButtonComponent = /** @class */ (function () {
                function OverlayButtonComponent() {
                }
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], OverlayButtonComponent.prototype, "routerLink", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], OverlayButtonComponent.prototype, "icon", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], OverlayButtonComponent.prototype, "position", void 0);
                OverlayButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'overlay-button',
                        templateUrl: 'overlay-button.component.html'
                    })
                ], OverlayButtonComponent);
                return OverlayButtonComponent;
            }());
            exports_1("OverlayButtonComponent", OverlayButtonComponent);
        }
    };
});

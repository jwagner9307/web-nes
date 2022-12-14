System.register(["@angular/core", "@angular/common"], function (exports_1, context_1) {
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
    var core_1, common_1, GameCardComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }
        ],
        execute: function () {
            GameCardComponent = /** @class */ (function () {
                function GameCardComponent(baseHref) {
                    this.baseHref = baseHref;
                    if (this.baseHref.endsWith('/')) {
                        this.baseHref = this.baseHref.substring(0, this.baseHref.length - 1);
                    }
                }
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], GameCardComponent.prototype, "game", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Number)
                ], GameCardComponent.prototype, "number", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Boolean)
                ], GameCardComponent.prototype, "selected", void 0);
                GameCardComponent = __decorate([
                    core_1.Component({
                        selector: 'game-cover',
                        templateUrl: 'game-cover.component.html'
                    }),
                    __param(0, core_1.Inject(common_1.APP_BASE_HREF)),
                    __metadata("design:paramtypes", [String])
                ], GameCardComponent);
                return GameCardComponent;
            }());
            exports_1("GameCardComponent", GameCardComponent);
        }
    };
});

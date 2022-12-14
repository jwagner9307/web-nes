System.register(["@angular/core", "./translate.service"], function (exports_1, context_1) {
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
    var core_1, translate_service_1, TranslatePipe;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (translate_service_1_1) {
                translate_service_1 = translate_service_1_1;
            }
        ],
        execute: function () {
            TranslatePipe = /** @class */ (function () {
                function TranslatePipe(translate) {
                    this.translate = translate;
                }
                TranslatePipe.prototype.transform = function (value, args) {
                    if (!value)
                        return;
                    return this.translate.instant(value);
                };
                TranslatePipe = __decorate([
                    core_1.Pipe({
                        name: 'translate',
                        pure: false // impure pipe, update value when we change language
                    }),
                    __metadata("design:paramtypes", [translate_service_1.TranslateService])
                ], TranslatePipe);
                return TranslatePipe;
            }());
            exports_1("TranslatePipe", TranslatePipe);
        }
    };
});

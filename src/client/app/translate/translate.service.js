System.register(["@angular/core", "./translations", "../core/configuration"], function (exports_1, context_1) {
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
    var core_1, translations_1, configuration_1, TranslateService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (translations_1_1) {
                translations_1 = translations_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            }
        ],
        execute: function () {
            TranslateService = /** @class */ (function () {
                function TranslateService(translations, configuration) {
                    this.translations = translations;
                    this.configuration = configuration;
                }
                TranslateService.prototype.translate = function (key) {
                    var translation = key;
                    var lang = this.configuration.lang;
                    if (this.translations[lang] && this.translations[lang][key]) {
                        return this.translations[lang][key];
                    }
                    return translation;
                };
                TranslateService.prototype.instant = function (key) {
                    return this.translate(key);
                };
                TranslateService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(translations_1.TRANSLATIONS)),
                    __metadata("design:paramtypes", [Object, configuration_1.Configuration])
                ], TranslateService);
                return TranslateService;
            }());
            exports_1("TranslateService", TranslateService);
        }
    };
});

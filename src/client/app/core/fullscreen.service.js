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
    var core_1, FullscreenService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            FullscreenService = /** @class */ (function () {
                function FullscreenService() {
                    this.supported = document.fullscreenEnabled
                        || document.webkitFullscreenEnabled
                        || document.mozFullScreenEnabled
                        || document.msFullscreenEnabled;
                }
                Object.defineProperty(FullscreenService.prototype, "fullscreened", {
                    get: function () {
                        return !!(document.fullscreenElement
                            || document.webkitFullscreenElement
                            || document.mozFullscreenElement
                            || document.msFullscreenElement);
                    },
                    enumerable: true,
                    configurable: true
                });
                FullscreenService.prototype.toggle = function (element) {
                    if (!this.supported)
                        return;
                    if (this.fullscreened) {
                        var exitFullscreen = document.exitFullscreen
                            || document.webkitExitFullscreen
                            || document.mozCancelFullscreen
                            || document.msExitFullscreen;
                        if (exitFullscreen) {
                            exitFullscreen.apply(document);
                        }
                    }
                    else {
                        var requestFullscreen = element.requestFullscreen
                            || element.webkitRequestFullscreen
                            || element.mozRequestFullScreen
                            || element.msRequestFullscreen;
                        if (requestFullscreen) {
                            requestFullscreen.apply(element);
                        }
                    }
                };
                FullscreenService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [])
                ], FullscreenService);
                return FullscreenService;
            }());
            exports_1("FullscreenService", FullscreenService);
        }
    };
});

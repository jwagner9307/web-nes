System.register(["@angular/core", "rxjs/Observable", "rxjs/add/observable/fromEvent", "rxjs/add/operator/delay", "rxjs/add/operator/do"], function (exports_1, context_1) {
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
    var core_1, Observable_1, ClickOutsideDirective;
    var __moduleName = context_1 && context_1.id;
    function isDescendant(parent, child) {
        var node = child;
        while (node) {
            if (node === parent) {
                return true;
            }
            else {
                node = node.parentNode;
            }
        }
        return false;
    }
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            }
        ],
        execute: function () {
            ClickOutsideDirective = /** @class */ (function () {
                function ClickOutsideDirective(element) {
                    this.element = element;
                    this.listening = false;
                    this.clickOutside = new core_1.EventEmitter();
                }
                ClickOutsideDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.globalClick = Observable_1.Observable
                        .fromEvent(document, 'click')
                        .delay(1)
                        .do(function () {
                        _this.listening = true;
                    }).subscribe(function (event) {
                        _this.onGlobalClick(event);
                    });
                };
                ClickOutsideDirective.prototype.ngOnDestroy = function () {
                    this.globalClick.unsubscribe();
                };
                ClickOutsideDirective.prototype.onGlobalClick = function (event) {
                    if (event instanceof MouseEvent && this.listening) {
                        if (!isDescendant(this.element.nativeElement, event.target)) {
                            this.clickOutside.emit({ target: event.target || null });
                        }
                    }
                };
                __decorate([
                    core_1.Output('clickOutside'),
                    __metadata("design:type", core_1.EventEmitter)
                ], ClickOutsideDirective.prototype, "clickOutside", void 0);
                ClickOutsideDirective = __decorate([
                    core_1.Directive({
                        selector: '[clickOutside]'
                    }),
                    __metadata("design:paramtypes", [core_1.ElementRef])
                ], ClickOutsideDirective);
                return ClickOutsideDirective;
            }());
            exports_1("ClickOutsideDirective", ClickOutsideDirective);
        }
    };
});

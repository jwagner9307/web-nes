System.register(["@angular/core", "../../game.model", "../../../core/configuration", "../../../core/gamepad.service"], function (exports_1, context_1) {
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
    var core_1, game_model_1, configuration_1, gamepad_service_1, RoomOptionInputComponent, nextOptions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (game_model_1_1) {
                game_model_1 = game_model_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            },
            function (gamepad_service_1_1) {
                gamepad_service_1 = gamepad_service_1_1;
            }
        ],
        execute: function () {
            RoomOptionInputComponent = /** @class */ (function () {
                function RoomOptionInputComponent(configuration, gamepadService) {
                    this.configuration = configuration;
                    this.gamepadService = gamepadService;
                    this.subscriptions = [];
                    this.select = new core_1.EventEmitter();
                    this.RoomOption = game_model_1.RoomOption;
                    this.selected = game_model_1.RoomOption.username;
                }
                RoomOptionInputComponent.prototype.ngOnInit = function () {
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                RoomOptionInputComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                RoomOptionInputComponent.prototype.click = function (option) {
                    this.select.emit(option);
                };
                Object.defineProperty(RoomOptionInputComponent.prototype, "username", {
                    get: function () {
                        return this.configuration.username;
                    },
                    enumerable: true,
                    configurable: true
                });
                RoomOptionInputComponent.prototype.buttonDown = function (event) {
                    switch (event.button) {
                        case 'tab':
                            if (this.selected === null) {
                                this.selected = game_model_1.RoomOption.username;
                            }
                            else if (this.selected == game_model_1.RoomOption.join) {
                                this.selected = game_model_1.RoomOption.username;
                            }
                            else {
                                var next = nextOptions['r'];
                                if (next[this.selected] !== undefined) {
                                    this.selected = next[this.selected];
                                }
                            }
                            return true;
                        case 'l':
                        case 'u':
                        case 'r':
                        case 'd':
                            if (this.selected === null) {
                                this.selected = game_model_1.RoomOption.username;
                            }
                            else {
                                var next = nextOptions[event.button];
                                if (next[this.selected] !== undefined) {
                                    this.selected = next[this.selected];
                                }
                            }
                            return true;
                        case 'start':
                            if (this.selected !== null) {
                                this.click(this.selected);
                            }
                            return true;
                    }
                    return false;
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], RoomOptionInputComponent.prototype, "game", void 0);
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], RoomOptionInputComponent.prototype, "select", void 0);
                RoomOptionInputComponent = __decorate([
                    core_1.Component({
                        selector: 'roomoption-input',
                        templateUrl: 'roomoption-input.component.html'
                    }),
                    __metadata("design:paramtypes", [configuration_1.Configuration,
                        gamepad_service_1.GamepadService])
                ], RoomOptionInputComponent);
                return RoomOptionInputComponent;
            }());
            exports_1("RoomOptionInputComponent", RoomOptionInputComponent);
            nextOptions = {};
            {
                var up = nextOptions['u'] = {};
                up[game_model_1.RoomOption.anyone] = game_model_1.RoomOption.username;
                up[game_model_1.RoomOption.create] = game_model_1.RoomOption.username;
                up[game_model_1.RoomOption.join] = game_model_1.RoomOption.anyone;
            }
            {
                var right = nextOptions['r'] = {};
                right[game_model_1.RoomOption.username] = game_model_1.RoomOption.anyone;
                right[game_model_1.RoomOption.anyone] = game_model_1.RoomOption.create;
                right[game_model_1.RoomOption.create] = game_model_1.RoomOption.join;
            }
            {
                var down = nextOptions['d'] = {};
                down[game_model_1.RoomOption.username] = game_model_1.RoomOption.create;
                down[game_model_1.RoomOption.anyone] = game_model_1.RoomOption.join;
                down[game_model_1.RoomOption.create] = game_model_1.RoomOption.join;
            }
            {
                var left = nextOptions['l'] = {};
                left[game_model_1.RoomOption.anyone] = game_model_1.RoomOption.username;
                left[game_model_1.RoomOption.create] = game_model_1.RoomOption.anyone;
                left[game_model_1.RoomOption.join] = game_model_1.RoomOption.create;
            }
        }
    };
});

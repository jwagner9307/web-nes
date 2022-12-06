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
    var core_1, game_model_1, configuration_1, gamepad_service_1, PlayingModeInputComponent;
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
            PlayingModeInputComponent = /** @class */ (function () {
                function PlayingModeInputComponent(configuration, gamepadService) {
                    this.configuration = configuration;
                    this.gamepadService = gamepadService;
                    this.subscriptions = [];
                    this.select = new core_1.EventEmitter();
                    this.PlayingMode = game_model_1.PlayingMode;
                    this.mode = game_model_1.PlayingMode.singleplayer;
                }
                PlayingModeInputComponent.prototype.ngOnInit = function () {
                    this.subscriptions.push(this.gamepadService.on(gamepad_service_1.ButtonEventType.buttonDown, this.buttonDown.bind(this)));
                };
                PlayingModeInputComponent.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
                };
                PlayingModeInputComponent.prototype.click = function (mode) {
                    this.mode = mode;
                    this.select.emit(mode);
                };
                PlayingModeInputComponent.prototype.buttonDown = function (event) {
                    switch (event.button) {
                        case 'tab':
                            this.mode = this.mode == game_model_1.PlayingMode.multiplayer ? game_model_1.PlayingMode.singleplayer : game_model_1.PlayingMode.multiplayer;
                            return true;
                        case 'l':
                        case 'u':
                            this.mode = game_model_1.PlayingMode.singleplayer;
                            return true;
                        case 'r':
                        case 'd':
                            this.mode = game_model_1.PlayingMode.multiplayer;
                            return true;
                        case 'start':
                            if (this.mode) {
                                this.click(this.mode);
                            }
                            return true;
                    }
                    return false;
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], PlayingModeInputComponent.prototype, "game", void 0);
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], PlayingModeInputComponent.prototype, "select", void 0);
                PlayingModeInputComponent = __decorate([
                    core_1.Component({
                        selector: 'playingmode-input',
                        templateUrl: 'playingmode-input.component.html'
                    }),
                    __metadata("design:paramtypes", [configuration_1.Configuration,
                        gamepad_service_1.GamepadService])
                ], PlayingModeInputComponent);
                return PlayingModeInputComponent;
            }());
            exports_1("PlayingModeInputComponent", PlayingModeInputComponent);
        }
    };
});

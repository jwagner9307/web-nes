System.register(["@angular/core", "@angular/common", "@angular/platform-browser", "@angular/forms", "@angular/http", "./app.router", "./app.component", "./core/configuration", "./core/fullscreen.service", "./core/playing.service", "./core/socket.service", "./game/game.component", "./game/game-list.component", "./game/components/game-cover/game-cover.component", "./game/components/screen/screen.component", "./game/components/playingmode-input/playingmode-input.component", "./game/components/roomoption-input/roomoption-input.component", "./game/components/username-input/username-input.component", "./game/components/connection-status/connection-status.component", "./game/components/passcode-input/passcode-input.component", "./game/components/game-title/game-title.component", "./game/game.service", "./room/room.service", "./shared/click-outside.directive", "./shared/loading.component", "./shared/overlay-button.component", "./translate/translate.pipe", "./translate/translate.service", "./translate/translations", "./settings/controller/controller.component", "./settings/controller/joystick.component", "./settings/controller/keyboard.component", "./game/components/overlay-player/overlay-player.component", "./core/gamepad.service", "./settings/settings.component", "./settings/language/language.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, common_1, platform_browser_1, forms_1, http_1, app_router_1, app_component_1, configuration_1, fullscreen_service_1, playing_service_1, socket_service_1, game_component_1, game_list_component_1, game_cover_component_1, screen_component_1, playingmode_input_component_1, roomoption_input_component_1, username_input_component_1, connection_status_component_1, passcode_input_component_1, game_title_component_1, game_service_1, room_service_1, click_outside_directive_1, loading_component_1, overlay_button_component_1, translate_pipe_1, translate_service_1, translations_1, controller_component_1, joystick_component_1, keyboard_component_1, overlay_player_component_1, gamepad_service_1, settings_component_1, language_component_1, AppModule;
    var __moduleName = context_1 && context_1.id;
    function getBaseHref(platformLocation) {
        return platformLocation.getBaseHrefFromDOM();
    }
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_router_1_1) {
                app_router_1 = app_router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (configuration_1_1) {
                configuration_1 = configuration_1_1;
            },
            function (fullscreen_service_1_1) {
                fullscreen_service_1 = fullscreen_service_1_1;
            },
            function (playing_service_1_1) {
                playing_service_1 = playing_service_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            },
            function (game_component_1_1) {
                game_component_1 = game_component_1_1;
            },
            function (game_list_component_1_1) {
                game_list_component_1 = game_list_component_1_1;
            },
            function (game_cover_component_1_1) {
                game_cover_component_1 = game_cover_component_1_1;
            },
            function (screen_component_1_1) {
                screen_component_1 = screen_component_1_1;
            },
            function (playingmode_input_component_1_1) {
                playingmode_input_component_1 = playingmode_input_component_1_1;
            },
            function (roomoption_input_component_1_1) {
                roomoption_input_component_1 = roomoption_input_component_1_1;
            },
            function (username_input_component_1_1) {
                username_input_component_1 = username_input_component_1_1;
            },
            function (connection_status_component_1_1) {
                connection_status_component_1 = connection_status_component_1_1;
            },
            function (passcode_input_component_1_1) {
                passcode_input_component_1 = passcode_input_component_1_1;
            },
            function (game_title_component_1_1) {
                game_title_component_1 = game_title_component_1_1;
            },
            function (game_service_1_1) {
                game_service_1 = game_service_1_1;
            },
            function (room_service_1_1) {
                room_service_1 = room_service_1_1;
            },
            function (click_outside_directive_1_1) {
                click_outside_directive_1 = click_outside_directive_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (overlay_button_component_1_1) {
                overlay_button_component_1 = overlay_button_component_1_1;
            },
            function (translate_pipe_1_1) {
                translate_pipe_1 = translate_pipe_1_1;
            },
            function (translate_service_1_1) {
                translate_service_1 = translate_service_1_1;
            },
            function (translations_1_1) {
                translations_1 = translations_1_1;
            },
            function (controller_component_1_1) {
                controller_component_1 = controller_component_1_1;
            },
            function (joystick_component_1_1) {
                joystick_component_1 = joystick_component_1_1;
            },
            function (keyboard_component_1_1) {
                keyboard_component_1 = keyboard_component_1_1;
            },
            function (overlay_player_component_1_1) {
                overlay_player_component_1 = overlay_player_component_1_1;
            },
            function (gamepad_service_1_1) {
                gamepad_service_1 = gamepad_service_1_1;
            },
            function (settings_component_1_1) {
                settings_component_1 = settings_component_1_1;
            },
            function (language_component_1_1) {
                language_component_1 = language_component_1_1;
            }
        ],
        execute: function () {
            AppModule = /** @class */ (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_1.FormsModule,
                            http_1.HttpModule,
                            app_router_1.router
                        ],
                        declarations: [
                            app_component_1.AppComponent,
                            game_component_1.GameComponent,
                            game_cover_component_1.GameCardComponent,
                            game_list_component_1.GameListComponent,
                            connection_status_component_1.ConnectionStatusComponent,
                            controller_component_1.ControllerComponent,
                            joystick_component_1.JoystickComponent,
                            keyboard_component_1.KeyboardComponent,
                            game_title_component_1.GameTitleComponent,
                            language_component_1.LanguageComponent,
                            passcode_input_component_1.PasscodeComponentInput,
                            playingmode_input_component_1.PlayingModeInputComponent,
                            roomoption_input_component_1.RoomOptionInputComponent,
                            username_input_component_1.UsernameInputComponent,
                            overlay_player_component_1.OverlayPlayerComponent,
                            loading_component_1.LoadingComponent,
                            click_outside_directive_1.ClickOutsideDirective,
                            overlay_button_component_1.OverlayButtonComponent,
                            screen_component_1.ScreenComponent,
                            settings_component_1.SettingsComponent,
                            translate_pipe_1.TranslatePipe,
                        ],
                        providers: [
                            {
                                provide: common_1.APP_BASE_HREF,
                                useFactory: getBaseHref,
                                deps: [common_1.PlatformLocation]
                            },
                            configuration_1.Configuration,
                            fullscreen_service_1.FullscreenService,
                            playing_service_1.PlayingService,
                            socket_service_1.SocketService,
                            gamepad_service_1.GamepadService,
                            game_service_1.GameService,
                            room_service_1.RoomService,
                            translate_pipe_1.TranslatePipe,
                            translate_service_1.TranslateService,
                            translations_1.TRANSLATION_PROVIDERS
                        ],
                        bootstrap: [app_component_1.AppComponent]
                    })
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    };
});

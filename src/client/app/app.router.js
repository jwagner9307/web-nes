System.register(["@angular/router", "./game/game-list.component", "./game/game.component", "./settings/controller/controller.component", "./settings/settings.component", "./settings/language/language.component"], function (exports_1, context_1) {
    "use strict";
    var router_1, game_list_component_1, game_component_1, controller_component_1, settings_component_1, language_component_1, routes, router;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (game_list_component_1_1) {
                game_list_component_1 = game_list_component_1_1;
            },
            function (game_component_1_1) {
                game_component_1 = game_component_1_1;
            },
            function (controller_component_1_1) {
                controller_component_1 = controller_component_1_1;
            },
            function (settings_component_1_1) {
                settings_component_1 = settings_component_1_1;
            },
            function (language_component_1_1) {
                language_component_1 = language_component_1_1;
            }
        ],
        execute: function () {
            routes = [
                { path: '', component: game_list_component_1.GameListComponent },
                { path: 'settings', component: settings_component_1.SettingsComponent },
                { path: 'settings/controller', component: controller_component_1.ControllerComponent },
                { path: 'settings/language', component: language_component_1.LanguageComponent },
                { path: ':name', component: game_component_1.GameComponent }
            ];
            exports_1("router", router = router_1.RouterModule.forRoot(routes, { useHash: false }));
        }
    };
});

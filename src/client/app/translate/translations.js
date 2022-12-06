System.register(["@angular/core", "./lang-en", "./lang-vi"], function (exports_1, context_1) {
    "use strict";
    var _a, core_1, lang_en_1, lang_vi_1, TRANSLATIONS, dictionary, TRANSLATION_PROVIDERS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_en_1_1) {
                lang_en_1 = lang_en_1_1;
            },
            function (lang_vi_1_1) {
                lang_vi_1 = lang_vi_1_1;
            }
        ],
        execute: function () {
            // translation token
            exports_1("TRANSLATIONS", TRANSLATIONS = new core_1.InjectionToken('translations'));
            // all traslations
            dictionary = (_a = {},
                _a[lang_en_1.LANG_EN_NAME] = lang_en_1.LANG_EN_TRANS,
                _a[lang_vi_1.LANG_VI_NAME] = lang_vi_1.LANG_VI_TRANS,
                _a);
            // providers
            exports_1("TRANSLATION_PROVIDERS", TRANSLATION_PROVIDERS = [
                { provide: TRANSLATIONS, useValue: dictionary }
            ]);
        }
    };
});

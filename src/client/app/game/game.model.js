System.register([], function (exports_1, context_1) {
    "use strict";
    var PlayingMode, RoomOption;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (PlayingMode) {
                PlayingMode[PlayingMode["singleplayer"] = 1] = "singleplayer";
                PlayingMode[PlayingMode["multiplayer"] = 2] = "multiplayer";
            })(PlayingMode || (PlayingMode = {}));
            exports_1("PlayingMode", PlayingMode);
            (function (RoomOption) {
                RoomOption[RoomOption["username"] = 0] = "username";
                RoomOption[RoomOption["anyone"] = 1] = "anyone";
                RoomOption[RoomOption["create"] = 2] = "create";
                RoomOption[RoomOption["join"] = 3] = "join";
            })(RoomOption || (RoomOption = {}));
            exports_1("RoomOption", RoomOption);
        }
    };
});

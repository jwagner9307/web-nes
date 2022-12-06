System.register([], function (exports_1, context_1) {
    "use strict";
    var RoomStatus;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (RoomStatus) {
                RoomStatus[RoomStatus["serverConnect"] = 1] = "serverConnect";
                RoomStatus[RoomStatus["serverFailed"] = 2] = "serverFailed";
                RoomStatus[RoomStatus["serverConnected"] = 3] = "serverConnected";
                RoomStatus[RoomStatus["serverWaiting"] = 4] = "serverWaiting";
                RoomStatus[RoomStatus["serverDisconnected"] = 5] = "serverDisconnected";
                RoomStatus[RoomStatus["peerConnect"] = 6] = "peerConnect";
                RoomStatus[RoomStatus["peerWaiting"] = 7] = "peerWaiting";
                RoomStatus[RoomStatus["peerConnected"] = 8] = "peerConnected";
                RoomStatus[RoomStatus["peerDisconnected"] = 9] = "peerDisconnected";
                RoomStatus[RoomStatus["peerReconnect"] = 10] = "peerReconnect";
                // Following considered as uninitiated aka. null
                RoomStatus[RoomStatus["passcodeInvalid"] = 11] = "passcodeInvalid";
                RoomStatus[RoomStatus["roomIdInvalid"] = 12] = "roomIdInvalid";
                RoomStatus[RoomStatus["abandoned"] = 13] = "abandoned"; // The other player abaondon the game.
            })(RoomStatus || (RoomStatus = {}));
            exports_1("RoomStatus", RoomStatus);
        }
    };
});

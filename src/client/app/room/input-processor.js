System.register([], function (exports_1, context_1) {
    "use strict";
    var frameSize, maskSize, frameCountReset, InputProcessor;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            frameSize = 256 * 240;
            maskSize = frameSize / 8;
            frameCountReset = 360;
            InputProcessor = /** @class */ (function () {
                function InputProcessor() {
                    this.filled = false;
                    this.currentFrame = new Array(frameSize);
                }
                InputProcessor.prototype.process = function (data) {
                    var colors = [];
                    {
                        var bytes = new Uint8Array(data.palette, 0);
                        for (var i = 0; i < bytes.length; i += 3) {
                            colors.push(bytes[i] +
                                (bytes[i + 1] << 8) +
                                (bytes[i + 2] << 16));
                        }
                    }
                    var mask = [];
                    {
                        var bytes = new Uint8Array(data.mask, 0);
                        for (var i = 0; i < bytes.length; i += 1) {
                            var byte = bytes[i];
                            mask.push(!!(byte & (1 << 0)));
                            mask.push(!!(byte & (1 << 1)));
                            mask.push(!!(byte & (1 << 2)));
                            mask.push(!!(byte & (1 << 3)));
                            mask.push(!!(byte & (1 << 4)));
                            mask.push(!!(byte & (1 << 5)));
                            mask.push(!!(byte & (1 << 6)));
                            mask.push(!!(byte & (1 << 7)));
                        }
                    }
                    if (mask.length > 0) {
                        if (!this.filled) {
                            return null;
                        }
                    }
                    else {
                        this.filled = true;
                    }
                    var frame = this.currentFrame;
                    {
                        var bytes = new Uint8Array(data.frame, 0);
                        if (mask.length > 0) {
                            for (var i = 0, j = 0; i < mask.length, j < bytes.length; i += 1) {
                                if (mask[i]) {
                                    var byte = bytes[j++];
                                    if (byte < colors.length) {
                                        frame[i] = colors[byte];
                                    }
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < bytes.length; i += 1) {
                                var byte = bytes[i];
                                if (byte < colors.length) {
                                    frame[i] = colors[byte];
                                }
                            }
                        }
                    }
                    var samples = [];
                    {
                        var bytes = new Uint8Array(data.audio8, 0);
                        for (var i = 0; i < bytes.length; i += 1) {
                            var byte = bytes[i];
                            var sample = ((byte * 2.0) / 255) - 1;
                            samples.push(sample);
                        }
                    }
                    return { video: frame, audio: samples };
                };
                return InputProcessor;
            }());
            exports_1("default", InputProcessor);
        }
    };
});

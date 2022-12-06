System.register([], function (exports_1, context_1) {
    "use strict";
    var frameSize, maskSize, frameCountReset, resetable, OutputProcessor;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            frameSize = 256 * 240;
            maskSize = frameSize / 8;
            frameCountReset = 180;
            resetable = false;
            OutputProcessor = /** @class */ (function () {
                function OutputProcessor() {
                    this.flushIt = false;
                    this.frameCount = 0;
                    this.currentFrame = new Array(frameSize);
                    this.drawingFrame = new Array(frameSize);
                    this.audioSamples = [];
                    this.pixels = new Array(frameSize);
                    this.mask = new Array(frameSize);
                }
                OutputProcessor.prototype.process = function (data) {
                    if (this.flushIt) {
                        var frame = data.video;
                        for (var i = 0; i < frameSize; i += 1) {
                            this.drawingFrame[i] = 0x00ffffff & frame[i];
                        }
                        this.flushIt = false;
                        var pixels = this.getPixels();
                        var mask = pixels.length < frameSize ? this.getMask() : new ArrayBuffer(0);
                        var pair = this.getPalette(pixels);
                        return {
                            mask: pixels.length < frameSize ? this.getMask() : new ArrayBuffer(0),
                            palette: pair.palette,
                            frame: this.getFrame(pixels, pair.map),
                            audio8: this.getAudio(this.audioSamples.length ? this.audioSamples.concat(data.audio) : data.audio)
                        };
                    }
                    else {
                        this.flushIt = true;
                        var temp = this.currentFrame;
                        this.currentFrame = this.drawingFrame;
                        this.drawingFrame = temp;
                        this.audioSamples = data.audio || [];
                        return null;
                    }
                };
                OutputProcessor.prototype.getPixels = function () {
                    var pixels;
                    // Get the different pixels only.
                    if (this.frameCount) {
                        pixels = this.pixels;
                        var mask = this.mask;
                        var count = 0;
                        for (var i = 0; i < frameSize; i += 1) {
                            var pixel = this.drawingFrame[i];
                            if (pixel != this.currentFrame[i]) {
                                pixels[count] = pixel;
                                count += 1;
                                mask[i] = true;
                            }
                            else {
                                mask[i] = false;
                            }
                        }
                        pixels = pixels.slice(0, count);
                    }
                    // Get the entire buffer.
                    else {
                        pixels = this.drawingFrame;
                    }
                    // If the number of different frames exceeds the threshold,
                    // reset it to 0, so that the next frame should be the entire buffer.
                    if (resetable) {
                        this.frameCount += 1;
                        if (this.frameCount >= frameCountReset) {
                            this.frameCount = 0;
                        }
                    }
                    else {
                        this.frameCount = 1;
                    }
                    // Flip the frame buffer.
                    {
                        var temp = this.currentFrame;
                        this.currentFrame = this.drawingFrame;
                        this.drawingFrame = temp;
                    }
                    return pixels;
                };
                OutputProcessor.prototype.getMask = function () {
                    var bytes = new Uint8Array(maskSize);
                    var mask = this.mask;
                    for (var i = 0; i < frameSize; i += 8) {
                        var byte = 0;
                        if (mask[i])
                            byte |= 1;
                        if (mask[i + 1])
                            byte |= 1 << 1;
                        if (mask[i + 2])
                            byte |= 1 << 2;
                        if (mask[i + 3])
                            byte |= 1 << 3;
                        if (mask[i + 4])
                            byte |= 1 << 4;
                        if (mask[i + 5])
                            byte |= 1 << 5;
                        if (mask[i + 6])
                            byte |= 1 << 6;
                        if (mask[i + 7])
                            byte |= 1 << 7;
                        bytes[i >> 3] = byte;
                    }
                    return bytes.buffer;
                };
                OutputProcessor.prototype.getPalette = function (pixels) {
                    // Get RGB
                    var colors = [];
                    var hasColor = {};
                    for (var i = 0; i < pixels.length; i += 1) {
                        var color = pixels[i];
                        if (!hasColor[color]) {
                            hasColor[color] = true;
                            colors.push(color);
                        }
                    }
                    // Sort color for better compression.
                    colors.sort();
                    // Generate Palette.
                    var palette = new Uint8Array(colors.length * 3);
                    var map = {};
                    for (var i = 0, j = 0; i < colors.length; i += 1) {
                        var color = colors[i];
                        map[color] = i;
                        palette[j++] = color & 0xFF;
                        palette[j++] = (color >> 8) & 0xFF;
                        palette[j++] = (color >> 16) & 0xFF;
                    }
                    return {
                        palette: palette.buffer,
                        map: map
                    };
                };
                OutputProcessor.prototype.getFrame = function (pixles, map) {
                    var frame = new Uint8Array(pixles.length);
                    for (var i = 0; i < pixles.length; i += 1) {
                        frame[i] = map[pixles[i]];
                    }
                    return frame.buffer;
                };
                OutputProcessor.prototype.getAudio = function (samples) {
                    var audio8 = new Uint8Array(samples.length);
                    for (var i = 0; i < samples.length; i += 1) {
                        // shift from [-1.0, 1.0] to [0.0, 1.0]
                        var sample = (samples[i] + 1) / 2.0;
                        // scale from [0.0, 0.1] to [0x00,0xFF] and [0x0000,0xFFFF]
                        audio8[i] = Math.floor(sample * 255);
                    }
                    return audio8.buffer;
                };
                return OutputProcessor;
            }());
            exports_1("default", OutputProcessor);
        }
    };
});

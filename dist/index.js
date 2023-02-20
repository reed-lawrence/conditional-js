"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomMaterialDesignColor = exports.materialColors = exports.getGradientColor = exports.twoWayGradient = exports.hexToRgb = exports.rgbToHex = exports.isRGB = void 0;
function isRGB(value) {
    return Array.isArray(value) && value.length === 3 && value.every(function (v) { return typeof v === 'number' && v >= 0 && v <= 255; });
}
exports.isRGB = isRGB;
/**
 * Converts an RGB color to a hexadecimal color string
 * @param rgb rgb color triplet
 * @returns hexadecimal color string
 */
function rgbToHex(rgb, prefix) {
    if (prefix === void 0) { prefix = true; }
    return rgb.reduce(function (hex, color, i) {
        if (i > 2)
            return hex;
        var hexColor = color.toString(16);
        return hex + (hexColor.length === 1 ? '0' + hexColor : hexColor);
    }, prefix ? '#' : '');
}
exports.rgbToHex = rgbToHex;
function hexToRgb(hex) {
    var bigint = parseInt(hex.replace('#', ''), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r, g, b];
}
exports.hexToRgb = hexToRgb;
function twoWayGradient(opts) {
    var count = opts.count;
    var format = opts.format || 'hex';
    var start = (typeof opts.start === 'string' ? hexToRgb(opts.start) : opts.start);
    var end = (typeof opts.end === 'string' ? hexToRgb(opts.end) : opts.end);
    var output = [];
    var step = 1 / (count - 1);
    for (var i = 0; i < count; i++) {
        var rgb = [0, 0, 0];
        for (var j = 0; j < 3; j++) {
            rgb[j] = Math.round((start[j] * (1 - (i * step))) + (end[j] * i * step));
        }
        output.push(format === 'hex' ? rgbToHex(rgb) : rgb);
    }
    return output;
}
exports.twoWayGradient = twoWayGradient;
function getGradientColor(opts) {
    var value = opts.value, colors = opts.colors, limits = opts.limits;
    if (typeof value !== 'number')
        throw new Error('Value must be a number');
    var count = colors.length;
    if (count < 2)
        throw new Error('You must provide at least two colors');
    if (opts.limits.length !== count)
        throw new Error('You must provide a limit for each color');
    if (!limits.every(function (l) { return typeof l === 'number'; }))
        throw new Error('Limits must be numbers');
    if (value <= limits[0])
        return colors[0];
    else if (value >= limits[count - 1])
        return colors[count - 1];
    else {
        var _loop_1 = function (i) {
            if (value >= limits[i] && value <= limits[i + 1]) {
                // if value == 50
                var start = typeof colors[i] === 'string' ? hexToRgb(colors[i]) : isRGB(colors[i]) ? colors[i] : (function () { throw new Error("value of getGradientColor -> opts.color is not a string or RGB value at index ".concat(i)); })(); // [0, 0, 0]
                var startLimit = limits[i]; // 0
                var endLimit = limits[i + 1]; // 100
                var range = endLimit - startLimit; // 100
                var valueRange = value - startLimit; // 50
                var modifier = (valueRange / range); // 50 / 100 = 0.5
                return { value: [start[0] + (range * modifier), start[1] + (range * modifier), start[2] + (range * modifier)] };
            }
        };
        for (var i = 0; i < count - 1; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    throw new Error('Something went wrong');
}
exports.getGradientColor = getGradientColor;
exports.materialColors = ['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5',
    '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726',
    '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'
];
function getRandomMaterialDesignColor(previouslyGenerated) {
    // clean the array
    if (previouslyGenerated.length === exports.materialColors.length) {
        previouslyGenerated = [];
    }
    var _loop_2 = function (i) {
        var randomIndex = Math.floor(Math.random() * exports.materialColors.length);
        var chosenColor = exports.materialColors[randomIndex];
        // ensure the color hasn't been picked recently
        if (previouslyGenerated.findIndex(function (c) { return c === chosenColor; }) === -1) {
            return { value: chosenColor };
        }
    };
    for (var i = 0; i < exports.materialColors.length; i++) {
        var state_2 = _loop_2(i);
        if (typeof state_2 === "object")
            return state_2.value;
    }
}
exports.getRandomMaterialDesignColor = getRandomMaterialDesignColor;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomMaterialDesignColor = exports.materialColors = exports.getColor = exports.hexToRgb = exports.rgbToHex = exports.isRGB = void 0;
var FORMATS = new Set(['hex', 'rgb']);
function isRGB(value) {
    return Array.isArray(value) && value.length === 3 && value.every(function (v) { return typeof v === 'number' && v >= 0 && v <= 255; });
}
exports.isRGB = isRGB;
/**
 * Converts an RGB color to a hexadecimal color string
 * @param rgb RGB color triplet
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
/**
 * Converts a hexadecimal color string to an RGB color
 * @param hex hexadecimal color string
 * @returns RGB color triplet
 */
function hexToRgb(hex) {
    var bigint = parseInt(hex.replace('#', ''), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r, g, b];
}
exports.hexToRgb = hexToRgb;
function getColor(opts) {
    var format = opts.as || 'hex';
    if (!FORMATS.has(format))
        throw new Error('Invalid format');
    var color = (function () {
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
            for (var i = 0; i < count - 1; i++) {
                if (value >= limits[i] && value <= limits[i + 1]) {
                    var percent = (value - limits[i]) / (limits[i + 1] - limits[i]);
                    var color1 = (typeof colors[i] === 'string' ? hexToRgb(colors[i]) : colors[i]);
                    var color2 = (typeof colors[i + 1] === 'string' ? hexToRgb(colors[i + 1]) : colors[i + 1]);
                    var rgb = [0, 0, 0];
                    for (var j = 0; j < 3; j++) {
                        rgb[j] = Math.round((color1[j] * (1 - percent)) + (color2[j] * percent));
                    }
                    return rgb;
                }
            }
        }
        throw new Error('Something went wrong');
    })();
    switch (format) {
        case 'hex':
            return isRGB(color) ? rgbToHex(color) : color;
        case 'rgb':
            return isRGB(color) ? color : hexToRgb(color);
    }
}
exports.getColor = getColor;
exports.materialColors = ['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5',
    '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726',
    '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'
];
function getRandomMaterialDesignColor(previouslyGenerated) {
    // clean the array
    if (previouslyGenerated.length === exports.materialColors.length) {
        previouslyGenerated = [];
    }
    var _loop_1 = function (i) {
        var randomIndex = Math.floor(Math.random() * exports.materialColors.length);
        var chosenColor = exports.materialColors[randomIndex];
        // ensure the color hasn't been picked recently
        if (previouslyGenerated.findIndex(function (c) { return c === chosenColor; }) === -1) {
            return { value: chosenColor };
        }
    };
    for (var i = 0; i < exports.materialColors.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
exports.getRandomMaterialDesignColor = getRandomMaterialDesignColor;

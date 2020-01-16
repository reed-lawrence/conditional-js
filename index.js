"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
   * [NOT IMPLEMENTED (WIP)]
   * Function to calculate color based on a percentile position
   * @param {number[]} numberArray
   * @param {number} percentile
   */
function percentile(numberArray, percentile) {
    var array = JSON.parse(JSON.stringify(numberArray));
    array.sort(function (a, b) { return a > b ? -1 : a < b ? 1 : 0; });
    var count = array.length;
    // percentile position is number in array + 1 position multiplied by the percentile
    var position = (count + 1) * percentile;
    // if the position is a whole number, return that number as the percentile placement
    if (position % 1 === 0) {
        var percentile_1 = array[position];
        console.log('percentile: ' + percentile_1);
        return percentile_1;
    }
    else {
        var posRoundUp = Math.ceil(position);
        var percentile_2 = array[posRoundUp];
        console.log('percentile: ' + percentile_2);
        return percentile_2;
    }
}
exports.percentile = percentile;
/**
 *
 * @param c
 */
function hex(c) {
    var s = '0123456789abcdef';
    var i = c;
    if (i === 0 || isNaN(c)) {
        return '00';
    }
    i = Math.round(Math.min(Math.max(0, i), 255));
    return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}
exports.hex = hex;
/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
    return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}
exports.convertToHex = convertToHex;
/* Remove '#' in color hex string */
function trim(s) {
    return (s.charAt(0) === '#') ? s.substring(1, 7) : s;
}
exports.trim = trim;
function convertToRGB(hex) {
    var color = [];
    color[0] = parseInt((trim(hex)).substring(0, 2), 16);
    color[1] = parseInt((trim(hex)).substring(2, 4), 16);
    color[2] = parseInt((trim(hex)).substring(4, 6), 16);
    return color;
}
exports.convertToRGB = convertToRGB;
function twoWayGradient(colorStart, colorEnd, colorCount) {
    // The beginning of your gradient
    var start = convertToRGB(colorEnd);
    // The end of your gradient
    var end = convertToRGB(colorStart);
    // The number of colors to generate
    var len = colorCount;
    // Alpha blending amount
    var alpha = 0.0;
    var hexarr = [];
    for (var i = 0; i < len; i++) {
        var c = [];
        alpha += (1.0 / len);
        c[0] = start[0] * alpha + (1 - alpha) * end[0];
        c[1] = start[1] * alpha + (1 - alpha) * end[1];
        c[2] = start[2] * alpha + (1 - alpha) * end[2];
        hexarr.push('#' + convertToHex(c));
    }
    return hexarr;
}
exports.twoWayGradient = twoWayGradient;
function threeWayGradient(colorStart, colorMiddle, colorEnd, colorCount) {
    if (colorCount === 1) {
        return [colorEnd];
    }
    else if (colorCount === 2) {
        return [colorStart, colorEnd];
    }
    else if (colorCount === 3) {
        return [colorStart, colorMiddle, colorEnd];
    }
    else if (colorCount % 2 === 0) {
        colorCount++;
    }
    // Divide by two because the two way gradient creates a color list of the full length passed to it
    var _colorCount = colorCount / 2;
    var ar1 = twoWayGradient(colorStart, colorMiddle, _colorCount);
    var ar2 = twoWayGradient(colorMiddle, colorEnd, _colorCount);
    var output = [];
    output.push(colorStart);
    for (var i = 0; i < ar1.length; i++) {
        output.push(ar1[i]);
    }
    var _loop_1 = function (i) {
        if (output.findIndex(function (c) { return c === ar2[i]; }) === -1) {
            output.push(ar2[i]);
        }
    };
    for (var i = 0; i < ar2.length; i++) {
        _loop_1(i);
    }
    return output;
}
exports.threeWayGradient = threeWayGradient;
function getConditionalValueColor(value, min, max, colorArray) {
    if (value === max) {
        return colorArray[colorArray.length - 1];
    }
    var step = (max - min) / colorArray.length;
    var cIndex = 0;
    for (var i = min; i < max; i += step) {
        if (i === min) {
            if (value <= i + step) {
                return colorArray[cIndex];
            }
        }
        else if (i === max - step) {
            if (value >= max - step) {
                return colorArray[cIndex];
            }
        }
        else {
            if (value > i && value < i + step) {
                return colorArray[cIndex];
            }
            else if (value === i) {
                return colorArray[cIndex];
            }
        }
        cIndex++;
    }
}
exports.getConditionalValueColor = getConditionalValueColor;
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
        var state_1 = _loop_2(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
exports.getRandomMaterialDesignColor = getRandomMaterialDesignColor;

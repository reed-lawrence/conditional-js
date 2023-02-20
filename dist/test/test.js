"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var __1 = require("..");
{
    var rgb1_1 = [0, 0, 0];
    var rgb2_1 = [100, 100, 100];
    (0, globals_1.test)('2 point gradient: Midway point', function () {
        var result = (0, __1.getGradientColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 50,
        });
        (0, globals_1.expect)(result).toEqual([50, 50, 50]);
    });
    (0, globals_1.test)('2 point gradient: Start point', function () {
        var result = (0, __1.getGradientColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 0,
        });
        (0, globals_1.expect)(result).toEqual([0, 0, 0]);
    });
    (0, globals_1.test)('2 point gradient: End point', function () {
        var result = (0, __1.getGradientColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 100,
        });
        (0, globals_1.expect)(result).toEqual([100, 100, 100]);
    });
    (0, globals_1.test)('2 point gradient: Below start point', function () {
        var result = (0, __1.getGradientColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: -1,
        });
        (0, globals_1.expect)(result).toEqual([0, 0, 0]);
    });
    (0, globals_1.test)('2 point gradient: Above end point', function () {
        var result = (0, __1.getGradientColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 101,
        });
        (0, globals_1.expect)(result).toEqual([100, 100, 100]);
    });
    (0, globals_1.test)('2 point gradient: 3/4 point', function () {
        var result = (0, __1.getGradientColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 75,
        });
        (0, globals_1.expect)(result).toEqual([75, 75, 75]);
    });
    (0, globals_1.test)('2 point gradient: messy point', function () {
        var result = (0, __1.getGradientColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 43.56,
        });
        (0, globals_1.expect)(result).toEqual([43.56, 43.56, 43.56]);
    });
}
{
    var rgb1_2 = [0, 0, 0];
    var rgb2_2 = [100, 100, 100];
    var rgb3_1 = [200, 200, 200];
    (0, globals_1.test)('3 point gradient: Midway point', function () {
        var result = (0, __1.getGradientColor)({
            colors: [rgb1_2, rgb2_2, rgb3_1],
            limits: [0, 50, 100],
            value: 50,
        });
        (0, globals_1.expect)(result).toEqual([100, 100, 100]);
    });
}

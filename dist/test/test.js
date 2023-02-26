"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var __1 = require("..");
{
    var rgb1_1 = [0, 0, 0];
    var rgb2_1 = [100, 100, 100];
    (0, globals_1.test)('2 point gradient: Midway point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 50,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([50, 50, 50]);
    });
    (0, globals_1.test)('2 point gradient: Start point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 0,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([0, 0, 0]);
    });
    (0, globals_1.test)('2 point gradient: End point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 100,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([100, 100, 100]);
    });
    (0, globals_1.test)('2 point gradient: Below start point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: -1,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([0, 0, 0]);
    });
    (0, globals_1.test)('2 point gradient: Above end point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 101,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([100, 100, 100]);
    });
    (0, globals_1.test)('2 point gradient: 3/4 point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 75,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([75, 75, 75]);
    });
    (0, globals_1.test)('2 point gradient: messy point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_1, rgb2_1],
            limits: [0, 100],
            value: 43.56,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([44, 44, 44]);
    });
}
{
    var rgb1_2 = [0, 0, 0];
    var rgb2_2 = [100, 100, 100];
    var rgb3_1 = [200, 200, 200];
    (0, globals_1.test)('3 point gradient: Midway point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_2, rgb2_2, rgb3_1],
            limits: [0, 50, 100],
            value: 50,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([100, 100, 100]);
    });
    (0, globals_1.test)('3 point gradient: First segment, mid point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_2, rgb2_2, rgb3_1],
            limits: [0, 50, 100],
            value: 25,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([50, 50, 50]);
    });
}
{
    var rgb1_3 = [20, 30, 40];
    var rgb2_3 = [40, 60, 80];
    var rgb3_2 = [80, 120, 160];
    (0, globals_1.test)('3 point gradient: non-linear point', function () {
        var result = (0, __1.getColor)({
            colors: [rgb1_3, rgb2_3, rgb3_2],
            limits: [0, 75, 100],
            value: 50,
            as: 'rgb'
        });
        (0, globals_1.expect)(result).toEqual([33, 50, 67]);
    });
}
(0, globals_1.test)('getColor -> Invalid color argument', function () {
    (0, globals_1.expect)(function () { return (0, __1.getColor)({
        colors: [null, [0, 0, 0]],
        limits: [0, 100],
        value: 50,
        as: 'rgb'
    }); }).toThrowError();
});
(0, globals_1.test)('getColor -> Invalid limit argument', function () {
    (0, globals_1.expect)(function () { return (0, __1.getColor)({
        colors: [[0, 0, 0], [100, 100, 100]],
        limits: [null, 100],
        value: 50,
        as: 'rgb'
    }); }).toThrowError();
});
(0, globals_1.test)('getColor -> Invalid value argument', function () {
    (0, globals_1.expect)(function () { return (0, __1.getColor)({
        colors: [[0, 0, 0], [100, 100, 100]],
        limits: [0, 100],
        value: null,
        as: 'rgb'
    }); }).toThrowError();
});
(0, globals_1.test)('getColor -> Invalid format argument', function () {
    (0, globals_1.expect)(function () { return (0, __1.getColor)({
        colors: [[0, 0, 0], [100, 100, 100]],
        limits: [0, 100],
        value: 50,
        as: '123123'
    }); }).toThrowError();
});

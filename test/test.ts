import { expect, test } from '@jest/globals';
import { RGB, getGradientColor } from '..';

{

  const rgb1: RGB = [0, 0, 0];
  const rgb2: RGB = [100, 100, 100];

  test('2 point gradient: Midway point', () => {

    let result = getGradientColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 50,
    });

    expect(result).toEqual([50, 50, 50]);

  });

  test('2 point gradient: Start point', () => {

    let result = getGradientColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 0,
    });

    expect(result).toEqual([0, 0, 0]);

  });

  test('2 point gradient: End point', () => {

    let result = getGradientColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 100,
    });

    expect(result).toEqual([100, 100, 100]);

  });

  test('2 point gradient: Below start point', () => {

    let result = getGradientColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: -1,
    });

    expect(result).toEqual([0, 0, 0]);

  });

  test('2 point gradient: Above end point', () => {

    let result = getGradientColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 101,
    });

    expect(result).toEqual([100, 100, 100]);

  });

  test('2 point gradient: 3/4 point', () => {

    let result = getGradientColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 75,
    });

    expect(result).toEqual([75, 75, 75]);

  });

  test('2 point gradient: messy point', () => {

    let result = getGradientColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 43.56,
    });

    expect(result).toEqual([43.56, 43.56, 43.56]);

  });
}

{
  const rgb1: RGB = [0, 0, 0];
  const rgb2: RGB = [100, 100, 100];
  const rgb3: RGB = [200, 200, 200];

  test('3 point gradient: Midway point', () => {

    let result = getGradientColor({
      colors: [rgb1, rgb2, rgb3],
      limits: [0, 50, 100],
      value: 50,
    });

    expect(result).toEqual([100, 100, 100]);

  });
}



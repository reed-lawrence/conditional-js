import { expect, test } from '@jest/globals';
import { RGB, getColor } from '..';

{

  const rgb1: RGB = [0, 0, 0];
  const rgb2: RGB = [100, 100, 100];

  test('2 point gradient: Midway point', () => {

    let result = getColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 50,
      as: 'rgb'
    });

    expect(result).toEqual([50, 50, 50]);

  });

  test('2 point gradient: Start point', () => {

    let result = getColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 0,
      as: 'rgb'
    });

    expect(result).toEqual([0, 0, 0]);

  });

  test('2 point gradient: End point', () => {

    let result = getColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 100,
      as: 'rgb'
    });

    expect(result).toEqual([100, 100, 100]);

  });

  test('2 point gradient: Below start point', () => {

    let result = getColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: -1,
      as: 'rgb'
    });

    expect(result).toEqual([0, 0, 0]);

  });

  test('2 point gradient: Above end point', () => {

    let result = getColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 101,
      as: 'rgb'
    });

    expect(result).toEqual([100, 100, 100]);

  });

  test('2 point gradient: 3/4 point', () => {

    let result = getColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 75,
      as: 'rgb'
    });

    expect(result).toEqual([75, 75, 75]);

  });

  test('2 point gradient: messy point', () => {

    let result = getColor({
      colors: [rgb1, rgb2],
      limits: [0, 100],
      value: 43.56,
      as: 'rgb'
    });

    expect(result).toEqual([44, 44, 44]);

  });
}

{
  const rgb1: RGB = [0, 0, 0];
  const rgb2: RGB = [100, 100, 100];
  const rgb3: RGB = [200, 200, 200];

  test('3 point gradient: Midway point', () => {

    let result = getColor({
      colors: [rgb1, rgb2, rgb3],
      limits: [0, 50, 100],
      value: 50,
      as: 'rgb'
    });

    expect(result).toEqual([100, 100, 100]);

  });

  test('3 point gradient: First segment, mid point', () => {

    let result = getColor({
      colors: [rgb1, rgb2, rgb3],
      limits: [0, 50, 100],
      value: 25,
      as: 'rgb'
    });

    expect(result).toEqual([50, 50, 50]);

  });
}

{

  const rgb1: RGB = [20, 30, 40];
  const rgb2: RGB = [40, 60, 80];
  const rgb3: RGB = [80, 120, 160];

  test('3 point gradient: non-linear point', () => {

    let result = getColor({
      colors: [rgb1, rgb2, rgb3],
      limits: [0, 75, 100],
      value: 50,
      as: 'rgb'
    });

    expect(result).toEqual([33, 50, 67]);

  });
}

test('getColor -> Invalid color argument', () => {

  expect(() => getColor({
    colors: [null!, [0, 0, 0]],
    limits: [0, 100],
    value: 50,
    as: 'rgb'
  })).toThrowError();

});

test('getColor -> Invalid limit argument', () => {

  expect(() => getColor({
    colors: [[0, 0, 0], [100, 100, 100]],
    limits: [null!, 100],
    value: 50,
    as: 'rgb'
  })).toThrowError();

});

test('getColor -> Invalid value argument', () => {

  expect(() => getColor({
    colors: [[0, 0, 0], [100, 100, 100]],
    limits: [0, 100],
    value: null!,
    as: 'rgb'
  })).toThrowError();

});

test('getColor -> Invalid format argument', () => {

  expect(() => getColor({
    colors: [[0, 0, 0], [100, 100, 100]],
    limits: [0, 100],
    value: 50,
    as: '123123' as any
  })).toThrowError();

});



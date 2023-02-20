export type RGB = [number, number, number];
export type Format = 'hex' | 'rgb';

export function isRGB(value: any): value is RGB {
  return Array.isArray(value) && value.length === 3 && value.every(v => typeof v === 'number' && v >= 0 && v <= 255);
}


/**
 * Converts an RGB color to a hexadecimal color string
 * @param rgb rgb color triplet
 * @returns hexadecimal color string
 */
export function rgbToHex(rgb: RGB, prefix = true) {
  return rgb.reduce((hex, color, i) => {
    if (i > 2)
      return hex;

    const hexColor = color.toString(16);
    return hex + (hexColor.length === 1 ? '0' + hexColor : hexColor);
  }, prefix ? '#' : '');
}

export function hexToRgb(hex: string): RGB {
  const bigint = parseInt(hex.replace('#', ''), 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;


  return [r, g, b] as RGB;
}

export function twoWayGradient(opts: { start: string | RGB; end: string | RGB; count: number; format: 'rgb' }): RGB[];
export function twoWayGradient(opts: { start: string | RGB; end: string | RGB; count: number; format: 'hex' }): string[];
export function twoWayGradient(opts: { start: string | RGB; end: string | RGB; count: number; format: Format }): (RGB | string)[] {

  const { count } = opts;
  const format = opts.format || 'hex';
  const start = (typeof opts.start === 'string' ? hexToRgb(opts.start) : opts.start);
  const end = (typeof opts.end === 'string' ? hexToRgb(opts.end) : opts.end);

  const output = [] as (RGB | string)[];

  const step = 1 / (count - 1);

  for (let i = 0; i < count; i++) {

    const rgb = [0, 0, 0] as RGB;

    for (let j: 0 | 1 | 2 = 0; j < 3; j++) {
      rgb[j] = Math.round((start[j] * (1 - (i * step))) + (end[j] * i * step));
    }

    output.push(format === 'hex' ? rgbToHex(rgb) : rgb);
  }

  return output;
}

export function getGradientColor(opts: { value: number; colors: string[] | RGB[]; limits: number[] }): string | RGB {
  const { value, colors, limits } = opts;

  if (typeof value !== 'number')
    throw new Error('Value must be a number');

  const count = colors.length;

  if (count < 2)
    throw new Error('You must provide at least two colors');

  if (opts.limits.length !== count)
    throw new Error('You must provide a limit for each color');

  if (!limits.every((l) => typeof l === 'number'))
    throw new Error('Limits must be numbers');

  if (value <= limits[0])
    return colors[0];

  else if (value >= limits[count - 1])
    return colors[count - 1];

  else {
    for (let i = 0; i < count - 1; i++) {
      if (value >= limits[i] && value <= limits[i + 1]) {

        // if value == 50

        const start = typeof colors[i] === 'string' ? hexToRgb(colors[i] as string) : isRGB(colors[i]) ? colors[i] as RGB : (() => { throw new Error(`value of getGradientColor -> opts.color is not a string or RGB value at index ${i}`) })(); // [0, 0, 0]

        const startLimit = limits[i]; // 0
        const endLimit = limits[i + 1]; // 100
        const range = endLimit - startLimit; // 100
        const valueRange = value - startLimit; // 50

        const modifier = (valueRange / range); // 50 / 100 = 0.5

        return [start[0] + (range * modifier), start[1] + (range * modifier), start[2] + (range * modifier)] as RGB;
      }
    }
  }

  throw new Error('Something went wrong');

}

export const materialColors = ['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5',
  '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726',
  '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'
];

export function getRandomMaterialDesignColor(previouslyGenerated: string[]) {

  // clean the array
  if (previouslyGenerated.length === materialColors.length) {
    previouslyGenerated = [];
  }


  for (let i = 0; i < materialColors.length; i++) {
    const randomIndex = Math.floor(Math.random() * materialColors.length);
    const chosenColor = materialColors[randomIndex];

    // ensure the color hasn't been picked recently
    if (previouslyGenerated.findIndex(c => c === chosenColor) === -1) {
      return chosenColor;
    }
  }
}

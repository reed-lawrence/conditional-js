export type RGB = [number, number, number];

const FORMATS = new Set(['hex', 'rgb'] as const);
export type Format = typeof FORMATS extends Set<infer T> ? T : never;

export function isRGB(value: any): value is RGB {
  return Array.isArray(value) && value.length === 3 && value.every(v => typeof v === 'number' && v >= 0 && v <= 255);
}

/**
 * Converts an RGB color to a hexadecimal color string
 * @param rgb RGB color triplet
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

/**
 * Converts a hexadecimal color string to an RGB color
 * @param hex hexadecimal color string
 * @returns RGB color triplet
 */
export function hexToRgb(hex: string): RGB {
  const bigint = parseInt(hex.replace('#', ''), 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b] as RGB;
}

export function getColor(opts: { value: number; colors: string[] | RGB[]; limits: number[], as: 'rgb' }): RGB;
export function getColor(opts: { value: number; colors: string[] | RGB[]; limits: number[], as: 'hex' }): string;
export function getColor(opts: { value: number; colors: string[] | RGB[]; limits: number[] }): string;
export function getColor(opts: { value: number; colors: string[] | RGB[]; limits: number[], as?: Format }): string | RGB {

  const format = opts.as || 'hex';
  if (!FORMATS.has(format))
    throw new Error('Invalid format');

  const color = (() => {

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

          const percent = (value - limits[i]) / (limits[i + 1] - limits[i]);
          const color1 = (typeof colors[i] === 'string' ? hexToRgb(colors[i] as string) : colors[i]) as RGB;
          const color2 = (typeof colors[i + 1] === 'string' ? hexToRgb(colors[i + 1] as string) : colors[i + 1]) as RGB;

          const rgb = [0, 0, 0] as RGB;

          for (let j: 0 | 1 | 2 = 0; j < 3; j++) {
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

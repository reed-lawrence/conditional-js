/**
   * [NOT IMPLEMENTED (WIP)]
   * Function to calculate color based on a percentile position
   * @param {number[]} numberArray
   * @param {number} percentile
   */
export declare function percentile(numberArray: number[], percentile: number): number;
/**
 *
 * @param c
 */
export declare function hex(c: number): string;
export declare function convertToHex(rgb: number[]): string;
export declare function trim(s: string): string;
export declare function convertToRGB(hex: string): number[];
export declare function twoWayGradient(colorStart: string, colorEnd: string, colorCount: number): string[];
export declare function threeWayGradient(colorStart: string, colorMiddle: string, colorEnd: string, colorCount: number): string[];
export declare function getConditionalValueColor(value: number, min: number, max: number, colorArray: string[]): string | undefined;
export declare const materialColors: string[];
export declare function getRandomMaterialDesignColor(previouslyGenerated: string[]): string | undefined;

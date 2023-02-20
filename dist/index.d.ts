export type RGB = [number, number, number];
export type Format = 'hex' | 'rgb';
export declare function isRGB(value: any): value is RGB;
/**
 * Converts an RGB color to a hexadecimal color string
 * @param rgb rgb color triplet
 * @returns hexadecimal color string
 */
export declare function rgbToHex(rgb: RGB, prefix?: boolean): string;
export declare function hexToRgb(hex: string): RGB;
export declare function twoWayGradient(opts: {
    start: string | RGB;
    end: string | RGB;
    count: number;
    format: 'rgb';
}): RGB[];
export declare function twoWayGradient(opts: {
    start: string | RGB;
    end: string | RGB;
    count: number;
    format: 'hex';
}): string[];
export declare function getGradientColor(opts: {
    value: number;
    colors: string[] | RGB[];
    limits: number[];
}): string | RGB;
export declare const materialColors: string[];
export declare function getRandomMaterialDesignColor(previouslyGenerated: string[]): string | undefined;

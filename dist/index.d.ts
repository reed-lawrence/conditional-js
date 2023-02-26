export type RGB = [number, number, number];
declare const FORMATS: Set<"hex" | "rgb">;
export type Format = typeof FORMATS extends Set<infer T> ? T : never;
export declare function isRGB(value: any): value is RGB;
/**
 * Converts an RGB color to a hexadecimal color string
 * @param rgb RGB color triplet
 * @returns hexadecimal color string
 */
export declare function rgbToHex(rgb: RGB, prefix?: boolean): string;
/**
 * Converts a hexadecimal color string to an RGB color
 * @param hex hexadecimal color string
 * @returns RGB color triplet
 */
export declare function hexToRgb(hex: string): RGB;
export declare function getColor(opts: {
    value: number;
    colors: string[] | RGB[];
    limits: number[];
    as: 'rgb';
}): RGB;
export declare function getColor(opts: {
    value: number;
    colors: string[] | RGB[];
    limits: number[];
    as: 'hex';
}): string;
export declare function getColor(opts: {
    value: number;
    colors: string[] | RGB[];
    limits: number[];
}): string;
export declare const materialColors: string[];
export declare function getRandomMaterialDesignColor(previouslyGenerated: string[]): string | undefined;
export {};

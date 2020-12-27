interface String {
    toASCII(): string;
    firstChar(): string;
    lastChar(): string;
    leftPad(size: number, pad?: string): string;
    rightPad(size: number, pad?: string): string;
    centerPad(size: number, pad?: string): string;
    isNumeric(): boolean;
    containsIgnoreCase(str: string): string;
    contains(str: string): string;
    strip(...targets: Array<string>): string;
    stripIgnoreCase(...targets: Array<string>): string;
    substringUpTo(str: string): string;
    substringUpToLast(str: string): string;
    substringFrom(str: string): string;
    substringFromLast(str: string): string;
    safeReplace(target: string, replacement: string): string;
    replaceIgnoreCase(target: string, replacement: string): string;
    replaceAll(target: string, replacement: string): string;
    replaceAllIgnoreCase(target: string, replacement: string): string;
    capitalize(): string;
    toDate(pattern: string): Date;
    format(...args: Array<unknown>): string;
    interpolate(properties: { [name: string]: unknown }): string;
    equalsIgnoreCase(str: string): boolean;
}

interface Array<T> {
    first(): T;
    secondLast(): T;
    last(): T;
}

interface Number {
    pow10(exponent: number): number;
    toDate(pattern: string): Date;
    abs(): number;
    acos(): number;
    acosh(): number;
    asin(): number;
    asinh(): number;
    atan(): number;
    atanh(): number;
    cbrt(): number;
    ceil(): number;
    clz32(): number;
    cos(): number;
    cosh(): number;
    exp(): number;
    expm1(): number;
    floor(): number;
    fround(): number;
    log10(): number;
    log1p(): number;
    log2(): number;
    round(): number;
    sign(): number;
    sin(): number;
    sinh(): number;
    sqrt(): number;
    tan(): number;
    tanh(): number;
    trunc(): number;
    random(num: number, max?: number): number;
}

interface Date {
    toLocalISOString(): string;
    toFormattedString(pattern?: string, timeZone?: string): string;
    toFormattedString(pattern?: string, localTime?: boolean): string;
    toFormattedNumber(pattern?: string, timeZone?: string): string;
    toFormattedNumber(pattern?: string, localTime?: boolean): string;
    fromFormattedString(dateString: string, pattern: string): Date;
    fromFormattedNumber(dateNumber: number, pattern: string): Date;
    getEpochTime(): number;
}

declare const __moduleInfo: {
    name: string;
    scope: string;
    version: string;
    description: string;
    homepage?: string;
    keywords?: Array<string>;
    author?: string;
    license?: string;
    contributors?: Array<string>;
    main?: string;
    repository?: { type: string, url: string }
    scripts?: { [command: string]: string },
    dependencies?: { [packageName: string]: string },
    devDependencies?: { [packageName: string]: string },
}

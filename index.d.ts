interface String {
    toASCII(): string;
    leftPad(size: number, pad?: string): string;
    rightPad(size: number, pad?: string): string;
    centerPad(size: number, pad?: string): string;
    isNumeric(): boolean;
    containsIgnoreCase(str: string): string;
    contains(str: string): string;
    substringUpTo(str: string): string;
    substringUpToLast(str: string): string;
    substringFrom(str: string): string;
    substringFromLast(str: string): string;
    replaceAll(find: string, replace: string): string;
    replaceIgnoreCase(find: string, replace: string): string;
    replaceAllIgnoreCase(find: string, replace: string): string;
    capitalize(find: string, replace: string): string;
    toDate(pattern: string): Date;
}

interface Array<T> {
    first(): T;
    secondLast(): T;
    last(): T;
}

interface Number {
    pow10(exponent: number): number;
    toDate(pattern: string): Date;
}

interface Date {
    toLocalISOString(): string;
    toFormattedString(pattern?: string, timeZone?: string): string;
    fromFormattedString(dateString: string, pattern: string): Date;
}


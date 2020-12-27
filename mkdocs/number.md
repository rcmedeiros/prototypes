<!-- cSpell: ignore fromformattednumber -->
# Number

## pow10

`Number.prototype.pow10(exponent: number): number`

Returns the number raised n times to the power of 10

```typescript
const n = 5;
n.pow10(-3); // => 0.005
n.pow10(3); // => 5000
```

___

## Single argument Math functions

`Number.prototype[function](): number`

For sheer convenience, every function from the Math built-in object which takes a single argument is accessible from any number instance. Those are `abs`, `acos`, `acosh`, `asin`, `asinh`, `atan`, `atanh`, `cbrt`, `ceil`, `clz32`, `cos`, `cosh`, `exp`, `expm1`, `floor`, `fround`, `log10`, `log1p`, `log2`, `round`, `sign`, `sin`, `sinh`, `sqrt`, `tan`, `tanh`, and `trunc`. Access [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) for further documentation on each one.

```typescript
let n = -7.6;
console.log(`${n.floor()}, ${n.ceil()}, ${n.round()}, ${n.trunc()}`); // => -8, -7, -8, -7
n = n.abs();
console.log(`${n.floor()}, ${n.ceil()}, ${n.round()}, ${n.trunc()}`); // => 7, 8, 7, 7
```

!!!note
    As of ES2016, `Math.pow(x, y)` can ben stated as `x ** y`

## toDate

`Number<T>.prototype.toDate(pattern: string): Date`

Alias of [Date.prototype.fromFormattedNumber](./date.md#fromformattednumber)

___

# .random

*Number.prototype.random(num: number, max?: number): number;*

Returns a random number between *num* e *max*;
If *max* is omitted, returns a random number between 0 e *num*;
If *max* is greater then *num*, the values will be switched;

Negative numbers are not allowed. Invalid values returns 0;

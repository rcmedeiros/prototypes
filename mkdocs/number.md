# Number

## pow10

`Number<T>.prototype.pow10(exponent: number): number`

Returns the number raised n times to the power of 10

````typescript
const n = 5;
n.pow10(-3); // => 0.005
n.pow10(3); // => 5000
````

---

## toDate

`Number<T>.prototype.toDate(pattern: string): Date`

Alias of [Date.prototype.fromFormattedNumber](./date.md#fromformattednumber)
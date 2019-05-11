<!-- cSpell: ignore Myyyy -->
# Date.prototype

## fromFormattedString(dateString: string, pattern: string): Date

Returns a new Date object based on the informed [pattern](./pattern.md).

````javascript
const d = new Date();
d.fromFormattedString('6/9/19 11:50 pm GMT +05:30', 'M/d/yy h:m a z');
// => Sun Jun 09 2019 18:20:00 GMT+0000
````

* A pattern take only its reserved characters into consideration. Any other character is considered a separator.
* Two consecutive separators aren't allowed.
* If the pattern has no separator, the date string doesn't either. In this case, only full elements (with leading zeros) are allowed.
* If a separator in the pattern doesn't match a separator in the date string, with the same sequence, or if the content between two separators isn't numeric, an error will be raised.
* If a pattern element isn't recognized, an error will be raised.

---

## fromFormattedNumber(dateNumber: number, pattern: string): Date

Exactly the same thing as the above function, accepting only full elements with no separators as [pattern](./pattern.md).

````javascript
const d = new Date(2019, 5, 11);
d.fromFormattedNumber(20190906, 'yyyyMMdd');
// => Sun Jun 09 2019 00:00:00 GMT+0000
````

---

## toFormattedString(pattern?: string, timeZone?: string): string

Returns the date according to the specified [pattern](./pattern.md).

* If no pattern is specified, ISO 8601 *(`'yyyy-MM-ddTHH:mm:ssZ'`)* is assumed;
* If no time zone is specified, UTC is assumed;
* Time zone can also be the word *`local`*, thus assuming the environment local time.

````javascript
const d = new Date(Date.UTC(2018, 5, 9, 16, 0, 30, 95));

d.toFormattedString()); // 1980-06-09T16:00:30+0000
d.toFormattedString('yyyy/MM/dd HH:mm:ssZ', 'GMT +01:00'); // 1980/06/09 17:00:30+0100
d.toFormattedString('yyyy/MM/dd HH:mm:ssZ', '-0100'); // 1980/06/09 15:00:30-0100
d.toFormattedString('yyyy/MM/dd HH:mm:ss (z)', 'local'); // 1980/06/09 13:00:30 (GMT -03:00)
````

---

## toLocalISOString(): string

Returns local time in ISO format

```javascript
const d = new Date();
d.toLocalISOString(); // Just like toISOString(), but in the local format
```

---

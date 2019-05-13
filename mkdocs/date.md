<!-- cSpell: ignore Myyyy -->
# Date

!!! important
    Always work in [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), regardless if you're in the back end, front end, or even in the wrong end of a deadline. The only exception is if you need to display the data, but only if the data displayed is not coming back to the system, tainted with a local time offset. All of these functions works internally in UTC.

    But if for whatever reason you stubbornly decides that local time is a thing, keep in mind that:
        * In an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string, time zone designators are in the format `±hh:mm`, `±hhmm`, `±hh`, or an upper cased `Z` at the end. This [Z, or *Zulu Time*](https://time.is/Z), is [the military designation](https://en.wikipedia.org/wiki/List_of_military_time_zones) for UTC+0 and shortcuts to `+0000`.
        * Buf if no time designators are provided, the ISO 8601 states that local time is to be assumed. **Blatantly contradicting the standard, these functions will assume UTC instead.**

## fromFormattedString

`Date.prototype.fromFormattedString(dateString: string, pattern: string): Date`

Returns a new Date object based on the informed [pattern](./pattern.md).

```typescript
const d = new Date();
d.fromFormattedString('6/9/19 11:50 pm GMT +05:30', 'M/d/yy h:m a z');
// => Sat Jun 09 2018 18:20:00 GMT+0000 (Greenwich Mean Time)
// => Sat Jun 09 2018 19:20:00 GMT+0100 (British Summer Time)
// => Sat Jun 09 2018 15:20:00 GMT-0300 (Atlantic Daylight Time)
// => Sun Jun 10 2018 02:20:00 GMT+0800 (China Standard Time)
```

* A pattern take only its reserved characters into consideration. Any other character is considered a separator.
* Two consecutive separators aren't allowed.
* If the pattern has no separator, the date string doesn't either. In this case, only full elements (with leading zeros) are allowed.
* If a separator in the pattern doesn't match a separator in the date string, with the same sequence, or if the content between two separators isn't numeric, an error will be raised.
* If a pattern element isn't recognized, an error will be raised.

---

## fromFormattedNumber

`Date.prototype.fromFormattedNumber(dateNumber: number, pattern: string): Date`

The same thing as the above function, accepting only full elements with no separators as [pattern](./pattern.md).

```typescript
const d = new Date(2019, 5, 11);
d.fromFormattedNumber(20190906, 'yyyyMMdd');
// => Sun Jun 09 2019 00:00:00 GMT+0000
```

---

## toFormattedString

`Date.prototype.toFormattedString(pattern?: string, timeZone?: string): string`
`Date.prototype.toFormattedString(pattern?: string, localTime?: boolean): string`

Returns the date according to the specified [pattern](./pattern.md).

* If no pattern is specified, ISO 8601 *(`'yyyy-MM-ddTHH:mm:ssZ'`)* is assumed;
* If no time zone is specified, UTC is assumed;
* Time zone can also be the word *`local`*, thus assuming the environment local time.

```typescript
const d = new Date(Date.UTC(2018, 5, 9, 16, 0, 30, 95));

d.toFormattedString()); // 1980-06-09T16:00:30+0000
d.toFormattedString('yyyy/MM/dd HH:mm:ssZ', 'GMT +01:00'); // 1980/06/09 17:00:30+0100
d.toFormattedString('yyyy/MM/dd HH:mm:ssZ', '-0100'); // 1980/06/09 15:00:30-0100
d.toFormattedString('yyyy/MM/dd HH:mm:ss (z)', true); // 1980/06/09 13:00:30 (GMT -03:00)
```

---

## toLocalISOString

`Date.prototype.toLocalISOString(): string`

Returns local time in ISO format

```typescript
const d = new Date();
d.toLocalISOString(); // Just like toISOString(), but in the local format
```

---

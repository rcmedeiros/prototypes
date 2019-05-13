<!-- cSpell: ignore façade café résumé rgotten fromformattedstring divid respons -->
# String

## toASCII

`String.prototype.toASCII(): string`

Strips the string of accented characters, downgrading the encode to simple ASCII

```typescript
const sample = 'Façade Café Résumé'
sample.toASCII(); // => Facade Cafe Resume
```

---

## leftPad

 `String.prototype.leftPad(size: number, pad?: string): string`

Returns the string with the specified size, using the specified character to the lef to complete the length. If no character is specified, blank is assumed.

```typescript
'123'.leftPad(5,'_'); // => '__123'
'123'.leftPad(5); // => '  123'
```

---

## rightPad

`String.prototype.rightPad(size: number, pad?: string): string`

Returns the string with the specified size, using the specified character to the right to complete the length. If no character is specified, blank is assumed.

```typescript
'123'.leftPad(5,'_'); // => '123__'
'123'.leftPad(5,); // => '123  '
```

---

## centerPad

`String.prototype.centerPad(size: number, pad?: string): string`

Returns the string with the specified size, using the specified character to both sides to complete the length, centering the word. If no character is specified, blank is assumed. If the number is even, the string will be one position to the left

```typescript
'12'.centerPad(5, 'a'); // => 'a12aa'
'12'.centerPad(3); // => '12 '
```

---

## isNumeric

`String.prototype.isNumeric(): boolean`

Returns true if the string represents a number

```typescript
'0'.isNumeric(); // => true
'-1'.isNumeric(); // => true
'1'.isNumeric(); // => true
'-1.7'.isNumeric(); // => true
'8e5'.isNumeric(); // => true
'*2a'.isNumeric(); // => false
'\t\t'.isNumeric(); // => false
```

---

## capitalize

`String.prototype.capitalize(find: string, replace: string): string`

Returns the string in lower case, except for the first letter of each word which will be upper cased.

```typescript
'life before death'.capitalize(); // => 'Life Before Death'
```

---

## contains

`String.prototype.contains(str: string): string`

Returns true if the substring is present, case sensitive

```typescript
'strength before weakness'.contains('after'); // false
'journey before destination'.contains('destination'); // true
```

---

## containsIgnoreCase

`String.prototype.containsIgnoreCase(str: string): string`

Returns true if the substring is present, regardless the case

```typescript
'I will protect those'.containsIgnoreCase('PROTECT'); // true
'who cannot protect themselves'.containsIgnoreCase('Those';) // false
```

---

## substringUpTo

`String.prototype.substringUpTo(str: string): string`

Returns the string up until the **first** occurrence of the the specified substring, exclusive and case sensitive.

```typescript
'I will unite instead of divide.'.substringUpTo('e');
// => 'I will unit'
```

---

## substringUpToLast

`String.prototype.substringUpToLast(str: string): string`

Returns the string up until the **last** occurrence of the the specified substring, exclusive and case sensitive.

```typescript
'I will unite instead of divide.'.substringUpToLast('e');
// => 'I will unite instead of divid'
```

---

## substringFrom

`String.prototype.substringFrom(str: string): string`

Returns the string from the **first** occurrence of the specified substring to the end. It's case sensitive.

```typescript
'I will remember those who have been forgotten.'.substringFrom('r');
// => 'remember those who have been forgotten.'
```

---

## substringFromLast

`String.prototype.substringFromLast(str: string): string`

Returns the string from the **last** occurrence of the specified substring to the end. It's case sensitive.

```typescript
'I will remember those who have been forgotten.'.substringFrom('r');
// => 'gotten.'
```

---

## replaceIgnoreCase

`String.prototype.replaceIgnoreCase(find: string, replace: string): string`

Replaces the **first** occurrence of a substrings according to the declared arguments, regardless the case.

```typescript
'I will listen to those who have been ignored.'.replaceIgnoreCase('WHO HAVE', 'WHO\'VE');
// => 'I will listen to those WHO'VE been ignored.'
```

---

## replaceAll

`String.prototype.replaceAll(find: string, replace: string): string`

Replaces all substrings according to the declared arguments. It's case sensitive.

```typescript
'I will protect even those I hate'.replaceAll(' ', '_');
// => 'I_will_protect_even_those_I_hate'
```

---

## replaceAllIgnoreCase

`String.prototype.replaceAllIgnoreCase(find: string, replace: string): string`

Replaces all substrings according to the declared arguments, regardless the case.

```typescript
'I will take responsibility'.replaceAllIgnoreCase('i', '!');
// => '! w!ll take respons!b!l!ty'
```

---

## toDate

`String.prototype.toDate(pattern: string): Date`

Alias of [Date.prototype.fromFormattedString](./date.md#fromformattedstring)

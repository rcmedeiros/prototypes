<!-- cSpell: ignore façade café résumé rgotten fromformattedstring divid respons -->
# String.prototype

## .toASCII(): string

Strips the string of accented characters, downgrading the encode to simple ASCII

````javascript
const sample = 'Façade Café Résumé'
sample.toASCII(); // Returns Facade Cafe Resume
````

---

## .leftPad(size: number, pad?: string): string

Returns the string with the specified size, using the specified character to the lef to complete the length. If no character is specified, blank is assumed.

````javascript
'123'.leftPad(5,'_'); // returns '__123'
'123'.leftPad(5); // returns '  123'
````

---

## .rightPad(size: number, pad?: string): string

Returns the string with the specified size, using the specified character to the right to complete the length. If no character is specified, blank is assumed.

````javascript
'123'.leftPad(5,'_'); // returns '123__'
'123'.leftPad(5,); // returns '123  '
````

---

## .centerPad(size: number, pad?: string): string

Returns the string with the specified size, using the specified character to both sides to complete the length, centering the word. If no character is specified, blank is assumed. If the number is even, the string will be one position to the left

````javascript
'12'.centerPad(5, 'a'); // returns 'a12aa'
'12'.centerPad(3); // returns '12 '
````

---

## .isNumeric(): boolean

Returns true if the string represents a number

````javascript
'0'.isNumeric(); // true
'-1'.isNumeric(); // true
'1'.isNumeric(); // true
'-1.7'.isNumeric(); // true
'8e5'.isNumeric(); // true
'*2a'.isNumeric(); // false
'\t\t'.isNumeric(); // false
````

---

## .capitalize(find: string, replace: string): string

Returns the string in lower case, except for the first letter of each word which will be upper cased.

````javascript
'life before death'.capitalize()); // returns 'Life Before Death'
````

---

## .contains(str: string): string

Returns true if the substring is present, case sensitive

````javascript
'strength before weakness'.contains('after'); // false
'journey before destination'.contains('destination'); // true
````

---

## .containsIgnoreCase(str: string): string

Returns true if the substring is present, regardless the case

````javascript
'I will protect those'.containsIgnoreCase('PROTECT'); // true
'who cannot protect themselves'.containsIgnoreCase('Those';) // false
````

---

## .substringUpTo(str: string): string

Returns the string up until the **first** occurrence of the the specified substring, exclusive and case sensitive.

````javascript
'I will unite instead of divide.'.substringUpTo('e'); // returns 'I will unit'
````

---

## .substringUpToLast(str: string): string

Returns the string up until the **last** occurrence of the the specified substring, exclusive and case sensitive.

````javascript
'I will unite instead of divide.'.substringUpToLast('e'); // returns 'I will unite instead of divid'
````

---

## .substringFrom(str: string): string

Returns the string from the **first** occurrence of the specified substring to the end. It's case sensitive.

````javascript
'I will remember those who have been forgotten.'.substringFrom('r'); // returns 'remember those who have been forgotten.'
````

---

## .substringFromLast(str: string): string

Returns the string from the **last** occurrence of the specified substring to the end. It's case sensitive.

````javascript
'I will remember those who have been forgotten.'.substringFrom('r'); // returns 'gotten.'
````

---

## .replaceIgnoreCase(find: string, replace: string): string

Replaces the **first** occurrence of a substrings according to the declared arguments, regardless the case.

````javascript
'I will listen to those who have been ignored.'.replaceIgnoreCase('WHO HAVE', 'WHO\'VE'); // returns 'I will listen to those WHO'VE been ignored.'
````

---

## .replaceAll(find: string, replace: string): string

Replaces all substrings according to the declared arguments. It's case sensitive.

````javascript
'I will protect even those I hate'.replaceAll(' ', '_'); // returns 'I_will_protect_even_those_I_hate'
````

---

## .replaceAllIgnoreCase(find: string, replace: string): string

Replaces all substrings according to the declared arguments, regardless the case.

````javascript
'I will take responsibility'.replaceAllIgnoreCase('i', '!'); // returns '! w!ll take respons!b!l!ty'
````

---

## .toDate(pattern: string): Date

Shortcut to the prototype [Date.prototype.fromFormattedString](./date.md#fromformattedstringdatestring-string-pattern-string-date)

# @rcmedeiros/prototypes

General purpose JavaScript prototypes library.

Use it if you...

* Must comply with [OWASP](https://www.owasp.org/index.php/Top_10-2017_Top_10) or [SANS](https://www.sans.org/top25-software-errors) and would avoid using any method which accept regular expressions as argument;
* Customize dates representation but not that much to justify a heavy specialized package;
* Do lots of `Math` functions;
* 're just lazy :)

This package comes with no dependencies whatsoever. You'll only add the ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@rcmedeiros/eslint-config.svg) from the source code.

!!! note
    The module comes with its [Declaration File](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html), meaning it can be imported seamlessly to a TypeScript project.

## Install

`npm install --save @rcmedeiros/prototypes`

## Usage

Just import it in the first module your package loads, maybe index.js/ts. No need to keep reference.

TypeScript typings are included.

```typescript
import '@rcmedeiros/prototypes';
```

# ncc-bug-1

> Test environment:
>
> @vercel/ncc, version: 0.24.1
>
> MacOS 10.15.6 with Node v12.16.2
>
> Windows 10, version 19.09 build 18363.1082, with Node v12.16.3 

Created for filing bug with vercel/ncc

We are fans on `ncc` by Vercel and think it is a wonderful tool.
When working on a multi-os compatible Node.js application we ran across a strange bug and needed to create a reproducible repo for it.
The bug in quest is related to file system based imports.
We ran into this while building an application that used `knex` and have thus used it here.

This code has been tested on Linux, MacOS, and Windows. The bug in question. only affects Windows environments for reasons unclear.

## Reproducing the bug

```
npm run ncc
node dist/index.js
```

On regular (non-bug) systems this will result in:

```
$node dist/index.js

Knex type is: function
```

On Windows systems this bug results in:

```
TODO
```


## Initial triage

Based on a quick review of the code, we find the following difference.
For a well working ncc output we get the results in [`dist-macos/index.js` starting on line 56107](dist-macos/index.js)

```js
/***/ 71330:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __ncc_wildcard$0 (arg) {
  if (arg === "mssql") return __webpack_require__(19427);
  else if (arg === "mysql") return __webpack_require__(75941);
  else if (arg === "mysql2") return __webpack_require__(17653);
  else if (arg === "oracle") return __webpack_require__(9051);
  else if (arg === "oracledb") return __webpack_require__(25310);
  else if (arg === "postgres") return __webpack_require__(64482);
  else if (arg === "redshift") return __webpack_require__(97332);
  else if (arg === "sqlite3") return __webpack_require__(85370);
}
```

For a buggy ncc output on windows we get the results in [`dist-windows/index.js` starting on line TODO](dist-windows/index.js)

```
TODO
```
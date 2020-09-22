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
$ npm run exec

> ncc-bug-1@0.0.0 exec C:\code\urbdyn\ncc-bug-1
> node dist/index.js

C:\code\urbdyn\ncc-bug-1\dist\index.js:56172
  const newKnex = makeKnex(new Dialect(config));
                           ^

TypeError: Dialect is not a constructor
    at Knex (C:\code\urbdyn\ncc-bug-1\dist\index.js:56172:28)
    at doTest (C:\code\urbdyn\ncc-bug-1\dist\index.js:146952:34)
    at Module.63899 (C:\code\urbdyn\ncc-bug-1\dist\index.js:146969:1)
    at __webpack_require__ (C:\code\urbdyn\ncc-bug-1\dist\index.js:147637:43)
    at C:\code\urbdyn\ncc-bug-1\dist\index.js:147706:18
    at Object.<anonymous> (C:\code\urbdyn\ncc-bug-1\dist\index.js:147707:12)
    at Module._compile (internal/modules/cjs/loader.js:1133:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1153:10)
    at Module.load (internal/modules/cjs/loader.js:977:32)
    at Function.Module._load (internal/modules/cjs/loader.js:877:14)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! ncc-bug-1@0.0.0 exec: `node dist/index.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the ncc-bug-1@0.0.0 exec script.
npm ERR! This is probably not a problem with npm. There is likely additional 
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

For a buggy ncc output on windows we get the results in [`dist-windows/index.js` starting on line 56107](dist-windows/index.js)

```js
/***/ 71330:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function __ncc_wildcard$0 (arg) {
  if (arg === "C:/code/urbdyn/ncc-bug-1/node_modules/knex/lib/dialects/") return __webpack_require__(19427);
  else if (arg === "C:/code/urbdyn/ncc-bug-1/node_modules/knex/lib/dialects/") return __webpack_require__(75941);
  else if (arg === "C:/code/urbdyn/ncc-bug-1/node_modules/knex/lib/dialects/") return __webpack_require__(17653);
  else if (arg === "C:/code/urbdyn/ncc-bug-1/node_modules/knex/lib/dialects/") return __webpack_require__(9051);
  else if (arg === "C:/code/urbdyn/ncc-bug-1/node_modules/knex/lib/dialects/") return __webpack_require__(25310);
  else if (arg === "C:/code/urbdyn/ncc-bug-1/node_modules/knex/lib/dialects/") return __webpack_require__(64482);
  else if (arg === "C:/code/urbdyn/ncc-bug-1/node_modules/knex/lib/dialects/") return __webpack_require__(97332);
  else if (arg === "C:/code/urbdyn/ncc-bug-1/node_modules/knex/lib/dialects/") return __webpack_require__(85370);
}
```

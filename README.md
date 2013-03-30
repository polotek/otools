otools
======

Simple mixin and a few other functions for working with js objects

**mixin(target, ...sources)** - Simple mixin that takes multiple sources.

Mixin does NOT copy non-enumerable properties. It returns target object.

```
var mixin = require('otools').mixin;

var opts = mixin({}, defaults, opts);
```

**each(object, function)** - Loops over object keys and values with an iterator function.

Each does NOT iterate over non-enumerable properties.

```
var each = require('otools').each;

var obj = { Hello: " World!", "Goodbye": " everybody!" };
each(obj, function(value, key) {
  // this === obj
  console.log(key, value);
});

// Hello World!
// Goodbye everbody!
```

**eachOwn(object, function)** - Only loops over own properties of the object

`eachOwn` does NOT iterate over inherited properties or non-enumerable properties.

```
var eachOwn = require('otools').eachOwn;

var obj2 = Object.create(obj);
obj2.nothing = " to say."
// inherited from prototype
// obj2.Hello === ' World!'

eachOwn(obj2, function(value, key) {
  console.log(key, value);
});

// Nothing to say!
```

var otools = require('./index')
  , test = require('tape')

var mixin = otools.mixin
  , each = otools.each
  , eachOwn = otools.eachOwn

test('mixin mixes properties onto target', function(t) {
  t.plan(2)

  var source = { foo: 'Foo', bar: 'Bar', baz: 'Baz' }
    , target = {}
    , result;

  result = mixin(target, target, source);

  t.equal(target, result);
  t.deepEquals(result, source);
})

test('mixin mixes in multiple sources', function(t) {
  t.plan(2)

  var source1 = { foo: 'Foo' }
    , source2 = { bar: 'Bar' }
    , empty = {}
    , result

  result = mixin({}, source1, source2)

  t.deepEquals(result, { foo: 'Foo', bar: 'Bar' })

  result = mixin({})

  t.deepEquals(result, empty)
})

test('mixin skips falsy sources', function(t) {
  t.plan(1)

  var source1 = { foo: 'Foo' }
    , source2 = { bar: 'Bar' }
    , result

  result = mixin({}, source1, null, source2)

  t.deepEquals(result, { foo: 'Foo', bar: 'Bar' })
})

test('mixin does not mix in non-enumerable properties', function(t) {
  t.plan(2)

  var source = { foo: 'Foo' }
    , result

  Object.defineProperty(source, 'bar', {
    value: 'Bar'
    , enumerable: false
  })
  t.equal(source.bar, 'Bar')

  result = mixin({}, source)

  t.deepEquals(result, { foo: 'Foo' })
})

test('each loops over all enumerable properties', function(t) {
  var proto = { foo: 'Foo' }
    , obj = Object.create(proto, {
      baz: {
        name: 'baz'
        , value: 'Baz'
        , enumerable: false
      }
    })
    , ctr = 0
    , result = {}

  obj.bar = 'Bar'
  Object.defineProperty(obj, 'fizz', {
    value: 'Fizz'
    , enumerable: false
  })

  t.equal(obj.foo, 'Foo')
  t.equal(obj.baz, 'Baz')

  each(obj, function(value, key) {
    ctr++
    result[key] = value;
  })

  t.equal(ctr, 2)
  t.deepEqual(result, { foo: 'Foo', bar: 'Bar' })

  t.end()
})

test('eachOwn loops over all own enumerable properties', function(t) {
  t.plan()

  var proto = { foo: 'Foo' }
    , obj = Object.create(proto, {
      baz: {
        name: 'baz'
        , value: 'Baz'
        , enumerable: false
      }
    })
    , ctr = 0
    , result = {}

  obj.bar = 'Bar'
  Object.defineProperty(obj, 'fizz', {
    value: 'Fizz'
    , enumerable: false
  })

  t.equal(obj.foo, 'Foo')
  t.equal(obj.baz, 'Baz')

  eachOwn(obj, function(value, key) {
    ctr++
    result[key] = value;
  })

  t.equal(ctr, 1)
  t.deepEqual(result, { bar: 'Bar' })

  t.end()
})

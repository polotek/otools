var slice = Array.prototype.slice;

var each = function(o, fn) {
  for(var k in o) {
    fn.call(o, o[k], k);
  }
}

var eachOwn = function(o, fn) {
  var keys = Object.keys(o);

  for(var i = 0, k; i < keys.length; i++) {
    k = keys[i];
    fn.call(o, o[k], k);
  }
}

var mixin = function(target, source) {
  var args = arguments.length > 2 ? slice.call(arguments,1) : [source];

  for(var i = 0; i < args.length; i++) {
    source = args[i];
    if(!source) { continue; }

    for(var k in source) {
      target[k] = source[k];
    }
  }

  return target;
}

exports.each = each;
exports.eachOwn = eachOwn;
exports.mixin = mixin;

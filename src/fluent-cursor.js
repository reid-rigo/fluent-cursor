/* @flow */

var Immutable = require('immutable');

function MutableList(immutable, path) {
  this._immutable = immutable;
  this._path = new Immutable.List(path);
  console.log(path);
}
var listAccessors = [];
var listMutators = [];

function MutableMap(immutable: Object, path) {
  this._immutable = immutable;
  this._path = new Immutable.List(path);
  // Object.defineProperties();
}
MutableMap.prototype.get = function get(key) {
  var p = this._path.push(key);
  console.log(this._immutable, p);
  var ret = this._immutable.getIn(p);
  console.log(ret);
  if (isImmutable(ret)) {
    return sub(this._immutable, p);
  } else {
    return ret;
  }
};
// var mapAccessors = ['get', 'getIn'];
// mapAccessors.forEach(function(method) {
//   MutableMap.prototype[method] = function() {
//     var node = this._immutable.getIn(this._path);
//     var ret = node[method].apply(node, arguments);
//     return fromJS(ret);
//   };
// });
var mapMutators = ['set', 'setIn'];
mapMutators.forEach(function(method) {
  MutableMap.prototype[method] = function() {
    var node = this._immutable.getIn(this._path);
    var newNode = node[method].apply(node, arguments);
    this._immutable = this._immutable.setIn(this._path, newNode);
  };
});

function sub(immutable, path) {
  if (Immutable.Map.isMap(immutable)) {
    return new MutableMap(immutable, path);
  } else if (Immutable.List.isList(immutable)) {
    return new MutableList(immutable, path);
  }
}

function isImmutable(thing) {
  return Immutable.Map.isMap(thing) || Immutable.List.isList(thing);
}

function fromJS(thing) {
  var immutable = Immutable.fromJS(thing);
  if (isImmutable(immutable)) {
    return sub(immutable, []);
  } else {
    return thing;
  }
}

var FluentCursor = {};
FluentCursor.fromJS = fromJS;

module.exports = FluentCursor;

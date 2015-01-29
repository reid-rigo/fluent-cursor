/* @flow */

var Immutable = require('immutable');

function ArrayCursor(immutable: Object, path: Array<string>) {
  // this.immutable = Immutable.fromJS(array);
}
ArrayCursor.prototype = {
  concat: function (otherArray: Array<any>) {

  },

  pop: function () {

  },

  push: function (item) {

  },

  shift: function (item) {

  },

  unshift: function () {

  },

  reverse: function () {

  },

  sort: function () {

  },

  splice: function () {

  }
};

function ObjectCursor(immutable: Object, path: Array<string>) {
  var properties = {};
  immutable.forEach(function (v, k) {
    var p = path.slice(0);
    p.push(k);
    console.log(p);
    properties[k] = {
      get: function() {
        var v = immutable.getIn(p, k);
        if (Immutable.Map.isMap(v)) {
          return new ObjectCursor(immutable, p);
        } else if (Immutable.List.isList(v)) {
          return new ArrayCursor(immutable, p);
        } else {
          return v;
        }
      },
      set: function(v) {
        immutable = immutable.setIn(k, v, p);
      },
      enumerable: true
    }
  });

  Object.defineProperties(this, properties);
}

function FluentCursor(structure: Object | Array<any>) {

  var immutable = Immutable.fromJS(structure);

  if (Array.isArray(structure)) {
    ArrayCursor.call(this, immutable, []);
  } else {
    ObjectCursor.call(this, immutable, []);
  }
}

module.exports = FluentCursor;

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

function SubCursor(immutable: Object, path: Array<string>) {

  var properties = {};
  immutable.forEach(function (v, k) {
    properties[k] = {
      get: function () {
        var v = immutable.getIn(path, k);
        if (Immutable.Map.isMap(v)) {
          return new FluentCursor(v);
        } else {
          return v;
        }
      },
      set: function (v) {
        immutable = immutable.setIn(path, k, v);
      },
      enumerable: true
    }
  });

  Object.defineProperties(this, properties);
}

function FluentCursor(structure: Object | Array<any>) {

  var immutable = Immutable.fromJS(structure);
  Object.defineProperty(this, 'immutable', {
    value: immutable
  });

  if (Array.isArray(structure)) {
    ArrayCursor.call(this, immutable, []);
  } else {
    SubCursor.call(this, immutable, []);
  }
}


module.exports = FluentCursor;

"use strict";

/* @flow */

var Immutable = require("immutable");

function ArrayCursor(immutable, path) {}
ArrayCursor.prototype = {
  concat: function (otherArray) {},

  pop: function () {},

  push: function (item) {},

  shift: function (item) {},

  unshift: function () {},

  reverse: function () {},

  sort: function () {},

  splice: function () {}
};

function ObjectCursor(immutable, path) {
  var properties = {};
  immutable.forEach(function (v, k) {
    var p = path.slice(0);
    p.push(k);
    console.log(p);
    properties[k] = {
      get: function () {
        var v = immutable.getIn(p, k);
        if (Immutable.Map.isMap(v)) {
          return new ObjectCursor(immutable, p);
        } else if (Immutable.List.isList(v)) {
          return new ArrayCursor(immutable, p);
        } else {
          return v;
        }
      },
      set: function (v) {
        immutable = immutable.setIn(k, v, p);
      },
      enumerable: true
    };
  });

  Object.defineProperties(this, properties);
}

function FluentCursor(structure) {
  var immutable = Immutable.fromJS(structure);

  if (Array.isArray(structure)) {
    ArrayCursor.call(this, immutable, []);
  } else {
    ObjectCursor.call(this, immutable, []);
  }
}

module.exports = FluentCursor;
// this.immutable = Immutable.fromJS(array);
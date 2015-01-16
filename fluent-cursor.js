var Immutable = require('immutable');

function FluentCursor(structure) {
  var self = this;
  var immutable = Immutable.fromJS(structure);

  immutable.forEach(function (k,v) {

    Object.defineProperty(self, k, {
      get: function () {
        return immutable.get(k);
      },
      set: function (v) {
        immutable = immutable.set(k, v);
      },
      enumerable: true
    });

  });

}


module.exports = FluentCursor;

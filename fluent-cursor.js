var Immutable = require('immutable');


function FluentCursor(structure) {
  var self = this;
  var immutable = Immutable.fromJS(structure);
  var identityMap = {};

  immutable.forEach(function (v,k) {

    Object.defineProperty(self, k, {
      get: function () {
        var v = immutable.get(k);
        if (Immutable.Map.isMap(v)) {
          if (!identityMap[k]) {
            identityMap[k] = new FluentCursor(v)
          }
          return identityMap[k];
        } else {
          return v;
        }
      },
      set: function (v) {
        delete identityMap[k];
        immutable = immutable.set(k, v);
      },
      enumerable: true
    });

  });

}


module.exports = FluentCursor;

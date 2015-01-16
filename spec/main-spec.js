var FluentCursor = require('../fluent-cursor.js');

describe('A cursor from a basic object', function() {
  it('returns value given to it', function() {
    var fc = new FluentCursor({ a: 'a' });
    expect(Object.keys(fc)).toEqual(['a']);
    expect(fc.a).toEqual('a');

    fc.a = 'aa';
    expect(fc.a).toEqual('aa');
  });
});

describe('A cursor containing an array', function () {

});

var FluentCursor = require('../fluent-cursor.js');

describe('A cursor from a basic object', function () {
  it('returns value given to it', function () {
    var fc = new FluentCursor({ a: 1 });
    expect(Object.keys(fc)).toEqual(['a']);
    expect(fc.a).toEqual(1);

    fc.a = 2;
    expect(fc.a).toEqual(2);

    fc.a = 3;
    expect(fc.a).toEqual(3);

  });
});

describe('A cursor from a deep object', function () {
  it('should return a wrapped object', function () {
    var fc = new FluentCursor({ a: { b: 'c' }});
    expect(Object.keys(fc.a)).toEqual(['b']);
    expect(fc.a.b).toEqual('c');

    fc.a.b = 7;
    expect(fc.a.b).toEqual(7);

    fc.a = { d: 'e' };
    expect(fc.a.b).toBeUndefined();
    expect(Object.keys(fc.a)).toEqual(['d']);
    expect(fc.a.d).toEqual('e');
  });
});

describe('A cursor containing an array', function () {

  xit('should have underlying immutable available', function () {
    var fc = new FluentCursor([1, 2, 3]);
    expect(fc.immutable).toBeDefined();
    expect(fc.immutable.toJS()).toEqual([1, 2, 3]);
  });

});

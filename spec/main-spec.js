var FluentCursor = require('../fluent-cursor.js');

describe('A cursor from a basic object', function () {
  it('gets', function () {
    var fc = FluentCursor.fromJS({ a: 1 });
    expect(fc.get('a')).toEqual(1);
    expect(fc.get('b')).toBeUndefined();
  });
  it('sets', function () {
    var fc = FluentCursor.fromJS({ a: 1 });
    expect(fc.get('a')).toEqual(1);
    fc.set('a', 2);
    expect(fc.get('a')).toEqual(2);
  });
});

describe('A cursor from a deep object', function () {
  it('gets', function () {
    var fc = FluentCursor.fromJS({ a: { b: 'c' }});
    expect(fc.get('a')).toEqual(FluentCursor.fromJS({ b: 'c' }));
    expect(fc.get('a').get('b')).toEqual('c');
  });
  xit('sets', function () {
    var fc = FluentCursor.fromJS({ a: { b: 'c' }});
    expect(fc.get('a').get('b')).toEqual('c');
    fc.get('a').set('b', 9);
    expect(fc.get('a').get('b')).toEqual(9);
    // fc.a.b = 7;
    // expect(fc.a.b).toEqual(7);
    //
    // fc.a = { d: 'e' };
    // expect(fc.a.b).toBeUndefined();
    // expect(Object.keys(fc.a)).toEqual(['d']);
    // expect(fc.a.d).toEqual('e');

  });
});

describe('A cursor containing an array', function () {

  xit('should have underlying immutable available', function () {
    var fc = new FluentCursor([1, 2, 3]);
    expect(fc.immutable).toBeDefined();
    expect(fc.immutable.toJS()).toEqual([1, 2, 3]);
  });

});

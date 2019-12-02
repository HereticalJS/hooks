import compose from '../compose';

describe('`compose`', () => {
  it('should compose two functions', () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    expect(compose(mul2, add1)(1)).toBe(mul2(add1(1)));
  });
});

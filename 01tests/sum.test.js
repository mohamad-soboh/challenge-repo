const sum = require('./sum');


describe('example test',()=>{
  test('should adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  })
  test('should adds 1 + 3 to equal 4', () => {
    expect(sum(1, 3)).toBe(4);
  })
})


describe('true or false',()=>{
  it('null',()=>{
    const n = null;
    expect(n).toBeFalsy();
    expect(n).not.toBeTruthy();
    expect(n).toBeNull();
  })
  it('undefined',()=>{
    const n = undefined;
    expect(n).toBeUndefined;

  })
})
  describe('Numbers',()=>{
    it('two plus tow',()=>{
      const value = 2 + 2;
      expect(value).toBe(4)
      expect(value).toBeGreaterThan(3)
  
    })
})

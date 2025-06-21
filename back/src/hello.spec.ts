jest.config.js
{
  "testEnvironment": "node",
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  "moduleFileExtensions": ["js", "jsx", "ts", "tsx", "json", "node"]
}

src/hello.spec.ts
describe('Hello World', () => {
  it('should return hello world', () => {
    expect('hello world').toBe('hello world');
  });
});
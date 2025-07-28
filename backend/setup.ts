// Archivo de setup para Jest

beforeEach(() => {
  process.env.NODE_ENV = 'test';
  jest.setTimeout(10000);
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

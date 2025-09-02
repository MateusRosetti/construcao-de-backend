const {calcularMediaAluno} = require('../src/calcularMediaAluno');

const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('deve lançar erro quando a1 ou a2 estiverem indefinidos', () => {
  expect(() => calcularMediaAluno(undefined, 7, 8)).toThrow();
  expect(() => calcularMediaAluno(6, undefined, 8)).toThrow();
});

test('deve lançar erro quando a1 ou a2 forem negativas', () => {
  expect(() => calcularMediaAluno(-1, 7, 8)).toThrow('Notas a1 ou a2 não podem ser negativas');
  expect(() => calcularMediaAluno(5, -2, 8)).toThrow('Notas a1 ou a2 não podem ser negativas');
});

test('deve calcular média base quando a3 não é informada', () => {
  expect(calcularMediaAluno(5, 7)).toBeCloseTo(5 * 0.4 + 7 * 0.6);
});

test('deve lançar erro quando a3 for negativa', () => {
  expect(() => calcularMediaAluno(6, 7, -3)).toThrow('Nota a3 não pode ser negativa');
});

test('deve calcular média correta quando melhor combinação é a1 e a3', () => {
  const a1 = 9, a2 = 3, a3 = 10;
  const esperado = a1 * 0.4 + a3 * 0.6;
  expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo(esperado);
});

test('deve calcular média correta quando melhor combinação é a2 e a3', () => {
  const a1 = 2, a2 = 9, a3 = 10;
  const esperado = a2 * 0.6 + a3 * 0.4;
  expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo(esperado);
});

  
  module.exports = {calcularMediaAluno};

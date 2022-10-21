/**
 * Calcula Modulo de um numero
 *
 * @param dividendo - int
 * @param divisor - int
 *
 * @return int
 */
const getModule = (dividendo, divisor) => {
  return Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);
};

const getRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Gera numeros Randomicos
 *
 * @param total - integer quantidade de numeros
 *
 * @return array
 */
const getRandomNumbers = total => {
  const numbers = [] as number[];
  for (let i = 0; i < total; i++) {
    numbers[i] = getRandomNumberBetween(1, 9);
  }
  return numbers;
};

/**
 * Dado Um Array de numeros, determina o Digito Verificador para CPF
 *
 * @param numbers - array numeros
 *
 * @return int
 */
const getVerifyingDigitCPF = (numbers: number[] = []) => {
  let digit = 0;
  const arraySize = numbers.length + 1;

  numbers.map((number, index) => {
    digit += number * (arraySize - index);
    return number;
  });

  digit = 11 - getModule(digit, 11);
  return digit >= 10 ? 0 : digit;
};

/**
 * Gera um numero de CPF Fake
 *
 * @return String - 11 digitos numericos https://github.com/osians/exemplosDiversos/blob/master/geradorCpfFake.php
 */
export const fakeCPFGenerator = () => {
  const numbers = getRandomNumbers(9);
  numbers.push(getVerifyingDigitCPF(numbers));
  numbers.push(getVerifyingDigitCPF(numbers));

  return numbers.join('');
};

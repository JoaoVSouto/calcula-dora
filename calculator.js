(() => {
  const INITIAL_CALCULATOR_DATA = {
    operation: '',
    currentValue: 0,
    accumulatedValue: null,
    isOperating: false,
    isEqualSpecialCase: false,
    withDot: false,
    afterDot: '',
  };

  const calculatorData = { ...INITIAL_CALCULATOR_DATA };

  const display = document.getElementById('display');
  const operations = {
    sum: document.getElementById('sum'),
    minus: document.getElementById('minus'),
    times: document.getElementById('times'),
    divide: document.getElementById('divide'),
  };
  const numbers = {
    zero: document.getElementById('zero'),
    one: document.getElementById('one'),
    two: document.getElementById('two'),
    three: document.getElementById('three'),
    four: document.getElementById('four'),
    five: document.getElementById('five'),
    six: document.getElementById('six'),
    seven: document.getElementById('seven'),
    eight: document.getElementById('eight'),
    nine: document.getElementById('nine'),
  };
  const dot = document.getElementById('dot');
  const reset = document.getElementById('reset');
  const equal = document.getElementById('equal');

  const resetCalculatorData = () => {
    calculatorData.operation = INITIAL_CALCULATOR_DATA.operation;
    calculatorData.currentValue = INITIAL_CALCULATOR_DATA.currentValue;
    calculatorData.accumulatedValue = INITIAL_CALCULATOR_DATA.accumulatedValue;
    calculatorData.isOperating = INITIAL_CALCULATOR_DATA.isOperating;
    calculatorData.isEqualSpecialCase =
      INITIAL_CALCULATOR_DATA.isEqualSpecialCase;
    calculatorData.withDot = INITIAL_CALCULATOR_DATA.withDot;
    calculatorData.afterDot = INITIAL_CALCULATOR_DATA.afterDot;
  };

  const updateDisplay = () => {
    calculatorData.isOperating = false;
    const displayContent = `${parseInt(calculatorData.currentValue)}${
      calculatorData.withDot ? `.${calculatorData.afterDot}` : ''
    }`;
    display.textContent = displayContent;

    if (displayContent === 'NaN') {
      resetCalculatorData();
      display.textContent = 'Erro';
    }
  };

  const executeCalculation = () => {
    switch (calculatorData.operation) {
      case '+':
        calculatorData.accumulatedValue += calculatorData.currentValue;
        calculatorData.currentValue = calculatorData.accumulatedValue;
        calculatorData.accumulatedValue = null;
        break;

      case '-':
        calculatorData.accumulatedValue -= calculatorData.currentValue;
        calculatorData.currentValue = calculatorData.accumulatedValue;
        calculatorData.accumulatedValue = null;
        break;

      case '*':
        calculatorData.accumulatedValue *= calculatorData.currentValue;
        calculatorData.currentValue = calculatorData.accumulatedValue;
        calculatorData.accumulatedValue = null;
        break;

      case '/':
        calculatorData.accumulatedValue /= calculatorData.currentValue;
        calculatorData.currentValue = calculatorData.accumulatedValue;
        calculatorData.accumulatedValue = null;
        break;

      default:
        break;
    }
  };

  const resetCalculatorDotLogic = () => {
    calculatorData.withDot = INITIAL_CALCULATOR_DATA.withDot;
    calculatorData.afterDot = INITIAL_CALCULATOR_DATA.afterDot;
  };

  updateDisplay();

  numbers.zero.addEventListener('click', () => {
    if (calculatorData.isEqualSpecialCase) {
      calculatorData.isEqualSpecialCase = false;
      calculatorData.accumulatedValue = null;
    }

    if (calculatorData.isOperating) {
      calculatorData.currentValue = 0;
    } else if (calculatorData.currentValue !== 0) {
      if (
        calculatorData.withDot &&
        !String(calculatorData.currentValue).includes('.')
      ) {
        calculatorData.currentValue = Number(
          String(calculatorData.currentValue) + '.' + 0
        );
      } else {
        calculatorData.currentValue = Number(
          String(calculatorData.currentValue) + 0
        );
      }
    }

    if (calculatorData.withDot) {
      calculatorData.afterDot += '0';
    }

    updateDisplay();
  });

  Object.keys(numbers)
    .filter(number => number !== 'zero')
    .forEach(number => {
      const numberElement = numbers[number];
      const numberValue = Number(numberElement.textContent);

      numberElement.addEventListener('click', () => {
        if (calculatorData.isEqualSpecialCase) {
          calculatorData.isEqualSpecialCase = false;
          resetCalculatorData();
        }

        if (
          (calculatorData.currentValue === 0 && !calculatorData.withDot) ||
          calculatorData.isOperating
        ) {
          calculatorData.currentValue = numberValue;
        } else {
          if (
            calculatorData.withDot &&
            !String(calculatorData.currentValue).includes('.') &&
            calculatorData.afterDot.length === 0
          ) {
            calculatorData.currentValue = Number(
              String(calculatorData.currentValue) + '.' + numberValue
            );
          } else if (calculatorData.withDot) {
            calculatorData.currentValue = Number(
              String(parseInt(calculatorData.currentValue)) +
                '.' +
                calculatorData.afterDot +
                numberValue
            );
          } else {
            calculatorData.currentValue = Number(
              String(calculatorData.currentValue) + numberValue
            );
          }
        }

        if (calculatorData.withDot) {
          calculatorData.afterDot += String(numberValue);
        }

        updateDisplay();
      });
    });

  operations.sum.addEventListener('click', () => {
    resetCalculatorDotLogic();

    const sumOperationChar = '+';

    if (calculatorData.isEqualSpecialCase) {
      calculatorData.isEqualSpecialCase = false;
    }

    if (calculatorData.isOperating) {
      calculatorData.operation = sumOperationChar;
      return;
    }

    if (
      (calculatorData.accumulatedValue ||
        calculatorData.accumulatedValue === 0) &&
      (calculatorData.currentValue || calculatorData.currentValue === 0)
    ) {
      executeCalculation();
      updateDisplay();
    }

    calculatorData.operation = sumOperationChar;
    calculatorData.accumulatedValue = calculatorData.currentValue;
    calculatorData.isOperating = true;
  });

  operations.minus.addEventListener('click', () => {
    resetCalculatorDotLogic();

    const subtractionOperationChar = '-';

    if (calculatorData.isEqualSpecialCase) {
      calculatorData.isEqualSpecialCase = false;
    }

    if (calculatorData.isOperating) {
      calculatorData.operation = subtractionOperationChar;
      return;
    }

    if (
      (calculatorData.accumulatedValue ||
        calculatorData.accumulatedValue === 0) &&
      (calculatorData.currentValue || calculatorData.currentValue === 0)
    ) {
      executeCalculation();
      updateDisplay();
    }

    calculatorData.operation = subtractionOperationChar;
    calculatorData.accumulatedValue = calculatorData.currentValue;
    calculatorData.isOperating = true;
  });

  operations.times.addEventListener('click', () => {
    resetCalculatorDotLogic();

    const multiplicationOperationChar = '*';

    if (calculatorData.isEqualSpecialCase) {
      calculatorData.isEqualSpecialCase = false;
    }

    if (calculatorData.isOperating) {
      calculatorData.operation = multiplicationOperationChar;
      return;
    }

    if (
      (calculatorData.accumulatedValue ||
        calculatorData.accumulatedValue === 0) &&
      (calculatorData.currentValue || calculatorData.currentValue === 0)
    ) {
      executeCalculation();
      updateDisplay();
    }

    calculatorData.operation = multiplicationOperationChar;
    calculatorData.accumulatedValue = calculatorData.currentValue;
    calculatorData.isOperating = true;
  });

  operations.divide.addEventListener('click', () => {
    resetCalculatorDotLogic();

    const divisionOperationChar = '/';

    if (calculatorData.isEqualSpecialCase) {
      calculatorData.isEqualSpecialCase = false;
    }

    if (calculatorData.isOperating) {
      calculatorData.operation = divisionOperationChar;
      return;
    }

    if (
      (calculatorData.accumulatedValue ||
        calculatorData.accumulatedValue === 0) &&
      (calculatorData.currentValue || calculatorData.currentValue === 0)
    ) {
      executeCalculation();
      updateDisplay();
    }

    calculatorData.operation = divisionOperationChar;
    calculatorData.accumulatedValue = calculatorData.currentValue;
    calculatorData.isOperating = true;
  });

  equal.addEventListener('click', () => {
    const originalValue = calculatorData.currentValue;
    executeCalculation();

    resetCalculatorDotLogic();
    if (String(calculatorData.currentValue).includes('.')) {
      const [, afterDot] = String(calculatorData.currentValue).split('.');
      calculatorData.withDot = true;
      calculatorData.afterDot = afterDot;
    }

    updateDisplay();

    calculatorData.accumulatedValue = calculatorData.currentValue;
    calculatorData.currentValue = originalValue;

    if (calculatorData.isOperating) {
      return;
    }

    calculatorData.isOperating = true;
    calculatorData.isEqualSpecialCase = true;
  });

  dot.addEventListener('click', () => {
    if (calculatorData.isEqualSpecialCase) {
      resetCalculatorData();
    }

    if (calculatorData.currentValue === 0 || calculatorData.isOperating) {
      calculatorData.currentValue = 0;
    }

    calculatorData.withDot = true;
    updateDisplay();
  });

  reset.addEventListener('click', () => {
    resetCalculatorData();
    updateDisplay();
  });
})();

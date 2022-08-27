let prevNumber = '', calculationOperator = '', currentNumber = '';

// 1. CALCULATOR SCREEN
const calculatorScreen = document.querySelector(".calc__screen");
const updateScreen = (number) => {
    return calculatorScreen.value = number;
}

// 2. NUMBERS
const numbers = document.querySelectorAll(".number");
numbers.forEach( number => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    })
})
const inputNumber = (number) => {
    return (currentNumber === '0') ? currentNumber = number : currentNumber += number;
}

// 3. OPERATORS
const operators = document.querySelectorAll(".operand");
operators.forEach((operand) => {
    operand.addEventListener("click", (event) => {
        inputOperator(event.target.value);
    })
})
const inputOperator = (operand) => {
    if (currentNumber === '') {
        return;
    }else {
        prevNumber = currentNumber;
        calculationOperator = operand;
        currentNumber = '';
    }
}

// 4. EQUAL SIGN
const equalSign = document.querySelector(".equal__sign");
equalSign.addEventListener("click", () => {
    updateScreen(calculate());
    clear();
})
const calculate = () => {
    let result = 0;
    switch (calculationOperator) {
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            break;
        case "-":
            result = parseFloat(prevNumber) - parseFloat(currentNumber);
            break;
        case "X":
            result = parseFloat(prevNumber) * parseFloat(currentNumber);
            break;
        case "/":
            result = parseFloat(prevNumber) / parseFloat(currentNumber);
            break;
        default:
            result = ''; 
            break;
    }
    return result.toString();
}


// 5. CLEAR ALL
const allClear = document.querySelector(".all__clear");
allClear.addEventListener("click", () => {
    clear()
    updateScreen(currentNumber);
})
const clear = () => {
    prevNumber = '', calculationOperator = '', currentNumber = '';
}

// 6. DECIMAL
const dcml = document.querySelector(".decimal");
dcml.addEventListener("click", (event) => {
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
})
const inputDecimal = (dot) => {
    if (currentNumber === ''){
        return;
    } else {
        let dotTemp = currentNumber.split('');
        if (!dotTemp.includes(dot)) {
            dotTemp.push(dot);
            return currentNumber = dotTemp.join('');
        }else{
            const indexDecimal = [];
            dotTemp.forEach((value, index) => {
                if(value == '.'){
                    return indexDecimal.push(index);
                }
            });
            dotTemp.splice(indexDecimal[0], 1);
            return currentNumber = dotTemp.join('');
        }
    }
}

// 7. PLUS MINUS
const plusMinus = document.querySelector(".plus__minus__sign");
plusMinus.addEventListener("click", () => {
    updateScreen(toPlusOrMinus());
})
const toPlusOrMinus = () => {
    if (currentNumber === '') {
        return currentNumber;
    } else {
        let currentNumberArr = currentNumber.split('');
        (currentNumberArr.includes('-')) ? currentNumberArr.shift('-') : currentNumberArr.unshift('-');
        return currentNumber = currentNumberArr.join('');
    }
}

// 8. PERCENT
const percent = document.querySelector(".percent__sign");
percent.addEventListener("click", (event) => {
    toUpdateDisplayPercent(event.target.value);
    updateScreen(toPercent());
})

const toUpdateDisplayPercent = (evenTargetValue) => {
    if (currentNumber === '') {
        return;
    } else {
        let currentNumberArr = currentNumber.split('');
        (currentNumberArr.includes('%')) ? currentNumberArr.pop() : currentNumberArr.push(evenTargetValue); 
        return currentNumber = currentNumberArr.join('');
    }
}
const toPercent = () => {
    let cn = currentNumber.split('');
    if (prevNumber === '') {
        cn = (cn.includes('%')) ? parseFloat(currentNumber) / 100 : cn.join();
    } else {
        cn = (cn.includes('%')) ? parseFloat(currentNumber) / 100 * prevNumber : cn.join();
    }

    return currentNumber = cn.toString();
}

// 9. NOL
const nol = document.querySelector('.nol');

nol.addEventListener('click', (event) => {
    _filterNol(event.target.value);
    updateScreen(currentNumber);
});

const numbAndComa = [];
numbers.forEach(element => {
    return numbAndComa.push(element.value)
});
numbAndComa.push(dcml.value);
let flag = '';

const _filterNol = (eventTargetValue) => {
    let arr = currentNumber.split('');
    if ( arr.length == 0 ){
        return currentNumber += eventTargetValue;
    } else {
        loop1 :
        for (const a of arr) {
            for (const b of numbAndComa){
                if(a.includes(b) == true){
                    flag = 'true';
                    break loop1;
                };
            };
        };
        if(flag == 'true'){
            return currentNumber += eventTargetValue;
        } else{
            flag = '';
            return;
        };
    }
};

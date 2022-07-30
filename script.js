/**
 * Menampilkan ke output
 */
const output = document.querySelector('#output');
let numberToShow = '';
let currNumber = '';
let prevNumber = '';
let myOperand = '';

const show = () => {
    currNumber = numberToShow;
    output.value = formatAngka(numberToShow);
};

const justShow = (params) => {
    params = params.toString();
    output.value = formatAngka(params);
    currNumber = numberToShow;
};

/**
 * Mengambil nilai number
 */
const numbers = document.querySelectorAll('.number');

numbers.forEach((e) => {
    e.addEventListener('click', function () {
        numberToShow += this.value;
        show();
    });
});

/**
 * Menghapus Semua angka dilayar
 */
const clears = document.querySelector('#clears');

clears.addEventListener('click', () => {
    numberToShow = '';
    prevNumber = '';
    currNumber = '';
    show(numberToShow);
});

/**
 * Operator
 */
const operand = document.querySelectorAll('.operand');

operand.forEach((e) => {
    e.addEventListener('click', function () {
        prevNumber = currNumber;
        numberToShow = '';
        myOperand = this.value;
    });
});

const equalsTo = () => {
    let result = 0;
    switch (myOperand) {
        case '+':
            result = parseFloat(prevNumber) + parseFloat(currNumber);
            break;
        case '-':
            result = parseFloat(prevNumber) - parseFloat(currNumber);
            break;
        case 'X':
            result = parseFloat(prevNumber) * parseFloat(currNumber);
            break;
        case '/':
            result = parseFloat(prevNumber) / parseFloat(currNumber);
            break;
        default:
            result = 'Error!';
            break;
    }
    return result;
};
/**
 * Equals
 */
const equals = document.querySelector('#equals');

equals.addEventListener('click', () => {
    numberToShow = '';
    justShow(equalsTo());
});

/**
 * Fungsi Format Rupiah
 */
function formatAngka(angka) {
    let number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? ',' : '';
        rupiah += separator + ribuan.join(',');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah;
}
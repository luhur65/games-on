import DOMInit from "../core/dom-init.js";
import CookiesPlayer from "../core/cookies.js";

const nums_random = (max, min) => {

    const Num1 = Math.ceil(Math.random() * max - min);
    const Num2 = Math.ceil(Math.random() * max - min);

    return {
        num1: Num1,
        num2: Num2
    };

}

const getResultBySymbol = (symbol, nums = {}) => {

    let result;
    switch (symbol) {
        case '+':
            result = nums.num1 + nums.num2;
            break;
        case '-':
            result = nums.num1 - nums.num2;
            break;
        case 'x':
            result = nums.num1 * nums.num2;
            break;
        case '/':
            result = Math.ceil(nums.num1 / nums.num2);
            break;
    };

    return result;
};

const getAttributesMode = (nums = {}) => {

    const symbolOP = ['+', '-', 'x', '/'];
    const randSymbol = Math.floor(Math.random() * 4);

    const avaliableSym = symbolOP[randSymbol];
    const result = getResultBySymbol(avaliableSym, nums);

    return {
        result: result,
        symbol: avaliableSym
    };

};

const showAndAnswer = (attr = {
    mode: undefined,
    Nums: {},
    Answer: {},
}) => {

    $('.tulisanSoal').fadeIn().html(`
        <span class="mr-2">${attr.Nums.num1}</span>
        <span class="mr-2">${attr.Answer.symbol}</span>
        <span> ${attr.Nums.num2} </span>
    `);

    $('.cek-jawaban').removeClass('btn-success');
    $('.cek-jawaban').addClass('btn-primary');

    $('#jawaban-user').on('keyup', function () {
        $('.cek-jawaban').removeClass('btn-primary');
        $('.cek-jawaban').addClass('btn-success');

    });

    $('.cek-jawaban').on('click', function () {

        const userAnswer = $('#jawaban-user').val();
        if (userAnswer != "") {
            if (parseInt(userAnswer) === attr.Answer.result) {
                Swal.fire({
                    icon: 'success',
                    title: 'Benar',
                    showConfirmButton: false,
                    timer: '1500'
                }).then(() => {

                    $('#jawaban-user').val('');
                    // progress(skor, mode);

                    // ... mainkan lagi berdasarkan mode game nya
                    playModeGame(attr.mode);

                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Salah!!',
                    showConfirmButton: false,
                    timer: 1300
                });
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Kosong !!',
                text: 'Anda Belum Mengisi Jawaban!',
                showConfirmButton: false,
                timer: 1200
            });
        }

    });

}

const setModeLvl = (mode, arg = {
    max: undefined,
    min: undefined
}) => {

    const MAX_NUM = arg.max;
    const MIN_NUM = arg.min;
    const Nums = nums_random(MAX_NUM, MIN_NUM);
    const Answer = getAttributesMode(Nums);

    showAndAnswer({
        mode: mode,
        Nums: Nums,
        Answer: Answer
    });

    console.log(Answer);

};

const changeUI = _ => {
    $('.kategori').addClass('d-none');
    $('.kerjakanSoal').removeClass('d-none');
    $('.changeQuiz').removeClass('d-none');

}

const playModeGame = mode => {
    changeUI();
    switch (mode) {
        case 'easy':
            setModeLvl(mode, {
                max: 10,
                min: 5
            });
            break;
        case 'normal':
            setModeLvl(mode, {
                max: 20,
                min: 10
            });
            break;
        case 'hard':
            setModeLvl(mode, {
                max: 30,
                min: 15
            });
            break;

        default:
            break;
    };

};

const quitSwal = _ => Swal.fire({
    icon: 'success',
    title: 'Thanks For Playing',
    showConfirmButton: false,
    timer: 800
}).then(_ => {
    document.location.href = './';

});

const QuizGame = _ => {
    // jika sudah ada cookiesnya
    const mode = Cookies.get('mode-quiz');
    const GAME = 'kuis-matematika';
    (mode != undefined) ? playModeGame(mode) : CookiesPlayer(GAME);

    const user = Cookies.get('player');
    if (user != undefined) {
        $('.user-info').html(`
            <span class="badge badge-light lead text-dark">
                <i class="far fa-user-circle" aria-hidden="true"></i> 
                ${user}
            </span>
        `);
    }

    const buttonKategories = DOMInit('button-kategori');
    buttonKategories.forEach(function (buttonKategori) {
        buttonKategori.addEventListener('click', function () {
            const mode = this.dataset.mode;
            Cookies.set('mode-quiz', mode);
            playModeGame(mode);
        });
    });

    $('.changeQuiz').on('click', function () {
        Swal.fire({
            icon: 'question',
            title: 'Ganti Mode ??',
            text: 'Progress Anda Di Mode Ini Akan Hilang!',
            showCancelButton: true
        }).then(result => {
            if (result.value) {
                Cookies.remove('mode-quiz');
                $('.kategori').removeClass('d-none');
                $('.kerjakanSoal').addClass('d-none');
                $('.changeQuiz').addClass('d-none');
            }
        });

    });

    $('.quit').on('click', function () {
        Swal.fire({
            icon: 'question',
            title: 'Keluar Game ??',
            text: 'Progress Anda Di Mode Ini Akan Hilang!',
            showCancelButton: true
        }).then(result => {
            if (result.value) {

                const cookiesMode = Cookies.get('mode-quiz');
                if (cookiesMode == undefined) {
                    quitSwal();

                } else {

                    Cookies.remove('mode-quiz');
                    quitSwal();

                }

            }
        });

    });

};

export default QuizGame;
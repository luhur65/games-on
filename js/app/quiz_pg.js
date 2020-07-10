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

const showAndAnswer = (Nums = {}, Answer = {}, mode) => {

    $('.tulisanSoal').fadeIn().html(`
        <span class="mr-2">${Nums.num1}</span>
        <span class="mr-2">${Answer.symbol}</span>
        <span> ${Nums.num2} </span>
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
            if (parseInt(userAnswer) === Answer.result) {
                Swal.fire({
                    icon: 'success',
                    title: 'Benar',
                    showConfirmButton: false,
                    timer: '1500'
                }).then(() => {

                    $('#jawaban-user').val('');
                    // progress(skor, mode);

                    // ... mainkan lagi berdasarkan mode game nya
                    playModeGame(mode);

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

const easyLvL = _ => {
    const MAX_NUM = 10;
    const MIN_NUM = 5;
    const Nums = nums_random(MAX_NUM, MIN_NUM);
    const Answer = getAttributesMode(Nums);

    showAndAnswer(Nums, Answer, 'easy');

    console.log(Answer);

};

const normalLvL = _ => {
    const MAX_NUM = 20;
    const MIN_NUM = 10;
    const Nums = nums_random(MAX_NUM, MIN_NUM);
    const Answer = getAttributesMode(Nums);

    showAndAnswer(Nums, Answer, 'normal');

    console.log(Answer);

};

const hardLvL = _ => {
    const MAX_NUM = 30;
    const MIN_NUM = 15;
    const Nums = nums_random(MAX_NUM, MIN_NUM);
    const Answer = getAttributesMode(Nums);

    showAndAnswer(Nums, Answer, 'hard');

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
            easyLvL();
            break;
        case 'normal':
            normalLvL();
            break;
        case 'hard':
            hardLvL();
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
    document.location.href = './index.html';

});

const QuizGame = _ => {
    // jika sudah ada cookiesnya
    const mode = Cookies.get('mode-quiz');
    if (mode != undefined) playModeGame(mode);

    const GAME = 'kuis-matematika';
    CookiesPlayer(GAME);

    const user = Cookies.get('player');
    $('.user-info').html(`
        <span class="badge badge-light lead text-dark">
            <i class="far fa-user-circle" aria-hidden="true"></i> 
            ${user}
        </span>`);

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
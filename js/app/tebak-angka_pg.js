import CookiesPlayer from "../core/cookies.js";

let life = 3;

const getRandomNum = _ => Math.ceil(Math.random() * 10);

const makeALlButton = _ => {
    const place = document.querySelector('.button-angka');
    place.innerHTML = ``;

    for (let index = 1; index < 11; index++) {

        place.innerHTML += `
            <button type="button" class="btn btn-primary btn-lg mt-2 mb-1 tebakan" data-angka="${index}">${index}</button>
        `;
    }
}

const tanyaMainLagi = _ => {
    Swal.fire({
        icon: 'question',
        title: 'Main Lagi ??',
        showCancelButton: true,
        confirmButtonText: 'Main Lagi',
        cancelButtonText: 'Keluar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.value) {
            $('.tebakan').show();
            TebakAngka();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Thanks For Playing!',
                showConfirmButton: false,
                timer: '1200'
            }).then(() => {
                document.location.href = 'index.html';
            });
        }
    });
}

const clueAnswer = (params) => {

    Swal.fire({
        icon: 'info',
        title: 'Ayo Coba Lagi!',
        text: `Angka Yg Anda Pilih Terlalu ${params}!`,
        showConfirmButton: false,
        timer: '1200'
    });

}

const checkNum = (nums = {}) => {
    // jika tebakan benar 
    if (nums.angkaUser === nums.angkaComp) {
        Swal.fire({
            icon: 'success',
            title: 'Good Job!',
            text: 'Tebakan Anda Benar!!!'
        }).then(() => {
            tanyaMainLagi();
        });
    } else if (nums.angkaUser != nums.angkaComp) {
        Swal.fire({
            icon: 'error',
            title: 'Salah !',
            text: 'Tebakan Anda Salah!',
            showConfirmButton: false,
            timer: '1200'
        }).then(() => {
            // memberikan clue
            (nums.angkaUser < nums.angkaComp) ? clueAnswer('Kecil') : clueAnswer('Besar')

            life -= 1;

            $('span.life').html(life);

            if (life === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Game Over',
                    text: 'Kesempatan Anda Habis!!'
                }).then(() => {
                    tanyaMainLagi();
                });
            }

        });
    }
}
const playGame = function () {

    life = 3;

    const numRandom = getRandomNum();

    console.log(numRandom);

    $('span.life').html(life);

    makeALlButton();

    $('.tebakan').on('click', function () {
        const angka = $(this).data('angka');

        const options = {
            angkaUser : angka,
            angkaComp : numRandom
        }

        checkNum(options);

        $(this).hide();

    });
}
const TebakAngka = _ => {

    const game = 'tebak-angka';
    CookiesPlayer(game);

    playGame();

    $('.quit').on('click', function (e) {
        e.preventDefault();
        Swal.fire({
            icon: 'question',
            title: 'Keluar Game??',
            showCancelButton: true,
            confirmButtonText: 'Keluar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thanks For Playing!',
                    showConfirmButton: false,
                    timer: '1200'
                }).then((_result) => {
                    document.location.href = 'index.html';
                });
            }
        });
    });
}
export default TebakAngka;
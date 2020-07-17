import CookiesPlayer from "../core/cookies.js";

const randBoxes = arrayLenght => Math.ceil(Math.random() * arrayLenght);

const renderBox = _ => {

    const buttonDOM = document.querySelector('.kotak-view');
    buttonDOM.innerHTML = ``;

    for (let index = 1; index < 8; index++) {
        buttonDOM.innerHTML += `
            <button type="button" class="btn btn-primary btn-lg tombolPilihkotak mt-2 mb-2" data-kotak="${index}">
                ${index}
            </button>
        `;
    }
}

const mainLagi = _ => {

    // game di reset kembali
    Swal.fire({
        icon: 'question',
        title: 'Main Lagi ??',
        text: 'Tadi Itu Permainan yg Seru , Main Lagi ??',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.value) {

            TebakKotakGame();
            $('.progress-bar').attr('style', 'width: 0%;');
            $('.progress-bar').attr('aria-valuenow', 0);
            $('.text-bar').html('0%');

        } else {

            Swal.fire({
                icon: 'success',
                title: 'Thanks For Playing!',
                showConfirmButton: false,
                timer: '1500'
            }).then(() => {
                document.location.href = '';
            });
        }
    });

}

const showAlertify = (
    options = {
        icon: '',
        title: '',
        text: ''
    }) => {

    Swal.fire({
        icon: options.icon,
        title: options.title,
        text: options.text,
        showConfirmButton: false,
        timer: '1800'
    }).then(() => {

        mainLagi();

    });

}

const isSameNum = (length, firstNum) => {

    const secondNum = randBoxes(length);
    return (secondNum === firstNum) ? randBoxes(length) : secondNum;

}

const playGame = function () {

    // ... rendering all box
    renderBox();

    const countAllBox = Array.from(document.querySelectorAll('.tombolPilihkotak')).length;
    const brokenBox1 = randBoxes(countAllBox);
    const brokenBox2 = isSameNum(countAllBox, brokenBox1);
    let kotakBagus = [];
    let progress = 0;

    console.log(brokenBox1, brokenBox2);

    document.querySelectorAll('.tombolPilihkotak').forEach(function (box) {

        box.addEventListener('click', function () {

            const numBox = parseInt(box.dataset.kotak);

            if (numBox === brokenBox1 || numBox === brokenBox2) {
                showAlertify({
                    icon: 'error',
                    title: 'Game Over ...',
                    text: 'Kamu Salah Memilih Kotak!!'
                });

            } else {

                this.hidden = true;
                kotakBagus.push(parseInt(this.dataset.kotak));
                progress += 20;

                $('.progress-bar').attr('style', `width: ${progress}%`);
                $('.progress-bar').attr('aria-valuenow', progress);
                $('.text-bar').html(`${progress}%`);

            }

            if (kotakBagus.length === 5) setTimeout(() => {

                showAlertify({
                    icon: 'success',
                    title: 'Congratulations',
                    text: 'Kamu Memenangkan Permainan ini!!'
                });

            }, 800);

        });

    });

}

const TebakKotakGame = () => {

    const game = 'tebak-kotak';
    CookiesPlayer(game);

    // ... initialization
    playGame();

    // Quit Game 
    $('.quit').on('click', function () {
        Swal.fire({
            icon: 'question',
            title: 'Keluar ??',
            showCancelButton: true,
            confirmButtonText: 'Keluar',
            cancelButtonText: 'Tidak',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thanks For Playing!',
                    showConfirmButton: false,
                    timer: '1500'
                }).then(() => {
                    document.location.href = '';
                });
            }
        });
    });

}

export default TebakKotakGame;
const Random = _ => Math.floor(Math.random() * 3);

const Comp = suit => suit[Random()];

const showImg = who => {

    const img = document.createElement('img');
    img.src = `./img/game1/${who}.png`;
    img.style.width = '5rem';
    img.style.height = '5rem';
    img.style.margin = 'auto';

    return img;

}

const checkSuit = player => {

    const SUIT = ['batu', 'gunting', 'kertas'];
    const comp = Comp(SUIT);
    
    if (comp === player) {
        
        Swal.fire({
            icon: 'warning',
            title: 'Kalian Seri!!',
            text: 'Hebat , Kalian Memilih Suit yang Sama'
        });

    } else {

        if (comp === SUIT[0] && player === SUIT[1] || comp === SUIT[1] && player === SUIT[2] ||comp === SUIT[2] && player === SUIT[0]) {

            Swal.fire({
                icon: 'error',
                title: 'Anda Kalah',
                text: 'Anda Dikalahkan Oleh Comp!'
            });

        } else {

            Swal.fire({
                icon: 'success',
                title: 'Anda Menang',
                text: 'Anda Berhasil Mengalahkan Comp'
            });
        }
    }

    const compDOM = document.querySelector('.comp-suit');
    const dataSuit = Array.from(document.querySelectorAll('.suitplayer'));
    dataSuit.filter(suit => {
        if (!suit.dataset.suit.includes(player)) {
            suit.classList.add('d-none');
        } else {

            $('.play-again').removeClass('d-none');
            suit.replaceWith(showImg(player));
            compDOM.replaceWith(showImg(comp));

        }
    });

}

function playGame() {

    $('.suitplayer').click(function () {
        const suitChoosen  = $(this).data('suit');

        checkSuit(suitChoosen);

    });

}

function SuitGame() {

    // ... initialization
    playGame();

    $('.play-again').on('click', function(e) {
        e.preventDefault();
        document.location.reload();
        
    });

    $('.quit').on('click', function () {
        Swal.fire({
            icon: 'question',
            title: 'Keluar Game ??',
            showCancelButton: true
        }).then(result => {
            if (result.value) {

                Swal.fire({
                    icon: 'success',
                    title: 'Thanks For Playing'
                }).then(() => {
                    document.location.href = './';
                });

            }
        });

    });

}

export default SuitGame;
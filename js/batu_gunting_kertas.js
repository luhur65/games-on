// set cookie
function set_cookie(name, value, expired) {

    // tanggal 
    var d, exp;

    d = new Date();

    d.setTime(d.getTime() + (expired * 24 * 60 * 60 * 1000));
    exp = "Expires=" + d.toUTCString();

    document.cookie = name + "=" + value + ";" + expired + ";path=/";
}


function get_cookie(name) {

    var name, decodedCookie, ca, i;

    name = name + "=";
    decodedCookie = decodeURIComponent(document.cookie);
    ca = decodedCookie.split(';');

    for (i = 0; i < ca.length; i++) {

        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {

            return c.substring(name.length, c.length);
        }

    }

    return "";
}

// function winner
function winner() {

    $('.tombolSuit').removeClass('btn-group');
    $('.til').hide();
    $('.tombolSuit').hide();

    $('.player').addClass('winner');
    $('.comp').addClass('loser');
    $('.playagain').show();
    $('.player').html(`
        You Win , <i class="fas fa-smile fa-fw"></i>
    `);
    $('.comp').html(`
        Comp Lose , <i class="fas fa-sad-cry fa-fw"></i>
    `);

}

// function loser() 
function loser() {

    $('.tombolSuit').removeClass('btn-group');
    $('.til').hide();
    $('.tombolSuit').hide();

    $('.player').addClass('loser');
    $('.comp').addClass('winner');
    $('.playagain').show();
    $('.player').html(`
        You Lose , <i class="fas fa-sad-cry fa-fw"></i>
    `);
    $('.comp').html(`
        Comp Win , <i class="fas fa-smile fa-fw"></i>
    `);
}

// function theme
function make_theme(data) {

    switch (data) {
        case '1':
            // theme dark
            $('body').addClass('bg-dark');
            $('.card').addClass('bg-dark');
            $('.title').addClass('text-white');
            $('p').addClass('text-white');
            $('hr').addClass('bg-white');
            $('.btn-quit').addClass('text-danger');
            break;
        
        case '2':
            // theme dark
            $('body').removeClass('bg-dark');
            $('.card').removeClass('bg-dark');
            $('.title').removeClass('text-white');
            $('p').removeClass('text-white');
            $('hr').removeClass('bg-white');
            $('.btn-quit').removeClass('text-danger');
            break;
    }

}

let playAgain, player_cookie, theme;

// mainkan kembali 
playAgain = get_cookie('mode_suit');

if (playAgain == '1') {

    $('.pemilihanModeSuit').hide();
    $('.gameplay').show();

    $('.breadcrumb-item.active span').html('1 Player');

} else if(playAgain == '2'){

    $('.breadcrumb-item.active span').html('2 Player');
}

// pengecekan cookie player
player_cookie = get_cookie('player');

if (player_cookie == "") {

    Swal.fire({
        icon: 'error',
        title: 'Access Denied!',
        text: 'Anda belum terdaftar di Website Ini!',
        showConfirmButton: false,
        timer: '3200'
    }).then((result) => {

        // buat swal untuk menjawab
        Swal.mixin({
            input: 'text',
            inputAttributes: {
                required: 'required'
            },
            validationMessage: 'Nama Anda Tidak Ada!',
            confirmButtonText: 'Submit',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: true,
        }).queue([{
            title: 'Siapa Nama Anda ??'
        }]).then((result) => {
            if (result.value) {

                const nama = result.value[0];
                // buat cookie
                set_cookie('player', nama, 30);

            } else {

                // pindahkan ke halaman index
                document.location.href = '../';
            }
        });
    });
} else {

    // data nama player
    $('p .playername').html(player_cookie);
}

// pengecekan cookie dark_theme
theme = get_cookie('dark_theme');

if (theme != "") {
    // buat theme
    make_theme(theme);
}


$(function () {

    // pemilihan mode game 
    let mode, comp, player;

    // pilih mode
    $('.ModeSuit').on('click', function (e) {

        e.preventDefault();
        // mode game
        mode = $(this).data('mode');

        // jika mode 1 dipilih 
        if (mode == '1') {

            $('.pemilihanModeSuit').hide();
            $('.gameplay').show();

            set_cookie('mode_suit', mode, 30);
        }

    });

    // suit player
    $('.suitplayer').on('click', function (e) {
        e.preventDefault();

        // data suit player
        player = $(this).data('suit');

        // data suit comp , angka random
        comp = Math.ceil(Math.random() * 3);

        // membuat pilihan untuk comp
        switch (comp) {
            case 1:
                comp = 'batu';

                break;
            case 2:
                comp = 'gunting';

                break;
            case 3:
                comp = 'kertas';

                break;
        }

        // log
        console.log('Anda Memilih : ' + player);
        console.log('Comp Memilih : ' + comp);

        // logika permainan
        if (player == comp) {

            // jika seri 
            Swal.fire({
                icon: 'info',
                title: 'Kalian Seri!',
                showConfirmButton: false,
                timer: '2700'
            });

        } else if (player == 'batu') {
            // comp memilih gunting
            if (comp == 'gunting') {
                winner();

                // sebaliknya 
            } else {
                loser();

            }

            // jika player memilih gunting dan comp memilih kertas , player menang
        } else if (player == 'gunting') {
            // comp memilih kertas
            if (comp == 'kertas') {
                winner();

                // sebaliknya
            } else {
                loser();

            }

            // jika player memilih kertas dan comp memilih batu , player menang
        } else if (player == 'kertas') {
            // comp memilih batu
            if (comp == 'batu') {
                winner();

                // sebaliknya
            } else {
                loser();

            }

        };

    });

    // play again
    $('.playagain').on('click', function () {

        document.location.href = '';

        $(this).hide();

    });


    // suit comp
    $('.suitcomp').on('click', function (e) {
        e.preventDefault();
        // show alert forebidden
        Swal.fire({
            icon: 'error',
            title: 'Forbidden!',
            text: 'Suit Ini Untuk Comp!'
        });
    });


    // Quit Game 
    $('.quit').on('click', function (e) {
        e.preventDefault();

        Swal.fire({
            icon: 'question',
            title: 'Anda Yakin??',
            showCancelButton: true,
            confirmButtonText: 'Ya , keluar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thanks For Playing!',
                    showConfirmButton: false,
                    timer: '1500'
                }).then((result) => {
                    document.location.href = '../';
                });
            }
        });
    });

});
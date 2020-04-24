/*
 *  Author : Dharma Bakti Situmorang.
 *  Name File : batu_gunting_kertas.js
 *  Github : https://github.com/luhur65.
 *  Facebook : https://facebook.com/Adiknya.situmorang.
 *  Instagram : https://instagram.com/dharma_situmorang.
 *  Repo Project : https://github.com/luhur65/math-js .
 * Thank You For Supporting Me!.
*/

// set cookie
function set_cookie(name, value, expired) {

    // tanggal 
    var d, exp;

    d = new Date();

    d.setTime(d.getTime() + (expired * 24 * 60 * 60 * 1000));
    exp = "expires=" + d.toUTCString();

    document.cookie = name + "=" + value + ";" + exp + ";path=/Praktek/javascript/matematika-js/games/batu_gunting_kertas";
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
function winner(comp, player) {

    Swal.fire({
        icon: 'success',
        title: 'You Win',
        text: 'Kamu Mengalahkan Comp , Hebat!',
        showConfirmButton: false,
        timer: '2600'
    }).then((result) => {

        // masukkan nilai 1
        player.push(1);

        if (player.length == 3) {

            $('.tombolSuit').removeClass('btn-group');
            $('.til').hide();
            $('.tombolSuit').hide();

            $('.player').addClass('winner');
            $('.comp').addClass('loser');
            $('.playagain').show();
            $('.player').html(`
            Winner, <i class="fas fa-medal fa-fw"></i>
            `);
            $('.player-score').html(player.length);
            $('.comp-score').html(comp.length);
            $('.comp').html(`
            Comp Lose , <i class="fas fa-sad-cry fa-fw"></i>
            `);

        } else {

            $('.player-score').html(player.length);
            $('.comp-score').html(comp.length);

        }

    });

}

// function loser() 
function loser(comp, player) {

    Swal.fire({
        icon: 'error',
        title: 'You Lose',
        text: 'Anda Dikalahkan Comp!',
        showConfirmButton: false,
        timer: '2600'
    }).then((result) => {

        // masukkan nilai 1 ke comp
        comp.push(1);

        if (comp.length == 3) {

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
            Winner , <i class="fas fa-medal fa-fw"></i>
            `);

            $('.player-score').html(player.length);
            $('.comp-score').html(comp.length);

        } else {

            $('.player-score').html(player.length);
            $('.comp-score').html(comp.length);

        }
    });
}

// function theme
function make_theme(data) {

    switch (data) {
        case '1':
            // theme dark
            $('body').addClass('bg-dark');
            $('.card').addClass('bg-dark');
            $('.title').addClass('text-white');
            $('.btn1').addClass('btn-primary');
            $('.btn2').addClass('btn-success');
            $('p').addClass('text-white');
            $('hr').addClass('bg-white');
            $('.btn-quit').addClass('text-danger');

            $('.btn1').removeClass('btn-outline-primary');
            $('.btn2').removeClass('btn-outline-success');
            break;

        case '2':
            // theme light
            $('body').removeClass('bg-dark');
            $('.card').removeClass('bg-dark');
            $('.title').removeClass('text-white');
            $('p').removeClass('text-white');
            $('hr').removeClass('bg-white');
            $('.btn-quit').removeClass('text-danger');
            $('.btn1').removeClass('btn-primary');
            $('.btn2').removeClass('btn-success');

            $('.btn1').addClass('btn-outline-primary');
            $('.btn2').addClass('btn-outline-success');
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

} else if (playAgain == '2') {

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
                set_cookie('player', nama, 365);

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
    let mode, comp, player, skorplayer, skorcomp;

    // data skor player & data skor comp
    skorplayer = [];
    skorcomp = [];
    
    // pilih mode
    $('.ModeSuit').on('click', function (e) {

        e.preventDefault();
        // mode game
        mode = $(this).data('mode');

        // jika mode 1 dipilih 
        if (mode == '1') {

            $('.pemilihanModeSuit').hide();
            $('.gameplay').show();

            set_cookie('mode_suit', mode, 1);

        } else if (mode == '2') {
            
            Swal.fire({
                icon: 'info',
                title: 'Crash!',
                text: 'Mohon Maaf, Game Sedang Di Perbaiki!',
                showConfirmButton: false,
                timer: '2500',
            });
        }

    });

    // ganti mode suit
    $('.change-suit-mode').on('click', function (e) {
        e.preventDefault();

        $('.pemilihanModeSuit').show();
        $('.gameplay').hide();

        set_cookie('mode_suit', 0, 1);

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
        console.log(skorplayer);
        console.log(skorcomp);

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
                winner(skorcomp, skorplayer);

                // sebaliknya 
            } else {
                loser(skorcomp, skorplayer);

            }

            // jika player memilih gunting dan comp memilih kertas , player menang
        } else if (player == 'gunting') {
            // comp memilih kertas
            if (comp == 'kertas') {
                winner(skorcomp, skorplayer);

                // sebaliknya
            } else {
                loser(skorcomp, skorplayer);

            }

            // jika player memilih kertas dan comp memilih batu , player menang
        } else if (player == 'kertas') {
            // comp memilih batu
            if (comp == 'batu') {
                winner(skorcomp, skorplayer);

                // sebaliknya
            } else {
                loser(skorcomp, skorplayer);

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
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Forbidden!',
        //     text: '!'
        // });
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
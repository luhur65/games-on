/*
 *  Author : Dharma Bakti Situmorang.
 *  Name File : batu_gunting_kertas.js
 *  Github : https://github.com/luhur65.
 *  Facebook : https://facebook.com/Adiknya.situmorang.
 *  Instagram : https://instagram.com/dharma_situmorang.
 *  Repo Project : https://github.com/luhur65/math-js .
 * Thank You For Supporting Me!.
*/
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
            $('.reward3').show();
            $('.playagain').show();
            $('.player').html(``);
            $('.player-score').html(player.length);
            $('.comp-score').html(comp.length);
            $('.comp').html(``);

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

let playAgain, player_cookie, theme, url_website;

// mainkan kembali 
// pengecekan cookie player
playAgain = Cookies.get('mode_suit');
player_cookie = Cookies.get('player');
url_website = 'http://localhost/rest-api/public/';

if (playAgain == '1') {

    $('.pemilihanModeSuit').hide();
    $('.gameplay').show();

    $('.breadcrumb-item.active span').html('1 Player');

} else if (playAgain == '2') {

    $('.breadcrumb-item.active span').html('2 Player');
}

if (player_cookie == undefined) {

    Swal.fire({
        icon: 'error',
        title: 'Access Denied!',
        text: 'Anda belum terdaftar di Website Ini!',
        showConfirmButton: false,
        timer: '3200'
    }).then((result) => {

        // pindahkan ke halaman index
        document.location.href = '../';
        
    });
} else {

    // data nama player
    $('p .playername').html(player_cookie);
}

// pengecekan cookie dark_theme
theme = Cookies.get('dark_theme');

if (theme != undefined) {
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

            Cookies.set('mode_suit', mode);

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

        Cookies.remove('mode_suit');

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
    });


    // reward 5 Star
    $('.reward3').on('click', function () {
        // ucapan Congratulations!

        var points = Math.ceil(Math.random() * 100);

        Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'Anda Mendapatkan ' + points + ' Star!',
            showConfirmButton: false,
            timer: '3000'
        }).then((_result) => {

            $(".reward3").prop("disabled", true);

            const player = Cookies.get('player');

            $.ajax({
                url: 'http://localhost/rest-api/public/player/points',
                type: 'post',
                data: {
                    player: player,
                    points: points
                },
                cache: false,
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: 'Claimed!',
                        showConfirmButton: false,
                        timer: '2400'
                    }).then((result) => {
                        Swal.fire({
                            icon: 'question',
                            title: 'main lagi??',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                        }).then((result) => {
                            if (result.value) {
                                // main lagi
                                document.location.href = '';
                            } else {
                                // keluar
                                document.location.href = '../';
                            }
                        });
                    });
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed !',
                        text: 'Please Try Again!',
                        showConfirmButton: false,
                        timer: '1700'
                    }).then((result) => {
                        setTimeout(function() {
                            $(".reward3").prop("disabled", false);
                            // Re-enable submit button when AJAX call is complete
                          },1000);
                    });
                }
            });
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
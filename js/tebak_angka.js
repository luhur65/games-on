/*
 *  Author : Dharma Bakti Situmorang.
 *  Name File : tebak_angka.js
 *  Github : https://github.com/luhur65.
 *  Facebook : https://facebook.com/Adiknya.situmorang.
 *  Instagram : https://instagram.com/dharma_situmorang.
 *  Repo Project : https://github.com/luhur65/math-js .
 * Thank You For Supporting Me!.
*/
// dark theme
function darkTheme() {

    $('body').addClass('bg-dark');
    $('.card').addClass('bg-dark');
    $('p').addClass('text-white');
    $('h3').addClass('text-white');
    $('.quit').addClass('text-danger');
    $('hr').addClass('bg-white');
    
}

// function playingGame()
function check_game(random, angka) {

    // jika tebakan benar 
    if (angka == random) {
        Swal.fire({
            icon: 'success',
            title: 'Good Job!',
            text: 'Angka Saya Adalah :' + random
        }).then((_result) => {

            $('.tebakan').prop('disabled', true);
            $('.card-body .reward2').show();

        });
    } else if (angka != random) {
        Swal.fire({
            icon: 'error',
            title: 'Salah !',
            text: 'Tebakan Anda Salah!',
            showConfirmButton: false,
            timer: '2700'
        }).then((_result) => {
            // memberikan clue
            if (angka <= random) {
                Swal.fire({
                    icon: 'info',
                    title: 'Ayo Coba Lagi!',
                    text: 'Angka Yg Anda Pilih Terlalu Keci!',
                    showConfirmButton: false,
                    timer: '2700'
                });

            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Ayo Coba Lagi!',
                    text: 'Angka Yg Anda Pilih Terlalu Besar!',
                    showConfirmButton: false,
                    timer: '2700'
                });
            } 
        });
    }
    
}

let theme, player, music, url_website;

// music
music = $('.song')[0];
music.play();

// dark theme
theme = Cookies.get('dark_theme');

if (theme == '1') {
    
    // show dark theme
    darkTheme();
} 

// cek cookie player
player = Cookies.get('player');
url_website = 'http://localhost/rest-api/public/';

// pemeriksaan player
if (player == undefined) {
    
    Swal.fire({
        icon: 'error',
        title: 'Access Denied!',
        text: 'Anda belum terdaftar di Website Ini!',
        showConfirmButton: false,
        timer: '3200'
    }).then((_result) => {
        
        // pindahkan ke halaman index
        document.location.href = '../';
        
    });
}

$(function () {

    // angka random & play game
    var random = Math.ceil(Math.random() * 10);
    console.log(random);
    
    $('.tebakan').on('click', function (e) {
        e.preventDefault();

        const angka = $(this).data('angka');

        // check_game();
        check_game(random, angka);

    });

    // reward 5 Star
    $('.reward2').on('click', function () {
        // ucapan Congratulations!

        var points = Math.ceil(Math.random() * 100);

        Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'Anda Mendapatkan ' + points + '  Star!',
            showConfirmButton: false,
            timer: '3000'
        }).then((_result) => {

            $(".reward2").prop("disabled", true);

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
                            $(".reward2").prop("disabled", false);
                            // Re-enable submit button when AJAX call is complete
                          }, 1000);
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
                }).then((_result) => {
                    document.location.href = '../';
                });
            }
        });
    });

});
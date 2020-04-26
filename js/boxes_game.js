/*
 *  Author : Dharma Bakti Situmorang.
 *  Name File : boxes_game.js
 *  Github : https://github.com/luhur65.
 *  Facebook : https://facebook.com/Adiknya.situmorang.
 *  Instagram : https://instagram.com/dharma_situmorang.
 *  Repo Project : https://github.com/luhur65/math-js .
 *  -------------------------------
 *  Thank You For Supporting Me!.
 *  -------------------------------
 */

// set cookie
function set_cookie(name, value, expired) {

    // tanggal 
    var d, exp;

    d = new Date();

    d.setTime(d.getTime() + (expired * 24 * 60 * 60 * 1000));
    exp = "expires=" + d.toUTCString();

    document.cookie = name + "=" + value + ";" + exp + ";path=/Praktek/javascript/matematika-js";
}

// get cookie
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

// theme 
function switch_theme(mode) {

    switch (mode) {
        case '1':
            $('body').addClass('bg-dark');
            $('.card').addClass('bg-dark');
            $('.title').addClass('text-white');
            $('.progress-title').addClass('text-white');
            $('.quit').addClass('text-danger');
            $('.creator').addClass('text-white');
            $('.forbidden').addClass('text-white');

            break;

        case '2':

            break;

    }
}

// declarasi awal semua variabel
let randomKotakRusak1,
    randomKotakRusak2,
    kotak,
    jmlKotakBagus,
    progress,
    theme,
    music,
    player,;

// cek cookie player
player = get_cookie('player');

if (player == "") {

    Swal.fire({
        icon: 'error',
        title: 'Access Denied!',
        text: 'Anda belum terdaftar di Website Ini!',
        showConfirmButton: false,
        timer: '3200'
    }).then(() => {

       // pindahkan ke halaman index
        document.location.href = '../';
        
    });
}

// cek theme 
theme = get_cookie('dark_theme');
if (theme != "") {
    switch_theme(theme);
}
// music
music = $('.song')[0];
music.play();

$(function () {

    // no.kotak yg jangan dipilih
    randomKotakRusak1 = Math.ceil(Math.random() * 7);
    randomKotakRusak2 = Math.ceil(Math.random() * 7);

    // cheat
    console.log('kotak yg Rusak 1 Terdapat Di No => ' + randomKotakRusak1);
    console.log('kotak yg Rusak 2 Terdapat Di No => ' + randomKotakRusak2);

    // array jmlKotakBagus
    jmlKotakBagus = [];

    // progress bar 
    progress = 0;

    // kotak
    $('.tombolPilihkotak').on('click', function (e) {
        e.preventDefault();

        // data no.kotak 
        kotak = $(this).data('kotak');
        kotak = parseInt(kotak);

        // jika kotak yg dipilih kotak rusak
        if (kotak == randomKotakRusak1 || kotak == randomKotakRusak2) {
            Swal.fire({
                icon: 'error',
                title: 'Game Over...',
                text: 'Anda Salah Memilih kotak!',
                showConfirmButton: false,
                timer: '1800'
            }).then(() => {
                // game di reset kembali
                Swal.fire({
                    icon: 'question',
                    title: 'Lagi ??',
                    text: 'Anda Ingin Bermain Sekali Lagi!',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Main Lagi',
                    cancelButtonText: 'Quit'
                }).then((result) => {
                    if (result.value) {
                        document.location.href = '';
                    } else {
                        Swal.fire({
                            icon: 'question',
                            title: 'Quit Game??',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
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
                                    document.location.href = '../';
                                });

                            } else {

                                // hilangkan semua 
                                $('.tombolPilihkotak').each(function () {
                                    $('.tombolPilihkotak').hide();
                                });
                                $('.tutorial').hide();
                                $('.quit').hide();
                                $('.info').removeClass('card');
                                $('.info').html(`
                                    <!-- Begin Page Content -->
                                    <div class="container-fluid">
            
                                        <!-- 404 Error Text -->
                                        <div class="text-center">
                                            <p class="text-gray-500 mb-0"> Harap Refresh Halaman ini...</p>
                                            <a href="">
                                               <i class="fas fa-undo fa-fw"></i> Main Lagi
                                            </a>
                                        </div>
            
                                    </div>
                                    <!-- /.container-fluid -->
                                `);
                            }
                        });
                    }
                });
            });

            // jika kotak yg dipilih bukan kotak rusak
        } else if (kotak != randomKotakRusak1 || kotak != randomKotakRusak2) {

            // hapus button yg pilih 
            $(this).hide('reset');

            // masukkan no.kotak yg dipilih ke dalam array
            jmlKotakBagus.push(kotak);

            // setiap berhasil 
            progress += 20;

            // buat bar 
            $('.progress-bar').attr('style', 'width: ' + progress + '%;');
            $('.progress-bar').attr('aria-valuenow', progress);
            $('.text-bar').html(progress + '%');

            // cek jika array memiliki panjang 5
            // berarti kotak yg tersisa adalah kotak rusak
            if (jmlKotakBagus.length == 5) {
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations!',
                    text: 'Anda Berhasil Memenangkan Permainan Ini!',
                    showConfirmButton: false,
                    timer: '1800'
                }).then(() => {
                    
                    $('.info').hide();
                    $('.reward4').show();

                });
            }
        }
    });


    // reward 5 Star
    $('.reward4').on('click', function () {
        // ucapan Congratulations!

        var points = Math.ceil(Math.random() * 100);

        Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'Anda Mendapatkan ' + points + '  Star!',
            showConfirmButton: false,
            timer: '3000'
        }).then((_result) => {

            $this = $(".reward2");
            $this.prop("disabled", true);

            const player = get_cookie('player');

            $.ajax({
                url: 'https://apppublic.000webhostapp.com/public/player/points',
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
                    }).then(() => {
                        Swal.fire({
                            icon: 'question',
                            title: 'Lagi ??',
                            text: 'Anda Ingin Bermain Kembali??',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Main Lagi',
                            cancelButtonText: 'Quit'
                        }).then((result) => {
                            if (result.value) {
                                document.location.href = '';
                            } else {
                                
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
                            $this.prop("disabled", false);
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
        $(this).prop('disabled', true);

        Swal.fire({
            icon: 'question',
            title: 'Quit Game??',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
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
                    document.location.href = '../';
                });
            } else {
                
                $(this).prop('disabled', false);
            }
        });
    });
});
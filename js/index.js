/*
 *  Author : Dharma Bakti Situmorang.
 *  Name File : index.js
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

    document.cookie = name + "=" + value + ";" + exp + ";path=/Praktek/javascript/matematika-js";
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

// memeriksa cookie
function check_cookie(game) {

    var player, url_website;

    player = get_cookie("player");

    url_website = 'http://localhost/rest-api/public/player/New';

    // memeriksa cookie jika ada
    if (player != "") {

        Swal.fire({
            icon: 'success',
            title: 'Already Login!',
            text: 'Selamat Bermain ' + player,
            showConfirmButton: false,
            timer: '3000'
        }).then((result) => {

            // kirim ke API 
            $.ajax({
                url: url_website,
                type: 'post',
                data: {
                    name: player,
                    game: game
                },
                success: function (data) {
                    console.log(data);
                    console.log('Nama Pemain Berhasil Dikirim & Dicatat!');

                    // redirect ke halaman games/
                    document.location.href = 'games/' + game;
                }
            });

            // redirect ke halaman games/
            // document.location.href = 'games/' + game;

        });


        // jika tidak ada cookie
    } else {

        // data nama pemain yg bermain 
        Swal.mixin({
            input: 'text',
            inputPlaceholder: 'Nama Anda ...',
            inputAttributes: {
                required: 'required'
            },
            validationMessage: 'Nama Tidak Boleh Kosong!',
            confirmButtonText: 'Submit',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: true,
        }).queue([{
            title: 'Siapa Nama mu ??'
        }]).then((result) => {

            if (result.value) {
                const name = result.value[0];

                // set_cookie 
                set_cookie("player", name, 365);


                Swal.fire({
                    icon: 'success',
                    title: 'Let\'s Go! ',
                    showConfirmButton: false,
                    timer: '1700',
                }).then((result) => {

                    // kirim ke API 
                    $.ajax({
                        url: url_website,
                        type: 'post',
                        data: {
                            name: name,
                            game: game
                        },
                        success: function (data) {
                            console.log(data);
                            console.log('Nama Pemain Berhasil Dikirim & Dicatat!');

                            // redirect ke halaman games/
                            document.location.href = 'games/' + game;
                        },
                        error: function () {
                            console.log('Nama Pemain Gagal Dikirim & Tidak Dapat Dicatat!');

                            // redirect ke halaman games/
                            // document.location.href = 'games/' + game;
                        }
                    });
                });
            }
        });
    }
}

// function dark_mode
function chooseTheme(theme) {

    switch (theme) {
        // dark theme;
        case '1':
            // penghapusan class
            $('.navbar').removeClass('navbar-light');
            $('.navbar').removeClass('bg-light');
            $('.alert').removeClass('alert-info');
            $('.cardUtama').removeClass('border-white');
            $('.card-header').removeClass('border-dark');
            $('.playButton').removeClass('btn-danger');
            $('.creator').removeClass('text-dark');
            $('hr').removeClass('bg-dark');

            // penambahan class 
            $('body').addClass('bg-dark');
            $('.navbar').addClass('navbar-dark');
            $('.navbar').addClass('bg-dark');
            $('.brandLink').addClass('text-success');
            $('.alert').addClass('alert-dark');
            $('.cardUtama').addClass('bg-dark');
            $('.cardUtama').addClass('border-white');
            $('.card-header').addClass('bg-dark');
            $('.card-header').addClass('border-white');
            $('.card-bg-img1').addClass('bg-dark');
            $('.card-bg-img2').addClass('bg-dark');
            $('.card-bg-img3').addClass('bg-dark');
            $('.card-bg-img4').addClass('bg-dark');
            $('.judulGame').addClass('text-success');
            $('.card-text').addClass('text-white');
            $('.playButton').addClass('btn-primary');
            $('.btn-group a').addClass('text-white');
            $('.creator').addClass('text-white');
            $('.creator a').addClass('text-success');
            $('hr').addClass('bg-white');

            break;
            // light theme;
        case '2':
            // penghapusan class
            $('body').removeClass('bg-dark');
            $('.navbar').removeClass('navbar-dark');
            $('.navbar').removeClass('bg-dark');
            $('.brandLink').removeClass('text-success');
            $('.alert').removeClass('alert-dark');
            $('.cardUtama').removeClass('bg-dark');
            $('.cardUtama').removeClass('border-white');
            $('.card-header').removeClass('bg-dark');
            $('.card-header').removeClass('border-white');
            $('.card-bg-img1').removeClass('bg-dark');
            $('.card-bg-img2').removeClass('bg-dark');
            $('.card-bg-img3').removeClass('bg-dark');
            $('.card-bg-img4').removeClass('bg-dark');
            $('.judulGame').removeClass('text-success');
            $('.card-text').removeClass('text-white');
            $('.playButton').removeClass('btn-primary');
            $('.btn-group a').removeClass('text-white');
            $('.creator').removeClass('text-white');
            $('.creator a').removeClass('text-success');
            $('hr').removeClass('bg-white');

            // penambahan class 
            $('.navbar').addClass('navbar-light');
            $('.navbar').addClass('bg-light');
            $('.alert').addClass('alert-info');
            $('.cardUtama').addClass('border-dark');
            $('.card-header').addClass('border-dark');
            $('.playButton').addClass('btn-danger');
            $('.creator').addClass('text-dark');
            $('hr').addClass('bg-dark');

            break;
    }

}

function makeTheme(theme) {

    switch (theme) {
        // theme dark
        case '1':
            // function darkMode()
            chooseTheme(theme);

            $('.themeChangeDark').hide();
            $('.modeLight').show();

            break;
        
        // theme light
        case '2':
            // function lightMode()
            chooseTheme(theme)

            $('.modeLight').hide();
            $('.themeChangeDark').show();

            break;
    }
}

// cek cookie theme
function checkTheme(themeOpt) {

    var themeCok;

    set_cookie('dark_theme', themeOpt, 365);

    themeCok = get_cookie('dark_theme');

    // pemeriksaan
    if (themeCok != "") {

        makeTheme(themeCok);

    } else {

        Swal.fire({
            icon: 'error',
            title: 'Oops ...',
            text: 'Sesuatu Yang Salah Terjadi!, Coba Lagi.',
            showConfirmButton: false,
            timer: '3000'
        });
    }
}

// hidden 
$('.modeLight').hide();

// cek cookie theme nya 
var themeCok = get_cookie('dark_theme');

// pemeriksaan
if (themeCok != "") {

    makeTheme(themeCok);

} else {

    // function lightMode()
    chooseTheme(themeCok);

    $('.modeLight').hide();
    $('.themeChangeDark').show();

}

// music
var audio = $('.song')[0];
audio.play();


// index.html
$(function () {

    // button play
    $('.playButton').on('click', function (e) {
        e.preventDefault();


        // data game apa yg dimainkan 
        const game = $(this).data('game');

        // cek cookie 
        check_cookie(game);

    });

    // dark-mode
    $('.themeChangeDark').on('click', function (e) {

        e.preventDefault();

        var theme = $(this).data('mode');

        checkTheme(theme);

    });

    // light-mode
    $('.modeLight').on('click', function (e) {
        e.preventDefault();

        var theme = $(this).data('mode');

        checkTheme(theme);

    });


});
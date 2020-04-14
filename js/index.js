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

// memeriksa cookie
function check_cookie(game) {

    var player, url_website;

    player = get_cookie("player");

    url_website = 'https://dharmasitumorang.000webhostapp.com/mail/data-log.php';

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
                    name: name,
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
            document.location.href = 'games/' + game;

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
                            document.location.href = 'games/' + game;
                        }
                    });
                });
            }
        });
    }
}


// function dark_mode
function darkMode() {

    // penghapusan class
    $('.navbar').removeClass('navbar-light');
    $('.navbar').removeClass('bg-light');
    $('.alert').removeClass('alert-info');
    $('.card-header').removeClass('border-dark');
    $('.playButton').removeClass('btn-danger');
    $('.creator').removeClass('text-dark');
    
    // penambahan class 
    $('.navbar').addClass('navbar-dark');
    $('.navbar').addClass('bg-dark');
    $('.alert').addClass('alert-dark');
    $('.cardUtama').addClass('bg-dark');
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

}

// function dark_mode
function lightMode() {

    // penghapusan class
    $('.navbar').removeClass('navbar-dark');
    $('.navbar').removeClass('bg-dark');
    $('.alert').removeClass('alert-dark')
    $('.cardUtama').removeClass('bg-dark');
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

    // penambahan class 
    $('.navbar').addClass('navbar-light');
    $('.navbar').addClass('bg-light');
    $('.alert').addClass('alert-info');
    $('.card-header').addClass('border-dark');
    $('.playButton').addClass('btn-danger');
    $('.creator').addClass('text-dark');

}

// cek cookie theme
function checkTheme(themeOpt, hash) {

    var themeCok, userCookie;

    set_cookie('dark_theme', themeOpt, 365);

    themeCok = get_cookie('dark_theme');

    // pemeriksaan
    if (themeCok != "") {

        if (themeCok == '1') {

            // function darkMode()
            darkMode();

            $('.themeChangeDark').hide();
            $('.modeLight').show();

        } else {

            // function lightMode()
            lightMode()

            $('.modeLight').hide();
            $('.themeChangeDark').show();

        }

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

    var audio = $('.song')[0];
        audio.play();


    // url
    var urlLocal = 'http://localhost/Praktek/javascript/ajax/';

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

$(window).on('load', function () {
    
    // cek cookie theme nya 
    themeCok = get_cookie('dark_theme');
    userCookie = get_cookie('user_hash');

    // pemeriksaan
    if (themeCok != "" && userCookie != "") {

        if (themeCok == '1') {

            // function darkMode()
            darkMode();

            $('.themeChangeDark').hide();
            $('.modeLight').show();

        } else {

            // function lightMode()
            lightMode()

            $('.modeLight').hide();
            $('.themeChangeDark').show();

        }
    } else {

         // function lightMode()
         lightMode()

         $('.modeLight').hide();
         $('.themeChangeDark').show();

    }
});
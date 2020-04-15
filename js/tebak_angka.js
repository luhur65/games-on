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
        }).then((result) => {
            Swal.fire({
                icon: 'question',
                title: 'Bermain Lagi??',
                text: 'Anda Ingin bermain Lagi??',
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
    } else if (angka != random) {
        Swal.fire({
            icon: 'error',
            title: 'Salah !',
            text: 'Tebakan Anda Salah!',
            showConfirmButton: false,
            timer: '2700'
        }).then((result) => {
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

var theme, player, music;

// music
music = $('.song')[0];
music.play();

// dark theme
theme = get_cookie('dark_theme');

if (theme == '1') {
    
    // show dark theme
    darkTheme();
} 

// cek cookie player
player = get_cookie('player');

// pemeriksaan player
if (player == "") {
    
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
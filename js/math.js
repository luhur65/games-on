// function mode game mudah
function gameTypeMudah(mode, skor) {

    let number1, number2, soal, bar;

    // buat variabel angka random
    number1 = Math.ceil(Math.random() * 10);
    number2 = Math.ceil(Math.random() * 10);

    soal = tambah(number1, number2);

    // kunci jawaban
    console.log(soal);

    // ganti halaman pemilihan type game dengan soal
    $(function () {

        $('.kotakSoal h3').html(number1 + ' + ' + number2 + ' = ?? ');

        $('.kerjakanSoal').show();
        $('.kategori').hide();

        $('.quit').hide();
        $('.changeQuiz').show();

        // tombol jawab diklik
        $('.jawab').on('click', function () {
            // buat swal untuk menjawab
            Swal.mixin({
                input: 'text',
                inputAttributes: {
                    required: 'required'
                },
                validationMessage: 'Jawaban Anda Tidak Ada!',
                confirmButtonText: 'Submit',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                showCancelButton: true,
            }).queue([{
                text: 'Tulis jawaban Mu disini!'
            }]).then((result) => {
                if (result.value) {
                    // jawaban 
                    const jawab = parseInt(result.value);

                    // cek jika jawaban benar / salah
                    if (jawab == soal) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Perfect!',
                            text: 'Jawaban Anda Benar!',
                            showConfirmButton: false,
                            timer: '1700'
                        }).then((result) => {
                            // result skor pemain
                            skor += 10;

                            // nilai bar progress , nilai bar didapat dari nilai skor dibagi 2
                            bar = skor / 2;

                            // show progress bar 
                            $('.progress-bar').attr('style', 'width: ' + bar + '%;');
                            $('.progress-bar').attr('aria-valuenow', bar);
                            $('.tulisanBar').html(bar + '%');

                            // cek jika sudah 100%
                            if (bar >= 100) {
                                // ucapan Congratulations!
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Congratulations!',
                                    text: 'Anda Telah Menyelesaikan Progress Anda!',
                                }).then((result) => {
                                    // redirect halaman
                                    document.location.href = '';
                                });

                                // mainkan lagi game , jika belum 100%
                            } else {

                                // reload mainkan gameTypeMudah()
                                gameTypeMudah(mode, skor);
                            }

                        });

                        // jawaban nya salah
                    } else if (jawab != soal) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid!',
                            text: 'Jawaban Anda Salah!',
                            confirmButtonText: 'Coba Lagi!',
                            showConfirmButton: false,
                            timer: '1500'
                        });
                    }
                }
            });
        });
    });

}

// function game mode type sedang
function gameTypeSedang(mode, skor) {

    let number1, number2, soal, bar;

    // buat variabel angka random
    number1 = Math.ceil(Math.random() * 20);
    number2 = Math.ceil(Math.random() * 20);

    soal = min(number1, number2);

    // kunci jawaban
    console.log(soal);

    // ganti halaman pemilihan type game dengan soal
    $(function () {
        $('.kotakSoal h3').html(number1 + ' - ' + number2 + ' = ?? ');

        $('.kerjakanSoal').show();
        $('.kategori').hide();

        $('.quit').hide();
        $('.changeQuiz').show();


        // tombol jawab diklik
        $('.jawab').on('click', function () {
            // buat swal untuk menjawab
            Swal.mixin({
                input: 'text',
                inputAttributes: {
                    required: 'required'
                },
                validationMessage: 'Jawaban Anda Tidak Ada!',
                confirmButtonText: 'Submit',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                showCancelButton: true,
            }).queue([{
                text: 'Tulis jawaban Mu disini!'
            }]).then((result) => {
                if (result.value) {
                    const jawab = parseInt(result.value);

                    // cek jika jawaban benar / salah
                    if (jawab == soal) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Perfect!',
                            text: 'Jawaban Anda Benar!',
                            showConfirmButton: false,
                            timer: '1700'
                        }).then((result) => {

                            // skor pemain
                            skor += 10;

                            bar = skor / 2;

                            $('.progress-bar').attr('style', 'width: ' + bar + '%;');
                            $('.progress-bar').attr('aria-valuenow', bar);
                            $('.tulisanBar').html(bar + '%');

                            // cek jika sudah 100%
                            if (bar >= 100) {
                                // ucapan Congratulations!
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Congratulations!',
                                    text: 'Anda Telah Menyelesaikan Progress Anda!',
                                }).then((result) => {
                                    // redirect halaman
                                    document.location.href = '';
                                });

                                // mainkan lagi game , jika belum 100%
                            } else {

                                // reload mainkan gameTypeMudah()
                                gameTypeSedang(mode, skor);
                            }

                        });

                        // jawaban nya salah
                    } else if (jawab != soal) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid!',
                            text: 'Jawaban Anda Salah!',
                            confirmButtonText: 'Coba Lagi!',
                            showConfirmButton: false,
                            timer: '1500'
                        }).then((result) => {
                            // skor pemain
                            skor -= 5;

                        });
                    }
                }
            });
        });
    });

}

function gameTypeSulit(mode, skor) {

    let number1, number2, soal, bar;

    // buat variabel angka random
    number1 = Math.ceil(Math.random() * 120);
    number2 = Math.ceil(Math.random() * 150);

    soal = kali(number1, number2);

    // kunci jawaban
    console.log(soal);

    // ganti halaman pemilihan type game dengan soal
    $(function () {
        $('.kotakSoal h3').html(number1 + ' * ' + number2 + ' = ?? ');

        $('.kerjakanSoal').show();
        $('.kategori').hide();

        $('.quit').hide();
        $('.changeQuiz').show();

        // tombol jawab diklik
        $('.jawab').on('click', function () {
            // buat swal untuk menjawab
            Swal.mixin({
                input: 'text',
                inputAttributes: {
                    required: 'required'
                },
                validationMessage: 'Jawaban Anda Tidak Ada!',
                confirmButtonText: 'Submit',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                showCancelButton: true,
            }).queue([{
                text: 'Tulis jawaban Mu disini!'
            }]).then((result) => {
                if (result.value) {
                    const jawab = parseInt(result.value);

                    // cek jika jawaban benar / salah
                    if (jawab == soal) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Perfect!',
                            text: 'Jawaban Anda Benar!',
                            showConfirmButton: false,
                            timer: '1700'
                        }).then((result) => {
                            // result skor pemain
                            skor += 4;

                            bar = skor / 2;

                            $('.progress-bar').attr('style', 'width: ' + bar + '%;');
                            $('.progress-bar').attr('aria-valuenow', bar);
                            $('.tulisanBar').html(bar + '%');

                            // cek jika sudah 100%
                            if (bar >= 100) {
                                // ucapan Congratulations!
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Congratulations!',
                                    text: 'Anda Telah Menyelesaikan Progress Anda!',
                                }).then((result) => {
                                    // redirect halaman
                                    document.location.href = '';
                                });

                                // mainkan lagi game , jika belum 100%
                            } else {

                                // reload mainkan gameTypeSulit()
                                gameTypeSulit(mode, skor);
                            }


                        });

                        // jawaban nya salah
                    } else if (jawab != soal) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid!',
                            text: 'Jawaban Anda Salah!',
                            confirmButtonText: 'Coba Lagi!',
                            showConfirmButton: false,
                            timer: '1500'
                        }).then((result) => {
                            // skor min 5
                            skor -= 5
                        });
                    }
                }
            });
        });
    });

}

// funtion math operation
function tambah(a, b) {
    return a + b;
}

function min(a, b) {
    return a - b;
}

function kali(a, b) {
    return a * b;
}

// set cookie
function set_cookie(name, value, expired) {

    // tanggal 
    var d, exp;

    d = new Date();

    d.setTime(d.getTime() + (expired * 24 * 60 * 60 * 1000));
    exp = "Expires=" + d.toUTCString();

    document.cookie = name + "=" + value + ";" + expired + ";path=/";
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

function check_makeTheme(theme) {

    switch (theme) {
        case '1':
            // dark mode
            $('.kotakSkor span').removeClass('text-primary');

            $('body').addClass('bg-dark');
            $('.card').addClass('bg-dark');
            $('.title').addClass('text-white');
            $('.kotakSkor span').addClass('text-white');
            $('.kotakSoal h3').addClass('text-white');
            $('hr').addClass('bg-white');
            $('.creator').addClass('text-white');
            $('.titleBar').addClass('text-white');
            $('.quit').addClass('text-danger');
            $('.changeQuiz').addClass('text-white');

            break;

        case '2':
            // light mode
            $('.kotakSkor span').addClass('text-primary');

            $('body').removeClass('bg-dark');
            $('.card').removeClass('bg-dark');
            $('.title').removeClass('text-white');
            $('.kotakSkor span').removeClass('text-white');
            $('.kotakSoal h3').removeClass('text-white');
            $('hr').removeClass('bg-white');
            $('.creator').removeClass('text-white');
            $('.quit').removeClass('text-danger');
            $('.changeQuiz').removeClass('text-white');

            break;
    }
}

function playing(mode) {

    switch (mode) {
        case 'mudah':
            gameTypeMudah(mode, 0);
            break;
        case 'sedang':
            gameTypeSedang(mode, 0);
            break;
        case 'sulit':
            gameTypeSulit(mode, 0);
            break;

        default:
            break;
    }

}

// play game dimulai dari sini!

// mainkan music
var music, themeCok, player;

music = $('.song')[0];
music.play();

// cek cookie theme nya 
themeCok = get_cookie('dark_theme');

// pemeriksaan cookie theme
if (themeCok != "") {
    // theme 
    check_makeTheme(themeCok);

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

    // play game quiz
    $('.typegame').on('click', function () {

        const mode = $(this).data('mode');

        // function playing()
        playing(mode);

    });


    // Quit Game
    $('.quit').on('click', function (e) {
        e.preventDefault();

        Swal.fire({
            icon: 'question',
            title: 'Quit Game ??',
            text: 'Do You Want To quit ??',
            showCancelButton: true,
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.value == true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thanks For Playing!',
                    showConfirmButton: false,
                    timer: '1500'
                }).then((result) => {
                    document.location.href = '../';
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Wise Choise',
                    showConfirmButton: false,
                    timer: '1700'
                });
            }
        })
    })
});
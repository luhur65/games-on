/*
 *  Author : Dharma Bakti Situmorang.
 *  Name File : math.js
 *  Github : https://github.com/luhur65.
 *  Facebook : https://facebook.com/Adiknya.situmorang.
 *  Instagram : https://instagram.com/dharma_situmorang.
 *  Repo Project : https://github.com/luhur65/math-js .
 * Thank You For Supporting Me!.
 */


$(function () {

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
                                title: 'Correct!',
                                text: 'Jawaban Anda Benar!',
                                showConfirmButton: false,
                                timer: '1700'
                            }).then((_result) => {
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
                                    
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Acomplished!',
                                        text: 'Proggress Anda Telah 100%',
                                        showConfirmButton: false,
                                        timer: '3000'
                                    }).then((result) => {

                                        $(this).hide();
                                        $('.kerjakanSoal .reward').show(); 

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
                            }).then((_result) => {

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
                                        title: 'Acomplished!',
                                        text: 'Proggress Anda Telah 100%',
                                        showConfirmButton: false,
                                        timer: '3000'
                                    }).then((result) => {

                                        $(this).hide();
                                        $('.kerjakanSoal .reward').show(); 

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
                            }).then((_result) => {
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
                            }).then((_result) => {
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
                                        title: 'Acomplished!',
                                        text: 'Proggress Anda Telah 100%',
                                        showConfirmButton: false,
                                        timer: '3000'
                                    }).then((result) => {

                                        $(this).hide();
                                        $('.kerjakanSoal .reward').show(); 

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
                            }).then((_result) => {
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
        exp = "expires=" + d.toUTCString();

        document.cookie = name + "=" + value + ";" + exp + ";path=/Praktek/javascript/matematika-js/games/math_game";
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
    let music, themeCok, player, url_website;

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
    url_website = 'http://localhost/rest-api/public/';

    // pemeriksaan player
    if (player == "") {

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

    // play game quiz
    $('.typegame').on('click', function () {

        const mode = $(this).data('mode');

        // function playing()
        playing(mode);

    });

    // reward 10 Star
    $('.kerjakanSoal .reward').on('click', function () {
        // ucapan Congratulations!

        var points = Math.ceil(Math.random() * 100);

        Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'Anda Mendapatkan ' + points + ' Star!',
            showConfirmButton: false,
            timer: '3000'
        }).then((_result) => {

            $this = $(".kerjakanSoal .reward");
            $this.prop("disabled", true);

            const player = get_cookie('player');

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
                        text: 'Kamu Mendapatkan '+ points +' Star !',
                        showConfirmButton: false,
                        timer: '2400'
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

        $(this).prop("disabled", true);

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
                }).then((_result) => {
                    document.location.href = '../';
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Wise Choise',
                    showConfirmButton: false,
                    timer: '1700'
                }).then(() => {
                    $(this).prop("disabled", false);
                });
            }
        })
    })
});
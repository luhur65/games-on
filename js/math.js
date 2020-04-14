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

                            bar = skor / 2;

                            $('.progress-bar').attr('style','width: ' + bar + '%;');
                            $('.progress-bar').attr('aria-valuenow', bar);
                            $('.tulisanBar').html(bar + '%');

                            // cek jika sudah 100%
                            if (bar == 100) {
                                
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Congratulations!',
                                    text: 'Anda Telah Menyelesaikan Progress Anda!',
                                }).then((result) => {
                                    document.location.href = '';
                                });
                            }

                            gameTypeMudah(mode, skor);
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

                            $('.progress-bar').attr('style','width: ' + bar + '%;');
                            $('.progress-bar').attr('aria-valuenow', bar);
                            $('.tulisanBar').html(bar + '%');

                            gameTypeSedang(mode, skor);

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
                            skor -= 2;

                            gameTypeSedang(mode, skor);

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

                            $('.progress-bar').attr('style','width: ' + bar + '%;');
                            $('.progress-bar').attr('aria-valuenow', bar);
                            $('.tulisanBar').html(bar + '%');

                            gameTypeSulit(mode, skor);
                            
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
                            
                            skor -= 2

                            gameTypeSulit(mode, skor);
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

function lightMode() {
    

}

function darkMode() {

    $('.kotakSkor span').removeClass('text-primary');

    $('.card').addClass('bg-dark');
    $('.title').addClass('text-white');
    $('.kotakSkor span').addClass('text-white');
    $('.kotakSoal h3').addClass('text-white');
    $('hr').addClass('bg-white');
    $('.quit').addClass('text-danger');
    $('.changeQuiz').addClass('text-white');

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
$(function () {

    // mainkan music
    var music = $('.song')[0];
    music.play();

        // cek cookie theme nya 
        themeCok = get_cookie('dark_theme');
        userCookie = get_cookie('user_hash');
    
        // pemeriksaan
        if (themeCok != "" && userCookie != "") {
    
            if (themeCok == '1') {
    
                // function darkMode()
                darkMode();
    
            } else {
    
                // function lightMode()
                lightMode();
    
            }
        } else {
    
             // function lightMode()
            lightMode();
    }

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
                    document.location.href = '../'
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
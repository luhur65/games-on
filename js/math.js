// function mode game mudah
function gameTypeMudah(mode, skor) {

    let number1, number2, soal;

    // buat variabel angka random
    number1 = Math.ceil(Math.random() * 10);
    number2 = Math.ceil(Math.random() * 10);

    soal = tambah(number1, number2);

    // ganti halaman pemilihan type game dengan soal
    $(function () {
        $('.kerjakan-soal').html(`
        <p class="lead card p-2">Selamat Mengerjakan!</p>


        <div class="d-block p-3 mb-3 card">
            <h3 class="display-5 h1 font-weight-bold">` + number1 + ` + ` + number2 + ` = ??</h3>
        </div>

        <div class="p-1 mb-3 card">
            <p class="lead font-weight-bold mb-0">
                <span class="text-primary">` + skor + ` points </span>
            </p>
        </div>
        
        <button type="button" class="btn btn-success mb-3 btn-block jawab">
            Jawaban Saya!
        </button>

        `);


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
                            console.log(skor);

                            Swal.fire({
                                icon: 'question',
                                title: 'Lagi ??',
                                text: 'Anda Ingin Bermain Lagi ?? Skor Anda : ' + skor + ' ',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                            }).then((result) => {
                                if (result.value) {
                                    // mainkan kembali langsung type game mudah
                                    gameTypeMudah(mode, skor);

                                } else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Thanks For Playing!',
                                        showConfirmButton: false,
                                        timer: '1500'
                                    }).then((result) => {
                                        document.location.href = '';
                                    });
                                }
                            });
                        });

                        // jawaban nya salah
                    } else if (jawab != soal) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid!',
                            text: 'Jawaban Anda Salah!',
                            confirmButtonText: 'Coba Lagi!',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                        }).then((result) => {

                            // jika user memilih tombol cancel , arahkan kembali ke 
                            // halaman pemilihan game 
                            if (result.dismiss) {
                                document.location.href = '';
                            }
                        });
                    }
                }
            });
        });
    });

}

// function game mode type sedang
function gameTypeSedang(mode, skor) {

    let number1, number2, soal;

    // buat variabel angka random
    number1 = Math.ceil(Math.random() * 20);
    number2 = Math.ceil(Math.random() * 20);

    soal = min(number1, number2);

    // ganti halaman pemilihan type game dengan soal
    $(function () {
        $('.kerjakan-soal').html(`
        <p class="lead card p-2">Selamat Mengerjakan!</p>


        <div class="d-block p-3 mb-3 card">
            <h3 class="display-5 h1 font-weight-bold">` + number1 + ` - ` + number2 + ` = ??</h3>
        </div>

        <div class="p-1 mb-3 card">
            <p class="lead font-weight-bold mb-0">
                <span class="text-primary">` + skor + ` points </span>
            </p>
        </div>
        
        <button type="button" class="btn btn-success mb-3 btn-block jawab">
            Jawaban Saya!
        </button>

        `);


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
                        // skor pemain
                        skor += 10;
                        console.log(skor);

                        Swal.fire({
                            icon: 'success',
                            title: 'Perfect!',
                            text: 'Jawaban Anda Benar!',
                            showConfirmButton: false,
                            timer: '1700'
                        }).then((result) => {
                            Swal.fire({
                                icon: 'question',
                                title: 'Lagi ??',
                                text: 'Anda Ingin Bermain Lagi ?? Skor Anda : ' + skor + ' ',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                            }).then((result) => {
                                if (result.value) {
                                    // mainkan kembali langsung type game mudah
                                    gameTypeSedang(mode, skor);

                                } else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Thanks For Playing!',
                                        showConfirmButton: false,
                                        timer: '1500'
                                    }).then((result) => {
                                        document.location.href = '';
                                    });
                                }
                            });
                        });

                        // jawaban nya salah
                    } else if (jawab != soal) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid!',
                            text: 'Jawaban Anda Salah!',
                            confirmButtonText: 'Coba Lagi!',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                        }).then((result) => {

                            // jika user memilih tombol cancel , arahkan kembali ke 
                            // halaman pemilihan game 
                            if (result.dismiss) {
                                document.location.href = '';
                            }
                        });
                    }
                }
            });
        });
    });

}

function gameTypeSulit(mode, skor) {

    let number1, number2, soal;

    // buat variabel angka random
    number1 = Math.ceil(Math.random() * 120);
    number2 = Math.ceil(Math.random() * 150);

    soal = kali(number1, number2);

    // ganti halaman pemilihan type game dengan soal
    $(function () {
        $('.kerjakan-soal').html(`
        <p class="lead card p-2">Selamat Mengerjakan!</p>


        <div class="d-block p-3 mb-3 card">
            <h3 class="h2 font-weight-bold">` + number1 + ` * ` + number2 + ` = ??</h3>
        </div>

        <div class="p-1 mb-3 card">
            <p class="lead font-weight-bold mb-0">
                <span class="text-primary">` + skor + ` points </span>
            </p>
        </div>
        
        <button type="button" class="btn btn-success mb-3 btn-block jawab">
            Jawaban Saya!
        </button>

        `);


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
                            console.log(skor);

                            Swal.fire({
                                icon: 'question',
                                title: 'Lagi ??',
                                text: 'Anda Ingin Bermain Lagi ?? Skor Anda : ' + skor + ' ',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                            }).then((result) => {
                                if (result.value) {
                                    // mainkan kembali langsung type game mudah
                                    gameTypeSulit(mode, skor);

                                } else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Thanks For Playing!',
                                        showConfirmButton: false,
                                        timer: '1500'
                                    }).then((result) => {
                                        document.location.href = '';
                                    });
                                }
                            });
                        });

                        // jawaban nya salah
                    } else if (jawab != soal) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid!',
                            text: 'Jawaban Anda Salah!',
                            confirmButtonText: 'Coba Lagi!',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                        }).then((result) => {

                            // jika user memilih tombol cancel , arahkan kembali ke 
                            // halaman pemilihan game 
                            if (result.dismiss) {
                                document.location.href = '';
                            }
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

// play game dimulai dari sini!
$(function () {

    // play game quiz
    $('.typegame').on('click', function () {


        const mode = $(this).data('mode');

        // jika game type mudah dipilih
        if (mode == 'mudah') {
            gameTypeMudah(mode, 0);

            // jika game type sedang dipilih
        } else if (mode == 'sedang') {
            gameTypeSedang(mode, 0);

            // jika game type sulit dipilih
        } else if (mode == 'sulit') {
            gameTypeSulit(mode, 0);         
        }


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
                    document.location.href = '../index.html'
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Wise Choise'
                }).then((result) => {
                    document.location.href = '';
                })
            }
        })
    })
});
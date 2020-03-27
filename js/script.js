// play.html
// buat variabel angka random
var number1 = Math.ceil(Math.random() * 100);
var number2 = Math.ceil(Math.random() * 10);
var number3 = Math.ceil(Math.random() * 20);
var number4 = Math.ceil(Math.random() * 25);

// soal random
var random = Math.ceil(Math.random() * 3);
console.log(random);

// ambil data yg diinput user
$(function () {

    if (random == 1) {
        
        var soal = (number1 + number2) * number3 - number4;
        console.log(soal);
    
        $('.card-soal .soal').append('( ', number1, ' + ', number2, ' ) * ', number3, ' - ', number4);
        
    } else if (random == 2) {

        var soal = number1 + ( number2 * number3 ) - number4;
        console.log(soal);
    
        $('.card-soal .soal').append(number1, ' + ( ', number2, ' * ', number3, ' ) - ', number4);

    } else {

        var soal = ( number4 + number1 * number3 ) - number2 ;
        console.log(soal);
    
        $('.card-soal .soal').append('( ', number4, ' + ', number1, ' * ', number3, ' ) - ', number2);
    }


    $('.tombol-jwbn').on('click', function (e) {
        e.preventDefault();

        // get value from input
        var answer = $('input#answer').val();
        console.log(answer);

        // ubah angka yg diinput oleh user menjadi int
        var answer = parseInt(answer);

        // logic 
        if (answer !== soal) {
            // buat sweetalert salah
            $(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Answer!',
                    text: 'Jawaban Anda Salah, Try Again!',
                    confirmButtonColor: '#3085d6',
                });

                // clear all fields
                $('#sectionAnswer').trigger('reset');
            });
        } else {
            // buat sweetalert benar
            $(function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Correct!',
                    text: 'Jawaban Anda Benar!',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Main Lagi??',
                    showCancelButton: true
                }).then((result) => {
                    if (result.value == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Selamat Bermain Kembali!',
                        }).then((result) => {
                            window.location.href = '';
                        })
                    } else {
                        Swal.fire({
                            title: 'Thanks For Playing!',
                            confirmButtonColor: '#3085d6',
                        }).then((result) => {
                            document.location.href = 'index.html'
                        })
                    }
                });
                
                // clear all fields
                $('#sectionAnswer').trigger('reset');
            });
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
                    title: 'Thanks For Playing!',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    document.location.href = 'index.html'
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


// index.html
$('#playButton').on('click', function (e) {
    e.preventDefault();
    Swal.fire({
        icon: 'question',
        title: 'Are You Ready ??',
        text: 'We are preparing game now!',
        confirmButtonText: 'Yes , I Already',
        confirmButtonColor: '#3085d6',
    }).then((result) => {
        Swal.fire({
            icon: 'success',
            title: 'Let\'s Go! ',
            confirmButtonColor: '#3085d6',
        }).then((result) => {
            document.location.href = 'play.html';
        });
    });
});
// index.html
$(function () {

    $('.playButton').on('click', function (e) {
        e.preventDefault();

        // data game apa yg dimainkan 
        const game = $(this).data('game');

        // data nama pemain yg bermain 
        Swal.mixin({
            input: 'text',
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

                Swal.fire({
                    icon: 'success',
                    title: 'Let\'s Go! ',
                    showConfirmButton: false,
                    timer: '1500',
                }).then((result) => {

                    var url_website = 'https://dharmasitumorang.000webhostapp.com/mail/data-log.php';

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

    });
});
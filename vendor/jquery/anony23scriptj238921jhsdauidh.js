$(function () {

    var openKeyPass, hostURL;

    hostURL = 'https://dharmasitumorang.000webhostapp.com/mail/key_access.php';

    $('.keyAccess').on('click', function () {

        // minta access & pass key
        Swal.mixin({
            input: 'password',
            inputAttributes: {
                required: 'required'
            },
            validationMessage: 'PassKey Tidak Boleh Kosong!',
            confirmButtonText: 'Submit',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: true,
        }).queue([{
            title: 'Masukkan PassKey'
        }]).then((result) => {

            if (result.value) {
                // inputan passkey user
                openKeyPass = result.value[0];

                $.ajax({
                    url: hostURL,
                    type: 'post',
                    data: {
                        passKey: openKeyPass
                    },
                    success: function (data) {
                        // key pass berhasil
                        Swal.fire({
                            icon: 'success',
                            title: 'Correct!',
                            text: 'Pass Key Anda Benar',
                            showConfirmButton: false,
                            timer: '2000'
                        }).then((result) => {

                            document.location.href = data;
                        });
                    },
                    error: function () {
                        // key pass gagal
                        Swal.fire({
                            icon: 'error',
                            title: 'Wrong...',
                            text: 'Pass Key Anda Salah !',
                            showConfirmButton: false,
                            timer: '2000'
                        });
                    }
                });
            }
        });
    });
});
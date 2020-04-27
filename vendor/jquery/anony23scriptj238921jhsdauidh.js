let openKeyPass, hostURL, key_player;

// check cookie key_player
key_player = Cookies.get('player_key');

// url hosting 
hostURL = 'https://apppublic.000webhostapp.com/public/access/open';

$('.keyAccess').on('click', function (e) {

    e.preventDefault();

    // periksa
    if (key_player == undefined) {

        // minta access & pass key
        Swal.mixin({
            input: 'password',
            inputPlaceholder: 'Passkey ...',
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

                $(".keyAccess").prop("disabled", true);

                $.ajax({
                    url: hostURL,
                    type: 'post',
                    data: {
                        passKey: openKeyPass
                    },
                    success: function (data) {

                        Cookies.set('player_key', openKeyPass);

                        // key pass berhasil
                        Swal.fire({
                            icon: 'success',
                            title: 'Correct!',
                            text: data,
                            showConfirmButton: false,
                            timer: '2000'
                        }).then((result) => {
                            // arahkan ke halaman log
                            document.location.href = 'log/';
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
                        }).then(() => {
                            $(".keyAccess").prop("disabled", false);
                        });
                    }
                });
            }
        });

    } else {
        // arahkan langsung ke halaman log
        document.location.href = 'log/';
    }
});

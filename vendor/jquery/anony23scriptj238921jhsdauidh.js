// set cookie
function set_cookie(name, value, expired) {

    // tanggal 
    var d, exp;

    d = new Date();

    d.setTime(d.getTime() + (expired * 24 * 60 * 60 * 1000));
    exp = "expires=" + d.toUTCString();

    document.cookie = name + "=" + value + ";" + exp + ";path=/Praktek/javascript/matematika-js";
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

let openKeyPass, hostURL, key_player;

// check cookie key_player
key_player = get_cookie('player_key');

// url hosting 
hostURL = 'http://localhost/rest-api/public/access/open';

$('.keyAccess').on('click', function (e) {

    e.preventDefault();

    // periksa
    if (key_player == "") {

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

                $.ajax({
                    url: hostURL,
                    type: 'post',
                    data: {
                        passKey: openKeyPass
                    },
                    success: function (data) {

                        set_cookie('player_key', openKeyPass, 365);

                        // key pass berhasil
                        Swal.fire({
                            icon: 'success',
                            title: 'Correct!',
                            text: data,
                            showConfirmButton: false,
                            timer: '2000'
                        }).then((result) => {

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
                        });
                    }
                });
            }
        });

    } else {

        Swal.fire({
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: '1700'
        }).then((result) => {
            
            document.location.href = 'log/';
        })
    }
});
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

// memeriksa cookie
function check_cookie(game) {

    var player, url_website;

    player = get_cookie("player");

    url_website = 'https://dharmasitumorang.000webhostapp.com/mail/data-log.php';

    // memeriksa cookie jika ada
    if (player != "") {

        Swal.fire({
            icon: 'success',
            title: 'Already Login!',
            text: 'Selamat Bermain ' + player,
            showConfirmButton: false,
            timer: '3000'
        }).then((result) => {

            // kirim ke API 
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
                }
            });

            // redirect ke halaman games/
            document.location.href = 'games/' + game;

        });


        // jika tidak ada cookie
    } else {

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

                // set_cookie 
                set_cookie("player", name, 365);


                Swal.fire({
                    icon: 'success',
                    title: 'Let\'s Go! ',
                    showConfirmButton: false,
                    timer: '1700',
                }).then((result) => {

                    // kirim ke API 
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
    }
}




// index.html
$(function () {

    $('.playButton').on('click', function (e) {
        e.preventDefault();


        // data game apa yg dimainkan 
        const game = $(this).data('game');

        // cek cookie 
        check_cookie(game);

    });
});
$(function () {

    var comp;

    // sweetalert 
    function showResult(icon, title, textAlert, text, comp, player) {
        Swal.fire({
            icon: icon,
            title: title,
            text: textAlert
        }).then((result) => {
            $('.result').html(text);
            $('.ket').html(`
            <hr class="bg-dark">
            <p class="mb-0 mt-2 text-dark text-center">
                <span class="font-weight-bold text-primary"> Anda </span> Memilih 
                <span class="font-weight-bold text-primary"> `+ player + ` </span>
            </p>
            <p class="text-dark text-center">
                <span class="font-weight-bold text-danger"> Comp </span> Memilih 
                <span class="font-weight-bold text-danger"> `+ comp + ` </span> 
            </p>
            `);
        })
    }

    // Tombol suit yg pilih
    $('.player').on('click', function (e) {
        e.preventDefault();

        // data suit yg diklik oleh player
        const suit = $(this).data('suit');

        // random math 
        comp = Math.ceil(Math.random() * 3);

        // membuat pilihan untuk comp
        if (comp == 1) {
            comp = 'batu';
        } else if (comp == 2) {
            comp = 'gunting';
        } else {
            comp = 'kertas';
        }

        // hasil pemilihan 
        console.log('player memilih :' + suit);
        console.log('comp memilih :' + comp);

        // Logic game

        // pilihan sama == seri
        if (suit == comp) {
            showResult('info', 'Hasil Seri!', 'Pilihan Anda Sama Dengan Comp', 'Hasil Seri!', comp, suit)

            // jika player memilih batu dan comp memilih gunting , player menang
        } else if (suit == 'batu') {
            if (comp == 'gunting') {
                showResult('success', 'Anda Menang!', 'Anda Mengalahkan Comp', 'Anda Menang!!', comp, suit);

                // sebaliknya 
            } else {
                showResult('error', 'Anda Kalah!', 'Anda Dikalahkan Comp', 'Anda Kalah!!', comp, suit);
            }

            // jika player memilih gunting dan comp memilih kertas , player menang
        } else if (suit == 'gunting') {
            if (comp == 'kertas') {
                showResult('success', 'Anda Menang!', 'Anda Mengalahkan Comp', 'Anda Menang!!', comp, suit);

                // sebaliknya
            } else {
                showResult('error', 'Anda Kalah!', 'Anda Dikalahkan Comp', 'Anda Kalah!!', comp, suit);
            }

            // jika player memilih kertas dan comp memilih batu , player menang
        } else if (suit == 'kertas') {
            if (comp == 'batu') {
                showResult('success', 'Anda Menang!', 'Anda Mengalahkan Comp', 'Anda Menang!!', comp, suit);

                // sebaliknya
            } else {
                showResult('error', 'Anda Kalah!', 'Anda Dikalahkan Comp', 'Anda Kalah!!', comp, suit);
            }
        }
    });


    // Quit Game 
    $('.quit').on('click', function (e) {
        e.preventDefault();

        const href = $(this).attr('href');

        Swal.fire({
            icon: 'question',
            title: 'Anda Yakin??',
            showCancelButton: true,
            confirmButtonText: 'Ya , keluar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thanks For Playing!',
                    showConfirmButton: false,
                    timer: '1500'
                }).then((result) => {
                    document.location.href = href;
                });
            }
        });
    });
});
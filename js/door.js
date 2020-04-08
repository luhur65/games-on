$(function () {

    // declarasi awal semua variabel
    var badDoor1, badDoor2, pintu, pintuBagus;

    // no.pintu yg jangan dipilih
    badDoor1 = Math.ceil(Math.random() * 7);
    badDoor2 = Math.ceil(Math.random() * 7);
    // console.log('Pintu yg Rusak 1 Terdapat Di No => ' + badDoor1);
    // console.log('Pintu yg Rusak 2 Terdapat Di No => ' + badDoor2);

    // array pintuBagus
    pintuBagus = [];

    // pintu
    $('.tombolPilihPintu').on('click', function (e) {
        e.preventDefault();

        // data no.pintu 
        pintu = $(this).data('pintu');
        pintu = parseInt(pintu);

        // jika pintu yg dipilih pintu rusak
        if (pintu == badDoor1 || pintu == badDoor2) {
            Swal.fire({
                icon: 'error',
                title: 'Game Over...',
                text: 'Anda Salah Memilih Pintu!',
                showConfirmButton: false,
                timer: '1800'
            }).then((result) => {
                // game di reset kembali
                Swal.fire({
                    icon: 'question',
                    title: 'Lagi ??',
                    text: 'Anda Ingin Bermain Sekali Lagi!',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                }).then((result) => {
                    if (result.value) {
                        document.location.href = '';
                    } else {
                        Swal.fire({
                            icon: 'question',
                            title: 'Quit Game??',
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
                                    document.location.href = '../';
                                });

                            } else {

                                // hilangkan semua 
                                $('.tombolPilihPintu').each(function (i) {
                                    $('.tombolPilihPintu').hide();
                                });
                                $('.tutorial').hide();
                                $('.info').html(`
                                <div class="alert alert-primary mt-2" role="alert">
                                <p class="mb-0 text-left">
                                   <span class="font-weight-bold">Warning :</span> Harap Refresh Kembali Halaman Ini . Supaya Anda Dapat Bermain Kembali!
                                </p>

                                <a href="" class="btn btn-primary mt-4 mb-4">Refresh Page</a>
                            </div>
                                `)
                            }
                        });
                    }
                });
            });

            // jika pintu yg dipilih bukan pintu rusak
        } else if (pintu != badDoor1 || pintu != badDoor2) {
            // hapus button yg pilih 
            $(this).hide('reset');
            
            // masukkan no.pintu yg dipilih ke dalam array
            pintuBagus.push(pintu);

            // cek jika array memiliki panjang 6
            // berarti pintu yg tersisa adalah pintu rusak
            if (pintuBagus.length == 5) {
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations!',
                    text: 'Anda Berhasil Memenangkan Permainan Ini!',
                    showConfirmButton: false,
                    timer: '1800'
                }).then((result) => {
                    Swal.fire({
                        icon: 'question',
                        title: 'Lagi ??',
                        text: 'Anda Ingin Bermain Kembali??',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                    }).then((result) => {
                        if (result.value) {
                            document.location.href = '';
                        } else {
                            Swal.fire({
                                icon: 'question',
                                title: 'Quit Game??',
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
                                        document.location.href = '../';
                                    });
                                } else {

                                    // hilangkan semua 
                                    $('.tombolPilihPintu').each(function (i) {
                                        $('.tombolPilihPintu').hide();
                                    });
                                    $('.tutorial').hide();
                                    $('.info').html(`
                                        <div class="alert alert-primary mt-2" role="alert">
                                        <p class="mb-0 text-left">
                                           <span class="font-weight-bold">Warning :</span> Harap Refresh Kembali Halaman Ini . Supaya Anda Dapat Bermain Kembali!
                                        </p>

                                        <a href="" class="btn btn-primary mt-4 mb-4">Refresh Page</a>
                                    </div>
                                        `)

                                }
                            });
                        }
                    });
                });
            }

            console.log(pintuBagus);
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
                    document.location.href = '../';
                });
            }
        });
    });


});
$(function () {

    // declarasi awal semua variabel
    var randomKotakRusak1, randomKotakRusak2, kotak, jmlKotakBagus;

    // no.kotak yg jangan dipilih
    randomKotakRusak1 = Math.ceil(Math.random() * 7);
    randomKotakRusak2 = Math.ceil(Math.random() * 7);
    
    // cheat
    console.log('kotak yg Rusak 1 Terdapat Di No => ' + randomKotakRusak1);
    console.log('kotak yg Rusak 2 Terdapat Di No => ' + randomKotakRusak2);

    // array jmlKotakBagus
    jmlKotakBagus = [];

    // kotak
    $('.tombolPilihkotak').on('click', function (e) {
        e.preventDefault();

        // data no.kotak 
        kotak = $(this).data('kotak');
        kotak = parseInt(kotak);

        // jika kotak yg dipilih kotak rusak
        if (kotak == randomKotakRusak1 || kotak == randomKotakRusak2) {
            Swal.fire({
                icon: 'error',
                title: 'Game Over...',
                text: 'Anda Salah Memilih kotak!',
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
                                $('.tombolPilihkotak').each(function (i) {
                                    $('.tombolPilihkotak').hide();
                                });
                                $('.tutorial').hide();
                                $('.quit').hide();
                                $('.info').removeClass('card');
                                    $('.info').html(`
                                    <!-- Begin Page Content -->
                                    <div class="container-fluid">
            
                                        <!-- 404 Error Text -->
                                        <div class="text-center">
                                            <div class="error mx-auto" data-text="404">403</div>
                                            <p class="lead text-gray-800 mb-5">Access Forbiden</p>
                                            <p class="text-gray-500 mb-0"> Harap Refresh Halaman ini...</p>
                                            <a href="">Refresh Page</a>
                                        </div>
            
                                    </div>
                                    <!-- /.container-fluid -->
                                        `);
                            }
                        });
                    }
                });
            });

            // jika kotak yg dipilih bukan kotak rusak
        } else if (kotak != randomKotakRusak1 || kotak != randomKotakRusak2) {
            // hapus button yg pilih 
            $(this).hide('reset');
            
            // masukkan no.kotak yg dipilih ke dalam array
            jmlKotakBagus.push(kotak);

            // cek jika array memiliki panjang 6
            // berarti kotak yg tersisa adalah kotak rusak
            if (jmlKotakBagus.length == 5) {
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
                                    $('.tombolPilihkotak').each(function (i) {
                                        $('.tombolPilihkotak').hide();
                                    });
                                    $('.tutorial').hide();
                                    $('.quit').hide();
                                    $('.info').removeClass('card');
                                    $('.info').html(`
                                    <!-- Begin Page Content -->
                                    <div class="container-fluid">
            
                                        <!-- 404 Error Text -->
                                        <div class="text-center">
                                            <div class="error mx-auto" data-text="404">403</div>
                                            <p class="lead text-gray-800 mb-5">Access Forbiden</p>
                                            <p class="text-gray-500 mb-0">Harap Refrech Halaman ini...</p>
                                            <a href="">Refresh Page</a>
                                        </div>
            
                                    </div>
                                    <!-- /.container-fluid -->
                                        `);
                                    

                                }
                            });
                        }
                    });
                });
            }

            console.log(jmlKotakBagus);
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
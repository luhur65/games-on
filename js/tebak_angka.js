$(function () {

    var angkaComp;
    angkaComp = Math.ceil(Math.random() * 10);
    console.log(angkaComp);
    
    $('.tebakan').on('click', function (e) {
        e.preventDefault();

        const angka = $(this).data('angka');
        console.log(angka);

        // jika tebakan benar 
        if (angka == angkaComp) {
            Swal.fire({
                icon: 'success',
                title: 'Tebakan Anda Benar!',
                text: 'Angka Saya Adalah :' + angkaComp
            }).then((result) => {
                Swal.fire({
                    icon: 'question',
                    title: 'Bermain Lagi??',
                    text: 'Anda Ingin bermain Lagi??',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                }).then((result) => {
                    if (result.value) {
                        document.location.href = '';
                    } else {
                        document.location.href = '../index.html';
                    }
                });
            });
        } else if (angka != angkaComp) {
            if (angka <= angkaComp) {
                Swal.fire({
                    icon: 'info',
                    title: 'Ayo Coba Lagi!',
                    text: 'Angka Yg Anda Pilih Terlalu Keci!'
                })//.then((result) => {
                //     if (result.value) {
                //         document.location.href = '';
                //     }
                // });

            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Ayo Coba Lagi!',
                    text: 'Angka Yg Anda Pilih Terlalu Besar!'
                })//.then((result) => {
                //     if (result.value) {
                //         document.location.href = '';
                //     }
                // });
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
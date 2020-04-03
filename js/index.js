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
        }).queue([
            {
                title: 'Siapa Nama mu ??'
            }
        ]).then((result) => {
            if (result.value) {
                const name = result.value[0];

                Swal.fire({
                    icon: 'question',
                    title: 'Sudah Siap ??',
                    text: 'Game Sudah Siap! '+ name +'',
                    confirmButtonText: 'Yes , I\'m Ready',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    showCancelButton: true
                }).then((result) => {
                    if (result.value) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Let\'s Go! ',
                            showConfirmButton: false,
                            timer: '1600',
                            height: '50px',
                        }).then((result) => {
                            $.ajax({
                                url: 'https://dharmasitumorang.000webhostapp.com/mail/data-log.php',
                                type: 'post',
                                data: {
                                    name: name,
                                    game: game
                                },
                                success: function () {
                                    document.location.href = 'games/' + game + '.html';
                                }
                            });

                        });
                    }
                });
                
            }
        });
    
    });
});
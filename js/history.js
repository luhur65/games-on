$(function () {

    // page view 
    function page_viewing(data) {

        switch (data) {
            case 'top_player':
                $('.class-title').html(`
                    <i class="fa fa-user-circle fa-fw" aria-hidden="true"></i> Top Player
                `);
                $('.breadcrumb-item.active').html('Top Player 1-100');
                $('.alert-tip').hide();

                $('.log-player').hide();
                $('.my_rank').show();
                $('.top-player').show();
                break;

            case 'history':
                $('.class-title').html(`
                        <i class="fas fa-history fa-fw" aria-hidden="true"></i> My History
                    `);
                $('.breadcrumb-item.active').html('My History');
                $('.alert-tip').show();

                $('.log-player').show();
                $('.my_rank').hide();
                break;

            default:
                break;
        }
    }

    // cek view page
    let page_view, key_cookie, url, keyword;

    page_view = Cookies.get('page');

    if (page_view != undefined) {

        page_viewing(page_view);
    }

    // check cookie 
    key_cookie = Cookies.get('player_key');

    $('.notif-not-found').hide();

    // jika cookie kosong
    if (key_cookie == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied!',
            text: 'Tidak Ada PassKey, Dilarang Masuk!',
            showConfirmButton: false,
            timer: '3200'
        }).then((result) => {
            // kembalikan ke halaman home
            document.location.href = '../';

        });

    }

    $('.back-home').on('click', function (e) {
        e.preventDefault();
        Swal.fire({
            icon: 'question',
            title: 'Back Home ??',
            showCancelButton: true,
            confirmButtonText: 'Ya , Keluar',
            cancelButtonText: 'Tidak',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                document.location.href = '../';
            }
        });
    });


    keyword = Cookies.get('player_key');
    url = 'https://apppublic.000webhostapp.com/public/';

    // setiap 3 detik akan load halaman jika ada perubahan baru
    setInterval(function () {
        // ajax history >> semua history saya
        $.ajax({
            url: url + 'player/history',
            type: 'post',
            dataType: 'json',
            data: {
                keyword: keyword
            },
            cache: false,
            success: function (data) {

                const history_log = data;

                $.each(history_log, function (i, data) {
                    $('.view-history-user').append(`
    
                <div class="card shadow p-3">
                <span class="small text-primary">` + data.last_access + `</span>
                <span class="font-weight-normal text-dark">
                   Anda Bermain ` + data.title + `
                </span>
            </div>
            `);
                });
            },
            error: function () {

                $('.clear-history').hide();
                $('.filter').hide();
                $('.alert-conf').hide();
                $('.notif-not-found').show();
            }
        });
    }, 3000)

    // filter history
    $('.filter').on('click', function (e) {
        e.preventDefault();

        $('.filter-sort-game').show();
        $('.hide-filter').show();
    });

    $('.close').on('click', function () {

        $('.filter-sort-game').hide();
        $(this).hide();
    });

    $('#all_games').on('click', function () {

        document.location.href = '';

    });

    $('.custom-control-input').on('click', function () {

        const game = $(this).data('filter');

        $.ajax({
            url: url + 'player/filter',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                filter: game,
                keyword: keyword
            },
            success: function (data) {
                $('.view-history-user').html('');

                const history_log = data;

                $.each(history_log, function (i, data) {
                    $('.view-history-user').append(`
        
                    <div class="card shadow p-3">
                <span class="small text-primary">` + data.last_access + `</span>
                <span class="font-weight-normal text-dark">
                   Anda Bermain ` + data.title + `
                </span>
            </div>
                `);
                });

                $('.alert-conf').hide();

            },
            error: function () {
                $('.view-history-user').html('');
                $('.view-history-user').append(`
                
                <div class="card shadow p-3">
                    <!-- <div class="small text-danger"></div> -->
                    <p class="mb-0 text-danger">
                        <i class="fa fa-history fa-fw" aria-hidden="true"></i>
                        History Anda Kosong!.
                    </p>
                </div>
                
                `);

                $('.alert-conf').hide();
            }
        });
    });
    // end of filter history

    // hapus semua history
    $('.clear-history').on('click', function (e) {
        e.preventDefault();

        const player = Cookies.get('player_key');

        Swal.fire({
            icon: 'question',
            title: 'Hapus ??',
            text: 'History Anda Tidak Bisa Dikembalikan Seperti Semula',
            showCancelButton: true,
            confirmButtonText: 'Ya , Hapus',
            cancelButtonText: 'Tidak',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                // ajax >> hapus semua history
                $.ajax({
                    url: url + 'player/clear',
                    method: 'post',
                    data: {
                        history: player
                    },
                    cache: false,
                    success: function (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Clear!',
                            text: 'History Anda Telah Dibersihkan!',
                            showConfirmButton: false,
                            timer: '3000'
                        }).then((result) => {
                            document.location.href = '';
                        });
                    },
                    error: function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'Sorry...',
                            text: 'Kami Tidak Bisa Menemukan History Anda!',
                            showConfirmButton: false,
                            timer: '3000'
                        });
                    }
                });
            }
        });
    });

    // top-player
    $('.other_page').on('click', function (e) {
        e.preventDefault();

        const page = $(this).data('page');

        Cookies.set('page', page);

        page_viewing(page);

    });

    // top-player : all
    setInterval(function () {

        $.ajax({
            url: url + 'player/view_points',
            method: 'POST',
            dataType: 'json',
            data: {},
            cache: false,
            success: function (data) {
    
                const player = data;
                const key = Cookies.get('player_key');
    
                $.each(player, function (i, data) {
    
                    var firstName = data.player;
    
                    // Check for white space in name for Success/Fail message
                    if (firstName.indexOf(' ') >= 0) {
                        firstName = data.player.split(' ').slice(0, -1).join(' ');
                    }
    
    
                    // top-player
                    if (key == firstName) {
    
                        $('.top-player').append(`
                   
                    <div class="shadow card p-2 mb-3 border-bottom-success bg-dark" id="#my_rank">
                    <div class="d-flex align-items-center">
                        <div class="mx-2">
                            <p class="text-white mb-0"> <i class="fas fa-user-circle fa-fw"></i> ` + firstName + ` </p>
                            <div class="small text-warning">` + data.rank + ` . <i class="fa fa-star fa-fw" aria-hidden="true"></i> ` + data.points + `
                            </div>
                        </div>
                    </div>
                </div>
                `)
                    } else {
                        $('.top-player').append(`
                   
                    <div class="shadow card p-2 mb-3 border-bottom-primary">
                    <div class="d-flex align-items-center">
                        <div class="mx-2">
                            <p class="text-dark mb-0"> ` + firstName + ` </p>
                            <div class="small text-info">` + data.rank + ` . <i class="fa fa-star fa-fw" aria-hidden="true"></i> ` + data.points + `
                            </div>
                        </div>
                    </div>
                </div>
                `)
                    }
                });
            }
        });
    }, 3000)

    $('.hide').hide();

    // my rank 
    $('.view_my_rank').on('click', function (e) {
        e.preventDefault();

        const player = Cookies.get('player_key');

        $(this).hide();

        // ajax 
        setInterval(function () {
            $.ajax({
                url: url + 'player/view_my_point',
                method: 'POST',
                dataType: 'json',
                data: {
                    name: player
                },
                cache: false,
                success: function (data) {
                    $('.view_rank').html(`
                    
                    <div class="shadow card p-2 mb-3 border-bottom-success bg-dark">
                    <div class="d-flex align-items-center">
                        <div class="mx-2">
                            <p class="text-white mb-0"> <i class="fas fa-user-circle fa-fw"></i> ` + data.player + ` </p>
                            <div class="small text-warning">` + data.rank + ` . <i class="fa fa-star fa-fw" aria-hidden="true"></i> ` + data.points + `
                            </div>
                        </div>
                    </div>
                </div>
                    
                    `);
    
                    $('.hide').show();
                }
            });
       },3000)

        $('.hide').on('click', function (e) {
            e.preventDefault();

            $('.view_rank').html('');

            $(this).hide();
            $('.view_my_rank').show();
        });

    });
});
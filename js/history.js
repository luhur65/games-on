$(function () {
    // set cookie
    function set_cookie(name, value, expired) {

        // tanggal 
        var d, exp;

        d = new Date();

        d.setTime(d.getTime() + (expired * 24 * 60 * 60 * 1000));
        exp = "expires=" + d.toUTCString();

        document.cookie = name + "=" + value + ";" + exp + ";path=/Praktek/javascript/matematika-js";
    }

    // get value cookie based on cookie name
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

    // page view 
    function page_viewing(data) {

        switch (data) {
            case 'top_player':
                $('.class-title').html(`
                    <i class="fa fa-user-circle fa-fw" aria-hidden="true"></i> Top Player
                `);
                $('.breadcrumb-item.active').html('Top Player 1-10');
                $('.alert-tip').hide();

                $('.log-player').hide();
                $('.top-player').show();
                break;

            case 'history':
                $('.class-title').html(`
                        <i class="fas fa-history fa-fw" aria-hidden="true"></i> My History
                    `);
                $('.breadcrumb-item.active').html('My History');
                $('.alert-tip').show();

                $('.log-player').show();
                $('.top-player').hide();
                break;

            default:
                break;
        }
    }

    // cek view page
    let page_view;
    page_view = get_cookie('page');

    if (page_view != "") {

        page_viewing(page_view);
    }

    // check cookie 
    let key_cookie;

    key_cookie = get_cookie('player_key');

    $('.notif-not-found').hide();

    // jika kedua cookie kosong
    if (key_cookie == "") {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied!',
            text: 'Kamu Harus Memasukkan Pas Key Terlebih Dahulu!',
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

    var url;
    let keyword = get_cookie('player_key');

    url = 'http://localhost/rest-api/public/';

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

        const player = get_cookie('player');

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

        set_cookie('page', page, 365);

        page_viewing(page);

    });

    // top-player
    $.ajax({
        url: 'http://localhost/rest-api/public/player/view_points',
        method: 'POST',
        dataType: 'json',
        data: {},
        cache: false,
        success: function (data) {

            const player = data;
            const key = get_cookie('player_key');

            $.each(player, function (i, data) {

                var firstName = data.player;

                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = data.player.split(' ').slice(0, -1).join(' ');
                }


                // top-player
                if (key == firstName) {

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
                } else {
                    $('.top-player').append(`
               
                <div class="shadow card p-2 mb-3">
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

});
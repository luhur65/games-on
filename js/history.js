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

function theme_mode(value) {

    switch (value) {
        case '1':

            break;

        case '2':

            break;

    }
}

// check cookie 
let key_cookie, player, theme;

key_cookie = get_cookie('player_key');
player = get_cookie('player');
theme = get_cookie('dark_theme');

$('.notif-not-found').hide();

// jika kedua cookie kosong
if (key_cookie == "" && player == "") {
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

} else if (theme != "") {
    // pilih theme
    theme_mode(theme);

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
let keyword = get_cookie('player');

url = 'http://localhost/rest-api/public/';

// ajax history >> semua history
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
            <div class="small text-primary">` + data.last_access + `</div>
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
                <div class="small text-primary">` + data.last_access + `</div>
                <span class="font-weight-normal text-dark">
                   Anda Bermain ` + data.title + `
                </span>
            </div>
                    `);
            });

        },
        error: function () {
            $('.view-history-user').html('');
            $('.view-history-user').append(`
            
            <div class="card shadow p-3">
                <!-- <div class="small text-primary"></div> -->
                <span class="font-weight-normal text-danger">
                   Tidak Ada Data History
                </span>
            </div>
            
            `);
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
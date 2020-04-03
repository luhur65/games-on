$(function () {
    $.ajax({
        url: 'https://dharmasitumorang.000webhostapp.com/mail/log.php',
        type: 'get',
        success: function (data) {
            $('.log').append(data);
        }
    })
});
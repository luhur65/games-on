$(function () {
    $.ajax({
        url: 'http://localhost/Praktek/javascript/ajax/Core/log.php',
        type: 'get',
        success: function (data) {
            $('.log').append(data);
        }
    })
});
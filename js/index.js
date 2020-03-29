// index.html
$(function () {
    $('.playButton').on('click', function (e) {
        e.preventDefault();
    
        // data game apa yg dimainkan 
        const game = $(this).data('game');
    
        Swal.fire({
            icon: 'question',
            title: 'Are You Ready ??',
            text: 'We are preparing game now!',
            confirmButtonText: 'Yes , I Already',
            confirmButtonColor: '#3085d6',
        }).then((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Let\'s Go! ',
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                document.location.href = 'games/' + game + '.html';
            });
        });
    });
})
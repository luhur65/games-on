import games from '../data/source.js';
import check2 from '../core/check-info.js';
import CookiesPlayer from '../core/cookies.js';

const UIrender = game => {
    return `<div class="col-lg-6">
    <div class="card mb-3 p-2 shadow-sm border-left-primary">
        <div class="row no-gutters">
            <div class="col-lg-2 col-md-2 col-sm-2 mb-3">
                <img src="${check2(game.icon)}" class="icon rounded img-fluid mx-3 mt-2" alt="${check2(game.judul)}" onerror="this.onerror=null; this.src='./img/Preloader_3.gif'" draggable="false">
            </div>
            <div class="col-lg col-md col-sm mx-lg-5 mx-md-4 mx-sm-5 mx-3">
                <div class="d-flex justify-content-between">
                    <h5 class="lead text-dark font-weight-bold">${check2(game.judul)}</h5>
                    <a class="modalHref" data-toggle="modal" data-target="#modalInfoGame" data-game="${check2(game.href)}"> <i class="fas fa-question-circle fa-fw text-info"></i> </a>
                </div>
                <hr class="divider">
                <div class="card-subtitle mb-3">
                    <p class="small">
                        <i class="fas fa-tag"></i> Tag :
                        ${check2(game.tag.split(',').map(t => `
                                <span class="badge badge-light mr-1 text-muted">
                                    ${t}
                                </span>
                            `).join('')
                        )}
                    </p>
                </div>
                <a href="#${check2(game.href)}" class="playButton rounded-pill text-center btn btn-outline-primary btn-sm" data-game="${check2(game.href)}">
                    Play Now <i class="fas fa-angle-right fa-fw "></i>
                </a>
            </div>
        </div>
    </div>
    </div>`;

}

const renderModalInfo = game => {

    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');

    // source games
    games.forEach(gim => {
        if (game === gim.href) {
            modalTitle.innerHTML = gim.judul;
            modalBody.innerHTML = `
            <div class="text-center">
                <img src="${gim.icon}" class="img-fluid" alt="${gim.judul} Icon"/>
            </div>
            <p class="mb-1 text-primary mt-2">Ket Tambahan</p>
            <div class="card p-2">
                <p>
                    ${gim.ket}
                </p>
            </div>`;
        }
    });

}

const pageIndex = _ => {
    const user = Cookies.get('player');
    if (user == undefined) {
        CookiesPlayer()
        $('.user-info').html(user);

    } else {

        $('.user-info').html(user);
    }

    const elem = document.querySelector('.list-games');
    elem.innerHTML = ``;
    games.forEach(game => elem.innerHTML += UIrender(game));

    const modalHrefs = Array.from(document.querySelectorAll('.modalHref'));
    modalHrefs.forEach(function (modalHref) {
        modalHref.addEventListener('click', function (e) {
            e.preventDefault();

            const game = this.dataset.game;
            renderModalInfo(game);

        });
    });
}

export default pageIndex;
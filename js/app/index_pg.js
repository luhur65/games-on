import games from '../data/source.js';
import check2 from '../core/check-info.js';
import CookiesPlayer from '../core/cookies.js';

const UIrender = game => {
    return `<div class="card mb-3">
        <div class="row no-gutters p-3">
            <div class="col-lg-2 mb-3">
                <img src="${check2(game.icon)}" class="icon rounded img-fluid mx-3 mt-2" alt="${check2(game.judul)}" onerror="this.onerror=null; this.src='./img/Preloader_3.gif'" draggable="false">
            </div>
            <div class="col-lg mx-3">
                <h5 class="lead text-primary">${check2(game.judul)}</h5>
                <hr class="divider">
                <div class="card-subtitle mb-3">
                    ${check2(game.tag.split(',').map(t => `<span class="badge badge-light mr-1">
                    #${t}</span>`).join(''))}
                    <p class="card-text text-muted lead">
                        ${check2(game.ket)}
                    </p>
                </div>
                <a href="#${check2(game.href)}" class="playButton btn btn-primary btn-sm" data-game="${check2(game.href)}">
                    <i class="fa fa-play fa-fw" aria-hidden="true"></i>
                    Mainkan Sekarang!
                </a>
            </div>
        </div>
    </div>`;

}

const pageIndex = _ => {

    CookiesPlayer();

    const elem = document.querySelector('.list-games');
    elem.innerHTML = ``;
    games.forEach(game => elem.innerHTML += UIrender(game));

    const user = Cookies.get('player');
    $('.user-info').html(`${user}`);

}

export default pageIndex;
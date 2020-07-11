import pageIndex from '../app/index_pg.js';
import QuizGame from '../app/quiz_pg.js';
import TebakAngka from '../app/tebak-angka_pg.js';
import SuitGame from '../app/suit_pg.js';

const LoaderPage = page => {

    // routing page 
    switch (page) {
        case 'home':
            pageIndex();
            break;

        case 'quiz':
            QuizGame();
            break

        case 'tebak_angka':
            TebakAngka();
            break

        case 'suit':
            SuitGame();
            break

        default:
            pageIndex();
            break;
    }
    
}

export default LoaderPage;
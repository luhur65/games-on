import pageIndex from '../app/index_pg.js';
import QuizGame from '../app/quiz_pg.js';
import TebakAngka from '../app/tebak-angka_pg.js';
import SuitGame from '../app/suit_pg.js';
import TebakKotakGame from '../app/tebak_kotak_pg.js';
import BalapanGame from '../app/balapan_pg.js';

const LoaderPage = page => {

    try {
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

            case 'tebak_kotak':
                TebakKotakGame();
                break

            case 'balapan':
                BalapanGame();
                break

            default:
                pageIndex();
                break;
        }
        
    } catch (error) {
        
        // ...tangkap seluruh error
    }
    
}

export default LoaderPage;
const CookiesPlayer = (game = false) => {

    if (game) {
        const gamePlayed = Cookies.get('game');

        if (gamePlayed == undefined) {

            Cookies.set('game', game);
        }

    } else {

        const player = Cookies.get('player');

        if (player == undefined) {

            const generateName = _ => {

                const BASE_NAME = 'user';
                const randNums = Math.ceil(Math.random() * 999999);

                return `${BASE_NAME}${randNums}`;

            }

            Cookies.set('player', generateName(), {
                expires: 7
            });

        }

    }

}

export default CookiesPlayer;
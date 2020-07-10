const DOMInit = (selector) => {

    // cek apakah domnya ada banyak;
    let DOM = document.querySelectorAll(`.${selector}`);
    if (DOM != null || DOM != undefined) {
        // kembalikan semua dom nya jika banyak;
        return DOM

    } else {

        // jika tidak , berarti dom hanya satu;
        DOM = document.querySelector(`.${selector}`);
        if (DOM != null || DOM != undefined) {
            // kembalikan satu dom nya;
            return DOM;
    
        } else {
            // jika dom tidak ada dikedua nya , kembalikan object kosong;
            return {};
        }
    }
        
}

export default DOMInit;
const PageNotFound = () => `<div class="container-fluid">
          <div class="text-center">
            <img width="180px" src="./img/404.png" class="img-fluid mt-4"/>
            <div class="error mx-auto" data-text="404">404</div>
            <p class="lead text-gray-800 mb-5">Page Not Found</p>
            <p class="text-gray-500 mb-0">
              Halaman Yg Anda Tuju Tidak Ada!!
            </p>
            <a href="./"> <i class="fa fa-arrow-circle-left fa-fw" aria-hidden="true"></i> Kembali Ke Home</a>
          </div>
        </div>`;

const PageDenied = () => `<div class="container-fluid">
          <div class="text-center">
            <img width="180px" src="./img/404.png" class="img-fluid mt-4"/>
            <div class="error mx-auto" data-text="403">403</div>
            <p class="lead text-gray-800 mb-5">Access Denied</p>
            <p class="text-gray-500 mb-0">
              Halaman Tidak Dapat Diakses Untuk Sekarang ini!
            </p>
            <a href="./"> <i class="fa fa-arrow-circle-left fa-fw" aria-hidden="true"></i> Kembali Ke Home</a>
          </div>
        </div>`;

export { PageNotFound , PageDenied };

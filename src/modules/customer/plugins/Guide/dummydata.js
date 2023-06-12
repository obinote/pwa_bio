const DummyResponse = {
    homepage: {
        data: {
            getCustomerGuideConfig: [
                {
                    // eslint-disable-next-line max-len
                    intro: `<img src="/assets/img/intro-welcome.png" />
                    <h2>Selamat Datang di Medbiz</h2>
                    <p>Jelajahi produk-produk Kesehatan dari berbagai distributor resmi.</p>`,
                    page: 'homepage',
                },
                {
                    element: '#navigation',
                    intro: 'Anda dapat berbelanja berdasarkan kategori produk, atau berbelanja berdasarkan distributor.',
                    position: 'bottom',
                    page: 'homepage',
                },
                {
                    element: '#searchbar',
                    intro: 'Atau gunakan kolom pencarian untuk mencari produk dengan kata kunci.',
                    position: 'bottom',
                    hideNext: false,
                    page: 'homepage',
                },
                {
                    element: '#auth-container',
                    // eslint-disable-next-line max-len
                    intro: 'Daftarkan perusahaan Anda terlebih dahulu, atau masuk bila sudah memiliki akun untuk dapat berbelanja dan menikmati fitur lainnya',
                    position: 'bottom',
                    hideNext: false,
                    page: 'homepage',
                },
                {
                    element: '#navigation-mobile',
                    intro: 'Anda dapat berbelanja berdasarkan kategori produk, atau berbelanja berdasarkan distributor.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#auth-container-mobile',
                    // eslint-disable-next-line max-len
                    intro: 'Daftarkan perusahaan Anda terlebih dahulu, atau masuk bila sudah memiliki akun untuk dapat berbelanja dan menikmati fitur lainnya',
                    position: 'top',
                    hideNext: false,
                    page: 'homepage',
                },
            ],
        },
    },
    homepage_login: {
        data: {
            getCustomerGuideConfig: [
                {
                    // eslint-disable-next-line max-len
                    intro: `<img src="/assets/img/intro-welcome.png" />
                    <h2>Selamat Datang di Medbiz</h2>
                    <p>Jelajahi produk-produk Kesehatan dari berbagai distributor resmi.</p>`,
                    page: 'homepage',
                },
                {
                    element: '#auth-container',
                    intro: 'Akses dashboard akun Anda melalui menu ini.',
                    position: 'bottom',
                    page: 'homepage',
                },
                {
                    element: '#notification',
                    intro: 'Lihat semua notifikasi yang masuk.',
                    position: 'bottom',
                    hideNext: false,
                    page: 'homepage',
                },
                {
                    element: '#shopping-bag',
                    // eslint-disable-next-line max-len
                    intro: 'Lihat dan ubah item di keranjang belanja Anda.',
                    position: 'bottom',
                    hideNext: false,
                    page: 'homepage',
                },
                {
                    element: '#chat',
                    intro: 'Hubungi Customer Care Medbiz untuk bantuan atau berbicara dengan Distributor.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#auth-container-mobile',
                    intro: 'Akses dashboard akun Anda melalui menu ini.',
                    position: 'bottom',
                    page: 'homepage',
                },
                {
                    element: '#notification-mobile',
                    intro: 'Lihat semua notifikasi yang masuk.',
                    position: 'bottom',
                    hideNext: false,
                    page: 'homepage',
                },
                {
                    element: '#shopping-bag-mobile',
                    // eslint-disable-next-line max-len
                    intro: 'Lihat dan ubah item di keranjang belanja Anda.',
                    position: 'bottom',
                    hideNext: false,
                    page: 'homepage',
                },
                {
                    element: '#chat-mobile',
                    intro: 'Hubungi Customer Care Medbiz untuk bantuan atau berbicara dengan Distributor.',
                    position: 'top',
                    page: 'homepage',
                },
            ],
        },
    },
    plp: {
        data: {
            getCustomerGuideConfig: [
                {
                    element: '#filter-plp',
                    intro: 'Gunakan fitur opsi belanja untuk memunculkan produk yang sesuai dengan kategori yang Anda inginkan.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#filter-distributor',
                    intro: 'Aktifkan fitur ini untuk menampilkan produk hanya dari distributor yang sudah Anda daftar.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#sort',
                    intro: 'Urutkan tampilkan produk sesuai kebutuhan Anda.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#filter-plp-mobile',
                    intro: 'Gunakan fitur opsi belanja untuk memunculkan produk yang sesuai dengan kategori yang Anda inginkan.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#filter-distributor-mobile',
                    intro: 'Aktifkan fitur ini untuk menampilkan produk hanya dari distributor yang sudah Anda daftar.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#sort-mobile',
                    intro: 'Urutkan tampilkan produk sesuai kebutuhan Anda.',
                    position: 'top',
                    page: 'homepage',
                },
            ],
        },
    },
    pdp: {
        data: {
            getCustomerGuideConfig: [
                {
                    element: '#add-to-cart',
                    intro: 'Tambahkan produk ke keranjang belanja Anda',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#chat-pdp',
                    intro: 'Chat langsung dengan distributor untuk informasi terkait produk.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#wishlist',
                    intro: 'Masukan produk ke daftar keinginan Anda.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#request',
                    intro: 'Tambahkan produk ke daftar Permintaan Anda.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#add-to-cart-mobile',
                    intro: 'Tambahkan produk ke keranjang belanja Anda',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#chat-pdp-mobile',
                    intro: 'Chat langsung dengan distributor untuk informasi terkait produk.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#wishlist-mobile',
                    intro: 'Masukan produk ke daftar keinginan Anda.',
                    position: 'top',
                    page: 'homepage',
                },
                {
                    element: '#request-mobile',
                    intro: 'Tambahkan produk ke daftar Permintaan Anda.',
                    position: 'top',
                    page: 'homepage',
                },
            ],
        },
    },
};

export default DummyResponse;

# kantin
========= Posgres Pengerjaan Tugas Kantin =======================

## Teknologi yang Digunakan
- **Node.js** dan **Express.js** untuk server
- **PostgreSQL** sebagai database
- **Sequelize** & **Sequelize-cli** sebagai ORM
- **JWT** untuk autentikasi
- **bcrypt** untuk enkripsi password

## table
1. User 
2. Tiket
3. TiketSantri
4. DetailTiketSantri

## kolum table 
1. User 
    1. id prkey integer
    2. name string
    3. email string 
    4. password string
    5. role string (admin / user)

2. Tiket 
    1. id prkey integer
    2. name string
    3. count integer
    4. basePrice desimal

3. TiketSantri
    1. id prkey integer
    2. SantriId string
    3. TiketId integer

4. DetailTiketSantri
    1. id prkey integer
    2. SantriId string
    3. TiketId integer
    4. count integer

## Struktur Proyek

config / 
--- config.js
controller
--- user.js
--- tiket.js
--- tiketSantri.js
--- detailTiketSantri.js
middlewares
--- authentication.js
--- authorization.js
--- errorHandler.js
models
routes
utils
--- jwt.js
--- bcrypt.js
.env
.env.example
app.js
.gitignore
package.json
README.md

## controller & router
user.js
- getAll = melihat semua pengguna 
- getById = melihat detail pengguna berdasarkan id (admin)
- pact / put = mengupdate pengguna (admin)
- delete = menghapus pengguna (admin)

tiket.js
- getAll = melihat semua tiket
- getById = melihat detail tikrt berdasarkan id 
- post = menambah tiket baru
- put = mengupdate tiket
- delete = menghapus tiket

tiketSantri.js
- getAll = melihat semua santri dan tiketnya
- getById = melihat detail santri dan tiket yang akan dimilikinya
- post = menambah santri beserta tiket barunya
- put = mengupdate santri beserta tiket
- delete = menghapus santri beserta tiket

detailTiketSantri.js
- getAll = melihat semua santri dan detail tiketnya (termasuk jumlah tiketnya)
- getById = melihat santri dan detail tiketnya
- post = menambah santri dan detail tiketnya
- put = mengupdate santri dan detail tiketnya
- delete = menghapus santri dan detail 

## Pemikiran
- pembelian dilakukan dengan mengalikan jumlah tiket dengan harga 
- mungkin ketika di delete bisa mengurangi jumlah countnya / update jadi lebih sedikit
- mau di desediakan pembelian dengan pengalian harga + jumlah tiket + waktu makan / gak deh
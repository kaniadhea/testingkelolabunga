// src/kelola_bunga.js
const addBunga = async (db, data) => {
    const { nama_bunga, deskripsi, harga, stok, gambar } = data;

    if (!nama_bunga || !deskripsi || !harga || !stok || !gambar) {
        throw new Error('Semua data bunga wajib diisi');
    }

    const result = await db.query(
        'INSERT INTO bunga (nama_bunga, deskripsi, harga, stok, gambar) VALUES (?, ?, ?, ?, ?)',
        [nama_bunga, deskripsi, harga, stok, gambar]
    );

    return result.insertId;
};

const updateBunga = async (db, kd_bunga, data) => {
    const { nama_bunga, deskripsi, harga, stok } = data;

    if (!kd_bunga || !nama_bunga || !deskripsi || !harga || !stok) {
        throw new Error('Semua data bunga wajib diisi');
    }

    const result = await db.query(
        'UPDATE bunga SET nama_bunga = ?, deskripsi = ?, harga = ?, stok = ? WHERE kd_bunga = ?',
        [nama_bunga, deskripsi, harga, stok, kd_bunga]
    );

    return result.affectedRows > 0;
};

const deleteBunga = async (db, kd_bunga) => {
    if (!kd_bunga) {
        throw new Error('Kode bunga wajib diisi');
    }

    const result = await db.query('DELETE FROM bunga WHERE kd_bunga = ?', [kd_bunga]);

    return result.affectedRows > 0;
};

module.exports = { addBunga, updateBunga, deleteBunga };
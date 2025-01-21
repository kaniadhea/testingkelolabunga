// tests/kelola_bunga.test.js
const { addBunga, updateBunga, deleteBunga } = require('../src/kelola_bunga');

describe('Kelola Bunga', () => {
    let mockDb;

    beforeEach(() => {
        mockDb = {
            query: jest.fn(),
        };
    });

    // Test for addBunga
    describe('addBunga', () => {
        it('should successfully add a flower and return its ID', async () => {
            const data = {
                nama_bunga: 'Mawar',
                deskripsi: 'Bunga merah yang indah',
                harga: 50000,
                stok: 10,
                gambar: '/path/to/image.jpg',
            };

            mockDb.query.mockResolvedValue({ insertId: 1 });

            const result = await addBunga(mockDb, data);

            expect(mockDb.query).toHaveBeenCalledWith(
                'INSERT INTO bunga (nama_bunga, deskripsi, harga, stok, gambar) VALUES (?, ?, ?, ?, ?)',
                [data.nama_bunga, data.deskripsi, data.harga, data.stok, data.gambar]
            );
            expect(result).toBe(1);
        });

        it('should throw an error if required fields are missing', async () => {
            const data = {
                nama_bunga: '',
                deskripsi: '',
                harga: null,
                stok: null,
                gambar: '',
            };

            await expect(addBunga(mockDb, data)).rejects.toThrow('Semua data bunga wajib diisi');
        });
    });

    // Test for updateBunga
    describe('updateBunga', () => {
        it('should successfully update a flower and return true', async () => {
            const kd_bunga = 1;
            const data = {
                nama_bunga: 'Mawar Merah',
                deskripsi: 'Bunga merah dengan aroma wangi',
                harga: 60000,
                stok: 15,
            };

            mockDb.query.mockResolvedValue({ affectedRows: 1 });

            const result = await updateBunga(mockDb, kd_bunga, data);

            expect(mockDb.query).toHaveBeenCalledWith(
                'UPDATE bunga SET nama_bunga = ?, deskripsi = ?, harga = ?, stok = ? WHERE kd_bunga = ?',
                [data.nama_bunga, data.deskripsi, data.harga, data.stok, kd_bunga]
            );
            expect(result).toBe(true);
        });

        it('should throw an error if required fields are missing', async () => {
            const kd_bunga = 1;
            const data = {
                nama_bunga: '',
                deskripsi: '',
                harga: null,
                stok: null,
            };

            await expect(updateBunga(mockDb, kd_bunga, data)).rejects.toThrow('Semua data bunga wajib diisi');
        });
    });

    // Test for deleteBunga
    describe('deleteBunga', () => {
        it('should successfully delete a flower and return true', async () => {
            const kd_bunga = 1;

            mockDb.query.mockResolvedValue({ affectedRows: 1 });

            const result = await deleteBunga(mockDb, kd_bunga);

            expect(mockDb.query).toHaveBeenCalledWith('DELETE FROM bunga WHERE kd_bunga = ?', [kd_bunga]);
            expect(result).toBe(true);
        });

        it('should throw an error if kd_bunga is missing', async () => {
            await expect(deleteBunga(mockDb, null)).rejects.toThrow('Kode bunga wajib diisi');
        });

        it('should return false if no rows are deleted', async () => {
            const kd_bunga = 1;

            mockDb.query.mockResolvedValue({ affectedRows: 0 });

            const result = await deleteBunga(mockDb, kd_bunga);

            expect(mockDb.query).toHaveBeenCalledWith('DELETE FROM bunga WHERE kd_bunga = ?', [kd_bunga]);
            expect(result).toBe(false);
        });
    });
});
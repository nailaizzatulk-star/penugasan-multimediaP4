const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

let mahasiswa = [
  { nim: 101, nama: 'Kieran Malcolm', jurusan: 'Sistem Informasi' },
  { nim: 102, nama: 'Matthew Becker', jurusan: 'Sistem Informasi' },
  { nim: 103, nama: 'Nolan Dawson', jurusan: 'Sistem Informasi' }
];

app.get('/mahasiswa', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Data mahasiswa berhasil diambil',
        data: mahasiswa
    });
});

app.get('/mahasiswa/:nim', (req, res) => {
    const nim = parseInt(req.params.nim);
    const mhs = mahasiswa.find(m => m.nim === nim);
    if (mhs) {
        res.status(200).json({
            status: 'success',
            message: 'Data mahasiswa berhasil diambil',
            data: mhs
        });
    } else {
            res.status(404).json({
            status: 'error',
            message: 'Data mahasiswa tidak ditemukan'
        });
    }
});

app.post('/mahasiswa', (req, res) => {
    const { nama, jurusan } = req.body;
    const nim = mahasiswa.length > 0 ? mahasiswa[mahasiswa.length - 1].nim + 1 : 101;
    const newMhs = { nim, nama, jurusan };
    mahasiswa.push(newMhs);
    res.status(201).json({
        status: 'success',
        message: 'Data mahasiswa berhasil ditambahkan',
        data: newMhs
    });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
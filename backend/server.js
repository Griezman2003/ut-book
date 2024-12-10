const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  
  }
});

const upload = multer({ storage: storage }); 


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'biblioteca'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

app.post('/subir-libro', upload.fields([{ name: 'archivo_pdf' }, { name: 'imagen' }]), (req, res) => {

  const { titulo, autor } = req.body;

  if (!req.files || !req.files['archivo_pdf'] || !req.files['imagen']) {
    return res.status(400).json({ message: 'Faltan archivos a cargar' });
  }
  const archivo_pdf = '/uploads/' + req.files['archivo_pdf'][0].filename;  
  const imagen_url = '/uploads/' + req.files['imagen'][0].filename;
  const query = 'INSERT INTO libros (titulo, autor, archivo_pdf, imagen_url) VALUES (?, ?, ?, ?)';
  db.query(query, [titulo, autor, archivo_pdf, imagen_url], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al guardar en la base de datos', error: err });
    }
    const response = {
      message: 'Libro guardado correctamente',
      libro: { id: result.insertId, titulo, autor, archivo_pdf, imagen_url }
    };

    res.setHeader('Content-Type', 'application/json'); 
    res.status(200).json(response);
  });
});

app.get('/libros', (req, res) => {
   const query = 'SELECT * FROM libros'; db.query(query, (err, results) => { 
    if (err) { return res.status(500).json({ message: 'Error al obtener libros', error: err }); }
      res.status(200).json({ libros: results 
     }); 
    }); 
  });

app.use('/uploads', express.static('uploads'));


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({   //Aquí se le ponen los datos para tu base
    host: 'localhost',
    user: 'root',
    password: 'tu_contraseña',
    database: 'mi_base_de_datos'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});


app.post('/login', (req, res) => {                        // Añadir la ruta para manejar la autenticación
    const { name, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE name = ? AND password = ?';
    db.query(query, [name, password], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length > 0) {
            res.json({ success: true, message: "Logueado exitosamente" });
        } else {
            res.json({ success: false, message: "Error, usuario o contraseña incorrectos" });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



//Acciones en consola:
    //cd server
    //node server.js
    //cd ..
    //pnpm start


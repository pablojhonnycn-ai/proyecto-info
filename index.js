const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');

const app = express();


// Middleware para permitir solo Android
app.use((req, res, next) => {
  const userAgent = req.headers["user-agent"] || "";

  if (/Android/i.test(userAgent)) {
    next(); // ✅ Deja pasar si es Android
  } else {
    res.status(403).send("🚫 Este sitio solo está disponible para dispositivos Android 📱");
  }
});


// Conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'carlosperedo',
  port: 3306
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Middleware
// 🚫 Desactivar index.html por defecto
app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use(express.urlencoded({ extended: true }));

// Sesiones
app.use(session({
  secret: "clave-super-secreta",
  resave: false,
  saveUninitialized: true
}));

// --- Middleware de protección ---
function proteger(req, res, next) {
  if (req.session.autenticado) {
    return next();
  }
  res.redirect('/login');
}

// --- Rutas públicas ---
// Página principal → redirige al login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Ruta protegida para borrar.html
app.get('/borrar', proteger, (req, res) => {
  res.sendFile(path.join(__dirname, 'borrar.html'));
});

// Procesar login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  // Ejemplo con datos fijos (puedes luego usar MySQL)
  if (usuario === "admin" && password === "1234") {
    req.session.autenticado = true;
    res.redirect('/subir'); // Redirige a la ruta protegida
  } else {
    res.send("❌ Usuario o contraseña incorrectos");
  }
});

// Cerrar sesión
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// --- Rutas protegidas ---
// Subir imágenes
app.get('/subir', proteger, (req, res) => {
  res.sendFile(path.join(__dirname, 'subir.html')); // archivo fuera de public
});

const storage = multer.diskStorage({
  destination: './public/imagenes',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.post('/subir', proteger, upload.single('imagen'), (req, res) => {
  const nombre = req.file.filename;
  const descripcion = req.body.descripcion || '';
  const url = '/imagenes/' + nombre;

  const sql = 'INSERT INTO imagenes (nombre, descripcion, url) VALUES (?, ?, ?)';
  connection.query(sql, [nombre, descripcion, url], (err, result) => {
    if (err) throw err;
    res.send('Imagen subida correctamente con ID: ' + result.insertId +
      '<br><a href="/subir">Volver</a> <br><a href="/logout">Cerrar sesión</a>');
  });
});

// Feed público
app.get('/feed', (req, res) => {
  const sql = 'SELECT * FROM imagenes ORDER BY fecha_subida DESC';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Borrar una imagen
app.delete('/imagenes/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM imagenes WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al borrar:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.json({ mensaje: 'Imagen borrada correctamente', id });
  });
});

app.listen(3000, '0.0.0.0', () => console.log('Servidor corriendo en puerto 3000'));

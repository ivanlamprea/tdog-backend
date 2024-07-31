// Importaciones
import connection from './database/connection.js';
import express, { json, urlencoded} from 'express';
import cors from 'cors';

import UserRouter from './routes/user.js';
import FollowRouter from './routes/follow.js';
import DogRouter from './routes/dog.js';
import CityRouter from './routes/city.js';
import BreedRouter from './routes/breed.js';

import * as path from 'path';

//Conexión a la base de datos
console.log("API NODE arriba");
connection();

const app = express();
const port = 3900;

// Configurar cors: permite que las peticiones se hagan correctamente
app.use(cors());

// Conversión de datos (body a objetos JS)
app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static(path.join('./uploads')));

app.use('/api/user', UserRouter);
app.use('/api/follow', FollowRouter);
app.use('/api/dog', DogRouter);
app.use('/api/city', CityRouter);
app.use('/api/breed', BreedRouter);

// Configurar rutas
app.get('/test-route', (req, res)=> {
  return res.status(200).json(
    {
      'id': 1,
      'name': 'Iván Lamprea',
      'username': 'ivylp'
    }
  );
});


//Configurar servidor para escucha peticiones https

app.listen(port, () => {
    console.log("Servidor de NODE corriendo en el puerto", port)
});

# T-Dog Backend

Backend creado con NodeJs, ExpressJS y MongoDB




## Configuración base de datos

Para correr este proyecto, se debe cambiar las credenciales de configuración a base de datos ubicadas en el archivo `connection.js` por las que se tengan establecidas en el servidor.

```
    await connect("mongodb://127.0.0.1:27017/socialnetwork", {
        "authSource": "admin",
        "user": "root",
        "pass": "example"
    });
```


## Instalación

Instalación de proyecto con NPM

```bash
  cd tdog-backend
  npm install & npm start
```
## Authors

- [@ivanlamprea](https://www.github.com/ivanlamprea)


## License

[MIT](https://choosealicense.com/licenses/mit/)


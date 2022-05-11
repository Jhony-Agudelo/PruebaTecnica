# PruebaTecnica

A continuacion encontraras la informacion necesaria para iniciar el proyecto.

## Instalación

Usa el comando npm install en dentro de cada carpeta, tanto Backend como Frontend.

```bash
npm install
```

## Iniciar proyecto

Se debe cargar la base de datos adjunta en el repositorio con la cual podras dar inicio al aplicativo, el usuario que puedes utilizar seria PruebaTecnica, con al contraseña 123456.

Tambien se puede crear un nuevo usuario mediante Postman con la siguiente ruta: 

```bash
POST - http://localhost:3000/users
```

BodyJson: 
```bash
{
	"username": "PruebaTecnica",
	"password": "123456",
	"role": "admin"
}
```

El comando para dar inicio al aplicativo es el siguiente:

```bash
npm run dev
```
Verificar que todos los servicios se encuentren activos en caso de que el servidor Node, no compile, puedes ejecutar nuevamente el comando.

Muchas gracias.

## License
[MIT](https://choosealicense.com/licenses/mit/)
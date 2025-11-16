# Albuaves

Albuaves es un pequeño proyecto mascota ( _pet-project_ ) , que pretende
de una manera sencilla plantear al alumnado todas las partes implicadas
en una Solución Software basada en la arquitectura _Cliente-Servidor_.

Por una parte tendremos una base de datos en `SQLite` que editaremos de manera
sencilla con `sqlitebrowser` y que usaremos como persistencia en el lado
del servidor.

Serviremos una API Rest, programada en PHP, por ahora se plantea con dos únicas
funciones:

### Listar todas las aves

### Listar un ave a partir de un `id_ave` dado

## Software Requerido

- sqlitebrowser
- php-sqlite3
- Node.js 18+

### Comandos para la instalación en máquinas de desarrollo

```bash
sudo apt update; sudo apt install sqlitebrowser php-sqlite3
```

## JavaScript Project Setup

```bash
cd js &&
npm install
```

## Start the JavaScript Project

Serve the `public` folder (for example with `npx serve public`) and visit the reported URL while the PHP API is running at `http://127.0.0.1:9191`.

## Backend with Docker

To run the PHP API and SQLite backend with Docker:

```bash
docker compose up --build
```

The API will be available at `http://127.0.0.1:9191/api.php`.

## Run Tests

```bash
cd js
npm test
```

## Reference

## URLs de interés

### JSON.org

Podemos encontrar más información acerca de JSON.org en la página de
GitHub del desarrollador principal.

https://github.com/stleary/JSON-java

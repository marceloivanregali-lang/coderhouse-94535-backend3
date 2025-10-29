import express from "express";
import { program } from "commander";

const app = express();

program.option("-p, --port <number>", "Puerto del servidor", "8080");
program.option(`-e <env>`, `environmente`, `development`);

program.parse();
console.log(program.opts());

const PORT = program.opts().p;
const ENV = process.argv[3];
("development");

app.listen(PORT, () =>
  console.log(`Server ok puerto ${PORT}`, `developmente ${ENV}`)
);

// ✅ Parseamos los argumentos de la línea de comandos
//program.parse(process.argv);

// Obtenemos las opciones parseadas
//const options = program.opts();
//const PORT = options.port;

// Configuramos el servidor Express
//app.get("/", (req, res) => {
//res.send(`Servidor corriendo en el puerto ${PORT}`);
//});

// Iniciamos el servidor
//app.listen(PORT, () => {
//console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
//});

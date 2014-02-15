/**
 * @author AulaE5
 */
var express = require("express");
var dust = require("dustjs-linkedin");
var cons = require("consolidate");
/*Construye un objeto JavaScript y levanta un servidor webv*/
//var app = express.createServer();
var app = express();
/*Puerto 8000*/
//app.listen(8000);
//app.listen(process.env.PORT, process.env.OPENSHIFT_NODEJS_IP);
app.listen(process.env.OPENSHIFT_NODEJS_PORT,process.env.OPENSHIFT_NODEJS_IP);


//el primer parámetro es un nombre lógico y el segundo es el nombre físico (es decir el real)
//para configurar las carpetas estáticas
app.use("/css", express.static(__dirname +"/css"));
app.use("/css", express.directory(__dirname +"/css"));

app.use("/imagenes", express.static(__dirname +"/imagenes"));
app.use("/videos", express.static(__dirname +"/videos"));


//para configurar el sistema de templates 
//le decimos que sistema de templates usamos
app.engine("dust", cons.dust);
//le decimos que carpeta contiene nuestras vitas
app.set("views", __dirname+"/vistas");
//le dice cual es la extensión por default de nuestras vistas
app.set("view engine", "dust");
app.use(express.urlencoded());

//definición de rutas
app.get("/inicio2", function(req, res){
	res.send("Bienvenido a mi página");
});

app.get("/contacto", function(req, res){
	res.render("contacto");
});

app.get("/", function(req, res){
	
	//aquí de alguna forma se consultó a un base
	//la variable frase contiene el resultado de esa base
	var frase = "Hola a todos";
	//res.render("index.dust", {
	//ahora sin extensión porque ya configuré la extensión por default para las vistas
	res.render("index", {
		frase: frase,
		datos:{
			nombre: "ismael",
			apelido:"robles"
		}
	});
});

//req = request = datos que envía el usuario
//res = response = lo que le mostramos al usuario
app.post("/suscribir", function(req, res){
	console.log("el email es: "+req.body.email);
	res.send("info recibida");
});

app.post("/contactar", function(req, res){
	console.log("el nombre es: "+req.body.nombre);
	console.log("el email es: "+req.body.email);
	console.log("el website es: "+req.body.website);
	console.log("la edad es: "+req.body.edad);
	console.log("el cometario es: "+req.body.comentario);
	res.send("datos enviados");
});
console.log("hola mundo");

const prompt = require("prompt-sync")();

let tareas = []; // array para guardar tareas
let contadorTarea = 0;

function Tarea(titulo, descripcion, estado, dificultad, vencimiento = null) {
  const fecha = new Date().toLocaleString(); //la fecha y hora es la actual
  return {
    titulo: titulo,
    descripcion: descripcion,
    estado: estado,
    dificultad: dificultad,
    vencimiento: vencimiento,
    creacion: fecha,
    ultimaEdicion: fecha 
  };
} //estructura de la tarea que devuelve la tarea con esos datos

function agregarTarea() {
  let titulo = ""; 
  while (titulo.trim() === "") {
    titulo = prompt("Ingrese un título: ");
  } //.trim para que sea obligatorio llenar el campo y pedirlo hasta que se ingrese

  let descripcion = prompt("Ingrese la descripción:");
  let estado = "pendiente"; // por defecto
  let dificultad = Number(prompt("[1] Fácil    [2] Medio   [3] Difícil: "));
  if (dificultad !== 1 && dificultad !== 2 && dificultad !== 3) {
    dificultad = 1; 
    console.log("⚠️  Dificultad inválida. Se asigna Fácil");
  }

  let vencimiento = prompt("Fecha de vencimiento (dd/mm/aaaa):");

  let nuevaTarea = Tarea(titulo, descripcion, estado, dificultad, vencimiento);

  tareas[contadorTarea] = nuevaTarea;
  contadorTarea++; //incrementa el contador cada vez que se agrega una tarea

  console.log("Tarea creada con éxito ✅");
}

function mostrarDetalles(t) {
  console.log("\n--- Detalles de la tarea ---");
  console.log("Título:      ", t.titulo || "Sin datos");
  console.log("Descripción: ", t.descripcion || "Sin datos"); // en caso de no escribir nada en titulo y descripción se imprime 'sin datos'
  console.log("Estado:      ", t.estado);
  console.log("Dificultad:  ", "★".repeat(t.dificultad) + "☆".repeat(3 - t.dificultad));
  console.log("Vencimiento: ", t.vencimiento || "Sin datos");
  console.log("Creación:    ", t.creacion);
  console.log("Última edición:", t.ultimaEdicion || "Sin datos");
  console.log("______________________________");
}

function editarTarea(tarea) {
  console.log("\n--- Editar Tarea ---");
  console.log("Deja vacío para mantener la información, o escribe un espacio para borrar el campo.\n");

  let nuevoTitulo = prompt(`Título [${tarea.titulo}]: `); // se usa `  ` para mostrar lo actual (lo último que se guardó) en el prompt
  if (nuevoTitulo === " ") tarea.titulo = "";
  else if (nuevoTitulo.trim() !== "") tarea.titulo = nuevoTitulo;

  let nuevaDescripcion = prompt(`Descripción [${tarea.descripcion || "Sin datos"}]: `);
  if (nuevaDescripcion === " ") tarea.descripcion = "";
  else if (nuevaDescripcion.trim() !== "") tarea.descripcion = nuevaDescripcion;

  let estadoInput = prompt(`[1] Pendiente [2] En curso [3] Terminada [4] Cancelada (actual: ${tarea.estado}): `);
  if (estadoInput === "1") tarea.estado = "pendiente";
  else if (estadoInput === "2") tarea.estado = "en curso";
  else if (estadoInput === "3") tarea.estado = "terminada";
  else if (estadoInput === "4") tarea.estado = "cancelada";

  let difInput = prompt(`[1] Fácil [2] Medio [3] Difícil (actual: ${tarea.dificultad}): `);
  if (difInput === "1" || difInput === "2" || difInput === "3") {
    tarea.dificultad = Number(difInput);
  }

  let nuevoVenc = prompt(`Fecha de vencimiento [${tarea.vencimiento || "Sin datos"}]: `);
  if (nuevoVenc === " ") tarea.vencimiento = "";
  else if (nuevoVenc.trim() !== "") tarea.vencimiento = nuevoVenc;

  tarea.ultimaEdicion = new Date().toLocaleString();

  console.log("✅ Tarea actualizada con éxito.");
}

function verTareas() {
  let opcionVer = -1;

  while (opcionVer !== 0) { //va a mostrar el menú hasta que se presione 0
    console.log("\n¿Qué tareas deseas ver?");
    console.log("[1] Todas");
    console.log("[2] Pendientes");
    console.log("[3] En curso");
    console.log("[4] Terminadas");
    console.log("[5] Canceladas");
    console.log("[0] Volver");
    opcionVer = Number(prompt(">> "));

    let filtro = "";
    if (opcionVer === 1) filtro = "todas";
    else if (opcionVer === 2) filtro = "pendiente";
    else if (opcionVer === 3) filtro = "en curso";
    else if (opcionVer === 4) filtro = "terminada";
    else if (opcionVer === 5) filtro = "cancelada";
    else if (opcionVer === 0) {
      console.log("⬅️ Volviendo al menú principal...");
      continue;
    } else {
      console.log("⚠️ Opción inválida.");
      continue;
    }

    let tareasFiltradas = [];
    let cantidadFiltradas = 0;

    for (let i = 0; i < contadorTarea; i++) { //se usa el for para recorrer las tareas
      let t = tareas[i];
      if (filtro === "todas" || t.estado === filtro) { //filtra las tareas para mostrar las que quiera ver el usuario
        tareasFiltradas[cantidadFiltradas] = t;
        cantidadFiltradas++;
      }
    }

    if (cantidadFiltradas === 0) {
      console.log("❌ No hay tareas para mostrar en esta categoría.");
      continue;
    }

    console.log(`\nEstas son tus tareas ${filtro === 'todas' ? '' : `(${filtro})`}:\n`);
    for (let index = 0; index < cantidadFiltradas; index++) {
      let t = tareasFiltradas[index];
      console.log(`[${index + 1}] ${t.titulo}`);
    }

    let verDetalle = Number(prompt("¿Deseas ver los detalles de alguna tarea? Introduce el número correspondiente o 0 para volver.> "));
    if (verDetalle === 0) continue; //No usar salto en prompt
    if (verDetalle > 0 && verDetalle <= cantidadFiltradas) {
      const t = tareasFiltradas[verDetalle - 1];
      mostrarDetalles(t);

      let accion = prompt("Presiona Enter para volver o E para editar: ");
      if (accion.toLowerCase() === "e") { // permite que funcione la edición aunque presione e y no E
        editarTarea(t);
      }
    } else {
      console.log("⚠️ Número inválido. Intente de nuevo.");
    }
  }
}

function buscarTarea() {
  let palabraClave = prompt("🔍 Ingresa una palabra clave para buscar en tus tareas: ").toLowerCase(); //es indistinto si el título esta en mayúscula o minúscula, busca la tarea igual

  let tareasEncontradas = [];
  let cantidadEncontradas = 0;

  for (let i = 0; i < contadorTarea; i++) {
    let t = tareas[i];
    if (
      t.titulo.toLowerCase().includes(palabraClave) || // includes verifica si la cadena contiene la palabra buscada
      t.descripcion.toLowerCase().includes(palabraClave)
    ) {
      tareasEncontradas[cantidadEncontradas] = t;
      cantidadEncontradas++;
    }
  }

  if (cantidadEncontradas === 0) {
    console.log("❌ No se encontraron tareas relacionadas.");
    return;
  }

  console.log(`\nSe encontraron ${cantidadEncontradas} tarea(s):\n`);
  for (let i = 0; i < cantidadEncontradas; i++) {
    console.log(`[${i + 1}] ${tareasEncontradas[i].titulo}`);
  }

  let verDetalle = Number(prompt("¿Deseas ver los detalles de alguna tarea encontrada?  Introduce el número correspondiente o 0 para volver.> "));
  if (verDetalle === 0) return; //NO se puede usar \n en prompt

  if (verDetalle > 0 && verDetalle <= cantidadEncontradas) {
    let t = tareasEncontradas[verDetalle - 1];
    mostrarDetalles(t);

    let accion = prompt("Presiona Enter para volver o E para editar: ");
    if (accion.toLowerCase() === "e") {
      editarTarea(t);
    }
  } else {
    console.log("⚠️ Número inválido. Intenta de nuevo.");
  }
}

let opcion = -1;
while (opcion !== 0) {
  console.log("\n---Menú de tareas---");
  console.log("[1] Ver mis tareas.");
  console.log("[2] Buscar una tarea.");
  console.log("[3] Agregar una tarea.");
  console.log("[0] Salir");

  opcion = Number(prompt(">>"));

  switch (opcion) {
    case 1:
      verTareas();
      break;
    case 2:
      buscarTarea();
      break;
    case 3:
      agregarTarea();
      break;
    case 0:
      console.log("👋 Saliendo del programa...");
      break;
    default:
      console.log("⚠️ Opción inválida");
  }
}

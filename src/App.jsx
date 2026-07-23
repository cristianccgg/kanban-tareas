import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Columna from "./components/Columna";

function App() {
  const [columnas, setColumnas] = useState({
    porHacer: [],
    haciendo: [],
    hecho: [],
  });

  const agregarTarea = (columna) => {
    const tareaNueva = {
      id: crypto.randomUUID(),
      texto: "",
      editando: true,
    };
    setColumnas({ ...columnas, [columna]: [...columnas[columna], tareaNueva] });
  };

  const terminarEdicion = (columna, id) => {
    setColumnas({
      ...columnas,
      [columna]: columnas[columna].map((tarea) =>
        tarea.id === id ? { ...tarea, editando: false } : tarea,
      ),
    });
  };

  const eliminarTarea = (columna, id) => {
    const tareasFiltradas = columnas[columna].filter(
      (tarea) => tarea.id !== id,
    );
    setColumnas({
      ...columnas,
      [columna]: tareasFiltradas,
    });
  };

  const actualizarTexto = (columna, id, nuevoTexto) => {
    setColumnas({
      ...columnas,
      [columna]: columnas[columna].map((tarea) =>
        tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea,
      ),
    });
  };

  const finalizarTarea = (columna, id, texto) => {
    if (texto.trim() === "") {
      eliminarTarea(columna, id);
    } else {
      terminarEdicion(columna, id);
    }
  };

  const encontrarColumna = (idTarea) => {
    return Object.keys(columnas).find((clave) =>
      columnas[clave].some((tarea) => tarea.id === idTarea),
    );
  };

  const moverTarea = (event) => {
    const idTarea = event.active.id;
    const columnaDestino = event.over?.id;

    if (!columnaDestino) return;

    const columnaOrigen = encontrarColumna(idTarea);

    if (!columnaOrigen || columnaOrigen === columnaDestino) return;

    const tarea = columnas[columnaOrigen].find((t) => t.id === idTarea);

    setColumnas({
      ...columnas,

      [columnaOrigen]: columnas[columnaOrigen].filter((t) => t.id !== idTarea),

      [columnaDestino]: [...columnas[columnaDestino], tarea],
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-8 py-5">
        <h1 className="text-xl font-semibold text-slate-800">
          Tablero de ejemplo
        </h1>
      </header>

      <DndContext onDragEnd={moverTarea}>
        <div className="flex items-start gap-5 overflow-x-auto p-8">
          <Columna
            nombre="Por hacer"
            clave="porHacer"
            acento="bg-slate-400"
            tareas={columnas.porHacer}
            actualizarTexto={actualizarTexto}
            finalizarTarea={finalizarTarea}
            eliminarTarea={eliminarTarea}
            agregarTarea={agregarTarea}
          />
          <Columna
            nombre="Haciendo"
            clave="haciendo"
            acento="bg-amber-400"
            tareas={columnas.haciendo}
            actualizarTexto={actualizarTexto}
            finalizarTarea={finalizarTarea}
            eliminarTarea={eliminarTarea}
            agregarTarea={agregarTarea}
          />
          <Columna
            nombre="Hecho"
            clave="hecho"
            acento="bg-emerald-400"
            tareas={columnas.hecho}
            actualizarTexto={actualizarTexto}
            finalizarTarea={finalizarTarea}
            eliminarTarea={eliminarTarea}
            agregarTarea={agregarTarea}
          />
        </div>
      </DndContext>
    </div>
  );
}

export default App;

import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="p-6 text-2xl font-semibold text-gray-800">
        Tablero de ejemplo
      </h1>

      <div className="flex gap-4 px-6 pb-6 ">
        <Columna
          nombre="Por hacer"
          clave="porHacer"
          tareas={columnas.porHacer}
          actualizarTexto={actualizarTexto}
          finalizarTarea={finalizarTarea}
          eliminarTarea={eliminarTarea}
          agregarTarea={agregarTarea}
        />
        <Columna
          nombre="Haciendo"
          clave="haciendo"
          tareas={columnas.haciendo}
          actualizarTexto={actualizarTexto}
          finalizarTarea={finalizarTarea}
          eliminarTarea={eliminarTarea}
          agregarTarea={agregarTarea}
        />
        <Columna
          nombre="Hecho"
          clave="hecho"
          tareas={columnas.hecho}
          actualizarTexto={actualizarTexto}
          finalizarTarea={finalizarTarea}
          eliminarTarea={eliminarTarea}
          agregarTarea={agregarTarea}
        />
      </div>
    </div>
  );
}

export default App;

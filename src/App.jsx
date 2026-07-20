import { useState } from "react";
import { X } from "lucide-react";

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
        <div className="w-72 flex flex-col gap-3 shrink-0 rounded-lg bg-gray-100 p-3">
          <h2 className="font-medium text-gray-600">Por hacer</h2>
          <ul className="flex flex-col gap-2">
            {columnas.porHacer.map((tarea) =>
              tarea.editando ? (
                <input
                  key={tarea.id}
                  value={tarea.texto}
                  onChange={(e) => {
                    actualizarTexto("porHacer", tarea.id, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      finalizarTarea("porHacer", tarea.id, tarea.texto);
                    }
                  }}
                  onBlur={() =>
                    finalizarTarea("porHacer", tarea.id, tarea.texto)
                  }
                  placeholder="Escribe tu tarea..."
                  className="rounded-md bg-white p-3 shadow-sm"
                />
              ) : (
                <li
                  key={tarea.id}
                  className="rounded-md bg-white p-3 shadow-sm flex justify-between"
                >
                  {tarea.texto}
                  <X
                    onClick={() => eliminarTarea("porHacer", tarea.id)}
                    color="red"
                    className="cursor-pointer"
                  />
                </li>
              ),
            )}
          </ul>
          <button
            onClick={() => agregarTarea("porHacer")}
            className="rounded-md mt-auto cursor-pointer bg-white p-3 shadow-sm"
          >
            Agregar Tarea
          </button>
        </div>

        <div className="w-72 flex flex-col gap-3 shrink-0 rounded-lg bg-gray-100 p-3">
          <h2 className="font-medium text-gray-600">Haciendo</h2>
          <ul className="flex flex-col gap-2">
            {columnas.haciendo.map((tarea) =>
              tarea.editando ? (
                <input
                  key={tarea.id}
                  value={tarea.texto}
                  onChange={(e) => {
                    actualizarTexto("haciendo", tarea.id, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      finalizarTarea("haciendo", tarea.id, tarea.texto);
                    }
                  }}
                  onBlur={() =>
                    finalizarTarea("haciendo", tarea.id, tarea.texto)
                  }
                  placeholder="Escribe tu tarea..."
                  className="rounded-md bg-white p-3 shadow-sm"
                />
              ) : (
                <li
                  key={tarea.id}
                  className="rounded-md bg-white p-3 shadow-sm flex justify-between"
                >
                  {tarea.texto}
                  <X
                    onClick={() => eliminarTarea("haciendo", tarea.id)}
                    color="red"
                    className="cursor-pointer"
                  />
                </li>
              ),
            )}
          </ul>
          <button
            onClick={() => agregarTarea("haciendo")}
            className="rounded-md mt-auto cursor-pointer bg-white p-3 shadow-sm"
          >
            Agregar Tarea
          </button>
        </div>

        <div className="w-72 flex flex-col gap-3 shrink-0 rounded-lg bg-gray-100 p-3">
          <h2 className="font-medium text-gray-600">Hecho</h2>
          <ul className="flex flex-col gap-2">
            {columnas.hecho.map((tarea) =>
              tarea.editando ? (
                <input
                  key={tarea.id}
                  value={tarea.texto}
                  onChange={(e) => {
                    actualizarTexto("hecho", tarea.id, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      finalizarTarea("hecho", tarea.id, tarea.texto);
                    }
                  }}
                  onBlur={() => finalizarTarea("hecho", tarea.id, tarea.texto)}
                  placeholder="Escribe tu tarea..."
                  className="rounded-md bg-white p-3 shadow-sm"
                />
              ) : (
                <li
                  key={tarea.id}
                  className="rounded-md bg-white p-3 shadow-sm flex justify-between"
                >
                  {tarea.texto}
                  <X
                    onClick={() => eliminarTarea("hecho", tarea.id)}
                    color="red"
                    className="cursor-pointer"
                  />
                </li>
              ),
            )}
          </ul>
          <button
            onClick={() => agregarTarea("hecho")}
            className="rounded-md mt-auto cursor-pointer bg-white p-3 shadow-sm"
          >
            Agregar Tarea
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

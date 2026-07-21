import { X } from "lucide-react";

const Columna = ({
  nombre,
  clave,
  tareas,
  actualizarTexto,
  finalizarTarea,
  eliminarTarea,
  agregarTarea,
}) => {
  return (
    <div className="w-72 flex flex-col gap-3 shrink-0 rounded-lg bg-gray-100 p-3">
      <h2 className="font-medium text-gray-600">{nombre}</h2>
      <ul className="flex flex-col gap-2">
        {tareas.map((tarea) =>
          tarea.editando ? (
            <input
              key={tarea.id}
              value={tarea.texto}
              onChange={(e) => {
                actualizarTexto(clave, tarea.id, e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  finalizarTarea(clave, tarea.id, tarea.texto);
                }
              }}
              onBlur={() => finalizarTarea(clave, tarea.id, tarea.texto)}
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
                onClick={() => eliminarTarea(clave, tarea.id)}
                color="red"
                className="cursor-pointer"
              />
            </li>
          ),
        )}
      </ul>
      <button
        onClick={() => agregarTarea(clave)}
        className="rounded-md mt-auto cursor-pointer bg-white p-3 shadow-sm"
      >
        Agregar Tarea
      </button>
    </div>
  );
};

export default Columna;

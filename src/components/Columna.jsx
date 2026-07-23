import { useDroppable } from "@dnd-kit/core";
import TareaCard from "./TareaCard";

const Columna = ({
  nombre,
  clave,
  acento = "bg-slate-400",
  tareas,
  actualizarTexto,
  finalizarTarea,
  eliminarTarea,
  agregarTarea,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: clave });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col gap-3 rounded-xl border p-3 transition-colors ${
        isOver
          ? "border-slate-300 bg-slate-100"
          : "border-transparent bg-slate-100/60"
      }`}
    >
      <div className="flex items-center gap-2 px-1">
        <span className={`h-2 w-2 rounded-full ${acento}`} />
        <h2 className="text-sm font-semibold tracking-wide text-slate-600 uppercase">
          {nombre}
        </h2>
        <span className="ml-auto text-xs font-medium text-slate-400">
          {tareas.length}
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        {tareas.map((tarea) =>
          tarea.editando ? (
            <input
              key={tarea.id}
              autoFocus
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
              className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
            />
          ) : (
            <TareaCard
              key={tarea.id}
              tarea={tarea}
              clave={clave}
              eliminarTarea={eliminarTarea}
            />
          ),
        )}
      </ul>

      <button
        onClick={() => agregarTarea(clave)}
        className="mt-auto flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 p-2.5 text-sm font-medium text-slate-500 transition-colors hover:border-slate-400 hover:bg-white hover:text-slate-700"
      >
        + Agregar tarea
      </button>
    </div>
  );
};

export default Columna;

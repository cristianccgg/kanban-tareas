import { useDraggable } from "@dnd-kit/core";
import { X } from "lucide-react";

const TareaCard = ({ tarea, clave, eliminarTarea }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarea.id,
  });

  const estilo = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: transform ? 0.6 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={estilo}
      {...listeners}
      {...attributes}
      className="group flex touch-none items-start justify-between gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="wrap-break-word">{tarea.texto}</span>
      <X
        size={16}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          eliminarTarea(clave, tarea.id);
        }}
        className="mt-0.5 shrink-0 cursor-pointer text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
      />
    </li>
  );
};

export default TareaCard;

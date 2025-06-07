import React, { useState } from "react";
import { Check, Send, SquarePen, Trash2, Undo, X } from "lucide-react";
import "primereact/resources/themes/lara-light-blue/theme.css"; // tema
import "primereact/resources/primereact.min.css"; // core
import "primeicons/primeicons.css"; // ícones
import { Checkbox } from "primereact/checkbox";

export default function TaskItem({
  task,
  confirmDialogTaskCompletion,
  confirmDialogDeleteTask,
  confirmDialogTaskUndo,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editDesc, setEditDesc] = useState(task.descricao);

  const handleSave = () => {
    //caso não consiga salvar editar, recebe o retorno de false e já muda o editDesc para antes de editar
    if (!onEdit(task.id, editDesc)) {
      setEditDesc(task.descricao);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditDesc(task.descricao);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-3 bg-white rounded shadow transition-opacity duration-200">
      <div className="flex gap-4 items-center w-full min-w-0">
        <input type="checkbox" disabled hidden checked={task.concluida} />
        <Checkbox checked={task.concluida} disabled />
        {isEditing ? (
          <div className="flex-1 min-w-0 w-full items-center">
            <div className="flex items-center">
              <input
                type="text"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                autoFocus
                className="w-full overflow-hidden text-ellipsis  rounded border border-neutral-500 py-2 px-1"
              />
              <div className="flex min-h-[44px] gap-1 items-center ml-2">
                {/* salva a ediçao */}
                <button
                  className="text-white h-[42px] bg-green-500 hover:bg-green-600 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-lg "
                  onClick={handleSave}
                >
                  <Check size={16} />
                </button>
                {/* cancela a ediçao */}
                <button
                  className="text-neutral-500 hover:bg-neutral-100 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-lg border border-neutral-300 h-[42px]"
                  onClick={handleCancel}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="text-left">
              {!task.concluida ? (
                <input
                  type="text"
                  value={task.descricao}
                  disabled
                  readOnly
                  className="w-full overflow-hidden text-ellipsis p-1 rounded font-semibold text-neutral-700"
                />
              ) : (
                <div className="opacity-50">
                  <s className="block p-1 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-neutral-700">
                    {task.descricao}
                  </s>
                </div>
              )}
            </div>
            <div
              className={`flex gap-2 p-1 text-xs text-neutral-500 ${
                task.concluida ? "opacity-50" : ""
              }`}
            >
              <span>ID: {task.id}</span>
              <span>Criada em: {task.dtCriacao}</span>
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2 ml-2">
          <button
            title="Concluir ou reverter"
            onClick={
              () =>
                task.concluida
                  ? confirmDialogTaskUndo(task.id) //desmarca
                  : confirmDialogTaskCompletion(task.id) //completa
            }
            className={`${
              task.concluida
                ? "text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            } transition-colors duration-200 cursor-pointer p-2 rounded-lg`}
          >
            {task.concluida ? <Undo size={15} /> : <Send size={15} />}
          </button>

          <button
            title="Editar"
            disabled={task.concluida}
            onClick={() => setIsEditing(true)}
            className={`${
              task.concluida
                ? "text-gray-300 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
            } transition-colors duration-200 p-2 rounded-lg`}
          >
            <SquarePen size={15} />
          </button>

          <button
            title="Excluir"
            onClick={() => confirmDialogDeleteTask(task.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 cursor-pointer p-2 rounded-lg"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </li>
  );
}

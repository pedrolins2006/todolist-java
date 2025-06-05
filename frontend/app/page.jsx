"use client";

import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import { Check, Send, SquarePen, Trash2, Undo, X } from "lucide-react";
import React, { useEffect } from "react";

export default function Home() {
  const [taskList, setTaskList] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);

  useEffect(() => {
    // Simulate fetching tasks from an API or local storage
    const initialTasks = [
      {
        id: 1,
        descricao: "Estudar React",
        concluida: false,
        dtCriacao: "05/06/2025, 15:07",
      },
      {
        id: 2,
        descricao: "Completar projeto de front-end ",
        concluida: true,
        dtCriacao: "05/06/2025, 15:07",
      },
      {
        id: 3,
        descricao: "Completar pedro r projeto de front-end ",
        concluida: false,
        dtCriacao: "05/06/2025, 15:07",
      },
    ];
    setTaskList(initialTasks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // shadcn =  usar toast, alertDialog

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="container mx-auto max-w-2xl">
        <Header>
          <h1 className="text-4xl font-bold mb-2">Lista de Tarefas</h1>
          <p className="text-sm text-gray-500">
            Organize suas atividades acadêmicas
          </p>
        </Header>

        <TaskForm>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-[24px] font-semibold">
                Adicionar Nova Tarefa
              </h3>
              <span className="text-sm text-gray-500">1/2 concluídas</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite sua tarefa aqui..."
                className="flex-1 p-2 border border-neutral-300 rounded-md placeholder:text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg cursor-pointer flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </form>
        </TaskForm>
        <section className="mt-6">
          <ul className="w-full mx-auto flex flex-col gap-2">
            {taskList?.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 bg-white rounded shadow"
              >
                <div className="flex gap-2 items-center w-full min-w-0">
                  <input
                    type="checkbox"
                    disabled={true}
                    checked={task.concluida}
                    className=""
                  />
                  {!isEditing ? (
                    <div>
                      <div>
                        <input
                          type="text"
                          value={task.descricao}
                          disabled
                          readOnly
                          className="w-full overflow-hidden text-ellipsis px-2 py-1 rounded"
                        ></input>
                        <div>
                          <button>
                            <Check />
                          </button>
                          <button>
                            <X />
                          </button>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-neutral-500">
                          Criada em: {task.dtCriacao}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        {!task.concluida ? (
                          <input
                            type="text"
                            value={task.descricao}
                            disabled
                            readOnly
                            className="w-full overflow-hidden text-ellipsis px-2 py-1 rounded"
                          ></input>
                        ) : (
                          <s className="w-full block px-2 py-1 overflow-hidden text-ellipsis whitespace-nowrap rounded">
                            {task.descricao}
                          </s>
                        )}
                      </div>
                      <div>
                        <span className="text-xs text-neutral-500">
                          Criada em: {task.dtCriacao}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* action buttons */}
                <div className="flex gap-2 mr-2">
                  {!isEditing ? (
                    <button
                      title="Concluir"
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-colors duration-200 cursor-pointer p-2 rounded-lg"
                    >
                      <Undo size={15} />
                    </button>
                  ) : (
                    <button
                      title="Concluir"
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200 cursor-pointer p-2 rounded-lg"
                    >
                      <Send size={15} />
                    </button>
                  )}
                  <button
                    title="Editar"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200 cursor-pointer p-2 rounded-lg"
                  >
                    <SquarePen size={15} />
                  </button>
                  <button
                    title="Excluir"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 cursor-pointer p-2 rounded-lg"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

"use client";

import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import { Check, Send, SquarePen, Trash2, Undo, X } from "lucide-react";
import React, { useEffect } from "react";

export default function Home() {
  const [editTaskId, setEditTaskId] = React.useState(null);
  const [editDesc, setEditDesc] = React.useState("");
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
        descricao: "Completar o projeto de front-end ",
        concluida: false,
        dtCriacao: "05/06/2025, 15:07",
      },
    ];
    setTaskList(initialTasks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    //remove espacos em branco no início e no final
    // if (!inputTask.trim()) return;
  };

  const toggleTaskDesc = (id) => {
    setIsEditing(!isEditing);
    if (id) {
      setEditTaskId(id);
      const task = taskList.find((task) => task.id === id);
      if (task) {
        // setInputTask(task.descricao);
        setEditDesc(task.descricao);
      }
    } else {
      setEditTaskId(null);
      setEditDesc("");
    }
  };

  const completeTask = (id) => {
    console.log("Concluir tarefa com id:", id);
    setTaskList((prev) =>
      prev.map((task) => (task.id === id ? { ...task, concluida: true } : task))
    );
  };

  const undoTask = (id) => {
    console.log("Reverter tarefa com id:", id);
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, concluida: false } : task
      )
    );
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
            onSubmit={(e) => handleSubmit(e)}
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
                className={`flex items-center justify-between p-3 bg-white rounded shadow transition-opacity duration-200`}
              >
                <div className="flex gap-4 items-center w-full min-w-0">
                  <input
                    type="checkbox"
                    disabled={true}
                    checked={task.concluida}
                    className=""
                  />
                  {editTaskId === task.id ? (
                    <div className="flex-1 min-w-0 w-full items-center">
                      <div className="flex items-center w-full">
                        <input
                          type="text"
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          autoFocus
                          className="w-full overflow-hidden text-ellipsis py-1 rounded border"
                        />
                        <div className="flex gap-1 items-center ml-2">
                          <button
                            className="text-white bg-green-500 hover:bg-green-600 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-lg"
                            onClick={() => {
                              setTaskList((prev) =>
                                prev.map((t) =>
                                  t.id === task.id
                                    ? { ...t, descricao: editDesc }
                                    : t
                                )
                              );
                              setEditTaskId(null);
                            }}
                          >
                            <Check size={16} />
                          </button>
                          <button
                            className="text-neutral-500 hover:bg-neutral-100 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-lg border border-neutral-300"
                            onClick={() => (
                              setEditTaskId(null), setIsEditing(false)
                            )}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col ">
                      <div className="text-left">
                        {!task.concluida ? (
                          <input
                            type="text"
                            value={task.descricao}
                            disabled
                            readOnly
                            className="w-full overflow-hidden text-ellipsis py-1 rounded"
                          />
                        ) : (
                          <div className="opacity-50">
                            <s className="w-full block  py-1 overflow-hidden text-ellipsis whitespace-nowrap rounded opcacity-50">
                              {task.descricao}
                            </s>
                          </div>
                        )}
                      </div>
                      <div>
                        <span
                          className={`text-xs text-neutral-500 ${
                            task.concluida ? "opacity-50" : ""
                          }`}
                        >
                          Criada em: {task.dtCriacao}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* action buttons */}
                {!isEditing && editTaskId !== task.id && (
                  <div className="flex gap-2 mr-2">
                    <button
                      title="Concluir ou reverter"
                      // onClick={() => toggleConcluida(task.id)}
                      className={`${
                        task.concluida
                          ? "text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                          : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                      } transition-colors duration-200 cursor-pointer p-2 rounded-lg`}
                    >
                      {task.concluida ? (
                        <Undo size={15} onClick={() => undoTask(task.id)} />
                      ) : (
                        <Send size={15} onClick={() => completeTask(task.id)} />
                      )}
                    </button>

                    <button
                      title="Editar"
                      disabled={task.concluida}
                      onClick={() => {
                        setEditTaskId(task.id);
                        setEditDesc(task.descricao);
                      }}
                      className={`${
                        task.concluida
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      } transition-colors duration-200 p-2 rounded-lg`}
                    >
                      <SquarePen size={15} onClick={() => toggleTaskDesc()} />
                    </button>

                    <button
                      title="Excluir"
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 cursor-pointer p-2 rounded-lg"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

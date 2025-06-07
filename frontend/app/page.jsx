"use client";

import TaskItem from "@/components/TaskItem";
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-blue/theme.css"; // tema
import "primereact/resources/primereact.min.css"; // core
import "primeicons/primeicons.css"; // ícones
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function Home() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const toast = useRef();

  // useEffect(() => {
  //   const initialTasks = [
  //     {
  //       id: 1,
  //       descricao: "Estudar React",
  //       concluida: false,
  //       dtCriacao: "05/06/2025, 15:07",
  //     },
  //     {
  //       id: 2,
  //       descricao: "Completar projeto de front-end ",
  //       concluida: true,
  //       dtCriacao: "05/06/2025, 15:07",
  //     },
  //   ];
  //   setTaskList(initialTasks);
  // }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Tarefa inválida",
        detail: "Digite uma tarefa válida!",
        life: 2000,
      });
      return;
    }

    const hasTask = taskList.find((task) => task.descricao === newTask.trim());

    if (hasTask) {
      toast.current.show({
        severity: "warn",
        summary: "Tarefa já existe",
        detail: `"${newTask}" tarefa já cadastrada!`,
        life: 2000,
      });
      return;
    }

    const newItem = {
      id: Date.now(),
      descricao: newTask.trim(),
      concluida: false,
      dtCriacao: new Date().toLocaleString(),
    };

    setTaskList([...taskList, newItem]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    const taskToDelete = taskList.find((task) => task.id === id);
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const confirmDeleteTask = (idTask) => {
    deleteTask(idTask);
    toast.current.show({
      severity: "success",
      summary: "Concluída",
      detail: `Tarefa ${idTask} excluída com sucesso`,
      life: 2000,
    });
  };

  const confirmDialogDeleteTask = (idTask) => {
    confirmDialog({
      message: `Tem certeza que deseja excluir esta tarefa ${idTask}?`,
      header: "Confirmar Exclusão",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Cancelar",
      defaultFocus: "accept",
      accept: () => confirmDeleteTask(idTask),
    });
  };

  const onEdit = (id, newDesc) => {
    if (newDesc.trim() === "") return;

    const hasTask = taskList.find(
      (task) => task.descricao === newDesc.trim() && task.id !== id
    );

    if (hasTask) {
      toast.current.show({
        severity: "warn",
        summary: "Tarefa já existe",
        detail: `"${newDesc}" tarefa já cadastrada!`,
        life: 2000,
      });

      return false;
    }

    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, descricao: newDesc.trim() } : task
      )
    );
    return true;
  };

  const onSendToCompleted = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, concluida: true } : task
      )
    );
  };

  //conclui a tarefa e mostra a mensagem de sucesso
  const confirmTaskCompletion = (idTask) => {
    onSendToCompleted(idTask);
    toast.current.show({
      severity: "success",
      summary: "Concluída",
      detail: `Tarefa ${idTask} concluída com sucesso!`,
      life: 2000,
    });
  };

  //confirmar conclusão da tarefa
  const confirmDialogTaskCompletion = (idTask) => {
    confirmDialog({
      message: `Tem certeza que deseja concluir esta tarefa ${idTask}?`,
      header: "Confirmar Conclusão",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Cancelar",
      defaultFocus: "accept",
      accept: () => confirmTaskCompletion(idTask),
    });
  };

  const onUndoCompletion = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, concluida: false } : task
      )
    );
  };

  //defaz a conclusão
  const confirmTaskUndo = (idTask) => {
    onUndoCompletion(idTask);
    toast.current.show({
      severity: "success",
      summary: "Desfeita",
      detail: `Tarefa ${idTask} desfeita com sucesso`,
      life: 2000,
    });
  };

  //confirmar o desfazimento da conclusao
  const confirmDialogTaskUndo = (idTask) => {
    confirmDialog({
      message: `Tem certeza que deseja desfazer a conclusão desta tarefa ${idTask}?`,
      header: "Confirmar desfazimento",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Cancelar",
      defaultFocus: "accept",
      accept: () => confirmTaskUndo(idTask),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="card">
        <Toast ref={toast} />
        <ConfirmDialog />
      </div>
      <div className="card mx-auto max-w-2xl">
        <section className="text-center mb-20 w-full">
          <h1 className="text-4xl font-bold mt-2">Lista de Tarefas</h1>
          <p className="text-sm text-gray-500">
            Organize suas atividades acadêmicas
          </p>
        </section>

        <div className="cardrounded-lg shadow-md bg-white px-6 py-4 w-full mx-auto">
          <form onSubmit={addTask} className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[24px] font-semibold text-neutral-700">
                Adicionar Nova Tarefa
              </h3>
              <span className="text-sm text-gray-500">
                {taskList.filter((t) => t.concluida).length}/{taskList.length}{" "}
                concluídas
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite sua tarefa aqui..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 p-2 border border-neutral-300 rounded-md placeholder:text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </form>
        </div>

        <section className="mt-6">
          {taskList.length === 0 ? (
            <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Nenhuma tarefa ainda
                </h3>
                <p className="text-gray-500">
                  Adicione sua primeira tarefa para começar!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {taskList.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  confirmDialogDeleteTask={() =>
                    confirmDialogDeleteTask(task.id)
                  }
                  confirmDialogTaskCompletion={confirmDialogTaskCompletion} //completar a tarefa
                  confirmDialogTaskUndo={confirmDialogTaskUndo} //desfazer a conclusão
                  onEdit={onEdit}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

import React, { SetStateAction, useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { NextPage } from "next";

interface Projeto {
  id: number;
  nome: string;
  tarefas: Tarefa[];
}

interface Tarefa {
  id: number;
  projeto: number;
  tarefa: string;
  completa: boolean;
}

type Props = {
  Projetos: Projeto[];
  nomeProjeto: string;
  handleTarefaCompleted: (idProjeto: number, idTarefa: number) => void;
  projetoSelecionado: number;
  edtProjetoSelecionado: (id: number, nome: string, tarefas: Tarefa[]) => void;
  edtTarefaProjeto: (tarefa: string) => void;
};

const TarefasList: NextPage<Props> = ({
  Projetos,
  nomeProjeto,
  handleTarefaCompleted,
  projetoSelecionado,
  edtProjetoSelecionado,
  edtTarefaProjeto,
}) => {
  const [novaTarefaInput, setNovaTarefaInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const adicionarTarefa = () => {
    if (novaTarefaInput.length > 0) {
      edtTarefaProjeto(novaTarefaInput);
      setNovaTarefaInput("");
      setErrorMessage("");
    } else {
      setErrorMessage("Preencha o campo");
    }
  };

  const handleTarefaInput = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setNovaTarefaInput(e.target.value);
  };

  const tarefaCompletada = (completada: boolean) => {
    if (completada) {
      return "line-through";
    } else {
      return "";
    }
  };

  if (Projetos === undefined) {
    return <h1 className="text-white text-2xl mb-2"> Carregando</h1>;
  } else {
    return (
      <main className="flex flex-col w-3/4">
        <h1 className="text-white text-2xl mb-2"> Adicionar Tarefa</h1>
        <div className="relative w-2/6 self-center">
          <input
            type="text"
            onChange={handleTarefaInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                adicionarTarefa();
              }
            }}
            value={novaTarefaInput}
            id="nomeProjetoInput"
            placeholder="Tarefa"
            className="w-full rounded-md text-gray-800 border-gray-200 py-2.5 px-2 shadow-sm sm:text-sm"
          />

          <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
            <button
              onClick={adicionarTarefa}
              type="button"
              className="rounded-full bg-indigo-500 p-0.5 text-white hover:bg-indigo-600"
            >
              <span className="sr-only">Submit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </button>
          </span>
        </div>

        <div className="text-red-400 text-sm px-2 py-1">{errorMessage}</div>

        <h2 className="text-2xl p-2 m-2">{nomeProjeto}</h2>

        <ul className="max-w-lg w-full flex flex-col self-center">
          {Projetos[
            Projetos?.findIndex((e) => e.id == projetoSelecionado)
          ]?.tarefas?.map((tarefa) => (
            <li
              key={tarefa.id}
              className={`${tarefaCompletada(
                tarefa.completa
              )} inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium border-indigo-500 hover:border-indigo-600 border text-white -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg`}
            >
              <div className="flex w-full gap-1 justify-center">
                <span
                  className={`inline-flex items-start px-2 rounded-full hover:line-through`}
                  onClick={() => {
                    handleTarefaCompleted(projetoSelecionado, tarefa.id);
                  }}
                >
                  {tarefa.tarefa}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    );
  }
};
export default TarefasList;

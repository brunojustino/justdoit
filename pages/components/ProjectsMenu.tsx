import React, { SetStateAction, useState } from "react";

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
  onAddProjeto: (newProjeto: {
    id: number;
    nome: string;
    tarefas: Tarefa[];
  }) => void;
  removeProjeto: (id: number) => void;
  edtProjetoSelecionado: (id: number, nome: string, tarefas: Tarefa[]) => void;
};

const ProjectsMenu: React.FC<Props> = ({
  Projetos,
  onAddProjeto,
  removeProjeto,
  edtProjetoSelecionado,
}) => {
  const [novoProjetoInput, setNovoProjetoInput] = useState("hidden");
  const [nomeProjetoInput, setNomeProjetoInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const adicionarProjeto = () => {
    const novoId = Date.now();
    const novoProjeto: Projeto = {
      id: novoId,
      nome: nomeProjetoInput,
      tarefas: [],
    };
    if (nomeProjetoInput.length > 0) {
      if (isValidProjectInput(nomeProjetoInput)) {
        edtProjetoSelecionado(novoId, novoProjeto.nome, novoProjeto.tarefas);
        onAddProjeto(novoProjeto);
        setNomeProjetoInput("");
        setNovoProjetoInput("hidden");
        setErrorMessage("");
      } else {
        setErrorMessage("Apenas letras e números");
      }
    } else {
      setErrorMessage("Preencha o campo");
    }
  };

  const handleRemove = (projeto: number) => {
    removeProjeto(projeto);
    edtProjetoSelecionado(
      Projetos[0].id,
      Projetos[0].nome,
      Projetos[0].tarefas
    );
  };

  const handleAddProjectBtn = () => {
    novoProjetoInput == "hidden"
      ? setNovoProjetoInput("")
      : setNovoProjetoInput("hidden");
  };

  const isValidProjectInput = (input: string) => {
    const isValid = /^[a-zA-Z0-9_ ]*$/.test(input);

    return isValid;
  };

  const handleProjectInput = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setNomeProjetoInput(e.target.value);
  };

  return (
    <nav className="px-4 border-indigo-500 bg-gray-800 border rounded-lg w-1/4 max-w-sm">
      <div className="flex items-center justify-center">
        <h3 className="text-white text-2xl my-2">Novo Projeto</h3>

        <span className="grid w-10 place-content-center mt-1">
          <button
            type="button"
            className="rounded-full bg-indigo-500 p-0.5 text-white hover:bg-indigo-600"
            onClick={handleAddProjectBtn}
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

      <div className={`relative mx-2 mb- ${novoProjetoInput}`}>
        <input
          type="text"
          id="nomeProjetoInput"
          onChange={handleProjectInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              adicionarProjeto();
            }
          }}
          value={nomeProjetoInput}
          placeholder="Projeto"
          className="w-full rounded-md border-gray-200 py-2.5 px-2 shadow-sm sm:text-sm text-gray-800"
        />
        <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
          <button
            type="button"
            className="rounded-full bg-indigo-500 p-0.5 text-white hover:bg-indigo-600"
            onClick={adicionarProjeto}
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

      <ul className="max-w-lg w-full flex flex-col self-center gap-1 mt-2">
        {Projetos &&
          Projetos.map((projeto) => (
            <li
              key={projeto.id}
              onClick={() => {
                console.log(projeto.id, projeto.nome);
                edtProjetoSelecionado(
                  projeto.id,
                  projeto.nome,
                  projeto.tarefas
                );
              }}
              className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium hover:bg-indigo-500 hover:border-indigo-600 border-0 rounded-xl text-white -mt-px "
            >
              <div className="flex w-full gap-1 justify-center">
                <span className="inline-flex items-start px-2 rounded-full">
                  {projeto.nome}
                </span>
                <span
                  onClick={() => {
                    handleRemove(projeto.id);
                  }}
                  className="inline-flex items-center py-1 px-2 rounded-full text-xs font-medium bg-red-500 text-white max-h-6 my-auto hover:bg-red-400"
                >
                  X
                </span>
              </div>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default ProjectsMenu;

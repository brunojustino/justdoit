import React, { useEffect, useState } from "react";
import ProjectsMenu from "./ProjectsMenu";
import TarefasList from "./TarefasList";

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

const Main = () => {
  const [projetos, setProjeto] = useState<Projeto[]>([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(0);
  const [nomeProjeto, setNomeProjeto] = useState("");

  useEffect(() => {
    const dataString = window.localStorage.getItem("projetoSession");
    if (dataString) {
      const data = JSON.parse(dataString) as Projeto[];
      setProjeto(data);
    }
  }, []);

  const addProjeto = (novoProjeto: Projeto) => {
    const uptProjeto = projetos;
    uptProjeto.push(novoProjeto);
    setProjeto(uptProjeto);
    window.localStorage.setItem("projetoSession", JSON.stringify(uptProjeto));
  };

  const removeProjeto = (id: number) => {
    const uptProjeto = projetos.filter((projeto) => {
      return projeto.id !== id;
    });
    setProjeto(uptProjeto);
    window.localStorage.setItem("projetoSession", JSON.stringify(uptProjeto));
  };

  const edtTarefaProjeto = (novaTarefaInput: string) => {
    setProjeto(
      projetos.map((projeto) =>
        projeto.id === projetoSelecionado
          ? {
              ...projeto,
              tarefas: [
                ...projeto.tarefas,
                {
                  id: projeto.tarefas.length + 1,
                  projeto: projeto.id,
                  tarefa: novaTarefaInput,
                  completa: false,
                },
              ],
            }
          : projeto
      )
    );
    const getProjetos = projetos;
    window.localStorage.setItem("projetoSession", JSON.stringify(getProjetos));
  };

  const handleTarefaCompleted = (idProjeto: number, idTarefa: number) => {
    const projetoToUpdate =
      projetos[projetos.findIndex((p) => p.id == projetoSelecionado)];
    const tarefaToUpdateIndex = projetoToUpdate.tarefas.findIndex(
      (tarefa) => tarefa.id === idTarefa
    );
    const tarefaToUpdate = projetoToUpdate.tarefas[tarefaToUpdateIndex];
    if (tarefaToUpdate.completa) {
      tarefaToUpdate.completa = false;
    } else {
      tarefaToUpdate.completa = true;
    }
    projetoToUpdate.tarefas[tarefaToUpdateIndex] = tarefaToUpdate;

    const updatedProjects = projetos.map((projeto) => {
      if (projeto.id === idProjeto) {
        return projetoToUpdate;
      }
      return projeto;
    });
    setProjeto(updatedProjects);
    window.localStorage.setItem(
      "projetoSession",
      JSON.stringify(updatedProjects)
    );
  };

  const changeProjetoSelecionado = (id: number, nome: string) => {
    setProjetoSelecionado(id);
    setNomeProjeto(nome);
  };

  return (
    <section className="flex grow basis-auto text-white">
      <ProjectsMenu
        Projetos={projetos}
        onAddProjeto={addProjeto}
        removeProjeto={removeProjeto}
        edtProjetoSelecionado={changeProjetoSelecionado}
      />
      <TarefasList
        Projetos={projetos}
        handleTarefaCompleted={handleTarefaCompleted}
        projetoSelecionado={projetoSelecionado}
        edtProjetoSelecionado={changeProjetoSelecionado}
        nomeProjeto={nomeProjeto}
        edtTarefaProjeto={edtTarefaProjeto}
      />
    </section>
  );
};

export default Main;

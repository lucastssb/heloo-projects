import React, { useContext, useState, useEffect } from "react";
import styles from "../styles/pages/Home.module.css";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { ProjectsContext } from "../contexts/ProjectsContext";
import ProjectItem from "../components/ProjectItem";

interface Project {
  name: string;
  description: string;
  viability: number;
  start_date: string;
  end_date: string;
  status: string;
  value: number;
  name_responsible: string;
  slug: string;
}

function getCurrentDateFormatted() {
  return new Date().toISOString().slice(0, 10);
}

export default function Home() {
  const { projects } = useContext(ProjectsContext);

  if (!projects) return <h1>Carregando</h1>;

  const [filterProjects, setFilterProjects] = useState([] as Project[]);
  const [viability, setViability] = useState("");
  const [initDate, setInitDate] = useState("");
  const [situation, setSituation] = useState("");

  useEffect(() => {
    setFilterProjects(projects);
  }, [projects]);

  useEffect(() => {
    handleFilter();
  }, [viability, initDate, situation]);

  

  function handleFilter() {
    const filteredProjects = projects.filter((project) => {
      if (viability !== "" && project.viability !== parseInt(viability)) return;
      if (situation !== "" && project.status !== situation) return;

      return project;
    });

    setFilterProjects(filteredProjects);
  }

  return (
    <main className={styles.homeContainer}>
      <div className={styles.titleBar}>
        <h2>Projetos</h2>
        <button type="button">
          <MdFilterList size={25} />
        </button>
      </div>
      <div className={styles.filterBar}>
        <div className={styles.fieldWrapper}>
          <label htmlFor="viability">Viabilidade</label>
          <select
            name="viability-filter"
            id="viability"
            value={viability}
            onChange={(event) => {
              setViability(event.target.value);
            }}
          >
            <option value="">Qualquer</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="situation">Situacao</label>
          <select
            name="situation-filter"
            id="situation"
            value={situation}
            onChange={(event) => {
              setSituation(event.target.value);
            }}
          >
            <option value="">Qualquer</option>
            <option value="Planejado">Planejado</option>
            <option value="Em desenvolvimento">Em desenvolvimento</option>
            <option value="Canselado">Cancelado</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>
        <div className={styles.fieldWrapper}>
          <label htmlFor="init-date">Data de inicio</label>
          <input
            type="date"
            id="int-date"
            value={initDate}
            onChange={(event) => {
              setInitDate(event.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.projectsList}>
        {filterProjects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </div>
      <Link href="/create-project" passHref>
        <a className={styles.floatingButton}>
          <FiPlus size={40} />
        </a>
      </Link>
    </main>
  );
}

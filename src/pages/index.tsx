import React, { useContext } from "react";
import styles from "../styles/pages/Home.module.css";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { ProjectsContext } from "../contexts/ProjectsContext";
import ProjectItem from "../components/ProjectItem";
import { GetServerSideProps } from "next";
import { useGetProjects } from "../hooks/project";

interface Project {
  name: string;
  description: string;
  viability: number;
  start_date: Date;
  end_date: Date;
  status: string;
  value: number;
  name_responsible: string;
}
interface HomeProps {
  projects: Project[];
}

export default function Home({ projects } : HomeProps) {
  //const { projects } = useContext(ProjectsContext);

  if (projects === undefined) return <h1>Carregando</h1>

  
  return (
    <main className={styles.homeContainer}>
      <div className={styles.titleBar}>
        <h2>Projetos</h2>
        <button type="button">
          <MdFilterList size={25} />
        </button>
      </div>
      <div className={styles.projectsList}>
       {projects.map((project, index) => (
          <ProjectItem 
            key={index} 
            project={project} 
          />
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


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await useGetProjects();
  //console.log(apiData.data);
  return {
    props: {
      projects: data,
    }
  }
}
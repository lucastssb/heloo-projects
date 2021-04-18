import React, { useContext } from "react";
import styles from "../styles/pages/Home.module.css";
import { MdFilterList } from "react-icons/md";
import { ProjectsContext } from "../contexts/ProjectsContext";
import ProjectItem from "../components/ProjectItem";
import { GetServerSideProps } from "next";
import api from "../services/api";

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

interface ApiData {
  data : Project[];
}

interface HomeProps {
  apiData: ApiData;
}

export default function Home({apiData} : HomeProps) {
  const { data: projects } = apiData;

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
    </main>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiData = await api.get('api/v1/projects');
  return {
    props: {
      apiData: apiData.data
    }
  }
}
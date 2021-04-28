import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { parseISO } from "date-fns";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { GoVerified } from "react-icons/go";
import { SiVerizon } from "react-icons/si";
import { IoCloseSharp } from "react-icons/io5";

import styles from "../styles/components/ProjectItem.module.css";
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

interface ProjectItemProps {
  project: Project;
}

const Color = {
  1: styles.redBackground,
  2: styles.orangeBackground,
  3: styles.yellowBackground,
  4: styles.greenBackground,
  5: styles.blueBackground,
};

export default function ProjectItem({ project }: ProjectItemProps) {
  const { updateProject, getProject } = useContext(ProjectsContext);
  const [wasAltered, setWasAltered] = useState(false);

  function handleCompleteProject() {
    updateProject(
      project.description,
      project.viability,
      "Concluído",
      project.slug
    );
  }

  function handleCancelProject() {
    updateProject(
      project.description,
      project.viability,
      "Cancelado",
      project.slug
    );
  }

  return (
    <div
      className={`${styles.projectItemContainer} ${Color[project.viability]}`}
    >
      <h1>{project.name}</h1>
      <span>{project.status}</span>
      <div className={styles.dateAndOptionsContainer}>
        <span>{`${parseISO(
          project.start_date
        ).toLocaleDateString()} - ${parseISO(
          project.end_date
        ).toLocaleDateString()}`}</span>
      </div>

      {project.viability === 5 && (
        <div className={styles.viabilityIcon}>
          <GoVerified color="#ffffff" size={20} />
        </div>
      )}
      <div className={styles.projectOptionsContainer}>
        <button
          disabled={
            wasAltered ||
            project.status === "Concluído" ||
            project.status === "Cancelado"
          }
          className={styles.cancelButton}
          onClick={handleCancelProject}
          type="button"
        >
          <IoCloseSharp size={20} color="#ff4d4d" />
        </button>
        <button
          disabled={
            wasAltered ||
            project.status === "Concluído" ||
            project.status === "Cancelado"
          }
          className={styles.completeButton}
          onClick={handleCompleteProject}
          type="button"
        >
          <SiVerizon size={15} color="#22d422" />
        </button>
      </div>
      <Link href={`/project/${project.slug}`} passHref>
        <a />
      </Link>
    </div>
  );
}

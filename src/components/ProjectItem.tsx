import { GoVerified } from 'react-icons/go';

import styles from '../styles/components/ProjectItem.module.css';

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

interface ProjectItemProps {
    project: Project;
}

export default function ProjectItem({ project } : ProjectItemProps) {
    
    return(
        <div className={styles.projectItemContainer}>
            <h1>{project.name}</h1>
            <span>{project.status}</span>
            <div className={styles.dateAndOptionsContainer}>
                <span>{project.start_date}</span>
                <span>{project.end_date}</span>
            </div>

            {project.viability === 5 && <div className={styles.viabilityIcon}><GoVerified color='#ffffff' size={20}/></div>}
        </div>
    );
}
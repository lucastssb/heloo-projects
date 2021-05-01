import React, { useContext, useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import Link from 'next/link';
import Head from 'next/head';
import { FiPlus } from 'react-icons/fi';
import { MdFilterList } from 'react-icons/md';
import { ProjectsContext } from '../contexts/ProjectsContext';
import ProjectItem from '../components/ProjectItem';
import ShimmerProjectItem from '../components/ShimmerProjectItem';
import styles from '../styles/pages/Home.module.css';

interface Project {
    _id: string;
    name: string;
    description: string;
    viability: number;
    init_date: string;
    end_date: string;
    status: string;
    execution_value: number;
    responsible_person: string;
    slug: string;
}

function getCurrentDateFormatted() {
    return new Date().toISOString().slice(0, 10);
}

export default function Home() {
    const { projects, isApiDataLoaded } = useContext(ProjectsContext);

    const [filterProjects, setFilterProjects] = useState([] as Project[]);
    const [viability, setViability] = useState('');
    const [initDate, setInitDate] = useState('');
    const [situation, setSituation] = useState('');

    const [showFilter, setShowFilter] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        setFilterProjects(projects);
    }, [projects]);

    useEffect(() => {
        handleFilter();
    }, [viability, initDate, situation]);

    function resetFilters() {
        setInitDate('');
        setSituation('');
        setViability('');
        setIsInputFocused(false);
    }

    function handleFilter() {
        const filteredProjects = projects.filter(project => {
            if (viability !== '' && project.viability !== parseInt(viability))
                return;
            if (situation !== '' && project.status !== situation) return;
            if (
                initDate !== '' &&
                parseISO(initDate).toDateString() !==
                    parseISO(project.init_date).toDateString()
            )
                return;

            return project;
        });

        setFilterProjects(filteredProjects);
    }

    return (
        <>
            <Head>
                <title>Hello Projects</title>
            </Head>
            <main className={styles.homeContainer}>
                <div className={styles.titleBar}>
                    <h2>Projetos</h2>
                    <button
                        type="button"
                        onClick={() => {
                            setShowFilter(!showFilter);
                            if (showFilter) resetFilters();
                        }}
                    >
                        <MdFilterList size={25} />
                    </button>
                </div>
                <div
                    className={`${styles.filterBar} ${
                        showFilter
                            ? styles.filterBarActive
                            : styles.filterBarInactive
                    }`}
                >
                    <div className={styles.fieldWrapper}>
                        <label htmlFor="viability">Viabilidade</label>
                        <select
                            name="viability-filter"
                            id="viability"
                            value={viability}
                            onChange={event => {
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
                        <label htmlFor="situation">Situação</label>
                        <select
                            name="situation-filter"
                            id="situation"
                            value={situation}
                            onChange={event => {
                                setSituation(event.target.value);
                            }}
                        >
                            <option value="">Qualquer</option>
                            <option value="Planejado">Planejado</option>
                            <option value="Em desenvolvimento">
                                Em desenvolvimento
                            </option>
                            <option value="Canselado">Cancelado</option>
                            <option value="Concluído">Concluído</option>
                        </select>
                    </div>
                    <div className={styles.fieldWrapper}>
                        <label htmlFor="init-date">Data de início</label>
                        <input
                            placeholder="Qualquer"
                            type={isInputFocused ? 'date' : 'text'}
                            onFocus={() => setIsInputFocused(true)}
                            id="int-date"
                            value={initDate}
                            onChange={event => {
                                setInitDate(event.target.value);
                            }}
                        />
                    </div>
                </div>
                {isApiDataLoaded ? (
                    <div className={styles.projectsList}>
                        {filterProjects.map(project => (
                            <ProjectItem key={project._id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.projectsList}>
                        {[0, 1, 2, 3, 4, 5].map((item, index) => (
                            <ShimmerProjectItem key={index} />
                        ))}
                    </div>
                )}
                <Link href="/create-project" passHref>
                    <a className={styles.floatingButton}>
                        <FiPlus size={40} />
                    </a>
                </Link>
            </main>
        </>
    );
}

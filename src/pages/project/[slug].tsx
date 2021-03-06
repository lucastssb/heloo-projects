import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import { BiEditAlt, BiArrowBack } from 'react-icons/bi';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ProjectsContext } from '../../contexts/ProjectsContext';

import styles from '../../styles/pages/ProjectDetails.module.css';
import api from '../../services/api';

interface Project {
    name: string;
    description: string;
    viability: number;
    init_date: string;
    end_date: string;
    final_status_date: string;
    status: string;
    execution_value: number;
    responsible_person: string;
    slug: string;
}

interface ProjectDetailsProps {
    project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    const router = useRouter();
    const { updateProject, deleteProject, isLoading } = useContext(
        ProjectsContext,
    );

    const [viability, setViability] = useState(project.viability);
    const [situation, setSituation] = useState(project.status);
    const [description, setDescription] = useState(project.description);
    const [isEditable, setIsEditable] = useState(false);
    const [hasDescriptionError, setHasDescriptionError] = useState(false);

    useEffect(() => {
        if (!isLoading) router.replace(router.asPath);
    }, [isLoading]);

    function inputValidator() {
        let errors = 0;
        if (description === '') {
            setHasDescriptionError(true);
            errors++;
        }
        return errors;
    }

    async function handleSave(event: FormEvent) {
        event.preventDefault();
        if (inputValidator() === 0) {
            updateProject(description, viability, situation, project.slug);
            setIsEditable(false);
            router.replace(router.asPath);
        }
    }

    async function handleDelete(event: FormEvent) {
        event.preventDefault();

        deleteProject(project.slug);

        router.push('/');
    }

    return (
        <>
            <Head>
                <title>{project.name}</title>
            </Head>
            <div className={styles.projectDetailsContainer}>
                <div>
                    <Link href="/" passHref>
                        <a className={styles.goBackLink}>
                            <BiArrowBack size={22} />
                        </a>
                    </Link>
                </div>
                <div className={styles.titleBar}>
                    <h1>{project.name}</h1>
                    <button
                        disabled={
                            project.status === 'Conclu??do' ||
                            project.status === 'Cancelado'
                        }
                        type="button"
                        onClick={() => setIsEditable(!isEditable)}
                    >
                        <BiEditAlt
                            size={22}
                            color={isEditable ? '#00A0E6' : '#3C465A'}
                        />
                    </button>
                </div>
                <div>
                    <form
                        onSubmit={isEditable ? handleSave : handleDelete}
                        className={styles.formContainer}
                    >
                        <div className={styles.multipleInputs}>
                            <div
                                className={`${styles.inputBlock} ${styles.initDateBlock}`}
                            >
                                <label htmlFor="init-date">
                                    Data de in??cio
                                </label>
                                <input
                                    disabled
                                    type="date"
                                    id="int-date"
                                    value={parseISO(project.init_date)
                                        .toISOString()
                                        .slice(0, 10)}
                                />
                            </div>
                            <div
                                className={`${styles.inputBlock} ${styles.endDateBlock}`}
                            >
                                <label htmlFor="end-date">
                                    Data de t??rmino
                                </label>
                                <input
                                    disabled
                                    type="date"
                                    id="end-date"
                                    value={parseISO(project.end_date)
                                        .toISOString()
                                        .slice(0, 10)}
                                />
                            </div>
                        </div>

                        <div className={styles.multipleInputs}>
                            <div className={styles.inputBlock}>
                                <label htmlFor="execution-value">
                                    Valor de execu????o
                                </label>
                                <input
                                    disabled
                                    type="number"
                                    id="execution-value"
                                    value={project.execution_value}
                                />
                            </div>
                            <div
                                className={`${styles.selectBlock} ${styles.situationBlock}`}
                            >
                                <label htmlFor="situation">Situa????o</label>
                                <select
                                    disabled={!isEditable}
                                    name="situation-options"
                                    id="situation"
                                    value={situation}
                                    onChange={event =>
                                        setSituation(event.target.value)
                                    }
                                >
                                    <option value="Planejado">Planejado</option>
                                    <option value="Em desenvolvimento">
                                        Em desenvolvimento
                                    </option>
                                    <option value="Cancelado">Cancelado</option>
                                    <option value="Conclu??do">Conclu??do</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.multipleInputs}>
                            <div className={styles.inputBlock}>
                                <label htmlFor="responsible-person">
                                    Pessoa responsavel
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="responsible-person"
                                    value={project.responsible_person}
                                />
                            </div>
                            <div
                                className={`${styles.selectBlock} ${styles.viabilityBlock}`}
                            >
                                <label htmlFor="viability">Viabilidade</label>
                                <select
                                    disabled={!isEditable}
                                    name="viability-options"
                                    id="viability"
                                    value={viability}
                                    onChange={event =>
                                        setViability(
                                            parseInt(event.target.value),
                                        )
                                    }
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.inputBlock}>
                            <label htmlFor="description">Descri????o</label>
                            <textarea
                                disabled={!isEditable}
                                id="description"
                                value={description}
                                onChange={event => {
                                    setDescription(event.target.value);
                                    if (
                                        description !== '' &&
                                        hasDescriptionError === true
                                    )
                                        setHasDescriptionError(false);
                                }}
                            />
                            <span
                                className={
                                    hasDescriptionError === true
                                        ? styles.warnActive
                                        : styles.warnInactive
                                }
                            >
                                Esse campo nao pode ser vazio
                            </span>
                        </div>

                        {project.final_status_date && (
                            <span className={styles.statusInfo}>{`Esse projeto foi ${project.status.toLowerCase()} no dia ${parseISO(project.final_status_date).toLocaleDateString()}`}</span>
                        )}

                        {isEditable ? (
                            <button className={styles.buttonSave} type="submit">
                                Salvar
                            </button>
                        ) : (
                            <button
                                className={styles.buttonDelete}
                                type="submit"
                            >
                                Excluir
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { slug } = ctx.query;
    const response = await api.get(`/api/v1/project/${slug}`);
    return {
        props: {
            project: response.data,
        },
    };
};

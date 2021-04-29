import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { parseISO } from "date-fns";
import { useRouter } from "next/router";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { BiArrowBack } from "react-icons/bi";
import styles from "../styles/pages/CreateProject.module.css";

function getCurrentDateFormatted() {
  return new Date().toISOString().slice(0, 10);
}

export default function CreateProject() {
  const [name, setName] = useState("");
  const [viability, setViability] = useState(1);
  const [initDate, setInitDate] = useState(getCurrentDateFormatted());
  const [endDate, setEndDate] = useState(getCurrentDateFormatted());
  const [executionValue, setExecutionValue] = useState("0.00");
  const [situation, setSituation] = useState("Planejado");
  const [responsiblePerson, setResponsiblePerson] = useState("");
  const [description, setDescription] = useState("");

  const [hasDescriptionError, setHasDescriptionError] = useState(false);
  const [hasPersonError, setHasPersonError] = useState(false);
  const [hasValueError, setHasValueError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);

  useEffect(() => {
    const initDateISO = parseISO(initDate);
    const endDateISO = parseISO(endDate);

    if (endDateISO.getTime() < initDateISO.getTime()) {
      setEndDate(initDate);
    }
  }, [initDate]);

  function formValidator() {
    let errors = 0;
    if (description === "") {
      setHasDescriptionError(true);
      errors++;
    }

    if (executionValue === "") {
      setHasValueError(true);
      errors++;
    }

    if (responsiblePerson === "") {
      setHasPersonError(true);
      errors++;
    }

    if (name === "") {
      setHasNameError(true);
      errors++;
    }

    return errors;
  }

  const { createProject, refreshApiData } = useContext(ProjectsContext);
  const [hasSameName, setHasSameName] = useState(false);

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    if (formValidator() === 0) {
      try {
        const result = await createProject(
          name,
          description,
          viability,
          new Date(initDate),
          new Date(endDate),
          situation,
          parseFloat(executionValue),
          responsiblePerson
        );
        if (result.data) {
          refreshApiData();
          router.push("/");
        }
      } catch (error) {
        setHasSameName(true);
        refreshApiData();
      }
    }
  }

  return (
    <>
      <Head>
        <title>Criar Projeto</title>
      </Head>
      <div className={styles.createProjectContainer}>
        <div>
          <Link href="/" passHref>
            <a className={styles.goBackLink}>
              <BiArrowBack size={22} />
            </a>
          </Link>
        </div>
        <h2>Criar projeto</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.multipleInputs}>
            <div className={styles.inputBlock}>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (name !== "" && hasNameError === true)
                    setHasNameError(false);
                }}
              />
              <span
                className={
                  hasNameError === true
                    ? styles.warnActive
                    : styles.warnInactive
                }
              >
                Esse campo não pode ser vazio
              </span>
              {hasSameName && (
                <span>Já existe um projeto com o mesmo nome</span>
              )}
            </div>
            <div className={`${styles.selectBlock} ${styles.viabilityBlock}`}>
              <label htmlFor="viability">Viabilidade</label>
              <select
                name="viability-options"
                id="viability"
                value={viability}
                onChange={(event) => setViability(parseInt(event.target.value))}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className={styles.multipleInputs}>
            <div className={`${styles.inputBlock} ${styles.initDateBlock}`}>
              <label htmlFor="init-date">Data de início</label>
              <input
                type="date"
                id="int-date"
                value={initDate}
                onChange={(event) => setInitDate(event.target.value)}
              />
            </div>
            <div className={`${styles.inputBlock} ${styles.endDateBlock}`}>
              <label htmlFor="end-date">Data de término</label>
              <input
                type="date"
                id="end-date"
                min={initDate}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.multipleInputs}>
            <div className={styles.inputBlock}>
              <label htmlFor="execution-value">Valor de execução</label>
              <input
                step="0.01"
                min="0"
                placeholder="0,00"
                type="number"
                id="execution-value"
                onChange={(event) => {
                  const value = parseFloat(event.target.value);
                  setExecutionValue(value.toFixed(2));
                }}
              />
              <span
                className={
                  hasValueError === true
                    ? styles.warnActive
                    : styles.warnInactive
                }
              >
                Esse campo não pode ser vazio
              </span>
            </div>
            <div className={`${styles.selectBlock} ${styles.situationBlock}`}>
              <label htmlFor="situation">Situação</label>
              <select
                name="situation-options"
                id="situation"
                value={situation}
                onChange={(event) => setSituation(event.target.value)}
              >
                <option value="Planejado">Planejado</option>
                <option value="Em desenvolvimento">Em desenvolvimento</option>
                <option value="Canselado">Cancelado</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="responsible-person">Pessoa responsavel</label>
            <input
              type="text"
              id="responsible-person"
              value={responsiblePerson}
              onChange={(event) => {
                setResponsiblePerson(event.target.value);
                if (responsiblePerson !== "" && hasPersonError === true)
                  setHasPersonError(false);
              }}
            />
            <span
              className={
                hasPersonError === true
                  ? styles.warnActive
                  : styles.warnInactive
              }
            >
              Esse campo não pode ser vazio
            </span>
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                if (description !== "" && hasDescriptionError === true)
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
              Esse campo não pode ser vazio
            </span>
          </div>
          <button type="submit">Criar</button>
        </form>
      </div>
    </>
  );
}

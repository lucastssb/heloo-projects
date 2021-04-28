import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../styles/pages/CreateProject.module.css";
import { ProjectsContext } from "../contexts/ProjectsContext";

function getCurrentDateFormatted() {
  return new Date().toISOString().slice(0, 10);
}

export default function CreateProject() {
  const [name, setName] = useState("");
  const [viability, setViability] = useState(1);
  const [initDate, setInitDate] = useState(getCurrentDateFormatted());
  const [endDate, setEndDate] = useState(getCurrentDateFormatted());
  const [executionValue, setExecutionValue] = useState(0);
  const [situation, setSituation] = useState("Planejado");
  const [responsiblePerson, setResponsiblePerson] = useState("");
  const [description, setDescription] = useState("");

  const [hasDescriptionError, setHasDescriptionError] = useState(false);
  const [hasPersonError, setHasPersonError] = useState(false);
  const [hasValueError, setHasValueError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);

  function formValidator() {
    let errors = 0;
    if (description === "") {
      setHasDescriptionError(true);
      errors++;
    }

    if (executionValue === 0) {
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
          executionValue,
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
    <div className={styles.createProjectContainer}>
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
                if (name !== '' && hasNameError === true)
                  setHasNameError(false);
              }}
            />
            <span
              className={
                hasNameError === true ? styles.warnActive : styles.warnInactive
              }
            >
              Esse campo nao pode ser vazio
            </span>
            {hasSameName && <span>Ja existe um projeto com o mesmo nome</span>}
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
            <label htmlFor="init-date">Data de inicio</label>
            <input
              type="date"
              id="int-date"
              value={initDate}
              onChange={(event) => setInitDate(event.target.value)}
            />
          </div>
          <div className={`${styles.inputBlock} ${styles.endDateBlock}`}>
            <label htmlFor="end-date">Data de termino</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.multipleInputs}>
          <div className={styles.inputBlock}>
            <label htmlFor="execution-value">Valor de execucao</label>
            <input
              type="number"
              id="execution-value"
              value={executionValue}
              onChange={(event) => {
                setExecutionValue(parseInt(event.target.value) || 0);
                if (executionValue !== 0 && hasValueError === true)
                  setHasValueError(false);
              }}
            />
            <span
              className={
                hasValueError === true ? styles.warnActive : styles.warnInactive
              }
            >
              Esse campo nao pode ser vazio
            </span>
          </div>
          <div className={`${styles.selectBlock} ${styles.situationBlock}`}>
            <label htmlFor="situation">Situacao</label>
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
              hasPersonError === true ? styles.warnActive : styles.warnInactive
            }
          >
            Esse campo nao pode ser vazio
          </span>
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="description">Descricao</label>
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
            Esse campo nao pode ser vazio
          </span>
        </div>

        <button type="submit">Criar</button>
        <Link href="/" passHref>
          <a>Cancelar</a>
        </Link>
      </form>
    </div>
  );
}

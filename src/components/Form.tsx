import React, { useState }  from "react";
import Link from "next/link";

import styles from "../styles/components/Form.module.css";
import { useCreateProject, useDeleteProject } from "../hooks/project";

interface FormProps {
  disabled?: boolean;
  partiallyDisabled?: boolean;
}

function getCurrentDateFormatted() {
  return new Date().toISOString().slice(0,10); 
}

export default function Form({ disabled, partiallyDisabled}: FormProps) {
  const [name, setName] = useState('');
  const [viability, setViability] = useState(1);
  const [initDate, setInitDate] = useState(getCurrentDateFormatted());
  const [endDate, setEndDate] = useState(getCurrentDateFormatted());
  const [executionValue, setExecutionValue] = useState(0);
  const [situation, setSituation] = useState('Planejado');
  const [responsiblePerson, setResponsiblePerson] = useState('');
  const [description, setDescription] = useState('');

  async function onHandleSubmit(event) {
      event.preventDefault();

      //const result = await useCreateProject(name, description, viability, initDate, endDate, situation, executionValue, responsiblePerson);

      //console.log(result);
  }

  async function deleteProject(event) {
    event.preventDefault();

    try{
      const result = await useDeleteProject('decimo-projeto');
      console.log(result);
    } catch(error) {
      console.error(error.message);
    }

    
  }

  return (
    <form onSubmit={deleteProject} className={styles.formContainer}>
      <div className={styles.multipleInputs}>
        <div className={styles.inputBlock}>
          <label htmlFor="name">Nome</label>
          <input disabled={disabled || partiallyDisabled} type="text" id="name" value={name} onChange={event => setName(event.target.value)}/>
        </div>
        <div className={styles.selectBlock}>
          <label htmlFor="viability">Viabilidade</label>
          <select disabled={disabled} name="viability-options" id="viability" value={viability} onChange={event => setViability(parseInt(event.target.value))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className={styles.multipleInputs}>
        <div className={styles.inputBlock}>
          <label htmlFor="init-date">Data de inicio</label>
          <input disabled={disabled || partiallyDisabled} type="date" id="int-date" value={initDate} onChange={event => setInitDate(event.target.value)}/>
        </div>
        <div className={styles.inputBlock} style={{ alignItems: "flex-end" }}>
          <label htmlFor="end-date">Data de termino</label>
          <input disabled={disabled || partiallyDisabled} type="date" id="end-date" value={endDate} onChange={event => setEndDate(event.target.value)}/>
        </div>
      </div>

      <div className={styles.multipleInputs}>
        <div className={styles.inputBlock}>
          <label htmlFor="execution-value">Valor de execucao</label>
          <input disabled={disabled || partiallyDisabled} type="number" id="execution-value" value={executionValue} onChange={event => setExecutionValue(parseInt(event.target.value) || 0)}/>
        </div>
        <div className={styles.selectBlock}>
          <label htmlFor="situation">Situacao</label>
          <select disabled={disabled} name="situation-options" id="situation" value={situation} onChange={event => setSituation(event.target.value)}>
            <option value="Planejado">Planejado</option>
            <option value="Em desenvolvimento">Em desenvolvimento</option>
            <option value="Canselado">Cancelado</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>
      </div>
      <div className={styles.inputBlock}>
        <label htmlFor="responsible-person">Pessoa responsavel</label>
        <input disabled={disabled || partiallyDisabled} type="text" id="responsible-person" value={responsiblePerson} onChange={event => setResponsiblePerson(event.target.value)}/>
      </div>
      <div className={styles.inputBlock}>
        <label htmlFor="description">Descricao</label>
        <textarea disabled={disabled} id="description" value={description} onChange={event => setDescription(event.target.value)}/>
      </div>

      <button type="submit">
        Criar
      </button>
      <Link href="/" passHref>
        <a>Cancelar</a>
      </Link>
    </form>
  );
}

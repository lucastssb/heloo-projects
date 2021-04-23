import React, { useState }  from "react";
import Link from "next/link";

import styles from "../styles/components/Form.module.css";

interface FormProps {
  disabled?: boolean;
  partiallyDisabled?: boolean;
}

export default function Form({ disabled, partiallyDisabled}: FormProps) {
  const [name, setName] = useState('');
  const [viability, setViability] = useState('');
  const [initDate, setInitDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [executionValue, setExecutionValue] = useState('');
  const [situation, setSituation] = useState('');
  const [responsiblePerson, setResponsiblePerson] = useState('');
  const [description, setDescription] = useState('');

  function onHandleSubmit(event) {
      event.preventDefault();

      console.log(
          name,
          viability,
          initDate,
          endDate,
          executionValue,
          situation,
          responsiblePerson,
          description
      );
  }

  return (
    <form onSubmit={onHandleSubmit} className={styles.formContainer}>
      <div className={styles.multipleInputs}>
        <div className={styles.inputBlock}>
          <label htmlFor="name">Nome</label>
          <input disabled={disabled || partiallyDisabled} type="text" id="name" value={name} onChange={event => setName(event.target.value)}/>
        </div>
        <div className={styles.selectBlock}>
          <label htmlFor="viability">Viabilidade</label>
          <select disabled={disabled} name="viability-options" id="viability" value={viability} onChange={event => setViability(event.target.value)}>
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
          <input disabled={disabled || partiallyDisabled} type="text" id="execution-value" value={executionValue} onChange={event => setExecutionValue(event.target.value)}/>
        </div>
        <div className={styles.selectBlock}>
          <label htmlFor="situation">Situacao</label>
          <select disabled={disabled} name="situation-options" id="situation" value={situation} onChange={event => setSituation(event.target.value)}>
            <option value="1">Planejado</option>
            <option value="2">Em desenvolvimento</option>
            <option value="3">Cancelado</option>
            <option value="4">Concluido</option>
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

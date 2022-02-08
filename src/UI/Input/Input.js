import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {

  const applyClass = (value) => {
    if(value.length > 1) {
      return '';
    }else {
      return 'invalid';
    }
  }

  return <div className={styles['form-control']}>
        <label name={props.name}>{props.label}</label>    
        <input type={props.type}
        id={props.id}
        htmlFor={props.name}
        name={props.name} 
        onChange= {props.onChange}
        onBlur = {props.onBlur} 
        value={props.value}        
        />
    </div>;
}

export default Input;

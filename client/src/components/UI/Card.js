// Wrapper component for meals.
import React from "react";
import styles from './Card.module.css';

// it will require props to access props children (wrapped content)
const Card = (props) =>{
    return (
       <div className={styles.card}>
        {props.children}
       </div>
    );
}

export default Card;
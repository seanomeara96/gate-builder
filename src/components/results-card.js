import React from "react";
import { CartButton } from "./cart-button";
import styles from "./results-card.module.css";
export const ResultsCard = (props) => {
  const { gate } = props.bundle;
  const abbrBundle = [gate, ...props.bundle.extensions];
  const listItem = abbrBundle.map((item, index) => (
    <li key={index} className={styles.resultsCard__title}>
      {item.name} &times; {item.qty}
    </li>
  ));

  const images = [];
  let zIndex = 1000;
  for (let x = 0; x < abbrBundle.length; x++) {
    const component = abbrBundle[x];
    for (let i = 0; i < component.qty; i++) {
      images.push(
        <img
          style={{
            zIndex,
          }}
          key={JSON.stringify({ x, i })}
          alt={component.name}
          className={styles.resultsCard__img}
          src={process.env.PUBLIC_URL + component.img}
        />
      );
      zIndex--;
    }
  }

  return (
    <div className={styles.resultsCard}>
      <div className={styles.resultsCard__content}>
        <div className={styles.wrapper}>
          <h2 className={styles.resultsCard__heading}>
            {props.bundle.maxLength - gate.tolerance}
            cm - {props.bundle.maxLength}cm Bundle
          </h2>
          <div className={styles.resultsCard__imgs}>{images}</div>
          <details open={window.screen.width > 600 ? true : false}>
            <summary>
              {props.bundle.gate.color[0].toUpperCase() +
                props.bundle.gate.color.substring(1) +
                " "}
              gate and {props.bundle.extensions.reduce((a, c) => a + c.qty, 0)}{" "}
              Extensions
            </summary>
            <ul>{listItem}</ul>
          </details>
          <CartButton
            clickHandler={() => props.clickHandler(props.bundle, abbrBundle)}
          />
        </div>
      </div>
    </div>
  );
};

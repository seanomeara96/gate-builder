import React from "react";
import { CartButton } from "./cart-button";
import styles from "./results-card.module.css";

function generateAbbreviatedBundle(bundle) {
  /**
   * convert the bundle format into an array that includes the quantity of each unique item
   */
  const uniqueBundleItems = [...new Set(bundle)];
  /**
   * should probably save this to stae as abbrBundle instead so that I can use it
   * for consisely desplaying bundle contents in the results block
   */
  return uniqueBundleItems.map((item) => ({
    name: item.name,
    price: item.price,
    // this code counts instances of
    qty: bundle.reduce((a, b) => (b.id === item.id ? a + 1 : a), 0),
  }));
}

export const ResultsCard = (props) => {
  const gate = props.bundle[0];
  const abbrBundle = generateAbbreviatedBundle(props.bundle);

  const listItem = abbrBundle.map((item, index) => (
    <li key={index} className={styles.resultsCard__title}>
      {item.name} &times; {item.qty}
    </li>
  ));

  const images = props.bundle.map((component, index) => (
    <img
      key={index}
      style={{
        zIndex: props.bundle.length - index,
      }}
      alt={component.name}
      className={styles.resultsCard__img}
      src={component.img}
    />
  ));

  return (
    <div className={styles.resultsCard}>
      <div className={styles.wrapper}>
        <div className={styles.resultsCard__content}>
          <div className={styles.wrapper}>
            <h2 className={styles.resultsCard__heading}>
              {props.totalBundleMaxLength - gate.tolerance}
              cm - {props.totalBundleMaxLength}cm Bundle
            </h2>
            <div className={styles.resultsCard__imgs}>{images}</div>
            <details open={window.screen.width > 600 ? true : false}>
              <summary>
                {props.bundle.reduce(
                  (a, c) => (c.type === "gate" ? a + 1 : a),
                  0
                )}{" "}
                Gate and{" "}
                {props.bundle.reduce(
                  (a, c) => (c.type === "extension" ? a + 1 : a),
                  0
                )}{" "}
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
    </div>
  );
};

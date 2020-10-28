import React from "react";
import styles from "../app.module.css";
const ResultsCard = ({
  options,
  totalBundleMaxLength,
  listItem,
  images,
  onClick,
}) => {
  return (
    <div className={styles.resultsCard}>
      <div className={styles.wrapper}>
        <div className={styles.resultsCard__content}>
          <div className={styles.wrapper}>
            <h2 className={styles.resultsCard__heading}>
              Your Bundle: ({totalBundleMaxLength - options.gate.tolerance}
              cm - {totalBundleMaxLength}cm)
            </h2>
            {listItem}
            <button
              className={`${styles.button} ${styles.button__smallButton}`}
              onClick={onClick}
            >
              Add Bundle To Cart
            </button>
          </div>
        </div>
      </div>
      <div className={styles.resultsCard__imgs}>{images}</div>
    </div>
  );
};

export default ResultsCard;

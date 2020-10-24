import React from "react";
import Icon from "./components/icon";
import styles from "./app.module.css";
import img from "./images/find-gate.webp";
import { options } from "./options";

class App extends React.Component {
  emptyBundle = {
    gate: 0,
    smallExtension: 0,
    medExtension: 0,
    largeExtension: 0,
  };
  state = {
    width: 0,
    bundle: { ...this.emptyBundle },
  };
  options = options;
  buildGate() {
    let bundle = { ...this.emptyBundle };
    this.setState({ bundle });
    const {
      gate,
      largeExtension,
      medExtension,
      smallExtension,
      tolerance,
    } = this.options;
    // I think the gate width should be the max width i.e. 79
    let sizeRequirement = this.state.width;
    // 120
    // take away premier gate size
    if (
      sizeRequirement <= gate.length &&
      sizeRequirement >= gate.length - tolerance
    ) {
      bundle.gate++;
      this.setState({ bundle }, () => {
        console.log(this.state);
      });
      return;
    }
    if (sizeRequirement > gate.length) {
      // if it's the same size as the gate or within its tolerance
      sizeRequirement = sizeRequirement - gate.length;

      // 120 - 76 = 44
      // add gate to bundle
      bundle.gate++;

      // if remainder is big enough to take away 64, 32, 14
      while (sizeRequirement > smallExtension.length) {
        if (sizeRequirement >= largeExtension.length) {
          sizeRequirement = sizeRequirement - largeExtension.length;
          bundle.largeExtension++;
        } else if (
          sizeRequirement >= medExtension.length &&
          sizeRequirement < largeExtension.length
        ) {
          sizeRequirement = sizeRequirement - medExtension.length;
          bundle.medExtension++;
        } else if (
          sizeRequirement >= smallExtension.length &&
          sizeRequirement < medExtension.length
        ) {
          sizeRequirement = sizeRequirement - smallExtension.length;
          bundle.smallExtension++;
        } else {
          console.log("Error in if else statement", sizeRequirement);
        }
      }
      // do so and add it to the bundle
      this.setState({ bundle }, () => {
        console.log(this.state);
      });
    } else {
      this.flashError("We don't have any configurations this small.");
    }
  }
  flashError(errorMessage) {
    this.setState({ errorMessage });
    setTimeout(() => {
      this.setState({ errorMessage: "" });
    }, 5000);
  }
  renderBundle() {
    const { bundle } = this.state;
    let listItem = [];
    let images = [];
    if (bundle.gate > 0) {
      let count = 25;
      for (var item in bundle) {
        if (bundle[item] > 0) {
          listItem.unshift(
            <div
              className={styles.resultsCard__title}
            >{`${bundle[item]} x ${this.options[item].name}`}</div>
          );
          for (var i = 0; i < bundle[item]; i++) {
            images.push(
              <img
                style={{ zIndex: count }}
                className={styles.resultsCard__img}
                src={this.options[item].img}
              />
            );
          }
        }
        count--;
      }
      return (
        <div className={styles.resultsCard}>
          <div className={styles.resultsCard__content}>
            <h2 className={styles.resultsCard__heading}>Your Bundle:</h2>
            {listItem}
          </div>
          <div className={styles.resultsCard__imgs}>{images}</div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <Icon className={styles.icon} />
        </header>
        <div className={styles.wrapper}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              this.buildGate();
            }}
          >
            <img alt="baby gate" className={styles.img} src={img} />
            <label className={styles.label}>
              Can't find what you want? Use our <strong>Gate-Builder</strong> to
              build the perfect gate for your home.
            </label>
            <input
              placeholder="Enter your width in cm"
              className={styles.input}
              name="number"
              type="number"
              onChange={(e) => {
                this.setState({ width: parseInt(e.target.value) });
              }}
              val={this.state.width}
            />
            <button className={styles.button}>Build</button>
          </form>
        </div>
        <div className={styles.results}>
          <div className={styles.wrapper}>
            <div className={styles.wrapper}>
              <div className={styles.errorMessage}>
                {this.state.errorMessage}
              </div>
            </div>
            {this.renderBundle()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

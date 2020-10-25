import React from "react";
import Icon from "./components/icon";
import styles from "./app.module.css";
import img from "./images/find-gate.webp";
import { options } from "./options";
import { buildBundle } from "./build-bundle";
class App extends React.Component {
  state = {
    width: 0,
    bundle: { ...this.emptyBundle },
    totalBundleMaxLength: 0,
    cart: {},
    totalCartItems: 0,
    totalCartPrice: 0,
    cartModalIsOpen: false,
  };
  options = options;

  flashError(errorMessage) {
    this.setState({ errorMessage });
    setTimeout(() => {
      this.setState({ errorMessage: "" });
    }, 5000);
  }

  updateCart() {
    console.log("update cart called");
    this.setState({ cart: this.state.bundle }, () => {
      console.log("this.state.cart", this.state.cart);
      // update totals
      let totalCartItems = 0;
      for (var x in this.state.bundle) {
        totalCartItems += this.state.bundle[x];
      }
      let totalCartPrice = 0;
      for (var i in this.state.bundle) {
        totalCartPrice += this.options[i].price * this.state.bundle[i];
      }
      this.setState({ totalCartItems, totalCartPrice }, () => {
        console.log(this.state);
      });
    });
  }
  renderBundle() {
    const { bundle } = this.state;
    let listItem = [];
    let images = [];
    if (bundle.gate > 0) {
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
                alt={this.options[item].name}
                className={styles.resultsCard__img}
                src={this.options[item].img}
              />
            );
          }
        }
      }
      return (
        <div className={styles.resultsCard}>
          <div className={styles.resultsCard__content}>
            <div className={styles.wrapper}>
              <h2 className={styles.resultsCard__heading}>
                Your Bundle: (
                {this.state.totalBundleMaxLength - this.options.gate.tolerance}
                cm - {this.state.totalBundleMaxLength}cm)
              </h2>
              {listItem}
              <button
                className={`${styles.button} ${styles.button__smallButton}`}
                onClick={() => {
                  this.updateCart();
                }}
              >
                Add Bundle To Cart
              </button>
            </div>
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
          <Icon
            count={this.state.totalCartItems}
            pillClassName={styles.pill}
            className={styles.icon}
          />
        </header>
        <div className={styles.wrapper}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              this.setState({ bundle: {}, errorMessage: "" }, () => {
                this.setState(
                  { bundle: buildBundle(this.options, this.state.width) },
                  () => {
                    // compute total bundle max-length
                    let totalBundleMaxLength = 0;
                    for (var k in this.state.bundle) {
                      totalBundleMaxLength +=
                        this.options[k].length * this.state.bundle[k];
                    }
                    this.setState({ totalBundleMaxLength }, () => {
                      console.log(
                        "totalBundleMaxLength",
                        this.state.totalBundleMaxLength
                      );
                    });
                  }
                );
              });
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
            <div className={styles.errorMessage}>{this.state.errorMessage}</div>
          </div>
          {this.renderBundle()}
        </div>
      </div>
    );
  }
}

export default App;

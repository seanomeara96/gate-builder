import React from "react";
import Icon from "./components/icon";
import styles from "./app.module.css";
import img from "./images/find-gate.webp";
import { options } from "./options";
import { buildBundle } from "./build-bundle";
import ResultsCard from "./components/results-card";
import Cart from "./components/cart";
class App extends React.Component {
  state = {
    width: 0,
    bundle: {},
    totalBundleMaxLength: 0,
    cart: {},
    totalCartItems: 0,
    totalCartPrice: 0,
    cartModalIsOpen: false,
  };
  options = options;

  flashError = (errorMessage) => {
    this.setState({ errorMessage });
    setTimeout(() => {
      this.setState({ errorMessage: "" });
    }, 5000);
  };

  emptyCart() {
    this.setState({ cart: {} });
  }

  updateCart() {
    console.log("update cart called");
    this.setState({ cart: { ...this.state.bundle } }, () => {
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
    let count = 0;
    if (bundle.gate > 0) {
      for (var item in bundle) {
        if (bundle[item] > 0) {
          listItem.unshift(
            <div
              className={styles.resultsCard__title}
              key={count}
            >{`${bundle[item]} x ${this.options[item].name}`}</div>
          );
          for (var i = 0; i < bundle[item]; i++) {
            images.push(
              <img
                alt={this.options[item].name}
                className={styles.resultsCard__img}
                src={this.options[item].img}
                key={count + i}
              />
            );
          }
        }
        count++;
      }
      return (
        <ResultsCard
          options={this.options}
          totalBundleMaxLength={this.state.totalBundleMaxLength}
          listItem={listItem}
          images={images}
          onClick={() => {
            this.updateCart();
          }}
        />
      );
    }
  }

  buildButtonHandler(e) {
    e.preventDefault();
    this.setState({ bundle: {}, errorMessage: "" }, () => {
      if (
        this.state.width >=
        this.options.gate.length - this.options.gate.tolerance
      ) {
        this.setState(
          {
            bundle: buildBundle(this.options, this.state.width),
          },
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
      } else {
        this.flashError("We don't have any configurations this small.");
      }
    });
  }
  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <Icon
            onClick={() => {
              console.log("click");
              this.setState(
                {
                  cartModalIsOpen:
                    this.state.cartModalIsOpen === false ? true : false,
                },
                () => console.log(this.state.cartModalIsOpen)
              );
            }}
            count={this.state.totalCartItems}
            pillClassName={styles.pill}
            className={styles.icon}
          />
        </header>
        <div className={styles.cartModalContainer}>
          <Cart
            totalCartItems={this.state.totalCartItems}
            isOpen={this.state.cartModalIsOpen}
            cartContents={this.state.cart}
            options={this.options}
          />
        </div>
        <div className={styles.wrapper}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              this.buildButtonHandler(e);
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

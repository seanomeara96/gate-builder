import React from "react";
import Icon from "./components/icon";
import styles from "./app.module.css";
import img from "./images/find-gate.webp";
import { options } from "./options";
import { buildBundle } from "./build-bundle";
import ResultsCard from "./components/results-card";
import Cart from "./components/cart";
class App extends React.Component {
  /**
   * app state
   * width: the width of gate required
   * bundle: the bundle of gate and extensions required to reach a certain width
   * cart: the user's shopping cart
   * totalCartItems: total number of items in the user's cart
   * totalCartPrice: total price of all the components in the shopping cart
   * cartModalIsOpen: boolean whether the cart modal is open
   * errorMessage: error to show user when input is too high / low
   */
  state = {
    width: 0,
    bundle: {},
    totalBundleMaxLength: 0,
    cart: {},
    totalCartItems: 0,
    totalCartPrice: 0,
    cartModalIsOpen: false,
    errorMessage: "",
  };
  options = options;
  /**
   * temporarily show supplied error message to user
   * @param {string} errorMessage
   */
  flashError = (errorMessage) => {
    this.setState({ errorMessage });
    setTimeout(() => {
      this.setState({ errorMessage: "" });
    }, 5000);
  };
  /**
   * clear entire contents of this cart
   */
  emptyCart() {
    this.setState({ cart: {} });
  }
  /**
   *
   * @returns number of individual items in cart
   */
  countTotalCartItems() {
    let totalCartItems = 0;
    for (var x in this.state.bundle) {
      totalCartItems += this.state.bundle[x];
    }
    return totalCartItems;
  }
  /**
   *
   * @returns sum total of items in cart
   */
  sumTotalCartPrice() {
    let totalCartPrice = 0;
    for (var i in this.state.bundle) {
      totalCartPrice += this.options[i].price * this.state.bundle[i];
    }
    return totalCartPrice;
  }

  /**
   * make the cart contents equal the currently generated bundle
   */
  updateCart() {
    this.setState({ cart: { ...this.state.bundle } }, () => {
      // update totals

      this.setState({
        totalCartItems: this.countTotalCartItems(),
        totalCartPrice: this.sumTotalCartPrice(),
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
          onClick={this.updateCart}
        />
      );
    }
  }
  /**
   * compute total bundle max-length
   */
  bundleMaxLength() {
    let totalBundleMaxLength = 0;
    for (var k in this.state.bundle) {
      totalBundleMaxLength += this.options[k].length * this.state.bundle[k];
    }
    this.setState({ totalBundleMaxLength });
  }
  /**
   * build bundle if input is valid
   */
  buildBundleIfValidInput() {
    if (
      this.state.width >=
      this.options.gate.length - this.options.gate.tolerance
    ) {
      this.setState(
        {
          bundle: buildBundle(this.options, this.state.width),
        },
        this.bundleMaxLength
      );
    } else {
      this.flashError("We don't have any configurations this small.");
    }
  }
  /**
   * handle the build button click event
   * @param {object} e
   */
  buildButtonHandler = (e) => {
    e.preventDefault();
    this.setState(
      { bundle: {}, errorMessage: "" },
      this.buildBundleIfValidInput
    );
    this.button.focus();
  };
  /**
   * handle the size input change event
   * @param {object} e
   * @returns result of setState
   */
  sizeInputChangeHandler = (e) =>
    this.setState({ width: parseInt(e.target.value) });
  /**
   * handle the click event for toggling the cart modal
   * @returns result of setState
   */
  toggleCartModal = () =>
    this.setState({
      cartModalIsOpen: this.state.cartModalIsOpen === false ? true : false,
    });
  /**
   * render the app
   * @returns app component
   */
  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <Icon
            onClick={this.toggleCartModal}
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
          <form className={styles.form} onSubmit={this.buildButtonHandler}>
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
              onChange={this.sizeInputChangeHandler}
              val={this.state.width}
            />
            <button
              className={styles.button}
              ref={(button) => (this.button = button)}
            >
              Build
            </button>
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

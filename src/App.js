import React from "react";
import Icon from "./components/icon";
import styles from "./app.module.css";
import { buildBundle } from "./build-bundle";
import Cart from "./components/cart";
import { ResultsCard } from "./components/results-card";

class App extends React.Component {
  /**
   * app state
   * desiredWidth: the width of gate required
   * bundle: the bundle of gate and extensions required to reach a certain width
   * cart: the user's shopping cart
   * totalCartItems: total number of items in the user's cart
   * totalCartPrice: total price of all the components in the shopping cart
   * cartModalIsOpen: boolean whether the cart modal is open
   * errorMessage: error to show user when input is too high / low
   */
  state = {
    desiredWidth: 0,
    bundles: [],
    cart: [],
    totalCartItems: 0,
    totalCartPrice: 0,
    cartModalIsOpen: false,
    errorMessage: "",
  };
  /**
   * temporarily show supplied error message to user
   * @param {string} errorMessage
   */
  flashError = (errorMessage) => {
    this.setState({ errorMessage });
    setTimeout(() => this.setState({ errorMessage: "" }), 5000);
  };
  emptyCart() {
    this.setState({ cart: [] });
  }
  /**
   *
   * @returns number of individual items in cart
   */
  countTotalCartItems(abbrBundle) {
    return abbrBundle.reduce((a, c) => a + c.qty, 0);
  }
  /**
   *
   * @returns sum total of items in cart
   */
  sumTotalCartPrice(abbrBundle) {
    return abbrBundle.reduce((a, c) => a + c.price * c.qty, 0);
  }

  /**
   * make the cart contents equal the currently generated bundle
   * TODO add a param to update cart
   */
  updateCart = (abbrBundle) => {
    this.setState({
      cart: abbrBundle,
      totalCartItems: this.countTotalCartItems(abbrBundle),
      totalCartPrice: this.sumTotalCartPrice(abbrBundle),
    });
  };

  /**
   * build bundle if input is valid
   */
  buildBundleIfValidInput() {
    const bundles = buildBundle(this.state.desiredWidth);
    if (bundles.length) {
      this.setState({
        bundles,
      });
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
    if (this.state.errorMessage.length || this.state.bundles.length)
      this.setState({ bundles: [], errorMessage: "" });
    this.buildBundleIfValidInput();
    this.button.focus();
  };
  /**
   * handle the size input change event
   * @param {object} e
   * @returns result of setState
   */
  sizeInputChangeHandler = (e) =>
    this.setState({ desiredWidth: parseInt(e.target.value) });
  /**
   * handle the click event for toggling the cart modal
   * @returns result of setState
   */
  toggleCartModal = () =>
    this.setState({
      cartModalIsOpen: !this.state.cartModalIsOpen,
    });
  /**
   * render the app
   * @returns app component
   */
  render() {
    console.log(this.state);
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
          />
        </div>
        <div className={styles.wrapper}>
          <form className={styles.form} onSubmit={this.buildButtonHandler}>
            <img
              alt="baby gate"
              className={styles.img}
              src={`${process.env.PUBLIC_URL}/images/find-gate.webp`}
            />
            <label className={styles.label}>
              Can't find what you want? Use our <strong>Gate-Builder</strong> to
              build the perfect gate for your home.
            </label>
            <input
              placeholder="Enter your desired width in cm"
              className={styles.input}
              name="number"
              type="number"
              onChange={this.sizeInputChangeHandler}
              val={this.state.desiredWidth}
            />
            <button
              className={styles.button}
              ref={(button) => (this.button = button)}
            >
              Build
            </button>
          </form>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.errorMessage}>{this.state.errorMessage}</div>
        </div>
        <div className={styles.results}>
          {this.state.bundles.length
            ? this.state.bundles.map((bundle, index) => (
                <ResultsCard
                  key={index}
                  bundle={bundle}
                  clickHandler={this.updateCart}
                />
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default App;

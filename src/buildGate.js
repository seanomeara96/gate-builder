export default (state, setState, emptyBundle, options, flashError) => {
  return () => {
    let bundle = { ...emptyBundle };
    setState({ bundle, errorMessage: "" });
    const {
      gate,
      largeExtension,
      medExtension,
      smallExtension,
      tolerance,
    } = options;
    // I think the gate width should be the max width i.e. 79
    let sizeRequirement = state.width;
    // 120
    // take away premier gate size
    if (
      sizeRequirement <= gate.length &&
      sizeRequirement >= gate.length - tolerance
    ) {
      bundle.gate++;
      setState({ bundle }, () => {
        console.log(state);
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
      setState({ bundle }, () => {
        console.log(state);
      });
    } else {
      flashError("We don't have any configurations this small.");
    }
  };
};

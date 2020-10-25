// takes a gate and associated extensions and returns a bundle that satisfies the size requirement
function buildBundle(options, sizeRequirement) {
  let bundle = {};

  const {
    gate,
    largeExtension,
    medExtension,
    smallExtension,
    tolerance,
    isExtension,
  } = options;

  let sizeRequirement = width;

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
    if (sizeRequirement > 0) {
      bundle.smallExtension++;
    }
    return bundle;
  } else {
    this.flashError("We don't have any configurations this small.");
  }
}
this.setState({ bundle, errorMessage: "" }, () => {
  this.setState({ bundle: this.buildBundle() }, () => {
    // compute total bundle max-length
    let totalBundleMaxLength = 0;
    for (var k in this.state.bundle) {
      totalBundleMaxLength += this.options[k].length * this.state.bundle[k];
    }
    this.setState({ totalBundleMaxLength }, () => {
      console.log("totalBundleMaxLength", this.state.totalBundleMaxLength);
    });
  });
});

// takes a gate and associated extensions and returns a bundle that satisfies the size requirement
export function buildBundle(options, width) {
  let sizeRequirement = width;
  const { gate } = options;
  let bundle = {};
  let extensions = [];

  for (var item in options) {
    bundle[item] = 0;
    if (options[item].isExtension === true) {
      extensions.push(item);
    }
  }

  if (
    sizeRequirement <= gate.length &&
    sizeRequirement >= gate.length - gate.tolerance
  ) {
    bundle.gate++;
    return bundle;
  }

  let rankedByLength = extensions.sort(
    (a, b) => options[b].length - options[a].length
  );

  if (sizeRequirement > gate.length) {
    bundle.gate++;
    sizeRequirement -= gate.length;
    while (
      sizeRequirement >
      options[rankedByLength[rankedByLength.length - 1]].length
    ) {
      for (var x in rankedByLength) {
        while (sizeRequirement > options[rankedByLength[x]].length) {
          bundle[rankedByLength[x]]++;
          sizeRequirement -= options[rankedByLength[x]].length;
        }
      }
    }
    if (sizeRequirement > 0) {
      bundle[rankedByLength[rankedByLength.length - 1]]++;
    }
    return bundle;
  }
}

/**
 * this.flashError("We don't have any configurations this small.");
if (sizeRequirement >= largeExtension.length) {
  bundle.largeExtension++;
  sizeRequirement = sizeRequirement - largeExtension.length;
} else if (
  sizeRequirement >= medExtension.length &&
  sizeRequirement < largeExtension.length
) {
  bundle.medExtension++;
  sizeRequirement -= medExtension.length;
} else if (
  sizeRequirement >= smallExtension.length &&
  sizeRequirement < medExtension.length
) {
  bundle.smallExtension++;
  sizeRequirement -= smallExtension.length;
} else {
  console.log("Error in if else statement", sizeRequirement);
}

 */

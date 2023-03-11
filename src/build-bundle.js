import gates from "./data/gates.json";
import extensions from "./data/extensions.json";
import compatibles from "./data/compatibles.json";
export function buildBundle(desiredWidth) {
  const bundles = [];
  for (const gate of gates) {
    if (desiredWidth < gate.width - gate.tolerance) {
      // gate too big
      continue;
    }
    gate.qty = 1;

    const bundle = {
      gate,
      extensions: [],
    };
    /**
     * sorting extensions by width descending
     */
    const compatibleExtensions = [];
    for (const c of compatibles) {
      if (c.gate_id === gate.id) {
        const extension = extensions.find((ex) => ex.id === c.extension_id);
        if (extension) {
          compatibleExtensions.push(extension);
        }
      }
    }
    //extensions
    //  .filter((extension) => extension.compatible_with.includes(gate.id))

    compatibleExtensions.sort((a, b) => b.width - a.width);

    const smallestExtension =
      compatibleExtensions[compatibleExtensions.length - 1];

    let widthRemaining = desiredWidth - gate.width;
    let extensionIndex = 0;
    while (widthRemaining > 0) {
      const currentExtension = compatibleExtensions[extensionIndex];
      if (extensionIndex > compatibleExtensions.length - 1) {
        break;
      }
      if (
        currentExtension.width <= widthRemaining ||
        (currentExtension.width > widthRemaining &&
          currentExtension === smallestExtension)
      ) {
        const matchingExtension = bundle.extensions.find(
          (e) => e.id === currentExtension.id
        );
        if (matchingExtension) {
          matchingExtension.qty = matchingExtension.qty + 1;
        } else {
          currentExtension.qty = 1;
          bundle.extensions.push(currentExtension);
        }
        widthRemaining = widthRemaining - currentExtension.width;
        continue;
      }
      extensionIndex++;
    }

    /**
     * compute total bundle max-length
     */
    bundle.maxLength =
      bundle.gate.width * bundle.gate.qty +
      bundle.extensions.reduce((a, c) => a + c.width * c.qty, 0);

    bundles.push(bundle);
  }
  return bundles;
}

import { gates, extensions } from "./components";
function buildBundle(desiredWidth) {
  const bundles = [];
  for (const gate of gates) {
    /**
     * sorting extensions by width descending
     */
    const compatibleExtensions = extensions
      .filter((extension) => extension.compatible_with.includes(gate.id))
      .sort((a, b) => b.width - a.width);
    /**
     * getting smallest extension because I will simply add one to the bundle even if its too big to make sure the remaing gap becomes <= 0
     */
    const smallestExtension =
      compatibleExtensions[compatibleExtensions.length - 1];
    /**
     * create an inital bundle with just a gate. this function will not be called if the desired width is less than that of the gate
     * so the initial bundle will always include a gate
     */
    const bundle = {
      gate,
      extensions: [],
    };
    /**
     * creating a new variable rather than mutating an old one so I can more effectively debug with console.log
     */
    let widthRemaining = desiredWidth - gate.width;
    let extensionIndex = 0;
    while (widthRemaining > 0) {
      const currentExtension = compatibleExtensions[extensionIndex];
      if (extensionIndex > compatibleExtensions.length - 1) {
        break;
      }
      if (currentExtension.width <= widthRemaining) {
        bundle.extensions.push(currentExtension);
        widthRemaining = widthRemaining - currentExtension.width
        continue;
      }
      if (
        currentExtension.width > widthRemaining &&
        currentExtension === smallestExtension
      ) {
        bundle.extensions.push(currentExtension);
        widthRemaining = widthRemaining - currentExtension.width
        continue;
      }
      extensionIndex++;
    }
    bundles.push(bundle);
  }
  return bundles
}

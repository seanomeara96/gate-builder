/**
 * this function takes the gate components and configures them in such a way that the bundle is built with the largest possible extensions
 * @param {*} components
 * @param {*} desiredWidth
 * @returns
 *
 * this function should be updates so that the gate and extensions are passed in separately as params
 * as i am making some assumptions in order to make this work
 *
 * I am also making the assumtion that eaxh component is in stock wich is also probably no bueno
 */

export function buildBundle(components, desiredWidth) {
  /**
   * assuming the gate is the first item in the array
   */
  const gate = components[0];
  /**
   * sorting extensions by width
   */
  const extensions = components
    .filter(({ type }) => type === "extension")
    .sort((a, b) => b.width - a.width);
  /**
   * getting smallest extension because I will simply add one to the bundle even if its too big to make sure the remaing gap becomes <= 0
   */
  const smallestExtension = extensions[extensions.length - 1];
  /**
   * create an inital bundle with just a gate. this function will not be called if the desired width is less than that of the gate
   * so the initial bundle will always include a gate
   */
  const initBundle = [gate];
  /**
   * creating a new variable rather than mutating an old one so I can more effectively debug with console.log
   */
  const widthAfterGate = desiredWidth - gate.width;
  /**
   * name is self explanatory, simply adds extensions to the bundle until widthremaining <= 0
   * @param {*} initialBundle
   * @param {*} widthRemaining
   * @param {*} count
   * @returns
   */
  function addExtensions(initialBundle, widthRemaining, count = 0) {
    /**
     * if width remaining is zero or less just return the bundle
     */
    if (widthRemaining > 0) {
      /**
       * if the current extension width is less than the gap, add it to the bundle
       * and call this function again with the updated bundle & width
       */
      if (extensions[count].width <= widthRemaining) {
        const updatedBundle = [...initialBundle, extensions[count]];
        const updatedWidth = widthRemaining - extensions[count].width;
        return addExtensions(updatedBundle, updatedWidth, count);
      }
      /**
       * if the current extension is too large increment the count an call this function again
       * so that the conditions are assesed with a smaller extension
       */
      if (
        extensions[count].width > widthRemaining &&
        extensions[count] !== smallestExtension
      ) {
        const updatedCount = count + 1;
        return addExtensions(initialBundle, widthRemaining, updatedCount);
      }
      /**
       * if the gap is too small for an extension but is greater than zero
       * simply add the smalles extension to the bundle even if its too big to make sure the remaing gap becomes <= 0
       */
      if (widthRemaining < smallestExtension.width && widthRemaining > 0) {
        const updatedBundle = [...initialBundle, smallestExtension];
        const updatedWidth = widthRemaining - smallestExtension.width;
        return addExtensions(updatedBundle, updatedWidth, count);
      }
    }
    return initialBundle;
  }

  const finalBundle = addExtensions(initBundle, widthAfterGate);
  return finalBundle;
}

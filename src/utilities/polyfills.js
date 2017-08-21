/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */

const ensureArrayIndexOf = () => {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchValue, index) {
      // In non-strict-mode, if the `this` variable is null
      // or undefined, then it is set the the window object.
      // Else, `this` is automaticly converted to an object.
      const len = this.length >>> 0 // convert to number or 0

      index |= 0              // rounds and NaN-checks
      if (index < 0) {            // check if negative start
        index = Math.max(len - index, 0)
      } else if (index >= len) { // else, check if too big
        return -1
      }
      if (searchValue === undefined) {
        // Because searchValue is undefined, keys that
        // don't exist will have the same value as the
        // searchValue, and thus do need to be checked.
        do {
          if (index in this && this[index] === undefined) {
            return index
          }
        } while (++index !== len)
      } else {
        // Because searchValue is not undefined, there's no
        // need to check if the current key is in the array
        // because if the key isn't in the array, then it's
        // undefined which is not equal to the searchValue.
        do {
          if (this[index] === searchValue) {
            return index
          }
        } while (++index !== len)
      }

      // if nothing was found, then simply return -1
      return -1
    }
  }
}

const activateAllPolyfills = () => {
  ensureArrayIndexOf()
}

module.exports = activateAllPolyfills

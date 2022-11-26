import { DSVRowString } from "d3";

/**
 * Split PascalCase text into separate words
 * From: https://stackoverflow.com/a/26188910
 */
export const camelPad = (str: string) => {
  return (
    str
      // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
      // Remove any white space left around the word
      .trim()
  );
};

/**
 * Convert centimeteres to feet/inches and total inches
 */
export const cmsToImperial = (cms: number) => {
  const totalInches = Math.round(cms / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches, totalInches };
};

/**
 * Parse stats from given fighter data
 */
export const getStats = (selected: DSVRowString) => {
  // Set up values
  const placeholder = "--";
  const age = Math.round(Number(selected.age)) || placeholder;

  let height = placeholder;
  if (selected.Height_cms) {
    const { feet, inches } = cmsToImperial(Number(selected.Height_cms));
    height = `${feet}' ${inches}"`;
  }

  let weight = placeholder;
  if (selected.Weight_lbs) {
    weight = `${selected.Weight_lbs} lbs.`;
  }

  let weightClass = placeholder;
  if (selected.weight_class) {
    weightClass = camelPad(selected.weight_class);
  }

  const stance = selected.Stance || placeholder;

  let reach = placeholder;
  if (selected.Reach_cms) {
    const { totalInches } = cmsToImperial(Number(selected.Reach_cms));
    reach = `${totalInches}"`;
  }

  return { age, height, weight, weightClass, stance, reach };
};

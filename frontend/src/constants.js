// Kept in sync with backend/src/middleware/validateBrew.js — if you ever
// add a new brew method or roast level, update both files.
export const BREW_METHODS = ['Pour Over', 'French Press', 'Espresso', 'AeroPress', 'Cold Brew', 'Moka Pot'];
export const ROAST_LEVELS = ['Light', 'Medium', 'Dark'];
export const GRIND_SIZES = ['Fine', 'Medium', 'Coarse'];

export const EMPTY_BREW = {
  coffeeName: '',
  method: '',
  roastLevel: '',
  grindSize: '',
  brewTime: '',
  rating: '',
  notes: '',
};
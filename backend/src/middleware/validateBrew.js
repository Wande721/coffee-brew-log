// Fields every brew record must have. Kept in one place so create (POST)
// and update (PUT) both use the exact same rule set.
const REQUIRED_FIELDS = [
  'coffeeName',
  'method',
  'roastLevel',
  'grindSize',
  'brewTime',
  'rating',
  'notes',
];

const VALID_METHODS = ['Pour Over', 'French Press', 'Espresso', 'AeroPress', 'Cold Brew', 'Moka Pot'];
const VALID_ROAST_LEVELS = ['Light', 'Medium', 'Dark'];

function validateBrew(req, res, next) {
  const body = req.body || {};
  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    const value = body[field];
    // Reject undefined, null, and empty/whitespace-only strings.
    if (value === undefined || value === null || value === '') {
      errors.push(`${field} is required`);
    } else if (typeof value === 'string' && value.trim() === '') {
      errors.push(`${field} cannot be blank`);
    }
  }

  if (body.method && !VALID_METHODS.includes(body.method)) {
    errors.push(`method must be one of: ${VALID_METHODS.join(', ')}`);
  }

  if (body.roastLevel && !VALID_ROAST_LEVELS.includes(body.roastLevel)) {
    errors.push(`roastLevel must be one of: ${VALID_ROAST_LEVELS.join(', ')}`);
  }

  if (body.rating !== undefined && body.rating !== null && body.rating !== '') {
    const ratingNum = Number(body.rating);
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      errors.push('rating must be a whole number between 1 and 5');
    }
  }

  if (errors.length > 0) {
    // 422 Unprocessable Entity: the request was valid JSON, but the data
    // inside it fails our business rules (as opposed to 400, which usually
    // means the request itself was malformed).
    return res.status(422).json({ errors });
  }

  next(); // all good — hand off to the actual route handler
}

module.exports = { validateBrew, VALID_METHODS, VALID_ROAST_LEVELS };
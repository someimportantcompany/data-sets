const countries = require('./countries.json');

const { countryCodes, countryNames } = countries.reduce((map, entry, i) => {
  /* istanbul ignore else */
  if (entry && typeof entry.code === 'string') {
    map.countryCodes[entry.code.toUpperCase()] = i;
  }
  /* istanbul ignore else */
  if (entry && typeof entry.code_alt === 'string') {
    map.countryCodes[entry.code_alt.toUpperCase()] = i;
  }
  /* istanbul ignore else */
  if (entry && typeof entry.name === 'string') {
    map.countryNames[entry.name.toLowerCase()] = i;
  }
  /* istanbul ignore else */
  if (entry && typeof entry.name_alt === 'string') {
    map.countryNames[entry.name_alt.toLowerCase()] = i;
  }

  return map;
}, {
  countryCodes: {},
  countryNames: {},
});

function findByCode(code) {
  const i = countryCodes[`${code}`.trim().toUpperCase()];
  return i >= 0 ? countries[i] : null;
}

function findByName(name) {
  const i = countryNames[`${name}`.trim().toLowerCase()];
  return i >= 0 ? countries[i] : null;
}

module.exports = {
  data: countries,
  findByCode,
  findByName,
};

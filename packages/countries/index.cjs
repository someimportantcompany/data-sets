const { primaryIndex, indexByIso2 } = require('./data.cjs');

module.exports = Object.defineProperties({}, {
  data: {
    enumerable: true,
    get: () => Array.from(primaryIndex.values()),
  },
  findByIso2: {
    enumerable: true,
    value(code) {
      const id = indexByIso2.get(code);
      return id ? primaryIndex.get(id) : undefined;
    },
  },
});

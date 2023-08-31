const { primaryIndex, indexByIso2, indexByIso3 } = require('./data.cjs');

module.exports = Object.create({}, {
  data: {
    enumerable: true,
    get: () => Array.from(primaryIndex.values()),
  },
  findByCode: {
    enumerable: true,
    value(code) {
      const id = indexByIso2.get(code) ?? indexByIso3.get(code);
      return id ? primaryIndex.get(id) : undefined;
    },
  },
});

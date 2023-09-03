import bunyan, { LogLevel } from 'bunyan';

const { LOG_LEVEL, LOG_NAME } = process.env;

export default bunyan.createLogger({
  name: LOG_NAME ?? 'data-sets',
  level: LOG_LEVEL ? LOG_LEVEL as LogLevel : 'info',
  serializers: {
    err(err: any) {
      if (err instanceof Error) {
        const output = bunyan.stdSerializers.err(err);

        for (const key in err) { // eslint-disable-line no-restricted-syntax
          if (Object.prototype.hasOwnProperty.call(err, key) && key !== 'message' && key !== 'stack') {
            output[key] = (err as Record<string, any>)[key];
          }
        }

        return output;
      } else {
        return err;
      }
    },
  },
});

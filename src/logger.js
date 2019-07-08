const debug = require("debug")("opencerts:admin-website");

export const trace = namespace => debug.extend(`trace:${namespace}`);
export const info = namespace => debug.extend(`info:${namespace}`);
export const error = namespace => debug.extend(`error:${namespace}`);

export const getLogger = namespace => ({
  trace: trace(namespace),
  info: info(namespace),
  error: error(namespace)
});

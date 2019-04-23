const debug = require("debug")("opencerts:admin-website");

// not using .extends because of stupid next.js resolve modules bug where its picking up old version of debug
export const trace = namespace => debug.extend(`${namespace}`);
export const error = namespace => debug.extend(`${namespace}`);

export const getLogger = namespace => ({
  trace: trace(namespace),
  error: error(namespace)
});

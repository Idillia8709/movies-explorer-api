const { ALLOWED_CORS } = require('../configs/index');

const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (ALLOWED_CORS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsOption;

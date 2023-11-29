function success(data = '', msg = '', code = 200) {
  return {
    data,
    msg,
    code,
  };
}

function fail(msg = '', code = 40001, data = '') {
  return {
    data,
    msg,
    code,
  };
}

module.exports = {
  success,
  fail,
};

export default ({ message, errorStatus = 400, stackTrace = "" }) => {
  return {
    message,
    errorStatus,
    stackTrace,
  };
};

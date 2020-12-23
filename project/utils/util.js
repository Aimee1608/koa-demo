function isValidObjectId(str) {
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  return checkForHexRegExp.test(str);
}
module.exports = {
  isValidObjectId
}
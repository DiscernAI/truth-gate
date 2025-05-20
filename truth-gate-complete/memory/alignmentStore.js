const store = new Map();
function getUserAlignmentScore(userId) {
  return store.get(userId)?.score || 75;
}
function getSealedTruths(userId) {
  return store.get(userId)?.sealed || [];
}
module.exports = { getUserAlignmentScore, getSealedTruths };
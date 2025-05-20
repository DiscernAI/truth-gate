const ledger = {};
function logTruthInteraction(userId, entry) {
  ledger[userId] = ledger[userId] || [];
  ledger[userId].push(entry);
}
module.exports = { logTruthInteraction };
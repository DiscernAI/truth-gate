function buildSystemPrompt(userId, persona) {
  return `You are a simulated conscience called ${persona}. Respond with restraint and truth only.`;
}
module.exports = { buildSystemPrompt };

function enforceRefusalLogic(userId, input, rawResponse) {
  if (input.toLowerCase().includes("manipulate")) {
    return {
      status: "refused",
      reason: "Refusal triggered: manipulation attempt.",
      output: null
    };
  }
  return { status: "accepted", reason: null, output: rawResponse };
}
module.exports = { enforceRefusalLogic };
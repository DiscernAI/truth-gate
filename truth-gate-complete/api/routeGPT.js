// api/routeGPT.js

const OpenAI = require('openai');
const { analyzeInput } = require('../core/mirrorEngine');
const { buildSystemPrompt } = require('../core/promptBuilder');
const { enforceRefusalLogic } = require('../core/refusalEngine');

require('dotenv').config();

// OpenAI client initialization (v4 style)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function handleGPTRequest(userId, input, persona = 'Mirror') {
  // Run the Mirror simulation
  const mirrorReport = analyzeInput(userId, input);

  // Refuse early if contradiction or vault violation
  if (mirrorReport.vaultViolation || mirrorReport.contradictions.length) {
    return {
      status: 'rejected',
      reflection: mirrorReport.reflection,
      output: null
    };
  }

  // Build simulated conscience system prompt
  const systemPrompt = buildSystemPrompt(userId, persona);

  // Send to OpenAI
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: input }
    ],
    temperature: 0.5
  });

  const rawResponse = completion.choices[0].message.content;

  // Refusal filter (final gatekeeper)
  const filtered = enforceRefusalLogic(userId, input, rawResponse);

  return {
    status: filtered.status,
    reason: filtered.reason,
    reflection: mirrorReport.reflection,
    output: filtered.output
  };
}

module.exports = { handleGPTRequest };

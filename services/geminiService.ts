export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
): Promise<string> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ history, message }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || 'Failed to contact AURA');
  }

  return data?.text || 'I processed that, but produced no text output.';
};

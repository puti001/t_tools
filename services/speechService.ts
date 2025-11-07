/**
 * Uses the browser's SpeechSynthesis API to speak the given text or sequence of texts.
 * This version handles sequential playback correctly to avoid audio glitches and volume drops.
 * @param {string | string[]} texts The text or array of texts to be spoken.
 * @param {string} lang The language code (defaults to 'zh-TW' for Traditional Chinese).
 */
export const speak = (texts: string | string[], lang: string = 'zh-TW'): void => {
  if (!('speechSynthesis' in window)) {
    console.error('Speech Synthesis not supported in this browser.');
    alert('抱歉，您的瀏覽器不支持語音功能。');
    return;
  }

  // Always cancel previous speech to avoid overlap or long queues.
  window.speechSynthesis.cancel();
  
  const textsToSpeak = (Array.isArray(texts) ? texts : [texts]).filter(text => text); // Filter out empty strings

  if (textsToSpeak.length === 0) {
    return;
  }

  let currentIndex = 0;

  const speakNext = () => {
    if (currentIndex >= textsToSpeak.length) {
      return; // All texts have been spoken
    }

    const text = textsToSpeak[currentIndex];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slow down the speech slightly for clarity
    utterance.pitch = 1.1;
    utterance.volume = 1; // Explicitly set volume to max to prevent it from getting softer

    // When the current utterance ends, speak the next one in the queue.
    utterance.onend = () => {
      currentIndex++;
      speakNext();
    };
    
    // If there's an error, log it and try to continue with the next item.
    utterance.onerror = (event) => {
        console.error('An error occurred during speech synthesis:', event);
        currentIndex++;
        speakNext();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Start the speaking sequence.
  speakNext();
};

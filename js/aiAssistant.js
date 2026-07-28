/* WasteFlow AI - Operations AI Chat Assistant */

window.WasteFlowAssistant = {
  sendMessage: function() {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('chat-messages');

    if (!input || !input.value.trim() || !container) return;

    const userText = input.value.trim();
    input.value = '';

    // Render User Message Bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.innerText = userText;
    container.appendChild(userBubble);
    container.scrollTop = container.scrollHeight;

    // Simulate AI Response Typing Delay
    setTimeout(() => {
      const botResponse = this.generateBotResponse(userText.toLowerCase());
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble bot';
      botBubble.innerHTML = botResponse;
      container.appendChild(botBubble);
      container.scrollTop = container.scrollHeight;
    }, 600);
  },

  generateBotResponse: function(text) {
    if (text.includes('urgent') || text.includes('bin') || text.includes('overflow')) {
      return `<strong>Smart Bin Agent:</strong> High priority overflow risk detected at 3 locations:<br>
      • <strong>BIN-109</strong> (SoHo Grand) - 97% Fill<br>
      • <strong>BIN-106</strong> (Lexington Ave) - 94% Fill<br>
      • <strong>BIN-101</strong> (5th Ave) - 92% Fill<br>
      <em>Recommendation: Dispatch TRUCK-01 on Route Alpha immediately.</em>`;
    }

    if (text.includes('route') || text.includes('truck') || text.includes('optimize')) {
      return `<strong>Route Optimization Agent:</strong> I have recalculated optimal paths for 5 active collection trucks.<br>
      • TRUCK-01 rerouted via 10th Ave (-4.2 km).<br>
      • Total estimated fuel savings: $18.40 / trip.<br>
      • Estimated time saved: 22 mins across Midtown routes.`;
    }

    if (text.includes('dumping') || text.includes('cctv') || text.includes('illegal')) {
      return `<strong>Illegal Dumping Detection Agent:</strong> Active alert detected at <strong>Pier 54 Abandoned Loading Bay</strong>.<br>
      • Detected: Hazardous Chemical Containers (98.4% Confidence).<br>
      • Action taken: Dispatch ticket #DUMP-902 dispatched to Hazmat Response Team.`;
    }

    if (text.includes('carbon') || text.includes('co2') || text.includes('sustainability')) {
      return `<strong>Carbon Analytics Agent:</strong> Sustainability metrics updated for today:<br>
      • 14.8 Metric Tons CO₂e emissions prevented.<br>
      • 54.2% waste diverted from municipal landfills.<br>
      • Electric fleet utilization rate: 82%.`;
    }

    return `<strong>WasteFlow Operations AI:</strong> I have processed your query: "<em>${text}</em>". All 11 autonomous AI agents are currently operating at 99.4% average health. How else can I assist smart city operations?`;
  }
};

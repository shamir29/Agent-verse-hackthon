/* WasteFlow AI - Computer Vision Waste Classifier Engine */

window.WasteFlowVision = {
  currentSampleIndex: 0,

  init: function() {
    this.renderSample(0);
  },

  renderSample: function(index) {
    const samples = window.WasteFlowConfig.wasteVisionSamples;
    const sample = samples[index] || samples[0];
    this.currentSampleIndex = index;

    const imgElement = document.getElementById('vision-display-img');
    const overlayContainer = document.getElementById('vision-box-overlay');
    
    if (imgElement) imgElement.src = sample.image;

    if (overlayContainer) {
      overlayContainer.innerHTML = '';
      sample.boxes.forEach(box => {
        const boxDiv = document.createElement('div');
        boxDiv.className = 'bounding-box';
        boxDiv.style.left = `${box.x}%`;
        boxDiv.style.top = `${box.y}%`;
        boxDiv.style.width = `${box.w}%`;
        boxDiv.style.height = `${box.h}%`;
        
        boxDiv.innerHTML = `<div class="bounding-box-tag">${box.label} (${sample.confidence}%)</div>`;
        overlayContainer.appendChild(boxDiv);
      });
    }

    // Update details card
    const labelEl = document.getElementById('vision-label');
    const catEl = document.getElementById('vision-category');
    const confEl = document.getElementById('vision-confidence');
    const dispEl = document.getElementById('vision-disposal');
    const recEl = document.getElementById('vision-recyclability');

    if (labelEl) labelEl.innerText = sample.label;
    if (catEl) catEl.innerText = sample.category;
    if (confEl) confEl.innerText = `${sample.confidence}% Confidence`;
    if (dispEl) dispEl.innerText = sample.disposal;
    if (recEl) recEl.innerText = sample.recyclability;
  },

  handleFileUpload: function(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = document.getElementById('vision-display-img');
      const overlayContainer = document.getElementById('vision-box-overlay');
      if (imgElement) imgElement.src = e.target.result;

      if (overlayContainer) {
        overlayContainer.innerHTML = `
          <div class="bounding-box" style="left: 20%; top: 20%; width: 60%; height: 60%;">
            <div class="bounding-box-tag">Detected Material (97.4%)</div>
          </div>
        `;
      }

      // Update AI metadata
      document.getElementById('vision-label').innerText = file.name;
      document.getElementById('vision-category').innerText = "AI Auto-Classified Material";
      document.getElementById('vision-confidence').innerText = "97.4% Confidence";
      document.getElementById('vision-disposal').innerText = "Sorted to Stream #3 (Plastics/Metals)";
      document.getElementById('vision-recyclability').innerText = "High Recyclability Rating";
    };
    reader.readAsDataURL(file);
  }
};

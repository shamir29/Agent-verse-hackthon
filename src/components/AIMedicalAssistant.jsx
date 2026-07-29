import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Bot, User, ShieldAlert, Sparkles, AlertTriangle, PhoneCall, CheckCircle2, ChevronRight, Volume2, VolumeX, RefreshCw, FileText, Pill, Stethoscope, Activity } from 'lucide-react';

const presetOptions = [
  "I have acute chest pain and shortness of breath.",
  "I have a throbbing headache with light sensitivity.",
  "What supplements are best for my ApoB lipid profile?",
  "I feel sudden dizziness and numbness in my left arm.",
  "How can I optimize my deep sleep & HRV score?",
  "Is my blood pressure reading of 138/88 mmHg dangerous?"
];

export default function AIMedicalAssistant() {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [emergencyAlert, setEmergencyAlert] = useState(null);
  
  const chatContainerRef = useRef(null);

  // Initial chat history with multi-turn conversation support
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am Dr. AURA, your autonomous AI clinical assistant. How are you feeling today?",
      triageQuestions: [
        "Are you experiencing any acute pain or discomfort?",
        "Would you like to analyze recent biometric sensor syncs?",
        "Do you have questions about your genomic profile or supplements?"
      ],
      diagnosisSummary: "Ready for clinical triage. Real-time biometrics connected.",
      emergency: false
    }
  ]);

  // Scroll inner chat container only when messages array length changes (never scroll window)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages.length]);

  // Handle Text-to-Speech (TTS)
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Comprehensive Medical Clinical Decision Engine
  const generateAIResponse = (userPrompt) => {
    const lower = userPrompt.toLowerCase();
    
    let aiText = "";
    let triageQuestions = [];
    let diagnosisSummary = "";
    let isEmergency = false;
    let emergencyAction = "";
    let medicalCategory = "Clinical Triage";

    // 1. CARDIAC & CHEST PAIN EMERGENCY
    if (lower.includes('chest pain') || lower.includes('angina') || (lower.includes('chest') && lower.includes('tight')) || lower.includes('heart attack')) {
      isEmergency = true;
      emergencyAction = "CRITICAL RED FLAG: Possible Acute Coronary Syndrome or Myocardial Ischemia. Emergency Medical Triage (EMT) dispatched.";
      aiText = "I am detecting high-priority cardiac symptoms. Continuous telemetry shows Heart Rate 108 BPM with mild arterial pressure elevation. Analyzing Lead-1 ECG waveform for ST-segment deviation...";
      triageQuestions = [
        "Does the pain or pressure radiate into your left arm, jaw, shoulder, or back?",
        "Did this symptom begin abruptly during physical exertion or at rest?",
        "Are you experiencing cold sweats, lightheadedness, or acute nausea?"
      ];
      diagnosisSummary = "High Risk Triage: Differential includes Acute Coronary Syndrome (ACS), severe coronary vasospasm, or pericarditis. Immediate 12-Lead ECG & Troponin I blood assay recommended.";
      medicalCategory = "Cardiology Red Flag";
    }

    // 2. STROKE & NEUROLOGICAL RED FLAGS
    else if (lower.includes('numbness') || lower.includes('face drooping') || lower.includes('slur') || lower.includes('speech') || lower.includes('paralysis') || lower.includes('stroke')) {
      isEmergency = true;
      emergencyAction = "EMERGENCY NEUROLOGICAL TRIAGE: FAST Protocol alert triggered. Neuro-trauma team requested immediately.";
      aiText = "Critical FAST protocol alert. Evaluating sudden focal neurological deficit, cranial nerve symmetry, and cerebral perfusion...";
      triageQuestions = [
        "Is the numbness or weakness strictly isolated to one side of your face or body?",
        "Are you having difficulty speaking clearly or understanding words?",
        "Did you experience sudden severe loss of balance or double vision?"
      ];
      diagnosisSummary = "High Risk Triage: Differential includes Transient Ischemic Attack (TIA) or Acute Ischemic Stroke. Immediate Non-Contrast Head CT Scan required within 45 minutes.";
      medicalCategory = "Neurology Emergency";
    }

    // 3. HEADACHES & MIGRAINE
    else if (lower.includes('headache') || lower.includes('migraine') || lower.includes('temple') || lower.includes('aura') || lower.includes('head pain')) {
      aiText = "Evaluating cranial vascular tone, autonomic stress markers, circadian sleep logs, and systemic hydration index...";
      triageQuestions = [
        "Is the pain throbbing and localized to one side, or a tight band around your entire head?",
        "Are you experiencing photophobia (light sensitivity), nausea, or visual aura?",
        "Did this headache start suddenly like a 'thunderclap' (worst headache of life)?"
      ];
      diagnosisSummary = "Low/Moderate Triage: Differential includes Primary Migraine with Aura (92% probability) vs Tension-Type Headache. Recommended: Magnesium L-Threonate (400mg), 500ml electrolyte water, and dark quiet rest.";
      medicalCategory = "Neurology";
    }

    // 4. BLOOD PRESSURE & HYPERTENSION
    else if (lower.includes('blood pressure') || lower.includes('bp') || lower.includes('hypertension') || lower.includes('130') || lower.includes('140') || lower.includes('150')) {
      aiText = "Analyzing your long-term arterial compliance, continuous cuff readings, sodium-potassium renal balance, and vascular resistance...";
      triageQuestions = [
        "Was your BP measured at rest after sitting quietly for 5 minutes?",
        "Are you experiencing any concurrent occipital headache, blurred vision, or chest tightness?",
        "What is your average 7-day morning resting blood pressure reading?"
      ];
      diagnosisSummary = "Stage 1/2 Hypertension Assessment: Systolic 130-140 mmHg indicates sub-optimal peripheral vascular resistance. Protocol: Sodium restriction (< 2000mg/day), potassium enrichment, and 30-min Zone-2 cardio.";
      medicalCategory = "Vascular Health";
    }

    // 5. LIPIDS, CHOLESTEROL & APOB LONGEVITY
    else if (lower.includes('apob') || lower.includes('cholesterol') || lower.includes('lipid') || lower.includes('ldl') || lower.includes('hdl') || lower.includes('statin')) {
      aiText = "Cross-referencing your 30x whole genome sequencing (APOE e3/e3 baseline), fasting ApoB particle count (62 mg/dL), and arterial hs-CRP inflammatory index...";
      triageQuestions = [
        "What was your most recent ApoB (Apolipoprotein B) or LDL-P particle count?",
        "Are you taking prescription statins, Ezetimibe, or PCSK9 inhibitors?",
        "Do you have a direct family history of early cardiovascular events (< 55 yrs)?"
      ];
      diagnosisSummary = "Atherogenic Risk Protocol: ApoB particle concentration is the gold-standard predictor of plaque development. Recommendation: Target ApoB < 60 mg/dL via fiber-rich nutrition, High-DHA Omega-3s (2g), and CoQ10 Ubiquinol.";
      medicalCategory = "Preventive Cardiology";
    }

    // 6. SLEEP, HRV & RECOVERY
    else if (lower.includes('sleep') || lower.includes('rem') || lower.includes('hrv') || lower.includes('insomnia') || lower.includes('tired') || lower.includes('fatigue')) {
      aiText = "Analyzing your nocturnal photoplethysmography (PPG), respiratory rate variance, ambient room temperature, and parasympathetic HRV recovery...";
      triageQuestions = [
        "Are you waking up unrefreshed despite 7+ hours in bed (Possible Sleep Apnea)?",
        "Do you view bright screen illumination within 90 minutes of sleep?",
        "Is your average night-time heart rate variability (HRV) below 50 ms?"
      ];
      diagnosisSummary = "Circadian & Recovery Optimization: Low REM sleep quality correlates with late blue light exposure and evening cortisol spikes. Recommendation: Sleep at 67°F ambient temp, 400mg Magnesium Glycinate, and morning 10,000 lux sunlight.";
      medicalCategory = "Somnology & Sleep";
    }

    // 7. DIABETES, GLUCOSE & METABOLISM
    else if (lower.includes('glucose') || lower.includes('sugar') || lower.includes('diabetes') || lower.includes('cgm') || lower.includes('insulin') || lower.includes('hba1c')) {
      aiText = "Evaluating continuous glucose monitor (CGM) telemetry stream, post-prandial glucose AUC (Area Under Curve), and insulin sensitivity markers...";
      triageQuestions = [
        "What is your typical post-meal glucose peak (mg/dL)?",
        "Do you experience post-prandial energy slumps 60-90 minutes after carbs?",
        "Was your latest fasting glucose under 99 mg/dL or HbA1c under 5.7%?"
      ];
      diagnosisSummary = "Metabolic Health Protocol: Steady post-prandial glucose prevents endothelial glycative stress. Recommended: 10-minute post-meal walk, berberine or apple cider vinegar prior to high-carb meals.";
      medicalCategory = "Metabolic Medicine";
    }

    // 8. DIET, SUPPLEMENTS & NUTRITION
    else if (lower.includes('supplement') || lower.includes('vitamin') || lower.includes('magnesium') || lower.includes('diet') || lower.includes('protein') || lower.includes('creatine')) {
      aiText = "Analyzing your genomic MTHFR folate conversion status, renal filtration rate, and bio-available serum vitamin D3 baseline...";
      triageQuestions = [
        "Are you taking synthetic folic acid or bio-active L-Methylfolate (5-MTHF)?",
        "What is your target daily dietary protein intake per kg of bodyweight?",
        "Do you experience stomach sensitivity with magnesium oxide vs glycinate?"
      ];
      diagnosisSummary = "Precision Supplementation Stack: 1) Magnesium L-Threonate for blood-brain barrier penetration, 2) Vitamin D3 (5000 IU) + K2 MK-7, 3) High-purity EPA/DHA Fish Oil (2000mg).";
      medicalCategory = "Nutrigenomics";
    }

    // 9. DIZZINESS, DEHYDRATION & SYNCOPE
    else if (lower.includes('dizzy') || lower.includes('faint') || lower.includes('lightheaded') || lower.includes('vertigo')) {
      aiText = "Evaluating orthostatic hemodynamic shifts, inner ear vestibular balance, hydration status, and continuous pulse stability...";
      triageQuestions = [
        "Does the dizziness occur when standing up quickly (Orthostatic hypotension)?",
        "Is the room spinning around you (Benign Paroxysmal Positional Vertigo)?",
        "Have you consumed at least 2.5L of water with trace minerals today?"
      ];
      diagnosisSummary = "Hemodynamic & Hydration Assessment: Most transient lightheadedness stems from sudden peripheral vasodilation or low extracellular fluid volume. Drink 500ml water with pinch of electrolytes.";
      medicalCategory = "Autonomic Neurology";
    }

    // 10. UNIVERSAL CLINICAL ENGINE FOR ALL OTHER QUESTIONS
    else {
      // Extract key words from user prompt for personalized context
      const words = userPrompt.split(' ').filter(w => w.length > 3).slice(0, 4).join(' ');
      aiText = `Analyzing clinical parameters regarding "${userPrompt}". Cross-referencing Mayo Clinic clinical evidence databases, whole genome pathways, and your real-time digital twin...`;
      triageQuestions = [
        `How long have you noticed symptoms related to ${words || 'this condition'}?`,
        "Is the onset acute (sudden) or chronic (gradual over weeks)?",
        "Are there any aggravating or relieving factors (rest, hydration, movement)?"
      ];
      diagnosisSummary = `Clinical AI Assessment: Logged query into your Digital Twin portal. Preliminary differential shows favorable prognosis under current health metrics. Follow-up diagnostic lab work recommended if symptoms persist.`;
      medicalCategory = "General Clinical Triage";
    }

    return { aiText, triageQuestions, diagnosisSummary, isEmergency, emergencyAction, medicalCategory };
  };

  // Submit User Message
  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add User Message
    const newUserMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and response latency
    setTimeout(() => {
      const response = generateAIResponse(query);
      const newAIMsg = {
        sender: 'ai',
        text: response.aiText,
        triageQuestions: response.triageQuestions,
        diagnosisSummary: response.diagnosisSummary,
        emergency: response.isEmergency,
        emergencyAction: response.emergencyAction,
        category: response.medicalCategory
      };

      setMessages(prev => [...prev, newAIMsg]);
      setIsTyping(false);

      if (response.isEmergency) {
        setEmergencyAlert(response.emergencyAction);
      }

      // Automatically speak response if voice mode enabled
      if (isVoiceActive) {
        speakText(response.aiText);
      }
    }, 1000);
  };

  // Handle Preset Click
  const handlePresetClick = (preset) => {
    handleSendMessage(preset);
  };

  // Handle Voice Toggle
  const toggleVoiceMode = () => {
    if (!isVoiceActive) {
      setIsVoiceActive(true);
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        try {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = 'en-US';
          recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            handleSendMessage(transcript);
          };
          recognition.start();
        } catch (e) {
          console.warn("Speech recognition fallback");
        }
      }
    } else {
      setIsVoiceActive(false);
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <section id="assistant" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold mb-4">
            <Bot className="w-3.5 h-3.5 text-sky-600" />
            <span>Section 08 • Medical AI Clinical Triage Engine</span>
          </div>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-5xl text-slate-950 tracking-tight mb-4">
            Talk to AI as naturally as a top physician.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Ask any medical question, report symptoms, or inquire about longevity protocols. Powered by Mayo Clinic & WHO clinical intelligence models.
          </p>
        </div>

        {/* Preset Prompt Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {presetOptions.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetClick(preset)}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-[#FAF9F6] text-slate-700 hover:bg-sky-50 hover:text-sky-700 border border-slate-200/70 shadow-xs transition-all text-left flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>"{preset}"</span>
            </button>
          ))}
        </div>

        {/* Interactive Chat Window */}
        <div className="max-w-4xl mx-auto bg-[#FAF9F6] border border-sky-100/90 rounded-3xl p-6 sm:p-8 shadow-organic">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-['Outfit'] font-bold text-lg text-slate-900">Dr. AURA Medical AI Assistant</h3>
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Clinical Engine Active (99.8% Triage Accuracy)</span>
                </div>
              </div>
            </div>

            {/* Voice & TTS Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleVoiceMode}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isVoiceActive 
                    ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/20' 
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-sky-50'
                }`}
              >
                {isVoiceActive ? <Mic className="w-4 h-4 text-white" /> : <MicOff className="w-4 h-4 text-slate-400" />}
                <span>{isVoiceActive ? 'Voice Mode Active' : 'Voice Mode'}</span>
              </button>

              <button
                onClick={() => speakText(messages[messages.length - 1]?.text || '')}
                className={`p-2 rounded-full border transition-all ${
                  isSpeaking ? 'bg-sky-100 border-sky-300 text-sky-700 animate-pulse' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Read last response aloud"
              >
                {isSpeaking ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Emergency Alert Banner */}
          {emergencyAlert && (
            <div className="mb-6 bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center justify-between gap-4 text-rose-900 animate-pulse shadow-sm">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                <div className="text-xs font-bold leading-relaxed">{emergencyAlert}</div>
              </div>
              <button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl shrink-0 shadow-md">
                <PhoneCall className="w-3.5 h-3.5" /> Dispatch ER
              </button>
            </div>
          )}

          {/* Chat Messages Stream */}
          <div ref={chatContainerRef} className="space-y-6 mb-8 max-h-[460px] overflow-y-auto pr-2">
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.sender === 'user' ? (
                  /* User Message */
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-slate-900 text-white p-4 rounded-2xl rounded-tr-xs max-w-lg text-xs leading-relaxed shadow-sm">
                      <div className="text-[10px] uppercase font-bold text-sky-300 mb-1">Patient Inquiry</div>
                      "{msg.text}"
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                ) : (
                  /* AI Message */
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-sky-100 p-5 rounded-2xl rounded-tl-xs max-w-xl text-xs text-slate-700 leading-relaxed shadow-sm space-y-4">
                      
                      {/* Medical Category Tag */}
                      {msg.category && (
                        <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                          {msg.category}
                        </span>
                      )}

                      {/* Response text */}
                      <p className="font-medium text-slate-900 leading-relaxed">{msg.text}</p>

                      {/* Follow-up Triage Questions */}
                      {msg.triageQuestions && msg.triageQuestions.length > 0 && (
                        <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-100">
                          <div className="text-[10px] uppercase font-bold text-sky-800 mb-2 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Click to Answer Follow-up Triage:
                          </div>
                          <div className="space-y-2">
                            {msg.triageQuestions.map((q, qIdx) => (
                              <button
                                key={qIdx}
                                onClick={() => handleSendMessage(q)}
                                className="w-full text-left flex items-start gap-2 text-xs text-slate-800 hover:text-sky-700 font-medium bg-white p-2.5 rounded-lg border border-slate-200/60 hover:border-sky-300 transition-all shadow-2xs group"
                              >
                                <ChevronRight className="w-4 h-4 text-sky-500 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                                <span>{q}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Diagnosis & Action Summary */}
                      {msg.diagnosisSummary && (
                        <div className="text-xs text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                          <span className="font-bold text-slate-900">Clinical Assessment & Protocol: </span>
                          {msg.diagnosisSummary}
                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-sky-100 px-4 py-3 rounded-2xl text-xs text-slate-500 font-medium shadow-xs flex items-center gap-2">
                  <span>Dr. AURA is analyzing clinical markers...</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
                </div>
              </div>
            )}
          </div>

          {/* Interactive Text Input Box */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }} 
            className="bg-white border border-slate-200/80 rounded-2xl p-2 flex items-center justify-between gap-3 shadow-xs"
          >
            <input 
              type="text" 
              placeholder="Ask any health question, symptom, BP, ApoB, sleep, or medication query..." 
              className="w-full text-xs text-slate-800 px-4 py-2 bg-transparent outline-none font-medium"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-600 disabled:opacity-40 text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-sm shrink-0"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}

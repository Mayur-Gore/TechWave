import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Trash2,
  AlertTriangle,
  Leaf,
  ShieldAlert,
  ShoppingCart,
  CheckCircle2,
  Sprout
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import PillButton from '../components/ui/PillButton';
import Badge from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import {
  CROPS_LIST,
  SYMPTOM_CHIPS,
  POPULAR_QUERIES,
  seedCropProblems
} from '../data/seedCropProblems';
import { STORAGE_KEYS } from '../utils/storage';

const INITIAL_MESSAGES = [
  {
    id: 'msg-init-1',
    sender: 'bot',
    text: 'Namaskar! I am your Viksit Shetkari AI Crop Advisor. Select your crop, choose symptoms or describe what you notice in your field (e.g. yellow leaves, leaf spots, wilting). How can I assist your crop today?',
    timestamp: 'Just now',
    disclaimer: 'Simulated educational guidance, not a verified diagnosis.',
  },
];

export default function AiAdvisorPage() {
  const { t, products, addToCart } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage or fallback to initial
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAT);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  // Persist chat history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(messages));
    } catch (err) {
      console.warn('Failed to save chat history to localStorage', err);
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem(STORAGE_KEYS.CHAT);
    } catch {
      // ignore
    }
  };

  const handleMatchDiagnosis = (text, crop) => {
    const query = text.toLowerCase();
    const activeCrop = crop === 'All' ? null : crop.toLowerCase();

    // Score problems based on crop match and keyword/symptom overlaps
    let bestMatch = null;
    let highestScore = 0;

    seedCropProblems.forEach((problem) => {
      let score = 0;
      const probCrop = problem.crop.toLowerCase();

      if (activeCrop && probCrop === activeCrop) {
        score += 5;
      } else if (!activeCrop && query.includes(probCrop)) {
        score += 4;
      }

      problem.keywords.forEach((kw) => {
        if (query.includes(kw.toLowerCase())) {
          score += 3;
        }
      });

      problem.symptoms.forEach((sym) => {
        if (query.includes(sym.toLowerCase())) {
          score += 2;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = problem;
      }
    });

    if (highestScore >= 3 && bestMatch) {
      return {
        matched: true,
        data: bestMatch,
      };
    }

    return {
      matched: false,
      data: null,
    };
  };

  const handleSubmit = (textToSend = inputQuery) => {
    const text = (textToSend || '').trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      crop: selectedCrop !== 'All' ? selectedCrop : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate ~1s AI response time
    setTimeout(() => {
      const diagnosis = handleMatchDiagnosis(text, selectedCrop);

      let botMsg;
      if (diagnosis.matched) {
        const p = diagnosis.data;
        // Find related products
        const relatedProds = (p.relatedProductIds || [])
          .map((id) => products.find((prod) => prod.id === id))
          .filter(Boolean);

        botMsg = {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          crop: p.crop,
          diagnosisTitle: p.title,
          cause: p.cause,
          confidence: p.confidence,
          organicRemedy: p.organicRemedy,
          chemicalGuidance: p.chemicalGuidance,
          preventiveTips: p.preventiveTips,
          relatedProducts: relatedProds,
          disclaimer: 'Simulated educational guidance, not a verified diagnosis.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        botMsg = {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          isFallback: true,
          text: `I could not find an exact match for your symptom description. For accurate crop protection in Maharashtra:
          
1. Check if the issue is nutrient deficiency (chlorosis), fungal spore formation, or sap-sucking insects on leaf undersides.
2. Ensure you have selected the specific crop (e.g. Cotton, Soybean, Tomato) above.
3. Consult your Taluka Agriculture Officer or visit the nearest Krishi Vigyan Kendra (KVK) with a live plant leaf sample for an on-site diagnosis.`,
          disclaimer: 'Simulated educational guidance, not a verified diagnosis.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSymptomClick = (symptom) => {
    const query = selectedCrop !== 'All'
      ? `${selectedCrop} showing ${symptom.toLowerCase()}`
      : `Crop showing ${symptom.toLowerCase()}`;
    handleSubmit(query);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={t.nav.aiAdvisor}
        subtitle="AI-driven agricultural diagnostic assistant for pest control, crop diseases, and organic plant nutrition."
        badge={
          <Badge variant="amber" icon={Sparkles}>
            AI Educational Demo
          </Badge>
        }
        action={
          <PillButton
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={handleClearChat}
            className="text-gray-500 hover:text-danger"
          >
            Clear Chat
          </PillButton>
        }
      />

      {/* Mandatory Prominent Educational Disclaimer */}
      <div
        role="note"
        aria-label="Educational Disclaimer"
        className="p-3.5 rounded-card bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3 text-xs sm:text-sm"
      >
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-0.5">
          <p className="font-semibold text-amber-900">
            Important Agricultural Advisory Notice
          </p>
          <p className="text-amber-800 leading-relaxed">
            Simulated educational guidance, not a verified diagnosis. For chemical applications and formal prescriptions, always verify with your local Agriculture Extension Officer or Krishi Vigyan Kendra (KVK).
          </p>
        </div>
      </div>

      {/* Crop Selector & Symptom Filter Bar */}
      <Card className="space-y-4">
        {/* Crop Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            1. Select Your Crop / पीक निवडा
          </label>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {['All', ...CROPS_LIST].map((crop) => (
              <button
                key={crop}
                type="button"
                onClick={() => setSelectedCrop(crop)}
                className={`min-h-[40px] px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-pill transition-colors ${
                  selectedCrop === crop
                    ? 'bg-primary text-white shadow-xs font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Symptom Chips */}
        <div className="space-y-1.5 pt-2 border-t border-gray-100">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            2. Quick Symptom Chips / मुख्य लक्षणे
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {SYMPTOM_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSymptomClick(chip)}
                disabled={isTyping}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-medium hover:bg-emerald-100 transition-colors disabled:opacity-50 min-h-[38px]"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>{chip}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular queries */}
        <div className="space-y-1.5 pt-2 border-t border-gray-100">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Popular Farmer Questions
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {POPULAR_QUERIES.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSubmit(q)}
                disabled={isTyping}
                className="text-left text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
              >
                &ldquo;{q}&rdquo;
              </button>

            ))}
          </div>
        </div>
      </Card>

      {/* Main Chat Stream Container */}
      <Card className="min-h-[460px] flex flex-col justify-between p-4 sm:p-6 bg-gray-50/50">
        {/* Messages List */}
        <div
          role="log"
          aria-live="polite"
          aria-label="Crop Advisory Chat History"
          className="space-y-4 overflow-y-auto max-h-[520px] pr-1 pb-4"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            if (isUser) {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-primary text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-lg shadow-xs space-y-1">
                    <p className="text-sm">{msg.text}</p>
                    <div className="flex items-center justify-end gap-2 text-[10px] text-emerald-200">
                      {msg.crop && <span>Crop: {msg.crop}</span>}
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            }

            // Bot message
            return (
              <div key={msg.id} className="flex items-start gap-3 max-w-2xl">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Sprout className="w-5 h-5" aria-hidden="true" />
                </div>

                <div className="bg-white rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-card border border-gray-200/80 space-y-3.5 flex-1 text-gray-900">
                  {/* Greeting / Fallback text */}
                  {msg.text && (
                    <p className="text-sm leading-relaxed whitespace-pre-line text-gray-800">
                      {msg.text}
                    </p>
                  )}

                  {/* Diagnostic details if matched */}
                  {msg.diagnosisTitle && (
                    <div className="space-y-3">
                      <div className="pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge variant="primary" size="sm">
                            {msg.crop}
                          </Badge>
                          <span className="text-xs text-gray-500 font-medium">
                            {msg.confidence}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-heading font-bold text-gray-900">
                          {msg.diagnosisTitle}
                        </h3>
                      </div>

                      {/* Cause */}
                      <div className="text-sm">
                        <span className="font-semibold text-gray-900 block mb-0.5">
                          Likely Cause:
                        </span>
                        <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                          {msg.cause}
                        </p>
                      </div>

                      {/* Organic Remedies */}
                      <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-sm space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-900 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                          <span>Organic & Biological Solutions:</span>
                        </div>
                        <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed pl-5">
                          {msg.organicRemedy}
                        </p>
                      </div>

                      {/* Chemical Guidance (Strictly refers to KVK / Extension officer) */}
                      <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-sm space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-amber-900 text-xs sm:text-sm">
                          <ShieldAlert className="w-4 h-4 text-amber-700" aria-hidden="true" />
                          <span>Chemical Management Guidance:</span>
                        </div>
                        <p className="text-amber-900 text-xs sm:text-sm leading-relaxed pl-5">
                          {msg.chemicalGuidance}
                        </p>
                      </div>

                      {/* Preventive Tips */}
                      <div className="text-xs sm:text-sm text-gray-700 pt-1">
                        <span className="font-semibold text-gray-900 block mb-0.5">
                          Preventive Agronomic Tips:
                        </span>
                        <p className="leading-relaxed text-gray-600">
                          {msg.preventiveTips}
                        </p>
                      </div>

                      {/* Related Marketplace Products */}
                      {msg.relatedProducts && msg.relatedProducts.length > 0 && (
                        <div className="pt-3 border-t border-gray-100 space-y-2">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                            Recommended Marketplace Bio-Inputs & Tools:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {msg.relatedProducts.map((prod) => (
                              <div
                                key={prod.id}
                                className="flex items-center justify-between p-2.5 rounded-lg border border-gray-200 bg-white hover:border-primary transition-colors text-xs"
                              >
                                <div>
                                  <p className="font-semibold text-gray-900 truncate max-w-[180px]">
                                    {prod.name}
                                  </p>
                                  <p className="text-primary font-bold">
                                    ₹{prod.price} <span className="text-gray-500 font-normal">/{prod.unit}</span>
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => addToCart(prod, 1)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-pill bg-primary-light text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
                                  aria-label={`Add ${prod.name} to cart`}
                                >
                                  <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>Add</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message footer timestamp & disclaimer */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="italic text-gray-400">{msg.disclaimer}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5 animate-spin" aria-hidden="true" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-xs px-4 py-3 shadow-card border border-gray-200 flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 font-medium">Analyzing crop symptoms...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="pt-3 border-t border-gray-200 flex items-center gap-2"
        >
          <label htmlFor="crop-advisor-query" className="sr-only">
            Describe crop symptoms
          </label>
          <input
            id="crop-advisor-query"
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isTyping}
            placeholder={
              selectedCrop !== 'All'
                ? `Ask about ${selectedCrop} (e.g. yellow spots, wilting)...`
                : 'Describe symptoms or ask about pest remedies...'
            }
            className="flex-1 min-h-[46px] px-4 py-2.5 rounded-pill border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
          />

          <PillButton
            type="submit"
            variant="primary"
            icon={Send}
            disabled={!inputQuery.trim() || isTyping}
            loading={isTyping}
            ariaLabel="Send question to AI advisor"
          >
            Ask
          </PillButton>
        </form>
      </Card>
    </div>
  );
}

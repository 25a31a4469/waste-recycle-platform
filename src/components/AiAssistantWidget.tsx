'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { getAiAssistantResponse, ChatMessage } from '@/lib/aiAssistant';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShieldAlert,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';

export function AiAssistantWidget() {
  const { language, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: ChatMessage = {
    id: 'initial_1',
    sender: 'assistant',
    text:
      language === 'te'
        ? 'నమస్కారం! నేను సర్క్యువియా AI రిసోర్స్ అసిస్టెంట్‌ని. పారిశ్రామిక వ్యర్థాల పునర్వినియోగం, ముడిసరుకు విక్రయ వివరణలు, లేదా రసాయన ప్రమాణాల గురించి నన్ను అడగండి.'
        : 'Welcome! I am your CIRCUVIA AI Circular Resource Assistant. Ask me about industrial by-product repurposing, listing description polishing, or sourcing secondary feedstocks.',
    timestamp: '10:00 AM',
    chips:
      language === 'te'
        ? [
            'ఫౌండ్రీ స్లాగ్‌ను పరిశ్రమలలో ఎలా ఉపయోగించవచ్చు?',
            'PET రీగ్రైండ్‌ను ఆకర్షణీయంగా వివరించడం ఎలా?',
            'ఫ్లై యాష్ సిమెంట్ తయారీకి ఎలా ఉపయోగపడుతుంది?',
            'తెలంగాణలో ప్లాస్టిక్ రీసైక్లర్లు ఎవరు?',
          ]
        : [
            'What industrial uses exist for foundry slag?',
            'How to describe PET regrind to attract textile spinners?',
            'What can I do with 50 tons of bagasse ash?',
            'Suggest recyclers for HDPE scrap in Telangana',
          ],
    disclaimer: true,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  // Update greeting when language switches
  useEffect(() => {
    setMessages([
      {
        id: `greet_${language}`,
        sender: 'assistant',
        text:
          language === 'te'
            ? 'నమస్కారం! నేను సర్క్యువియా AI రిసోర్స్ అసిస్టెంట్‌ని. పారిశ్రామిక వ్యర్థాల పునర్వినియోగం లేదా ముడిసరుకు విక్రయాలపై తెలుగు లేదా English లో నన్ను అడగండి.'
            : 'Welcome! I am your CIRCUVIA AI Circular Resource Assistant. Ask me about industrial by-product repurposing, listing description polishing, or sourcing secondary feedstocks in English or Telugu.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips:
          language === 'te'
            ? [
                'ఫౌండ్రీ స్లాగ్‌ను పరిశ్రమలలో ఎలా ఉపయోగించవచ్చు?',
                'PET రీగ్రైండ్‌ను ఆకర్షణీయంగా వివరించడం ఎలా?',
                'ఫ్లై యాష్ సిమెంట్ తయారీకి ఎలా ఉపయోగపడుతుంది?',
                'తెలంగాణలో ప్లాస్టిక్ రీసైక్లర్లు ఎవరు?',
              ]
            : [
                'What industrial uses exist for foundry slag?',
                'How to describe PET regrind to attract textile spinners?',
                'What can I do with 50 tons of bagasse ash?',
                'Suggest recyclers for HDPE scrap in Telangana',
              ],
        disclaimer: true,
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAiAssistantResponse(query, language);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 to-forest-800 text-white rounded-2xl shadow-xl shadow-emerald-950/40 hover:shadow-emerald-900/60 hover:-translate-y-1 transition-all border border-emerald-500/40"
          aria-label="Open CIRCUVIA AI Assistant"
        >
          <div className="w-8 h-8 rounded-xl bg-forest-950/80 flex items-center justify-center text-lime-400 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>CIRCUVIA AI</span>
              <span className="text-[10px] px-1 py-0.2 bg-lime-400 text-forest-950 rounded font-black">
                {language === 'te' ? 'సహాయకుడు' : 'ASSISTANT'}
              </span>
            </div>
            <div className="text-[10px] text-emerald-200">
              {language === 'te' ? 'ఇంగ్లీష్ & తెలుగు' : 'English & తెలుగు'}
            </div>
          </div>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          role="region"
          aria-label="AI Assistant"
          className="w-[92vw] sm:w-[420px] h-[550px] max-h-[85vh] bg-forest-950 border border-emerald-800/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-forest-900 to-emerald-950 border-b border-emerald-900/60 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-lime-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-emerald-100 flex items-center gap-1.5">
                  {t('assistantTitle')}
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {language === 'te' ? 'సిద్ధంగా ఉంది (Online)' : 'Circular Knowledge Engine Active'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-forest-900 transition-colors"
              aria-label="Close Assistant"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Safety Advisory Banner */}
          <div className="px-3 py-1.5 bg-amber-950/40 border-b border-amber-800/30 flex items-center gap-2 text-[10px] text-amber-200">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">
              {language === 'te'
                ? 'రసాయన లేదా ప్రమాదకర వ్యర్థాలపై సూచనలు ప్రయోగశాల పరీక్షకు లోబడి ఉంటాయి.'
                : 'Safety & chemical data are advisory until verified by lab tests.'}
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-800/50 border border-emerald-600/40 flex items-center justify-center text-lime-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                      : 'bg-forest-900/80 text-stone-200 border border-emerald-900/50 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span className="text-[9px] opacity-60 mt-1 block text-right">{m.timestamp}</span>

                  {/* Suggestion Prompt Chips */}
                  {m.chips && m.chips.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-900/50 flex flex-wrap gap-1.5">
                      {m.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="px-2 py-1 bg-forest-950 hover:bg-emerald-900/60 border border-emerald-800/40 rounded-lg text-[10px] text-emerald-300 hover:text-white transition-colors text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-forest-950 font-bold shrink-0 mt-0.5 text-[10px]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-stone-400 text-xs pl-8">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>{language === 'te' ? 'AI సమాధానం రూపొందిస్తోంది...' : 'CIRCUVIA AI is formulating response...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-forest-900/60 border-t border-emerald-900/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('assistantInputPlaceholder')}
                className="flex-1 bg-forest-950 border border-emerald-800/50 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

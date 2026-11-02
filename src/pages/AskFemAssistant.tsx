/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import {
  MessageSquareHeart,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import { geminiService } from '../services/geminiService';
import { storageService, DEFAULT_DEMO_PROFILE } from '../services/storageService';
import { cyclePredictionService } from '../services/cyclePredictionService';
import { ChatMessage } from '../types';

export default function AskFemAssistant() {
  const profile = storageService.getUserProfile() || DEFAULT_DEMO_PROFILE;
  const cycleStatus = cyclePredictionService.calculateCycleStatus(profile);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_0',
      sender: 'assistant',
      text: `Hello ${profile.name || 'there'}! I am **Ask Flourish AI**, your cycle-aware nutrition and menstrual flow wellness guide. 

You are currently on **Day ${cycleStatus.cycleDay} (${cycleStatus.currentPhase} phase)**. How can I help you today with recipes, craving substitutions, or PCOS meal planning?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['RecipeDB Computational Gastronomy', 'FlavorDB Molecular Profiles'],
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Why do I crave chocolate before my period?',
    'What seeds should I eat during my current phase?',
    'Best high-protein South Indian breakfast for PCOS',
    'How do I relieve severe menstrual cramps naturally?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const result = await geminiService.askWellnessAssistant(
        text,
        profile,
        cycleStatus.currentPhase
      );

      const botMsg: ChatMessage = {
        id: `msg_b_${Date.now()}`,
        sender: 'assistant',
        text: result.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: result.sources,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Handled in service fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F9DCE7]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#EFA6BE] to-[#C65B83] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif-title text-xl font-bold text-[#382536] flex items-center gap-1.5">
                <span>Ask Flourish AI</span>
                <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#EBF2E8] text-emerald-800">
                  Gemini API Connected
                </span>
              </h1>
              <p className="text-[11px] text-[#897887]">
                Grounded in your {cycleStatus.currentPhase} profile & Foodoscope research
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setMessages([
                {
                  id: 'msg_reset',
                  sender: 'assistant',
                  text: `Fresh session started. How can I support your nutrition or cycle today, ${profile.name}?`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ])
            }
            className="p-1.5 rounded-full text-[#897887] hover:bg-white transition"
            title="Clear Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages Window */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[60vh] min-h-[420px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-[#F9DCE7] text-[#C65B83] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-[#C65B83] text-white rounded-tr-xs shadow-xs'
                    : 'bg-white border border-[#F9DCE7] text-[#382536] rounded-tl-xs shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.text}</div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2 border-t border-[#F9DCE7]/60 text-[10px] text-[#897887] space-y-0.5">
                    <span className="font-semibold text-[#382536] flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#C65B83]" /> Evidence Sources:
                    </span>
                    {msg.sources.map((s, i) => (
                      <div key={i}>• {s}</div>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[9px] text-right ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-[#897887]'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#382536] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 text-xs justify-start items-center text-[#897887]">
              <div className="w-7 h-7 rounded-full bg-[#F9DCE7] text-[#C65B83] flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#F9DCE7] px-4 py-2.5 rounded-2xl flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C65B83] animate-spin" />
                <span>Thinking through hormonal biochemistry...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white border border-[#F9DCE7] text-[#382536] hover:border-[#C65B83] hover:bg-[#FFF9FB] transition text-left"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about recipe adjustments, seed cycling, symptoms, or craving swaps..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            className="flex-1 py-3 pl-4 pr-12 rounded-2xl bg-white border border-[#F9DCE7] text-xs text-[#382536] outline-hidden focus:border-[#C65B83] shadow-xs"
          />

          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="absolute right-2 p-2 rounded-xl bg-[#C65B83] text-white hover:bg-[#8E2B54] disabled:opacity-40 transition shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-center text-[#897887] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#A8B99B]" />
          <span>Flourish AI provides nutritional education. Not intended for clinical medical diagnosis.</span>
        </p>
      </main>
    </div>
  );
}

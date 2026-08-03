"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Keyboard, Mic, MicOff, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { CommandBackground } from "@/components/command-center/command-background";
import { OrbitalCore } from "@/components/command-center/orbital-core";
import { askHermesAction } from "./hermes-actions";

type Phase = "idle" | "listening" | "thinking" | "speaking" | "error";
type Mode = "voice" | "text";

// Web Speech API não tem tipos oficiais no TS/DOM ainda.
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: unknown) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | undefined {
  return (
    (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition
  );
}

export default function CommandCenterPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mode, setMode] = useState<Mode>("voice");
  const [caption, setCaption] = useState("");
  const [captionRole, setCaptionRole] = useState<"user" | "hermes">("user");
  const [inputValue, setInputValue] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const [loopOn, setLoopOn] = useState(true); // conversa contínua, mãos livres — ligado por padrão

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const loopOnRef = useRef(true);
  const startListeningRef = useRef<() => void>(() => {});

  const corePos = { x: 300, y: 300 };

  useEffect(() => {
    if (!getSpeechRecognitionCtor() || !("speechSynthesis" in window)) {
      setSpeechSupported(false);
      setMode("text");
      setLoopOn(false);
      loopOnRef.current = false;
      return;
    }

    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    const ptVoice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("pt"));
    if (ptVoice) utterance.voice = ptVoice;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(safetyTimer);
      setPhase("idle");
      setCaption("");
      if (loopOnRef.current) startListeningRef.current();
    };

    utterance.onstart = () => setPhase("speaking");
    utterance.onend = finish;
    utterance.onerror = finish;

    // Rede de segurança: se "onend" nunca disparar (falha do navegador, ambiente
    // sem áudio, etc), destrava sozinho depois de um tempo estimado pelo tamanho
    // do texto, em vez de ficar preso em "falando" pra sempre.
    const estimatedMs = Math.min(Math.max(text.length * 90, 4000), 30000);
    const safetyTimer = setTimeout(finish, estimatedMs);

    window.speechSynthesis.speak(utterance);
  }, []);

  const hasGreetedRef = useRef(false);

  useEffect(() => {
    if (hasGreetedRef.current || !speechSupported) return;
    hasGreetedRef.current = true;

    const timer = setTimeout(() => {
      setCaption("Olá, Rafael. Sistemas online.");
      setCaptionRole("hermes");
      speak("Olá, Rafael. Sistemas online.");
    }, 1200);

    return () => clearTimeout(timer);
  }, [speechSupported, speak]);

  const handleSend = useCallback(
    async (prompt: string) => {
      if (!prompt.trim()) return;
      setCaption(prompt);
      setCaptionRole("user");
      setPhase("thinking");

      const result = await askHermesAction(prompt);

      if (result.ok) {
        setCaption(result.text);
        setCaptionRole("hermes");
        speak(result.text);
      } else {
        setCaption(result.error);
        setCaptionRole("hermes");
        setPhase("error");
        setTimeout(() => {
          setPhase("idle");
          setCaption("");
          if (loopOnRef.current) startListeningRef.current();
        }, 4000);
      }
    },
    [speak]
  );

  const startListening = useCallback(() => {
    const SpeechRecognitionCtor = getSpeechRecognitionCtor();
    if (!SpeechRecognitionCtor) return;

    window.speechSynthesis.cancel();
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const results = (event as { results: { transcript: string; isFinal: boolean }[][] }).results;
      const flat = results as unknown as { 0: { transcript: string }; isFinal: boolean }[];
      const last = flat[flat.length - 1];
      const transcript = last[0].transcript;
      setCaption(transcript);
      setCaptionRole("user");
      if (last.isFinal) {
        handleSend(transcript);
      }
    };

    recognition.onerror = (event) => {
      const errorType = (event as { error?: string }).error;
      // "no-speech"/"aborted" são normais num loop contínuo — só re-escuta, sem drama.
      // Erros reais (ex: permissão negada) param o loop pra não ficar tentando pra sempre.
      if (errorType === "not-allowed" || errorType === "service-not-allowed") {
        loopOnRef.current = false;
        setLoopOn(false);
        setPhase("idle");
        setCaption("Microfone bloqueado — permite o acesso e toca no mic pra tentar de novo.");
        setCaptionRole("hermes");
        setTimeout(() => setCaption(""), 5000);
        return;
      }
      setCaption("");
      setPhase("idle");
      if (loopOnRef.current) startListeningRef.current();
    };

    recognition.onend = () => {
      setPhase((p) => (p === "listening" ? "idle" : p));
    };

    recognitionRef.current = recognition;
    setPhase("listening");
    setCaption("");
    try {
      recognition.start();
    } catch {
      // já estava escutando, ou mic bloqueado — evita derrubar a tela por causa disso.
      setPhase("idle");
      setCaption("");
    }
  }, [handleSend]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  const toggleLoop = () => {
    if (loopOnRef.current) {
      loopOnRef.current = false;
      setLoopOn(false);
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
      setPhase("idle");
      setCaption("");
    } else {
      loopOnRef.current = true;
      setLoopOn(true);
      startListening();
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = inputValue.trim();
    if (!prompt) return;
    setInputValue("");
    handleSend(prompt);
  };

  const isSpeaking = phase === "speaking";

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none flex items-center justify-center bg-[#030305]"
      style={{ zIndex: 9999 }}
    >
      {/* ═══════ LAYER 0: Background ═══════ */}
      <CommandBackground bootPhase={8} />

      {/* ═══════ LAYER 1: Core Neural Viewport ═══════ */}
      <div className="relative w-[600px] h-[600px] aspect-square flex items-center justify-center">
        <motion.div
          animate={{ x: corePos.x - 300, y: corePos.y - 300 }}
          transition={{ type: "spring", damping: 20, stiffness: 80 }}
          className="absolute inset-0 w-full h-full"
        >
          <OrbitalCore bootPhase={8} cx={300} cy={300} isSpeaking={isSpeaking} />
        </motion.div>
      </div>

      {/* ═══════ LAYER 2: Legenda efêmera (some sozinha) ═══════ */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center text-center max-w-[560px] px-4">
        <AnimatePresence>
          {caption && (
            <motion.div
              key="caption"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-start gap-2.5 px-4 py-3 rounded-2xl border text-left ${
                phase === "error"
                  ? "bg-red-500/10 border-red-500/20"
                  : captionRole === "hermes"
                  ? "bg-purple-500/10 border-purple-500/20"
                  : "bg-cyan-500/10 border-cyan-500/20"
              }`}
            >
              <span
                className={`text-xs font-mono leading-relaxed whitespace-pre-wrap ${
                  phase === "error" ? "text-red-300" : captionRole === "hermes" ? "text-purple-100" : "text-cyan-100"
                }`}
              >
                {caption}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════ LAYER 3: Controle ═══════ */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-full border border-white/5"
        style={{ background: "rgba(3, 3, 5, 0.4)", backdropFilter: "blur(20px)", zIndex: 10002 }}
      >
        {mode === "voice" ? (
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLoop}
              className={`flex items-center justify-center w-11 h-11 rounded-full transition-all cursor-pointer ${
                phase === "listening"
                  ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse"
                  : loopOn
                  ? "bg-gradient-to-r from-cyan-500 to-[#8B5CF6] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)]"
                  : "bg-white/10 hover:bg-white/15"
              }`}
              title={loopOn ? "Pausar conversa" : "Retomar conversa"}
            >
              {loopOn ? <Mic className="w-4 h-4 text-black" /> : <MicOff className="w-4 h-4 text-white/60" />}
            </button>
            <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase min-w-[100px]">
              {phase === "listening" && "ouvindo..."}
              {phase === "thinking" && "pensando..."}
              {phase === "speaking" && "falando..."}
              {phase === "error" && "erro"}
              {phase === "idle" && (loopOn ? "conversa ativa" : "pausado")}
            </span>
            {speechSupported && (
              <button
                onClick={() => setMode("text")}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-white/20 text-white/40 hover:text-white transition-all cursor-pointer"
                title="Escrever em vez de falar"
              >
                <Keyboard className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escreve pro Hermes..."
              autoFocus
              className="w-72 bg-transparent text-xs font-mono text-white placeholder:text-white/30 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-[#8B5CF6] disabled:opacity-30 transition-opacity cursor-pointer disabled:cursor-default"
            >
              <Send className="w-3.5 h-3.5 text-black" />
            </button>
            {speechSupported && (
              <button
                type="button"
                onClick={() => setMode("voice")}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-white/20 text-white/40 hover:text-white transition-all cursor-pointer"
                title="Voltar pra voz"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        )}
      </div>

      {/* ═══════ LAYER 4: Voltar ═══════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        whileHover={{ opacity: 1 }}
        className="fixed top-6 left-6"
        style={{ zIndex: 10001 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full
                     border border-white/10 bg-black/40 text-white/50
                     hover:text-white hover:border-white/20 transition-all duration-300 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 text-white" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-white">Voltar ao OS</span>
        </Link>
      </motion.div>
    </div>
  );
}

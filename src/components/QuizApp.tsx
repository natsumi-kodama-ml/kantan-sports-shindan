"use client";

import { useMemo, useState } from "react";
import { QUESTIONS, type SportKey } from "@/lib/quiz-data";
import { computeResult, sportOf } from "@/lib/scoring";
import SportArt, { TriBackdrop } from "@/components/SportArt";

type Step = "intro" | number | "result";

export default function QuizApp() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<(number | null)[]>(
    QUESTIONS.map(() => null)
  );

  const result = useMemo(() => {
    if (step !== "result") return null;
    return computeResult(answers as number[]);
  }, [step, answers]);

  function selectOption(questionIndex: number, optionIndex: number) {
    const next = [...answers];
    next[questionIndex] = optionIndex;
    setAnswers(next);
  }

  function goNext(questionIndex: number) {
    if (answers[questionIndex] === null) {
      return false;
    }
    if (questionIndex < QUESTIONS.length - 1) {
      setStep(questionIndex + 1);
    } else {
      setStep("result");
    }
    return true;
  }

  function goBack() {
    if (typeof step !== "number") return;
    if (step === 0) {
      setStep("intro");
    } else {
      setStep(step - 1);
    }
  }

  function restart() {
    setAnswers(QUESTIONS.map(() => null));
    setStep("intro");
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 md:py-14">
      {step === "intro" && <IntroScreen onStart={() => setStep(0)} />}

      {typeof step === "number" && (
        <QuestionScreen
          key={step}
          questionIndex={step}
          selected={answers[step]}
          onSelect={(optionIndex) => selectOption(step, optionIndex)}
          onNext={() => goNext(step)}
          onBack={goBack}
        />
      )}

      {step === "result" && result && (
        <ResultScreen result={result} onRestart={restart} />
      )}
    </div>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  const previewSports: SportKey[] = [
    "running",
    "strength",
    "yoga",
    "futsal",
    "bouldering",
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-3xl aspect-[4/3] md:aspect-[16/9]">
        <svg
          viewBox="0 0 400 260"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <TriBackdrop colors={["#2E4A9E", "#F2793C", "#FFC93C"]} />
        </svg>
        <div className="relative h-full flex flex-col justify-between p-6 md:p-9">
          <p className="text-xs font-bold tracking-[0.3em] text-white/80 uppercase">
            Sport Diagnosis
          </p>
          <div className="flex flex-col gap-3">
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl leading-tight text-white drop-shadow-sm">
              かんたん
              <br />
              スポーツ診断
            </h1>
            <button
              onClick={onStart}
              className="self-start bg-white text-blue-dark font-bold px-8 py-3 rounded-full text-sm hover:scale-105 transition-transform shadow-lg"
            >
              診断をはじめる
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-3xl p-6 md:p-7 shadow-sm flex flex-col gap-5">
        <p className="text-sm leading-relaxed text-ink/70">
          「運動を始めたいけど、何が自分に合うか分からない」を解消します。
          {QUESTIONS.length}つの質問に答えると、あなたに向いているスポーツと
          その理由が分かります。所要時間は1分ほどです。
        </p>
        <div className="grid grid-cols-5 gap-2">
          {previewSports.map((s) => (
            <div
              key={s}
              className="aspect-square overflow-hidden rounded-xl shadow-sm"
            >
              <SportArt sport={s} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuestionScreen({
  questionIndex,
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  questionIndex: number;
  selected: number | null;
  onSelect: (optionIndex: number) => void;
  onNext: () => boolean;
  onBack: () => void;
}) {
  const [showError, setShowError] = useState(false);
  const question = QUESTIONS[questionIndex];
  const progress = ((questionIndex + 1) / QUESTIONS.length) * 100;
  const isLast = questionIndex === QUESTIONS.length - 1;

  function handleSelect(optionIndex: number) {
    setShowError(false);
    onSelect(optionIndex);
  }

  function handleNext() {
    const advanced = onNext();
    if (!advanced) {
      setShowError(true);
    }
  }

  return (
    <div className="flex flex-col gap-6 min-h-[600px]">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline text-xs font-bold tracking-[0.15em] text-ink/50 uppercase">
          <span>
            Question {String(questionIndex + 1).padStart(2, "0")} /{" "}
            {String(QUESTIONS.length).padStart(2, "0")}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-card overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue to-orange transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6 flex-1">
        <h2 className="font-heading font-extrabold text-xl md:text-2xl leading-snug text-ink">
          {question.title}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option, optionIndex) => {
            const isSelected = selected === optionIndex;
            return (
              <button
                key={option.label}
                onClick={() => handleSelect(optionIndex)}
                className={`flex items-center gap-4 text-left py-4 px-5 rounded-2xl border-2 transition-colors ${
                  isSelected
                    ? "bg-blue border-blue text-white"
                    : showError
                      ? "border-red bg-red/5"
                      : "border-line hover:border-blue/40"
                }`}
              >
                <span
                  className={`font-heading font-extrabold text-sm w-7 h-7 shrink-0 rounded-full flex items-center justify-center ${
                    isSelected
                      ? "bg-white text-blue"
                      : "bg-cream text-ink/40"
                  }`}
                >
                  {optionIndex + 1}
                </span>
                <span
                  className={`text-sm md:text-base font-medium ${
                    isSelected ? "text-white" : "text-ink/80"
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {showError && (
          <p className="text-sm font-bold text-red">
            「{question.title}」を選んでから次へ進んでください。
          </p>
        )}
      </div>

      <div className="flex items-center justify-between px-2">
        <button
          onClick={onBack}
          className="text-xs font-bold tracking-[0.1em] uppercase text-ink/50 hover:text-blue transition-colors"
        >
          ← {questionIndex === 0 ? "トップに戻る" : "前の質問に戻る"}
        </button>

        <button
          onClick={handleNext}
          className="bg-orange text-white font-bold px-8 py-3 rounded-full text-sm hover:scale-105 transition-transform shadow-md"
        >
          {isLast ? "結果を見る" : "次へ"}
        </button>
      </div>
    </div>
  );
}

function ResultScreen({
  result,
  onRestart,
}: {
  result: ReturnType<typeof computeResult>;
  onRestart: () => void;
}) {
  const sport = sportOf(result.winner);
  const maxScore = Math.max(...Object.values(result.scores));

  const mailSubject = encodeURIComponent(
    `スポーツ診断結果について相談したいです（${sport.name}）`
  );
  const mailBody = encodeURIComponent(
    `ご担当者様\n\n` +
      `スポーツ診断ツールで「${sport.name}」という結果が出ました。\n` +
      `この結果について詳しく相談したいので、ご連絡いただけますでしょうか。\n\n` +
      `--- 診断結果 ---\n` +
      `おすすめスポーツ: ${sport.name}\n` +
      result.reasons
        .slice(0, 3)
        .map((r) => `・${r.reason}`)
        .join("\n") +
      `\n`
  );
  const mailtoHref = `mailto:natsumi.kodama@monstar-lab.com?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-md">
        <SportArt sport={result.winner} className="w-full h-full" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pt-16 pb-6">
          <p className="text-xs font-bold tracking-[0.3em] text-white/70 uppercase mb-1">
            Your Result
          </p>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
            {sport.name}
          </h1>
        </div>
      </div>

      <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-2">
        <p className="text-sm text-blue font-bold">{sport.tagline}</p>
        <p className="text-sm leading-relaxed text-ink/70">
          {sport.description}
        </p>
      </div>

      <section className="bg-card rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-1">
        <h2 className="text-xs font-bold tracking-[0.15em] text-ink/50 uppercase mb-3">
          なぜこの結果になったのか
        </h2>
        <ul className="flex flex-col">
          {result.reasons.slice(0, 3).map((r, i) => {
            const dot = [BLUE_HEX, ORANGE_HEX, YELLOW_HEX][i % 3];
            return (
              <li key={i} className="flex gap-4 py-4 border-b border-line last:border-none">
                <span
                  className="mt-1.5 w-2.5 h-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: dot }}
                />
                <div>
                  <p className="text-xs text-ink/45 mb-1">
                    「{r.optionLabel}」と回答
                  </p>
                  <p className="text-sm text-ink/85">{r.reason}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4 bg-gradient-to-br from-blue to-blue-dark text-white">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/60">
            Next Step
          </p>
          <h2 className="font-heading font-extrabold text-xl md:text-2xl">
            この診断結果を、担当者と話してみませんか？
          </h2>
          <p className="text-sm text-white/75 leading-relaxed">
            {sport.name}を始める前の不安なことや、あなたに合った始め方を
            担当者が個別にご相談に乗ります。
          </p>
        </div>
        <a
          href={mailtoHref}
          className="self-start bg-white text-blue-dark font-bold px-8 py-3 rounded-full text-sm hover:scale-105 transition-transform shadow-lg"
        >
          担当者に相談する
        </a>
      </section>

      <section className="bg-card rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
        <h2 className="text-xs font-bold tracking-[0.15em] text-ink/50 uppercase">
          全スポーツのスコア
        </h2>
        <div className="flex flex-col gap-3">
          {(Object.entries(result.scores) as [SportKey, number][])
            .sort((a, b) => b[1] - a[1])
            .map(([key, score]) => (
              <div key={key} className="flex items-center gap-4 text-sm">
                <span className="w-32 shrink-0 text-ink/70 font-medium">
                  {sportOf(key).name}
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-cream overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue to-orange"
                    style={{
                      width: `${maxScore === 0 ? 0 : (score / maxScore) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-6 text-right text-ink/50 text-xs font-bold">
                  {score}
                </span>
              </div>
            ))}
        </div>
      </section>

      <button
        onClick={onRestart}
        className="self-center border-2 border-blue text-blue font-bold px-8 py-3 rounded-full text-sm hover:bg-blue hover:text-white transition-colors"
      >
        もう一度診断する
      </button>
    </div>
  );
}

const BLUE_HEX = "#2E4A9E";
const ORANGE_HEX = "#F2793C";
const YELLOW_HEX = "#FFC93C";

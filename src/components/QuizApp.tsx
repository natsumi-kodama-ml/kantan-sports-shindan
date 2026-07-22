"use client";

import { useMemo, useState } from "react";
import { QUESTIONS, type SportKey } from "@/lib/quiz-data";
import { computeResult, sportOf } from "@/lib/scoring";
import SportArt from "@/components/SportArt";

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
    <div className="w-full max-w-2xl mx-auto px-6 py-14 md:py-20">
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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <p className="text-xs tracking-[0.3em] text-forest-dark uppercase">
          Sport Diagnosis
        </p>
        <h1 className="font-heading text-4xl md:text-5xl leading-tight text-ink">
          かんたん
          <br />
          スポーツ診断
        </h1>
        <p className="text-sm leading-relaxed text-ink/70 max-w-md">
          「運動を始めたいけど、何が自分に合うか分からない」を解消します。
          {QUESTIONS.length}つの質問に答えると、あなたに向いているスポーツと
          その理由が分かります。所要時間は1分ほどです。
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {previewSports.map((s) => (
          <div key={s} className="aspect-square overflow-hidden paper-grain">
            <SportArt sport={s} className="w-full h-full" />
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="self-start bg-navy text-ivory px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-forest-dark transition-colors"
      >
        診断をはじめる
      </button>
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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-baseline text-xs tracking-[0.2em] text-ink/50 uppercase">
          <span>
            Question {String(questionIndex + 1).padStart(2, "0")} /{" "}
            {String(QUESTIONS.length).padStart(2, "0")}
          </span>
        </div>
        <div className="h-px w-full bg-line relative">
          <div
            className="h-px bg-forest absolute top-0 left-0 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="font-heading text-2xl md:text-3xl leading-snug text-ink">
        {question.title}
      </h2>

      <div
        className={`flex flex-col border-t transition-colors ${
          showError ? "border-rust" : "border-line"
        }`}
      >
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          return (
            <button
              key={option.label}
              onClick={() => handleSelect(optionIndex)}
              className={`flex items-center gap-5 text-left py-4 border-b transition-colors ${
                showError ? "border-rust" : "border-line"
              } ${isSelected ? "bg-forest/10" : "hover:bg-paper"}`}
            >
              <span
                className={`font-heading text-sm w-8 shrink-0 ${
                  isSelected ? "text-forest-dark" : "text-ink/40"
                }`}
              >
                {String(optionIndex + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-sm md:text-base ${
                  isSelected ? "text-ink font-medium" : "text-ink/80"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {showError && (
        <p className="text-sm text-rust -mt-4">
          「{question.title}」を選んでから次へ進んでください。
        </p>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs tracking-[0.2em] uppercase text-ink/50 hover:text-forest-dark transition-colors"
        >
          ← {questionIndex === 0 ? "トップに戻る" : "前の質問に戻る"}
        </button>

        <button
          onClick={handleNext}
          className="bg-navy text-ivory px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-forest-dark transition-colors"
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
    <div className="flex flex-col gap-10">
      <div className="relative aspect-[4/3] overflow-hidden paper-grain">
        <SportArt sport={result.winner} className="w-full h-full" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-6 pt-16 pb-6">
          <p className="text-xs tracking-[0.3em] text-ivory/70 uppercase mb-1">
            Your Result
          </p>
          <h1 className="font-heading text-3xl md:text-4xl text-ivory">
            {sport.name}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-forest-dark font-medium">{sport.tagline}</p>
        <p className="text-sm leading-relaxed text-ink/70">
          {sport.description}
        </p>
      </div>

      <section className="flex flex-col gap-1">
        <h2 className="text-xs tracking-[0.2em] text-ink/50 uppercase mb-3">
          なぜこの結果になったのか
        </h2>
        <ul className="flex flex-col">
          {result.reasons.slice(0, 3).map((r, i) => (
            <li key={i} className="flex gap-4 py-4 border-b border-line">
              <span className="mt-1.5 w-2 h-2 shrink-0 bg-forest" />
              <div>
                <p className="text-xs text-ink/45 mb-1">
                  「{r.optionLabel}」と回答
                </p>
                <p className="text-sm text-ink/85">{r.reason}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4 bg-forest-dark text-ivory p-6 md:p-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs tracking-[0.3em] uppercase text-ivory/60">
            Next Step
          </p>
          <h2 className="font-heading text-xl md:text-2xl">
            この診断結果を、担当者と話してみませんか？
          </h2>
          <p className="text-sm text-ivory/70 leading-relaxed">
            {sport.name}を始める前の不安なことや、あなたに合った始め方を
            担当者が個別にご相談に乗ります。
          </p>
        </div>
        <a
          href={mailtoHref}
          className="self-start bg-ivory text-navy px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-paper transition-colors"
        >
          担当者に相談する
        </a>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs tracking-[0.2em] text-ink/50 uppercase">
          全スポーツのスコア
        </h2>
        <div className="flex flex-col gap-3">
          {(Object.entries(result.scores) as [SportKey, number][])
            .sort((a, b) => b[1] - a[1])
            .map(([key, score]) => (
              <div key={key} className="flex items-center gap-4 text-sm">
                <span className="w-32 shrink-0 text-ink/70">
                  {sportOf(key).name}
                </span>
                <div className="flex-1 h-px bg-line relative">
                  <div
                    className="h-px bg-navy absolute top-0 left-0"
                    style={{
                      width: `${maxScore === 0 ? 0 : (score / maxScore) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-6 text-right text-ink/50 text-xs">
                  {score}
                </span>
              </div>
            ))}
        </div>
      </section>

      <button
        onClick={onRestart}
        className="self-start border border-navy text-navy px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-navy hover:text-ivory transition-colors"
      >
        もう一度診断する
      </button>
    </div>
  );
}

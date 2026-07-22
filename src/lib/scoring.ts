import { QUESTIONS, SPORTS, type SportKey } from "./quiz-data";

export interface ResultReason {
  questionTitle: string;
  optionLabel: string;
  reason: string;
  points: number;
}

export interface QuizResult {
  winner: SportKey;
  scores: Record<SportKey, number>;
  reasons: ResultReason[];
}

export function computeResult(answers: number[]): QuizResult {
  const scores: Record<SportKey, number> = {
    running: 0,
    strength: 0,
    yoga: 0,
    futsal: 0,
    bouldering: 0,
  };

  QUESTIONS.forEach((question, questionIndex) => {
    const selectedIndex = answers[questionIndex];
    const option = question.options[selectedIndex];
    if (!option) return;
    option.effects.forEach(({ sport, points }) => {
      scores[sport] += points;
    });
  });

  const winner = (Object.keys(scores) as SportKey[]).reduce((best, key) =>
    scores[key] > scores[best] ? key : best
  , "running" as SportKey);

  const reasons: ResultReason[] = [];
  QUESTIONS.forEach((question, questionIndex) => {
    const selectedIndex = answers[questionIndex];
    const option = question.options[selectedIndex];
    if (!option) return;
    const effect = option.effects.find((e) => e.sport === winner);
    if (effect) {
      reasons.push({
        questionTitle: question.title,
        optionLabel: option.label,
        reason: effect.reason,
        points: effect.points,
      });
    }
  });

  reasons.sort((a, b) => b.points - a.points);

  return { winner, scores, reasons };
}

export function sportOf(key: SportKey) {
  return SPORTS[key];
}

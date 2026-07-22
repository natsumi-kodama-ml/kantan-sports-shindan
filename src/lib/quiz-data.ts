export type SportKey =
  | "running"
  | "strength"
  | "yoga"
  | "futsal"
  | "bouldering";

export interface Sport {
  key: SportKey;
  name: string;
  tagline: string;
  description: string;
}

export const SPORTS: Record<SportKey, Sport> = {
  running: {
    key: "running",
    name: "ランニング",
    tagline: "自分のペースでコツコツ続ける有酸素運動",
    description:
      "道具も場所も選ばず、思い立ったらすぐ始められます。体脂肪を減らしたい人、まず何か一つ運動を習慣にしたい人に向いています。",
  },
  strength: {
    key: "strength",
    name: "筋力トレーニング",
    tagline: "体を引き締め、基礎代謝を底上げする",
    description:
      "短時間でも効果を感じやすく、見た目の変化がモチベーションになります。ジムに通える環境がある人におすすめです。",
  },
  yoga: {
    key: "yoga",
    name: "ヨガ・ピラティス",
    tagline: "心と体をゆっくり整えるマインドフル運動",
    description:
      "柔軟性や姿勢改善、リラックス効果を重視する人向け。自宅でもスタジオでも、自分のペースで取り組めます。",
  },
  futsal: {
    key: "futsal",
    name: "フットサル",
    tagline: "仲間と汗を流して楽しむチームプレー",
    description:
      "一人では続かないタイプの人でも、仲間がいれば継続しやすいのが強み。交流を楽しみながら本格的に体を動かせます。",
  },
  bouldering: {
    key: "bouldering",
    name: "ボルダリング",
    tagline: "考えながら登る、達成感の高い個人競技",
    description:
      "1回ごとに小さな成功体験が得られ、飽きにくいのが特徴。新しいことに挑戦したい人、ジムで本格的に体を動かしたい人に向いています。",
  },
};

export interface QuizOptionEffect {
  sport: SportKey;
  points: number;
  reason: string;
}

export interface QuizOption {
  label: string;
  effects: QuizOptionEffect[];
}

export interface QuizQuestion {
  id: string;
  title: string;
  options: QuizOption[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "purpose",
    title: "運動をする一番の目的は？",
    options: [
      {
        label: "ダイエット・体重管理をしたい",
        effects: [
          { sport: "running", points: 3, reason: "有酸素運動なので脂肪燃焼に直結しやすいです" },
          { sport: "strength", points: 2, reason: "筋肉量が増えると基礎代謝が上がり痩せやすくなります" },
          { sport: "yoga", points: 1, reason: "ゆっくりとした動きも代謝アップにつながります" },
        ],
      },
      {
        label: "筋力をつけたい",
        effects: [
          { sport: "strength", points: 3, reason: "直接的に筋力・体型づくりに効果があります" },
          { sport: "bouldering", points: 2, reason: "全身の筋肉を使うため筋力アップに向いています" },
          { sport: "futsal", points: 1, reason: "瞬発力や体幹の筋力が鍛えられます" },
        ],
      },
      {
        label: "ストレスを発散したい",
        effects: [
          { sport: "futsal", points: 3, reason: "仲間と体を動かすことが発散につながります" },
          { sport: "bouldering", points: 2, reason: "課題をクリアする達成感がストレス発散になります" },
          { sport: "running", points: 1, reason: "軽く汗を流すことで気分がすっきりします" },
        ],
      },
      {
        label: "心と体をリラックスさせたい",
        effects: [
          { sport: "yoga", points: 3, reason: "リラックスと柔軟性向上を重視した運動です" },
          { sport: "running", points: 1, reason: "一定のリズムで走ることが心を落ち着けます" },
        ],
      },
      {
        label: "人との交流を楽しみたい",
        effects: [
          { sport: "futsal", points: 3, reason: "チームでのプレーが交流の場になります" },
          { sport: "bouldering", points: 1, reason: "同じジムに通う人との交流が生まれやすいです" },
        ],
      },
    ],
  },
  {
    id: "solo-or-team",
    title: "一人でやりたい？誰かと一緒にやりたい？",
    options: [
      {
        label: "一人でやりたい",
        effects: [
          { sport: "running", points: 2, reason: "基本的に一人で自分のペースで行えます" },
          { sport: "strength", points: 2, reason: "自分の記録と向き合う個人競技です" },
          { sport: "yoga", points: 2, reason: "自分の内側に集中できる運動です" },
          { sport: "bouldering", points: 1, reason: "一人でも黙々と課題に取り組めます" },
        ],
      },
      {
        label: "チームでやりたい",
        effects: [
          { sport: "futsal", points: 3, reason: "チームプレーが前提のスポーツです" },
          { sport: "bouldering", points: 1, reason: "仲間と一緒に挑戦を楽しむこともできます" },
        ],
      },
    ],
  },
  {
    id: "intensity",
    title: "どのくらいの運動強度が好み？",
    options: [
      {
        label: "ゆったりマイペースがいい",
        effects: [
          { sport: "yoga", points: 3, reason: "低強度でじっくり体を動かす運動です" },
          { sport: "running", points: 1, reason: "ジョギング程度ならマイペースで続けられます" },
        ],
      },
      {
        label: "がっつり汗をかきたい",
        effects: [
          { sport: "strength", points: 3, reason: "高負荷のトレーニングで追い込めます" },
          { sport: "futsal", points: 2, reason: "試合形式で常に走り回る高強度な運動です" },
          { sport: "bouldering", points: 2, reason: "集中して登るうちにかなりの運動量になります" },
          { sport: "running", points: 1, reason: "距離やペースを伸ばせば強度を上げられます" },
        ],
      },
    ],
  },
  {
    id: "environment",
    title: "運動できる場所・環境は？",
    options: [
      {
        label: "自宅や近所で気軽に済ませたい",
        effects: [
          { sport: "yoga", points: 3, reason: "自宅で動画を見ながらでも取り組めます" },
          { sport: "strength", points: 2, reason: "自重トレーニングなら自宅でも十分できます" },
        ],
      },
      {
        label: "ジムやスタジオに通える",
        effects: [
          { sport: "strength", points: 3, reason: "ジムの器具を使うことで効果が高まります" },
          { sport: "bouldering", points: 3, reason: "ボルダリングジムに通うことで本格的に取り組めます" },
          { sport: "yoga", points: 1, reason: "スタジオレッスンでより本格的に学べます" },
        ],
      },
      {
        label: "屋外の広いコートやグラウンドが使える",
        effects: [
          { sport: "running", points: 3, reason: "近所や公園を走るだけで完結します" },
          { sport: "futsal", points: 2, reason: "コートがあることでチームプレーがしやすいです" },
        ],
      },
    ],
  },
  {
    id: "budget",
    title: "費用や道具についてどう考える？",
    options: [
      {
        label: "できるだけお金をかけたくない",
        effects: [
          { sport: "running", points: 3, reason: "シューズさえあればほぼ無料で始められます" },
          { sport: "yoga", points: 2, reason: "マット1枚あれば自宅で始められます" },
          { sport: "futsal", points: 1, reason: "コート代を仲間と割り勘にすれば負担を抑えられます" },
        ],
      },
      {
        label: "月謝や道具にある程度投資してもいい",
        effects: [
          { sport: "strength", points: 2, reason: "ジムの月会費を払う価値がある運動です" },
          { sport: "bouldering", points: 3, reason: "シューズや施設利用料への投資が活きます" },
          { sport: "futsal", points: 2, reason: "本格的なチーム活動への参加費も気になりません" },
        ],
      },
    ],
  },
];

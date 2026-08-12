export interface Step {
  id: string;
  number: number;
  title: string;
  why: string;
  action: string;
  commands?: string[];
  links?: { label: string; url: string }[];
  warning?: string;
  hint?: string;
  example?: string;
  screenshots?: { src: string; alt: string }[];
  screenshotPlaceholder?: string;
}

export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  duration?: string;
  goal?: string;
  steps: Step[];
}

export interface StudyProgress {
  completedSteps: { [chapterId: string]: number[] };
  currentStepIndex: { [chapterId: string]: number };
  completedChapters: string[];
  currentChapterId: string;
  stampsCount: number;
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { assignStage, questionsByStage, stageLabels, type Stage } from '@/data/questionnaire';
import LogoBadge from '@/components/LogoBadge';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';

type FlowStep = 'date' | 'questions' | 'saving';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<FlowStep>('date');
  const [birthDateStr, setBirthDateStr] = useState('');
  const [stage, setStage] = useState<Stage | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [dateError, setDateError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  function handleDateContinue() {
    if (!birthDateStr) {
      setDateError('Please enter your baby\'s birth date.');
      return;
    }
    const birth = new Date(birthDateStr + 'T00:00:00');
    if (birth > new Date()) {
      setDateError('Birth date cannot be in the future.');
      return;
    }
    setDateError('');
    setStage(assignStage(birth));
    setStep('questions');
  }

  async function handleOptionSelect(questionId: string, option: string) {
    const newResponses = { ...responses, [questionId]: option };
    setResponses(newResponses);

    const questions = stage ? questionsByStage[stage] : [];
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      await saveAndFinish(newResponses);
    }
  }

  async function saveAndFinish(finalResponses: Record<string, string>) {
    setStep('saving');
    setError('');
    const user = auth.currentUser;
    if (!user || !stage) {
      setError('Session expired. Please log in again.');
      setStep('questions');
      return;
    }
    try {
      const uid = user.uid;
      const birth = new Date(birthDateStr + 'T00:00:00');
      await setDoc(doc(db, 'users', uid, 'onboarding_responses', 'latest'), {
        userId: uid,
        babyBirthDate: birth.toISOString(),
        assignedStage: stage,
        completedAt: serverTimestamp(),
        responses: finalResponses,
      });
      await setDoc(doc(db, 'users', uid), { hasCompletedOnboarding: true }, { merge: true });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Something went wrong saving your responses. Please try again.');
      setStep('questions');
    }
  }

  if (step === 'saving') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf5f0]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#e8a5a0] border-t-[#c97b76]" />
          <p className="text-sm font-light text-[#6b655d]">Saving your responses…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#fbf5f0]">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#f3d4cb] opacity-50 blur-3xl pp-float" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-[#cdd9c5] opacity-40 blur-3xl pp-float-slow" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-12">
        <LogoBadge className="h-12" />
        {step === 'questions' && (
          <p className="text-xs font-light text-[#8a8278]">
            {stage && stageLabels[stage]}
          </p>
        )}
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10">
        {step === 'date' && (
          <DateStep
            value={birthDateStr}
            max={today}
            error={dateError}
            onChange={setBirthDateStr}
            onContinue={handleDateContinue}
          />
        )}

        {step === 'questions' && stage && (
          <QuestionStep
            stage={stage}
            questionIndex={questionIndex}
            responses={responses}
            error={error}
            onSelect={handleOptionSelect}
            onBack={() => {
              if (questionIndex === 0) {
                setStep('date');
                setQuestionIndex(0);
                setResponses({});
              } else {
                setQuestionIndex((i) => i - 1);
              }
            }}
          />
        )}
      </main>
    </div>
  );
}

/* ---------- Date step ---------- */

type DateStepProps = {
  value: string;
  max: string;
  error: string;
  onChange: (v: string) => void;
  onContinue: () => void;
};

function DateStep({ value, max, error, onChange, onContinue }: DateStepProps) {
  return (
    <div className="w-full max-w-md pp-reveal">
      <div className="rounded-3xl border border-[#e9ded5] bg-white/80 p-8 shadow-xl shadow-black/[0.03] backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3d4cb]">
            <Calendar className="h-5 w-5 text-[#c97b76]" strokeWidth={1.6} />
          </span>
          <h1 className="font-display mt-5 text-2xl font-medium tracking-tight text-[#4a4540] sm:text-3xl">
            When was your baby born?
          </h1>
          <p className="mt-2 text-sm font-light text-[#8a8278]">
            We'll use this to personalise your care plan.
          </p>
        </div>

        <input
          type="date"
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-[#e9ded5] bg-white/90 px-4 py-3 text-sm text-[#4a4540] transition-all focus:border-[#e8a5a0] focus:outline-none focus:ring-2 focus:ring-[#e8a5a0]/30"
        />

        {error && (
          <p className="mt-3 rounded-lg bg-[#f7e8e0]/70 px-4 py-2.5 text-xs font-medium text-[#c97b76]">
            {error}
          </p>
        )}

        <button
          onClick={onContinue}
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#c97b76] py-3.5 text-sm font-medium text-white shadow-lg shadow-[#c97b76]/20 transition-all duration-300 hover:bg-[#b86a65] hover:shadow-xl hover:shadow-[#c97b76]/30 active:scale-[0.98]"
        >
          Continue
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Question step ---------- */

type QuestionStepProps = {
  stage: Stage;
  questionIndex: number;
  responses: Record<string, string>;
  error: string;
  onSelect: (qId: string, option: string) => void;
  onBack: () => void;
};

function QuestionStep({ stage, questionIndex, responses, error, onSelect, onBack }: QuestionStepProps) {
  const questions = questionsByStage[stage];
  const question = questions[questionIndex];
  const total = questions.length;
  const progress = ((questionIndex) / total) * 100;

  return (
    <div className="w-full max-w-lg pp-reveal" key={question.id + questionIndex}>
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-[#c97b76]">
            Question {questionIndex + 1} of {total}
          </span>
          <span className="text-xs font-light text-[#a59c92]">
            {Math.round(((questionIndex + 1) / total) * 100)}% complete
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e9ded5]">
          <div
            className="h-full rounded-full bg-[#c97b76] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-[#e9ded5] bg-white/80 p-7 shadow-xl shadow-black/[0.03] backdrop-blur-xl sm:p-9">
        <h2 className="font-display mb-6 text-xl font-medium leading-snug tracking-tight text-[#4a4540] sm:text-2xl">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const selected = responses[question.id] === option;
            return (
              <button
                key={option}
                onClick={() => onSelect(question.id, option)}
                className={`w-full rounded-2xl border px-5 py-3.5 text-left text-sm font-medium transition-all duration-200 active:scale-[0.99] ${
                  selected
                    ? 'border-[#c97b76] bg-[#f7e8e0] text-[#c97b76]'
                    : 'border-[#e9ded5] bg-white/70 text-[#4a4540] hover:border-[#e8a5a0] hover:bg-[#f7e8e0]/60'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-[#f7e8e0]/70 px-4 py-2.5 text-xs font-medium text-[#c97b76]">
            {error}
          </p>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-5 flex items-center gap-1.5 text-sm font-light text-[#6b655d] transition-colors hover:text-[#c97b76]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
    </div>
  );
}

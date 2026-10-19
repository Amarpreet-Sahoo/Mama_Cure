export type Stage = 'stage1' | 'stage2' | 'stage3' | 'stage4';

export type Question = {
  id: string;
  text: string;
  options: string[];
};

export function assignStage(birthDate: Date): Stage {
  const now = new Date();
  const days = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 14) return 'stage1';
  if (days <= 42) return 'stage2';
  if (days <= 182) return 'stage3';
  return 'stage4';
}

export const stageLabels: Record<Stage, string> = {
  stage1: 'Acute Recovery (0–2 weeks)',
  stage2: 'Early Postpartum (2–6 weeks)',
  stage3: 'Mid Postpartum (6 weeks–6 months)',
  stage4: 'Late Postpartum (6 months+)',
};

const stage1: Question[] = [
  {
    id: 'q1',
    text: 'How did you deliver?',
    options: [
      'Vaginal delivery (uncomplicated)',
      'Vaginal with tearing/episiotomy',
      'Planned C-section',
      'Emergency C-section',
      'Assisted delivery (Vacuum/Forceps)',
    ],
  },
  {
    id: 'q2',
    text: 'How are you managing physical discomfort today?',
    options: [
      'Pain is manageable',
      'Strong uterine cramping (afterpains)',
      'Severe perineal/wound pain',
      'Incision redness/swelling',
    ],
  },
  {
    id: 'q3',
    text: 'How would you describe your bleeding level?',
    options: [
      'Normal heavy period flow',
      'Moderate/light discharge',
      'Heavy bleeding (filling >1 pad/hour)',
      'Passing large clots',
    ],
  },
  {
    id: 'q4',
    text: 'How is feeding going for you and baby?',
    options: [
      'Exclusively breastfeeding',
      'Formula feeding',
      'Combination feeding',
      'Expressing / Pumping',
      'Experiencing severe latching pain',
    ],
  },
  {
    id: 'q5',
    text: 'How many total hours of sleep are you getting in a 24-hour window?',
    options: [
      '6+ hours (fragmented)',
      '4 to 6 hours',
      'Less than 4 hours',
      'Unable to sleep even when baby sleeps',
    ],
  },
  {
    id: 'q6',
    text: 'How have your emotions felt over the last 48 hours?',
    options: [
      'Calm and supported',
      'Emotional roller-coaster / Crying spells',
      'Overwhelmed and anxious',
      'Numb or detached',
    ],
  },
  {
    id: 'q7',
    text: 'Do you have help with household tasks and baby care right now?',
    options: [
      'Strong support (Partner/Family/Doula)',
      'Some help',
      'Doing mostly everything alone',
      'Need local support resources',
    ],
  },
  {
    id: 'q8',
    text: 'Are you experiencing any difficulties with elimination?',
    options: [
      'Everything feels normal',
      'Burning/Pain during urination',
      'Severe constipation / Hemorrhoids',
      'Urinary incontinence',
    ],
  },
  {
    id: 'q9',
    text: 'How do your breasts/chest feel?',
    options: [
      'Comfortable / Normal fullness',
      'Engorged and hard',
      'Sore/Cracked nipples',
      'Hot, red, or painful spots (signs of clogged duct/mastitis)',
    ],
  },
  {
    id: 'q10',
    text: 'Are you experiencing any of the following symptoms right now?',
    options: [
      'High fever/chills',
      'Severe headache with vision changes',
      'Chest pain or shortness of breath',
      'None of the above',
    ],
  },
];

const stage2: Question[] = [
  {
    id: 'q1',
    text: 'How is your surgical site or perineal tear healing?',
    options: [
      'Completely healed / Pain-free',
      'Still tender',
      'Stitches itchy or uncomfortable',
      'Signs of infection / Discharge',
    ],
  },
  {
    id: 'q2',
    text: 'How would you rate your daily energy levels?',
    options: [
      'Rebounding well',
      'Sluggish but functional',
      'Exhausted all the time',
      'Extreme fatigue / Dizziness',
    ],
  },
  {
    id: 'q3',
    text: 'How often do you feel hyper-vigilant or plagued by worry?',
    options: [
      'Rarely / Never',
      'Occasionally',
      'Frequently',
      'Constantly / Having racing thoughts',
    ],
  },
  {
    id: 'q4',
    text: 'How confident do you feel about your baby\'s feeding schedule?',
    options: [
      'Very confident',
      'Settling into a rhythm',
      'Struggling with supply/pain',
      'Considering changing feeding methods',
    ],
  },
  {
    id: 'q5',
    text: 'Have you noticed any pelvic floor changes?',
    options: [
      'No symptoms',
      'Leaking when coughing/sneezing',
      'Heaviness/Pressure in pelvis',
      'Lower back or hip pain',
    ],
  },
  {
    id: 'q6',
    text: 'How does your stomach/core feel during daily activities?',
    options: [
      'Normal',
      'Weak or unstable',
      'Visible bulged line down abdomen (Diastasis Recti)',
      'Lower abdomen discomfort',
    ],
  },
  {
    id: 'q7',
    text: 'When you do sleep, how restful is it?',
    options: [
      'Deep and refreshing',
      'Light/Interrupted',
      'Tossing and turning',
      'Experiencing insomnia',
    ],
  },
  {
    id: 'q8',
    text: 'How are you and your partner (if applicable) navigating this phase?',
    options: [
      'Feeling connected and aligned',
      'Minor friction over chores/sleep',
      'Feeling disconnected or frustrated',
      'Single parenting / N/A',
    ],
  },
  {
    id: 'q9',
    text: 'Do you have your standard 6-week OB/GYN or midwife check-up scheduled?',
    options: [
      'Completed',
      'Scheduled',
      'Need to schedule',
      'Skipping / No coverage',
    ],
  },
  {
    id: 'q10',
    text: 'Are you able to eat balanced meals and drink enough fluids?',
    options: [
      'Yes, eating well',
      'Struggling to find time to eat',
      'Forgetting to drink water',
      'Loss of appetite',
    ],
  },
];

const stage3: Question[] = [
  {
    id: 'q1',
    text: 'What clearance did you receive at your 6-week checkup?',
    options: [
      'Fully cleared for all activities',
      'Cleared with pelvic floor recommendations',
      'Awaiting clearance',
      'Did not receive checkup',
    ],
  },
  {
    id: 'q2',
    text: 'What is your current relationship with exercise?',
    options: [
      'Back to regular workouts',
      'Gentle walking/stretching',
      'Want to start, but lack guidance',
      'Experiencing pain when moving',
    ],
  },
  {
    id: 'q3',
    text: 'Are you planning a return to work during this window?',
    options: [
      'Already back at work',
      'Returning in the next few weeks',
      'Returning in a few months',
      'Stay-at-home / Freelance',
    ],
  },
  {
    id: 'q4',
    text: 'If returning to work/activities, how are you managing baby care and feeding?',
    options: [
      'Pumping at work',
      'Formula transition',
      'Childcare arranged',
      'Struggling with transition logistics',
    ],
  },
  {
    id: 'q5',
    text: 'Are you noticing any postpartum hormonal changes?',
    options: [
      'Excessive hair shedding',
      'Skin breakouts',
      'Temperature hot flashes',
      'No major symptoms',
    ],
  },
  {
    id: 'q6',
    text: 'How are you feeling about your physical body changes?',
    options: [
      'Accepting and appreciative',
      'Neutral',
      'Struggling with body identity',
      'Experiencing negative body image',
    ],
  },
  {
    id: 'q7',
    text: "How is baby's sleep progression?",
    options: [
      'Sleeping long stretches (5+ hours)',
      '2 to 3 wakes per night',
      'Frequent wakes / Sleep regression',
      'Need sleep guidance',
    ],
  },
  {
    id: 'q8',
    text: 'How do you feel about intimacy or sexual activity?',
    options: [
      'Resumed with no pain',
      'Resumed, but experiencing dryness/pain',
      'Not ready mentally or physically',
      'No interest currently',
    ],
  },
  {
    id: 'q9',
    text: 'How often do you feel burned out by caretaking?',
    options: [
      'Seldom',
      'Occasionally on tough days',
      'Most days',
      'Constantly feeling overwhelmed',
    ],
  },
  {
    id: 'q10',
    text: 'How connected do you feel to other mothers or friends?',
    options: [
      'Have a great support circle',
      'Connected online',
      'Feeling isolated / Want mom friends',
      'No time for social life',
    ],
  },
];

const stage4: Question[] = [
  {
    id: 'q1',
    text: 'How is the introduction of solid foods going for baby?',
    options: [
      'Smoothly (purees/BLW)',
      'Slowly / Feeding refusal',
      'Managing allergies/sensitivities',
      "Haven't started yet",
    ],
  },
  {
    id: 'q2',
    text: 'Has your period returned?',
    options: [
      'Yes, regular',
      'Yes, but irregular/heavy',
      'Not yet',
      'Unsure / Spotting',
    ],
  },
  {
    id: 'q3',
    text: 'Are you planning or currently undergoing weaning?',
    options: [
      'Exclusively weaning',
      'Gradually introducing formula/solids',
      'Continuing breastfeeding past 1 year',
      'Already fully weaned',
    ],
  },
  {
    id: 'q4',
    text: 'Are you experiencing persistent physical pain?',
    options: [
      'No pain',
      'Chronic lower back pain',
      'Pelvic floor dysfunction',
      'Joint aches / Wrist pain (Mommy thumb)',
    ],
  },
  {
    id: 'q5',
    text: 'How are you balancing work/hobbies and parenting?',
    options: [
      'Found a manageable groove',
      'Constantly scrambling',
      'Overwhelmed by mental load',
      'Re-evaluating career path',
    ],
  },
  {
    id: 'q6',
    text: 'Do you feel you have time for your own interests and self-care?',
    options: [
      'Yes, regularly',
      'Occasionally',
      'Rarely',
      "I feel like I've lost my identity",
    ],
  },
  {
    id: 'q7',
    text: 'Now that baby is crawling/walking, how is your daily stress?',
    options: [
      'Managing well',
      'Exhausted from childproofing/chasing',
      'High anxiety regarding safety/accidents',
    ],
  },
  {
    id: 'q8',
    text: 'Over the last month, have you felt persistently low, hopeless, or unmotivated?',
    options: [
      'No, feeling good',
      'A few down days',
      'Frequently down',
      'Constantly feeling depressed',
    ],
  },
  {
    id: 'q9',
    text: 'How is domestic labor and co-parenting split at home?',
    options: [
      'Fair and balanced',
      'Mostly balanced',
      'Unbalanced / Resentment brewing',
      'Single parent setup',
    ],
  },
];

export const questionsByStage: Record<Stage, Question[]> = {
  stage1,
  stage2,
  stage3,
  stage4,
};

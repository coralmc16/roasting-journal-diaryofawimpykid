export function generateRoast(entry) {
  const lower = entry.toLowerCase();

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const shortEntryRoasts = [
    "Wow, that’s it? Even your diary is falling asleep.",
    "Shorter than your attention span.",
    "You wrote less than your effort in life.",
    "Was that a thought or a sneeze?",
    "Even autocorrect gave up halfway.",
  ];

  const tiredRoasts = [
    "You're always tired but never do anything. Classic.",
    "You stay tired like it’s a full-time job.",
    "Resting all day must be exhausting.",
    "Your energy levels are lower than your standards.",
    "You act like blinking counts as cardio.",
  ];

  const loveRoasts = [
    "Oh look, another emotional mess. We get it, you're down bad.",
    "You fall in love like it’s a seasonal subscription.",
    "You caught feelings again? Put them back.",
    "Love letters from you read like cautionary tales.",
    "You call it love, we call it poor judgment.",
  ];

  const schoolRoasts = [
    "If whining about school were a subject, you'd get an A+.",
    "You’re not failing school — school’s failing you by letting you in.",
    "Your GPA and Wi-Fi signal are fighting for last place.",
    "You’ve got more excuses than homework.",
    "This entry belongs in detention.",
  ];

  const friendRoasts = [
    "Spilling tea about friends again? You're the drama.",
    "You call them friends, they call you exhausting.",
    "Your loyalty is as unstable as your handwriting.",
    "You change besties like you change filters.",
    "If backstabbing was a sport, you'd be MVP.",
  ];

  const familyRoasts = [
    "Family issues again? Your home life is a soap opera.",
    "You talk about your family like you're narrating a tragic sitcom.",
    "At this point, your family needs a group therapist and a script editor.",
    "You’ve turned dinner conversations into diss tracks.",
    "Even the thermostat has more peace at home than you do.",
  ];

  const dramaRoasts = [
    "Your life has more plot twists than a telenovela.",
    "You cause drama and act shocked when it explodes.",
    "You’re the storm you keep complaining about.",
    "You stay in chaos like it’s a comfort zone.",
    "Drama seems to follow you — maybe because you’re leading it.",
  ];

  const foodRoasts = [
    "Why does your diary sound like a menu?",
    "Your food cravings have more personality than you.",
    "You're not hungry, you're just bored and dramatic.",
    "Even your emotional support snacks are tired of you.",
    "This journal entry is 80% about snacks. Go touch grass.",
  ];

  const cryRoasts = [
    "Another crying session? Just add water and you’re a soup.",
    "You’ve cried more in this diary than a toddler at bedtime.",
    "Even your tears are begging for a plot.",
    "You cry like it’s an Olympic event.",
    "This isn’t therapy. Stop trauma-dumping on paper.",
  ];

  const weatherRoasts = [
    "You're writing about the weather like it's a diary from 1862.",
    "If small talk was an Olympic sport, you'd be gold-medaling.",
    "You and the weather both have mood swings.",
    "This entry is cloudy with a chance of irrelevance.",
    "Nobody asked about the sky today.",
  ];

  const genericRoasts = [
    "Your writing style screams ‘main character’… in a poorly written Wattpad fanfic.",
    "This reads like a cry for help from someone who failed drama class.",
    "If this diary had a soundtrack, it would be a single out-of-tune violin.",
    "Your emotional depth is puddle-level.",
    "You overshare like your diary owes you rent.",
    "Reading this gave my brain a papercut.",
    "You really typed this like someone’s watching your biopic.",
    "You're trying to be deep but ended up damp.",
    "You monologue like you're auditioning for a role no one cast.",
    "You journal like your life is a deleted scene from a bad sitcom.",
    "Your metaphors are working overtime — and still unpaid.",
    "You’re spilling thoughts like they're tea — cold, bitter, and overbrewed.",
    "You want poetic but wrote pathetic.",
    "Your diary entry sounds like it ends with 'anyway, I'm quirky.'",
    "This has more filler than your favorite anime.",
    "You're a plot hole pretending to be a storyline.",
    "This was supposed to be a vibe but turned into a cautionary tale.",
    "You write pain like it’s a performance review.",
    "Your vibe is ‘hurt but posting.’",
    "Therapists read this and raise their rates.",
  ];

  // Keyword checks
  if (entry.length < 10) return getRandom(shortEntryRoasts);
  if (lower.includes("tired")) return getRandom(tiredRoasts);
  if (lower.includes("crush") || lower.includes("love") || lower.includes("heart") || lower.includes("relationship"))
    return getRandom(loveRoasts);
  if (lower.includes("school") || lower.includes("homework") || lower.includes("exam"))
    return getRandom(schoolRoasts);
  if (lower.includes("friend") || lower.includes("bestie") || lower.includes("buddy"))
    return getRandom(friendRoasts);
  if (lower.includes("mom") || lower.includes("dad") || lower.includes("sister") || lower.includes("brother"))
    return getRandom(familyRoasts);
  if (lower.includes("fight") || lower.includes("argue") || lower.includes("drama"))
    return getRandom(dramaRoasts);
  if (lower.includes("food") || lower.includes("snack") || lower.includes("pizza") || lower.includes("eat"))
    return getRandom(foodRoasts);
  if (lower.includes("cry") || lower.includes("tears") || lower.includes("sad"))
    return getRandom(cryRoasts);
  if (lower.includes("rain") || lower.includes("weather") || lower.includes("cloud"))
    return getRandom(weatherRoasts);

  // Default roast
  return getRandom(genericRoasts);
}

  
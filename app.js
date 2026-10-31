(function () {
  // ---------- Suggested-session library ----------
  const L = (name, sets, reps, rest, cue, rpe) => ({ name, sets, reps, rest, cue, rpe });

  const LIFTS = {
    recovery: [
      { name: "Recovery · Mobility flow", ex: [
        L("Cat-Cow", 2, "10", "—", "Move one vertebra at a time.", 3),
        L("World's Greatest Stretch", 2, "5 / side", "—", "Lunge, elbow to instep, rotate and reach up.", 3),
        L("90/90 Hip Switches", 2, "8 / side", "—", "Keep the chest tall. Use your hands if needed.", 3),
        L("Thoracic Open Book", 2, "8 / side", "—", "Follow the top hand with your eyes.", 3),
        L("Deep Squat Hold", 3, "45 s", "—", "Heels down, elbows push the knees out.", 3)
      ]},
      { name: "Recovery · Core & carries", ex: [
        L("Dead Bug", 3, "8 / side", "45 s", "Lower back pressed into the floor the whole time.", 5),
        L("Side Plank", 3, "30 s / side", "45 s", "Straight line from head to feet.", 6),
        L("Farmer's Carry", 4, "40 m", "60 s", "Heavy but smooth. Tall posture, short steps.", 6),
        L("Bird Dog", 2, "8 / side", "30 s", "Reach long rather than high.", 4),
        L("Hanging from a Bar", 3, "30 s", "60 s", "Relax the shoulders and breathe.", 4)
      ]},
      { name: "Recovery · Easy bodyweight", ex: [
        L("Glute Bridge", 3, "15", "45 s", "Push through the heels. Pause at the top.", 4),
        L("Band Pull-Apart", 3, "20", "30 s", "Arms straight, squeeze the shoulder blades.", 4),
        L("Bodyweight Squat", 3, "15", "45 s", "Smooth tempo, full depth.", 4),
        L("Couch Stretch", 2, "60 s / side", "—", "Squeeze the glute of the back leg.", 2),
        L("Child's Pose Breathing", 1, "2 min", "—", "Slow breaths into the lower back.", 1)
      ]}
    ]
  };

  const S = (label, min, zone, note) => ({ label, min, zone, note: note || "" });
  const reps = (n, on, off) => { const out = []; for (let i = 0; i < n; i++) { out.push(on); if (off && i < n - 1) out.push(off); } return out; };
  const WU = S("Warm-up", 10, 1, "Build gradually"), CD = S("Cool-down", 5, 1, "Easy, nose breathing");

  const CARDIO = {
    zone2: [
      { name: "Zone 2 · 35 min", segs: [S("Easy start", 5, 1), S("Steady aerobic", 30, 2, "You can hold a conversation")] },
      { name: "Zone 2 · 45 min", segs: [S("Easy start", 5, 1), S("Steady aerobic", 40, 2, "Nasal breathing if you can")] },
      { name: "Zone 2 · 50 min", segs: [S("Easy start", 5, 1), S("Steady aerobic", 45, 2, "Even pace all the way")] }
    ],
    intervals: [
      { name: "Intervals · 6 × 3 min", segs: [WU, ...reps(6, S("Hard", 3, 4, "Hard but repeatable"), S("Recover", 2, 1)), CD] },
      { name: "Intervals · 4 × 4 min", segs: [WU, ...reps(4, S("Hard", 4, 4, "85–95% max HR by the end"), S("Recover", 3, 2)), CD] },
      { name: "Intervals · 10 × 1 min", segs: [WU, ...reps(10, S("Fast", 1, 5, "Near max"), S("Easy", 1, 1)), CD] }
    ],
    tempo: [
      { name: "Tempo · 20 min block", segs: [WU, S("Tempo", 20, 3, "Comfortably hard, short sentences only"), CD] },
      { name: "Tempo · 2 × 12 min", segs: [WU, S("Tempo", 12, 3), S("Float", 3, 1), S("Tempo", 12, 3, "Second rep same pace or faster"), CD] },
      { name: "Tempo · progression", segs: [WU, S("Steady", 10, 2), S("Tempo", 10, 3), S("Threshold", 5, 4, "Finish strong"), CD] }
    ],
    sprints: [
      { name: "Sprints · 8 × 20 s", segs: [WU, ...reps(8, S("Sprint", 0.33, 5, "All out"), S("Walk / spin", 1.67, 1)), CD] },
      { name: "Hill sprints · 10 × 15 s", segs: [WU, ...reps(10, S("Hill sprint", 0.25, 5, "Drive the knees"), S("Walk down", 1.5, 1)), CD] },
      { name: "Tabata · 2 rounds", segs: [WU, ...reps(8, S("Work", 0.33, 5), S("Rest", 0.17, 1)), S("Reset", 3, 1), ...reps(8, S("Work", 0.33, 5), S("Rest", 0.17, 1)), CD] }
    ],
    long: [
      { name: "Long steady · 60 min", segs: [S("Easy start", 10, 1), S("Long aerobic", 50, 2, "Fuel and hydrate")] },
      { name: "Long steady · 75 min", segs: [S("Easy start", 10, 1), S("Long aerobic", 60, 2), S("Strong finish", 5, 3)] },
      { name: "Long steady · 90 min", segs: [S("Easy start", 10, 1), S("Long aerobic", 80, 2, "Take a gel or snack after 45 min")] }
    ],
    recovery: [
      { name: "Recovery · 20 min", segs: [S("Easy", 20, 1, "Just get moving")] },
      { name: "Recovery · 30 min", segs: [S("Easy", 30, 1, "Outside if you can")] },
      { name: "Recovery · 40 min", segs: [S("Easy", 40, 1, "Leave the headphones at home")] }
    ]
  };
  // Sport-specific sessions, shown only for the matching cardio type
  CARDIO.intervals.push(
    { name: "Rowing · 8 × 500 m", only: ["row"], segs: [WU, ...reps(8, S("500 m hard", 2, 4, "Hold the same split every rep"), S("Easy paddle", 1.5, 1)), CD] },
    { name: "Swim · 10 × 100 m", only: ["swim"], segs: [S("Easy swim", 8, 1), ...reps(10, S("100 m hard", 2, 4), S("Rest at the wall", 0.5, 1)), S("Easy swim", 5, 1)] },
    { name: "Climb repeats · 5 × 5 min", only: ["bike", "walk"], segs: [WU, ...reps(5, S("Climb", 5, 4, "Seated, heavy gear or steep incline"), S("Easy", 3, 2)), CD] },
    { name: "Run · 5 × 1 km", only: ["run"], segs: [WU, ...reps(5, S("1 km at 10k pace", 4, 4), S("Jog", 2, 1)), CD] }
  );
  CARDIO.sprints.push(
    { name: "Swim · 12 × 25 m sprints", only: ["swim"], segs: [S("Easy swim", 8, 1), ...reps(12, S("25 m sprint", 0.4, 5), S("Rest", 0.6, 1)), S("Easy swim", 5, 1)] },
    { name: "Row · 10 × 30 s power", only: ["row"], segs: [WU, ...reps(10, S("Power strokes", 0.5, 5, "Max pressure every stroke"), S("Easy paddle", 1.5, 1)), CD] }
  );
  CARDIO.sprints.find(v => v.name.startsWith("Hill")).only = ["run", "walk"];
  CARDIO.sprints.find(v => v.name.startsWith("Tabata")).only = ["run", "row", "bike", "erg", "walk"];

  const CMODES = [
    { id: "run", name: "Running", rotate: true, zone: [null, "Walk or very easy jog", "Conversational pace", "Comfortably hard, short sentences", "Hard pace you could hold 30–40 min", "Fast with relaxed form"] },
    { id: "row", name: "Rowing", rotate: true, zone: [null, "18 spm, light pressure", "18–20 spm, steady split", "22–24 spm", "26–28 spm, hold your split", "30+ spm, max power"] },
    { id: "bike", name: "Cycling", rotate: true, zone: [null, "Easy gear, 90 rpm", "85–95 rpm, steady", "Heavier gear, 85–90 rpm", "Hard gear, 90 rpm", "Out of the saddle or 110+ rpm"] },
    { id: "swim", name: "Swimming", rotate: true, zone: [null, "Easy freestyle or backstroke", "Long, smooth strokes", "Steady, controlled breathing", "Hard, breathe every 2 strokes", "All-out effort"] },
    { id: "walk", name: "Walking / Hiking", zone: [null, "Easy stroll", "Brisk walk or 8–12% incline", "Steep incline, 12–15%", "Max incline at a fast pace", "Stair or hill sprints"] },
    { id: "erg", name: "Ski erg / Elliptical", rotate: true, zone: [null, "Light and smooth", "Steady rhythm", "Strong pull or stride", "Hard, near threshold", "Max effort"] }
  ];
  const MIXED = { id: "mix", name: "Mixed" };
  const ZONES = [null,
    { n: "Z1", d: "Recovery", hr: "50–60%" }, { n: "Z2", d: "Aerobic", hr: "60–70%" },
    { n: "Z3", d: "Tempo", hr: "70–80%" }, { n: "Z4", d: "Threshold", hr: "80–90%" }, { n: "Z5", d: "Max", hr: "90–100%" }];

  // Cardio session type by weekday (Mon..Sun)
  const CPLAN = ["zone2", "intervals", "recovery", "tempo", "sprints", "long", "recovery"];
  const SESS = { zone2: "Zone 2", intervals: "Intervals", tempo: "Tempo", sprints: "Sprints", long: "Long steady", recovery: "Recovery" };

  // Exercise pools by movement pattern: "Name|coaching cue"
  const POOL_SRC = {
    hpush: ["Barbell Bench Press|Shoulder blades pinned, bar to lower chest, feet driving into the floor.", "Incline Barbell Press|Grip a touch narrower than flat bench. Touch the upper chest.", "Dumbbell Bench Press|Let the dumbbells sink to chest level, press up and slightly in.", "Incline Dumbbell Press|30° bench. Lower for a slow three-count.", "Close-Grip Bench Press|Hands shoulder-width, elbows tucked, touch low on the chest.", "Weighted Dips|Slight forward lean, shoulders just below the elbows at the bottom.", "Machine Chest Press|Seat height so the handles line up with mid-chest."],
    vpush: ["Standing Overhead Press|Squeeze glutes, press straight up, head through at the top.", "Seated Dumbbell Shoulder Press|Stop just short of lockout to keep tension.", "Half-Kneeling Landmine Press|Press up and slightly across, ribs down.", "Arnold Press|Rotate the palms as you press. Smooth, no bounce.", "Push Press|Short dip, drive with the legs, finish with the arms."],
    hpull: ["Barbell Bent-Over Row|Hinge to about 45°. Row to the belly button.", "Chest-Supported Row|Pull elbows toward your hips, pause at the top.", "Single-Arm Dumbbell Row|Let the shoulder stretch forward at the bottom.", "Seal Row|Chest stays on the bench the whole time.", "Seated Cable Row|Sit tall, pull to the stomach, don't rock.", "Pendlay Row|Each rep starts dead on the floor. Explode up."],
    vpull: ["Pull-ups|Start from a dead hang, chest to the bar.", "Chin-ups|Full range. Stop one rep before your form slips.", "Lat Pulldown|Drive elbows down into your back pockets.", "Neutral-Grip Pulldown|Lean back slightly, pull to the upper chest.", "Weighted Pull-ups|Add load only once you own 8 clean bodyweight reps."],
    squat: ["Back Squat|Spread the floor with your feet. Hips and chest rise together.", "Front Squat|Elbows high, stay upright, sit between your heels.", "Safety-Bar Squat|Stay tall and push the handles down.", "Hack Squat|Feet mid-platform, go as deep as your hips allow.", "Leg Press|Lower until the hips start to tuck, then drive.", "Goblet Squat|Elbows inside the knees at the bottom."],
    hinge: ["Romanian Deadlift|Push hips back until you feel the hamstrings, then stand tall.", "Barbell Hip Thrust|Chin tucked, ribs down, squeeze hard at the top.", "Good Morning|Soft knees, hips back, flat back.", "Single-Leg Romanian Deadlift|Reach the back heel toward the wall behind you.", "Trap-Bar Deadlift|Sit a little lower than a deadlift. Drive straight up.", "Conventional Deadlift|Push the floor away. Bar stays in contact with the legs."],
    deadlift: ["Conventional Deadlift|Push the floor away. Bar stays in contact with the legs.", "Trap-Bar Deadlift|Sit a little lower than a deadlift. Drive straight up.", "Sumo Deadlift|Knees out, chest up, wedge yourself into the bar.", "Rack Pull (below knee)|Lock out with the glutes, not by leaning back."],
    lunge: ["Bulgarian Split Squat|Most of the weight on the front foot.", "Walking Lunge|Long stride, back knee kisses the floor.", "Reverse Lunge|Step back softly, push through the front heel.", "Dumbbell Step-up|Box at knee height. Don't push off the back foot.", "Lateral Lunge|Sit into the hip, keep the other leg straight."],
    hamcurl: ["Lying Leg Curl|Point toes up, lower slowly.", "Seated Leg Curl|Lean forward slightly for a bigger stretch.", "Nordic Hamstring Curl|Lower as slowly as you can. Catch yourself with your hands.", "Stability-Ball Leg Curl|Hips high the whole time."],
    quadiso: ["Leg Extension|Hold the top for one second.", "Spanish Squat|Band behind the knees, sit straight down.", "Cyclist Squat|Heels raised, knees forward, torso upright."],
    calves: ["Standing Calf Raise|Two-second pause at the bottom stretch.", "Seated Calf Raise|Full stretch, full squeeze.", "Single-Leg Calf Raise|Hold a dumbbell, slow on the way down."],
    lateral: ["Dumbbell Lateral Raise|Light weight, no swing. Pause at the top.", "Cable Lateral Raise|Lead with the elbow, stop at shoulder height.", "Lean-Away Lateral Raise|Hold a post and lean out for a longer range.", "Machine Lateral Raise|Smooth reps, squeeze at the top."],
    rear: ["Face Pull|Pull to the forehead and rotate thumbs back.", "Rear Delt Fly|Pinkies lead. Light and strict.", "Reverse Pec Deck|Arms long, sweep wide.", "Band Pull-Apart|Arms straight, squeeze the shoulder blades."],
    fly: ["Cable Fly|Hug a tree. Squeeze when the hands meet.", "Dumbbell Fly|Slight bend in the elbows, deep stretch.", "Pec Deck|Pause one second when the handles meet.", "Low-to-High Cable Fly|Sweep up to eye level for the upper chest."],
    triceps: ["Rope Triceps Pushdown|Elbows glued to your sides, spread the rope at the bottom.", "EZ-Bar Skull Crusher|Lower behind the head for a longer stretch.", "Overhead Cable Triceps Extension|Elbows point forward, full stretch at the bottom.", "Dumbbell Kickback|Upper arm parallel to the floor, lock out.", "Bench Dips|Shoulders down, elbows straight back."],
    biceps: ["EZ-Bar Curl|Elbows stay still. Squeeze at the top.", "Hammer Curl|No swinging. Control the way down.", "Incline Dumbbell Curl|Let the arms hang back for a full stretch.", "Preacher Curl|Don't let the weight drop at the bottom.", "Cable Curl|Constant tension, slow lowering."],
    lats: ["Straight-Arm Pulldown|Arms long, sweep the bar to your thighs.", "Dumbbell Pullover|Big stretch, ribs stay down."],
    traps: ["Dumbbell Shrug|Straight up, hold for one second.", "Barbell Shrug|No rolling. Straight up and down."],
    core: ["Hanging Leg Raise|Curl the pelvis up, no swinging.", "Ab Wheel Rollout|Ribs down. Go only as far as you can hold.", "Pallof Press|Press out and resist the twist.", "Dead Bug|Lower back pressed into the floor the whole time.", "Cable Crunch|Round the spine, elbows toward the knees.", "Side Plank|Straight line from head to feet."],
    carry: ["Farmer's Carry|Heavy but smooth. Tall posture, short steps.", "Suitcase Carry|Load one hand and don't lean.", "Front-Rack Carry|Elbows up, breathe behind the brace."],
    bwpush: ["Push-ups|Body in one line, chest to the floor.", "Pike Push-up|Hips high, head lowers between the hands.", "Diamond Push-up|Hands together, elbows close to the body.", "Decline Push-up|Feet on a bench, slow lowering.", "Archer Push-up|Shift to one side, other arm long."],
    bwpull: ["Pull-ups|Start from a dead hang, chest to the bar.", "Chin-ups|Full range. Stop one rep before your form slips.", "Inverted Row|Body straight, pull your chest to the bar or table edge.", "Towel Row|Door towel or rings. Squeeze the shoulder blades together."],
    bwlegs: ["Bodyweight Squat|Smooth tempo, full depth.", "Jump Squat|Land softly and go straight into the next rep.", "Bulgarian Split Squat|Most of the weight on the front foot.", "Pistol Squat to Box|Sit back to a box on one leg, stand without a push.", "Reverse Lunge|Step back softly, push through the front heel.", "Skater Squat|Back knee touches a pad, front heel stays down."],
    bwhinge: ["Single-Leg Glute Bridge|Push through the heel, keep the hips level.", "Single-Leg Romanian Deadlift|Reach the back heel toward the wall behind you.", "Glute Bridge|Pause and squeeze at the top."]
  };
  const POOL = {};
  Object.entries(POOL_SRC).forEach(([k, arr]) => { POOL[k] = arr.map(s => { const [name, cue] = s.split("|"); return { name, cue }; }); });
  POOL.arms = POOL.biceps.concat(POOL.triceps);
  const findEx = name => { for (const k in POOL) { const e = POOL[k].find(x => x.name === name); if (e) return e; } return { name, cue: "" }; };

  // Set and rep prescriptions by slot role
  const ROLES = {
    main: [{ s: 4, r: "5", rest: "3 min", rpe: 8 }, { s: 5, r: "5", rest: "3 min", rpe: 8 }, { s: 4, r: "6", rest: "2–3 min", rpe: 8 }, { s: 5, r: "3", rest: "3 min", rpe: 8 }],
    sec: [{ s: 3, r: "8", rest: "2 min", rpe: 8 }, { s: 4, r: "6–8", rest: "2 min", rpe: 8 }, { s: 3, r: "10", rest: "90 s", rpe: 8 }],
    acc: [{ s: 3, r: "12", rest: "60–90 s", rpe: 9 }, { s: 3, r: "15", rest: "60 s", rpe: 9 }, { s: 4, r: "10–12", rest: "75 s", rpe: 9 }],
    five: { s: 5, r: "5", rest: "3 min", rpe: 8 },
    top: { s: 1, r: "5", rest: "—", rpe: 9 },
    bw: [{ s: 3, r: "AMRAP", rest: "90 s", rpe: 9 }, { s: 4, r: "10–15", rest: "60–90 s", rpe: 8 }, { s: 3, r: "12", rest: "60 s", rpe: 8 }]
  };

  // Day types: which patterns fill each slot
  const DAYTYPES = {
    push: { name: "Push day", short: "Push", slots: [["hpush", "main"], ["vpush", "sec"], ["hpush", "sec"], ["lateral", "acc"], ["fly", "acc"], ["triceps", "acc"]] },
    pull: { name: "Pull day", short: "Pull", slots: [["vpull", "main"], ["hpull", "sec"], ["hpull", "acc"], ["rear", "acc"], ["biceps", "acc"], ["biceps", "acc"]] },
    legs: { name: "Leg day", short: "Legs", slots: [["squat", "main"], ["hinge", "sec"], ["lunge", "acc"], ["hamcurl", "acc"], ["quadiso", "acc"], ["calves", "acc"]] },
    upper: { name: "Upper body", short: "Upper", slots: [["hpush", "main"], ["hpull", "main"], ["vpush", "sec"], ["vpull", "sec"], ["lateral", "acc"], ["arms", "acc"]] },
    lower: { name: "Lower body", short: "Lower", slots: [["squat", "main"], ["hinge", "sec"], ["lunge", "acc"], ["hamcurl", "acc"], ["calves", "acc"], ["core", "acc"]] },
    full: { name: "Full body", short: "Full", slots: [["squat", "main"], ["hpush", "sec"], ["hpull", "sec"], ["hinge", "sec"], ["core", "acc"], ["carry", "acc"]] },
    chest: { name: "Chest day", short: "Chest", slots: [["hpush", "main"], ["hpush", "sec"], ["hpush", "acc"], ["fly", "acc"], ["fly", "acc"], ["triceps", "acc"]] },
    back: { name: "Back day", short: "Back", slots: [["deadlift", "main"], ["vpull", "sec"], ["hpull", "sec"], ["hpull", "acc"], ["lats", "acc"], ["traps", "acc"]] },
    shoulders: { name: "Shoulder day", short: "Delts", slots: [["vpush", "main"], ["vpush", "sec"], ["lateral", "acc"], ["lateral", "acc"], ["rear", "acc"], ["traps", "acc"]] },
    arms: { name: "Arm day", short: "Arms", slots: [["biceps", "sec"], ["triceps", "sec"], ["biceps", "acc"], ["triceps", "acc"], ["biceps", "acc"], ["triceps", "acc"]] },
    chestback: { name: "Chest + back", short: "Ch + Bk", slots: [["hpush", "main"], ["hpull", "main"], ["hpush", "sec"], ["vpull", "sec"], ["fly", "acc"], ["lats", "acc"]] },
    shoulderarms: { name: "Shoulders + arms", short: "Sh + Arm", slots: [["vpush", "main"], ["lateral", "acc"], ["rear", "acc"], ["biceps", "acc"], ["triceps", "acc"], ["biceps", "acc"]] },
    s5a: { name: "5×5 Workout A", short: "5×5 A", slots: [["=Back Squat", "five"], ["=Barbell Bench Press", "five"], ["=Barbell Bent-Over Row", "five"], ["core", "acc"]] },
    s5b: { name: "5×5 Workout B", short: "5×5 B", slots: [["=Back Squat", "five"], ["=Standing Overhead Press", "five"], ["=Conventional Deadlift", "top"], ["core", "acc"]] },
    bwfull: { name: "Bodyweight", short: "BW", slots: [["bwlegs", "bw"], ["bwpush", "bw"], ["bwpull", "bw"], ["bwhinge", "bw"], ["bwlegs", "bw"], ["core", "acc"]] },
    rest: { name: "Recovery", short: "Rest" }
  };

  // Weekly lifting programs (Mon..Sun)
  const PROGRAMS = [
    { id: "ppl", name: "Push / Pull / Legs", week: ["push", "pull", "legs", "push", "pull", "legs", "rest"] },
    { id: "ul", name: "Upper / Lower", week: ["upper", "lower", "rest", "upper", "lower", "full", "rest"] },
    { id: "full", name: "Full body", week: ["full", "rest", "full", "rest", "full", "rest", "rest"] },
    { id: "bro", name: "Bro split", week: ["chest", "back", "legs", "shoulders", "arms", "rest", "rest"] },
    { id: "arnold", name: "Arnold split", week: ["chestback", "shoulderarms", "legs", "chestback", "shoulderarms", "legs", "rest"] },
    { id: "s5", name: "Strength 5×5", week: ["s5a", "rest", "s5b", "rest", "s5a", "rest", "rest"] },
    { id: "bw", name: "Bodyweight", week: ["bwfull", "rest", "bwfull", "rest", "bwfull", "rest", "rest"] },
    { id: "off", name: "No lifting" }
  ];


  // Workout types for your own workouts
  const TYPES = [
    { id: "lifting", name: "Lifting", color: "var(--accent)" },
    { id: "cardio", name: "Cardio", color: "var(--z2)" },
    { id: "hiit", name: "HIIT", color: "var(--z4)" },
    { id: "mobility", name: "Mobility", color: "var(--z1)" },
    { id: "core", name: "Core", color: "var(--z3)" },
    { id: "other", name: "Other", color: "var(--muted)" }
  ];
  const typeOf = id => TYPES.find(t => t.id === id) || TYPES[TYPES.length - 1];

  const EXAMPLES = [
    { id: "ex-kb", type: "hiit", name: "Kettlebell 20 (example)", items: [
      { name: "Kettlebell Swing", sets: "5", reps: "15", note: "Snap the hips. Rest 30 s" },
      { name: "Goblet Squat", sets: "4", reps: "10", note: "" },
      { name: "Push-up", sets: "4", reps: "12", note: "" },
      { name: "Farmer's Carry", sets: "3", reps: "40 m", note: "Heavy" }
    ]},
    { id: "ex-core", type: "core", name: "10-minute core (example)", items: [
      { name: "Dead Bug", sets: "3", reps: "8 / side", note: "" },
      { name: "Side Plank", sets: "2", reps: "30 s / side", note: "" },
      { name: "Hollow Hold", sets: "3", reps: "20 s", note: "" }
    ]},
    { id: "ex-row", type: "cardio", name: "Rowing pyramid (example)", items: [
      { name: "Warm-up row", sets: "1", reps: "5 min", note: "Easy" },
      { name: "Hard row", sets: "1", reps: "1-2-3-2-1 min", note: "1 min easy between each" },
      { name: "Cool-down row", sets: "1", reps: "5 min", note: "" }
    ]}
  ];

  // ---------- Date helpers ----------
  const DAY_MS = 86400000;
  const atNoon = d => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12);
  const keyOf = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const dowMon = d => (d.getDay() + 6) % 7;
  function isoWeek(d) {
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const day = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - day);
    const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    return Math.ceil(((t - y0) / DAY_MS + 1) / 7);
  }
  const dayNumber = d => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY_MS);
  const DOW = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // ---------- Storage ----------
  const PREFIX = "dtc.";
  const store = {
    get(k, f) { try { const v = localStorage.getItem(PREFIX + k); return v ? JSON.parse(v) : f; } catch (e) { return f; } },
    set(k, v) { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch (e) {} }
  };
  let library = store.get("library", null);
  if (!Array.isArray(library)) { library = EXAMPLES.map(w => JSON.parse(JSON.stringify(w))); store.set("library", library); }
  let days = store.get("days", {});
  const saveLib = () => store.set("library", library);
  const saveDays = () => store.set("days", days);

  // ---------- State ----------
  let current = atNoon(new Date());
  let filter = "all";
  const todayKey = () => keyOf(atNoon(new Date()));
  const uid = () => "w" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const prefs = Object.assign({ program: "ppl", mode: "mix" }, store.get("prefs", {}));
  const savePrefs = () => store.set("prefs", prefs);
  const progOf = () => PROGRAMS.find(p => p.id === prefs.program) || PROGRAMS[0];

  // Seeded random so a given day always generates the same session
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = seed; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

  function liftTypeFor(d, scheduledOnly) {
    const prog = progOf();
    if (prog.id === "off") return "off";
    const over = store.get("over:" + keyOf(d), {});
    if (!scheduledOnly && over.lift && DAYTYPES[over.lift]) return over.lift;
    let t = prog.week[dowMon(d)];
    // 5×5 alternates A/B week to week
    if (prog.id === "s5" && isoWeek(d) % 2 && t !== "rest") t = t === "s5a" ? "s5b" : "s5a";
    return t;
  }
  function cardioTypeFor(d, scheduledOnly) {
    if (prefs.mode === "off") return "off";
    const over = store.get("over:" + keyOf(d), {});
    return !scheduledOnly && over.cardio && CARDIO[over.cardio] ? over.cardio : CPLAN[dowMon(d)];
  }
  function modeFor(d, swapN) {
    const m = CMODES.find(x => x.id === prefs.mode);
    if (m) return m;
    const rot = CMODES.filter(x => x.rotate);
    return rot[(dayNumber(d) + swapN) % rot.length];
  }

  function buildLift(type, seed) {
    const r = rng(hashStr(seed));
    if (type === "rest") return pick(r, LIFTS.recovery);
    const def = DAYTYPES[type], used = new Set(), ex = [];
    def.slots.forEach(([pat, role]) => {
      let e;
      if (pat[0] === "=") e = findEx(pat.slice(1));
      else { const pool = POOL[pat].filter(x => !used.has(x.name)); if (!pool.length) return; e = pick(r, pool); }
      used.add(e.name);
      const rx = Array.isArray(ROLES[role]) ? pick(r, ROLES[role]) : ROLES[role];
      ex.push(L(e.name, rx.s, rx.r, rx.rest, e.cue, rx.rpe));
    });
    return { name: def.name, ex };
  }

  function sessionFor(d) {
    const key = keyOf(d), dow = dowMon(d), wk = isoWeek(d);
    const swaps = store.get("swap:" + key, { lift: 0, cardio: 0 });
    const liftType = liftTypeFor(d), cardioType = cardioTypeFor(d);
    const lift = liftType === "off" ? null : buildLift(liftType, key + "|" + prefs.program + "|" + liftType + "|" + swaps.lift);
    let cardio = null, mode = null;
    if (cardioType !== "off") {
      mode = modeFor(d, swaps.cardio);
      const opts = CARDIO[cardioType].filter(v => !v.only || v.only.includes(mode.id));
      cardio = opts[(wk + swaps.cardio) % opts.length];
    }
    return { key, dow, wk, liftType, cardioType, lift, cardio, mode };
  }
  const liftLabel = t => t === "off" ? "" : DAYTYPES[t].name;
  const cardioLabel = t => t === "off" ? "" : SESS[t];

  // Pick a different day type or session type for one day only
  function setOverride(kind, val, scheduled) {
    const key = keyOf(current);
    const over = store.get("over:" + key, {});
    if (val === scheduled) delete over[kind]; else over[kind] = val;
    store.set("over:" + key, over);
    const done = store.get("done:" + key, {});
    Object.keys(done).forEach(k => { if (k.startsWith(kind + "-")) delete done[k]; });
    store.set("done:" + key, done);
    render();
  }

  function chip(label, pressed, color, onClick) {
    const b = document.createElement("button");
    b.className = "chip"; b.setAttribute("aria-pressed", String(pressed));
    b.innerHTML = (color ? '<i style="background:' + color + '"></i>' : "") + esc(label);
    b.addEventListener("click", onClick);
    return b;
  }

  function renderSetup() {
    const pc = $("progChips"); pc.innerHTML = "";
    PROGRAMS.forEach(p => pc.appendChild(chip(p.name, prefs.program === p.id, null, () => { prefs.program = p.id; savePrefs(); render(); })));
    const mc = $("modeChips"); mc.innerHTML = "";
    CMODES.concat(MIXED, { id: "off", name: "No cardio" }).forEach(m =>
      mc.appendChild(chip(m.id === "mix" ? "Mixed (rotate)" : m.name, prefs.mode === m.id, null, () => { prefs.mode = m.id; savePrefs(); render(); })));
  }

  // ---------- Render helpers ----------
  const $ = id => document.getElementById(id);
  const fmtMin = m => m >= 1 ? (Math.round(m * 10) / 10) + " min" : Math.round(m * 60) + " s";
  const isDone = (key, id) => !!store.get("done:" + key, {})[id];

  function checkRow(key, id, nameHtml, rightHtml, cueHtml) {
    const done = isDone(key, id);
    const li = document.createElement("li");
    li.className = "item" + (done ? " done" : "");
    const domId = "c-" + id.replace(/[^a-z0-9_-]/gi, "_");
    li.innerHTML =
      '<input type="checkbox" class="chk" id="' + domId + '"' + (done ? " checked" : "") + '>' +
      '<label class="name" for="' + domId + '">' + nameHtml + '</label>' + rightHtml +
      (cueHtml ? '<div class="cue">' + cueHtml + "</div>" : "");
    li.querySelector("input").addEventListener("change", ev => toggle(key, id, ev.target.checked));
    return { li, done };
  }

  function renderWeek() {
    const start = new Date(current.getTime() - dowMon(current) * DAY_MS);
    const tk = todayKey();
    const wrap = $("week"); wrap.innerHTML = "";
    for (let i = 0; i < 7; i++) {
      const d = atNoon(new Date(start.getTime() + i * DAY_MS));
      const k = keyOf(d);
      const mine = (days[k] || []).map(id => library.find(w => w.id === id)).filter(Boolean);
      const b = document.createElement("button");
      b.className = "day" + (k === keyOf(current) ? " sel" : "") + (k === tk ? " today" : "");
      const lt = liftTypeFor(d), ct = cardioTypeFor(d);
      const short = [lt === "off" ? "" : DAYTYPES[lt].short, cardioLabel(ct)].filter(Boolean).join(" + ") || "Rest";
      const long = [liftLabel(lt), cardioLabel(ct)].filter(Boolean).join(" and ") || "Rest";
      b.setAttribute("aria-label", DOW[i] + " " + d.getDate() + ", " + long + (mine.length ? ", " + mine.length + " of your workouts" : ""));
      b.innerHTML = '<span class="dn">' + DOW[i].slice(0, 3) + '</span><span class="dd">' + d.getDate() + '</span><span class="df">' +
        short + '</span><span class="pips">' +
        mine.slice(0, 5).map(w => '<i style="background:' + typeOf(w.type).color + '"></i>').join("") + "</span>";
      b.addEventListener("click", () => { current = d; render(); });
      wrap.appendChild(b);
    }
  }

  function renderLift(s) {
    $("liftCard").hidden = !s.lift;
    if (!s.lift) return;
    const sched = liftTypeFor(current, true);
    const dc = $("dayChips"); dc.innerHTML = "";
    [...new Set(progOf().week.concat("rest"))].forEach(t =>
      dc.appendChild(chip(DAYTYPES[t].short + (t === sched ? " · planned" : ""), t === s.liftType, null, () => setOverride("lift", t, sched))));
    const ex = s.lift.ex;
    const sets = ex.reduce((a, e) => a + e.sets, 0);
    const mins = s.liftType === "rest" ? 25 : Math.round(sets * 2.6 + 8);
    $("liftName").textContent = s.lift.name;
    $("liftMeta").innerHTML = "<span><b>" + ex.length + "</b> exercises</span><span><b>" + sets + "</b> working sets</span><span>about <b>" + mins + "</b> min</span>";
    const ul = $("lifts"); ul.innerHTML = "";
    let n = 0;
    ex.forEach((e, i) => {
      const r = checkRow(s.key, "lift-" + i, esc(e.name),
        '<div class="rx">' + e.sets + " × " + esc(e.reps) + "<small>rest " + esc(e.rest) + (e.rpe >= 5 ? " · RPE " + e.rpe : "") + "</small></div>", esc(e.cue));
      if (r.done) n++; ul.appendChild(r.li);
    });
    $("liftProg").style.width = (n / ex.length * 100) + "%";
  }

  function renderChart(segs) {
    const W = 600, H = 140, padL = 26, padR = 8, padT = 6, padB = 22;
    const total = segs.reduce((a, s) => a + s.min, 0);
    const iw = W - padL - padR, ih = H - padT - padB;
    const x = m => padL + (m / total) * iw;
    const y = z => padT + ih - (z / 5) * ih;
    let out = "";
    for (let z = 1; z <= 5; z++) {
      out += '<line class="gridline" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y(z) + '" y2="' + y(z) + '"/>';
      out += '<text x="0" y="' + (y(z) + 3.5) + '">Z' + z + "</text>";
    }
    let t = 0;
    segs.forEach(s => {
      const x0 = x(t), x1 = x(t + s.min);
      out += '<rect x="' + x0.toFixed(2) + '" y="' + y(s.zone).toFixed(2) + '" width="' + Math.max(0.8, x1 - x0 - 0.6).toFixed(2) + '" height="' + (padT + ih - y(s.zone)).toFixed(2) + '" fill="var(--z' + s.zone + ')" rx="1"/>';
      t += s.min;
    });
    out += '<line class="gridline" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + (padT + ih) + '" y2="' + (padT + ih) + '"/>';
    const step = total > 70 ? 15 : total > 30 ? 10 : 5;
    for (let m = 0; m <= total + 0.01; m += step) {
      if (total - m < step * 0.4 && m !== 0) continue;
      out += '<text x="' + x(m) + '" y="' + (H - 6) + '" text-anchor="' + (m === 0 ? "start" : "middle") + '">' + m + "</text>";
    }
    out += '<text x="' + (W - padR) + '" y="' + (H - 6) + '" text-anchor="end">' + Math.round(total) + " min</text>";
    $("chart").innerHTML = out;
    return total;
  }

  // Collapse repeated work/rest pairs into single rows
  function cardioRows(segs, mode) {
    const modeCue = z => mode ? mode.zone[z] : "";
    const rows = [];
    let i = 0;
    while (i < segs.length) {
      const a = segs[i], b = segs[i + 1];
      if (b && a.zone > b.zone) {
        let count = 0, j = i;
        while (segs[j] && segs[j].label === a.label && segs[j].min === a.min) {
          count++;
          if (segs[j + 1] && segs[j + 1].label === b.label) j += 2; else { j += 1; break; }
        }
        if (count > 1) {
          rows.push({ label: count + " × " + a.label.toLowerCase(), count, on: fmtMin(a.min), off: fmtMin(b.min) + " " + b.label.toLowerCase(),
            detail: [fmtMin(a.min) + " on, " + fmtMin(b.min) + " " + b.label.toLowerCase(), modeCue(a.zone), a.note].filter(Boolean).join(". "), note: a.note, modeCue: modeCue(a.zone), zone: a.zone });
          i = j; continue;
        }
      }
      rows.push({ label: a.label, count: 1, on: fmtMin(a.min), detail: [fmtMin(a.min), modeCue(a.zone), a.note].filter(Boolean).join(". "), note: a.note, modeCue: modeCue(a.zone), zone: a.zone });
      i++;
    }
    return rows;
  }

  function renderCardio(s) {
    $("cardioCard").hidden = !s.cardio;
    if (!s.cardio) return;
    const sched = cardioTypeFor(current, true);
    const sc = $("sessChips"); sc.innerHTML = "";
    Object.keys(SESS).forEach(t =>
      sc.appendChild(chip(SESS[t] + (t === sched ? " · planned" : ""), t === s.cardioType, null, () => setOverride("cardio", t, sched))));
    const segs = s.cardio.segs;
    const total = renderChart(segs);
    const hard = segs.filter(x => x.zone >= 4).reduce((a, x) => a + x.min, 0);
    $("cardioName").textContent = s.cardio.name;
    $("cardioMeta").innerHTML = "<span>Type <b>" + s.mode.name + "</b></span><span><b>" + Math.round(total) + "</b> min total</span>" + (hard ? "<span><b>" + fmtMin(hard) + "</b> in Z4–Z5</span>" : "");
    const used = [...new Set(segs.map(x => x.zone))].sort();
    $("legend").innerHTML = used.map(z => '<span><i style="background:var(--z' + z + ')"></i>' + ZONES[z].n + " " + ZONES[z].d + " · " + ZONES[z].hr + "</span>").join("");
    const rows = cardioRows(segs, s.mode);
    const ul = $("segs"); ul.innerHTML = "";
    let n = 0;
    rows.forEach((r, k) => {
      const c = checkRow(s.key, "cardio-" + k, esc(r.label) + "<small>" + esc(r.detail) + "</small>",
        '<span class="zone" style="background:var(--z' + r.zone + ')">' + ZONES[r.zone].n + "</span>");
      if (c.done) n++; ul.appendChild(c.li);
    });
    $("cardioProg").style.width = (n / rows.length * 100) + "%";
  }

  function renderMine() {
    const key = keyOf(current);
    const isToday = key === todayKey();
    $("mineTitle").textContent = "Planned for " + (isToday ? "today" : DOW[dowMon(current)] + " " + current.getDate() + " " + MONTHS[current.getMonth()].slice(0, 3));
    const list = $("dayList"); list.innerHTML = "";
    const ids = (days[key] || []).filter(id => library.some(w => w.id === id));
    if (!ids.length) {
      const e = document.createElement("div");
      e.className = "empty";
      e.innerHTML = "<p>Nothing of your own planned for this day. Build a workout, or add one from your library below.</p>";
      const b = document.createElement("button");
      b.className = "btn"; b.textContent = "+ New workout";
      b.addEventListener("click", () => openBuilder());
      e.appendChild(b);
      list.appendChild(e);
    }
    ids.forEach(id => {
      const w = library.find(x => x.id === id);
      const t = typeOf(w.type);
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML =
        '<div class="card-head"><div><span class="tag" style="background:' + t.color + '">' + t.name + '</span><h3>' + esc(w.name) + '</h3></div>' +
        '<div class="card-actions"><button class="btn small" data-act="share">Share</button><button class="btn small" data-act="edit">Edit</button><button class="btn small ghost" data-act="remove">Remove</button></div></div>' +
        (w.from || w.msg ? '<p class="from-note">' + (w.from ? "<b>From " + esc(w.from) + ".</b> " : "") + esc(w.msg) + "</p>" : "") +
        '<div class="progress"><i></i></div><ul class="items"></ul>';
      const ul = card.querySelector("ul");
      let n = 0;
      w.items.forEach((it, i) => {
        const rx = (it.sets ? esc(it.sets) + " × " : "") + esc(it.reps || "");
        const r = checkRow(key, "mine-" + w.id + "-" + i, esc(it.name), rx ? '<div class="rx">' + rx + "</div>" : "<span></span>", it.note ? esc(it.note) : "");
        if (r.done) n++; ul.appendChild(r.li);
      });
      card.querySelector(".progress i").style.width = (w.items.length ? n / w.items.length * 100 : 0) + "%";
      card.querySelector('[data-act="share"]').addEventListener("click", () => openShare(w));
      card.querySelector('[data-act="edit"]').addEventListener("click", () => openBuilder(w));
      card.querySelector('[data-act="remove"]').addEventListener("click", () => {
        days[key] = (days[key] || []).filter(x => x !== w.id); saveDays(); render(); toast("Removed from this day");
      });
      list.appendChild(card);
    });
  }

  function renderFilters() {
    const f = $("filters"); f.innerHTML = "";
    [{ id: "all", name: "All" }].concat(TYPES).forEach(t => {
      const count = t.id === "all" ? library.length : library.filter(w => w.type === t.id).length;
      if (t.id !== "all" && !count) return;
      const b = document.createElement("button");
      b.className = "chip"; b.setAttribute("aria-pressed", String(filter === t.id));
      b.innerHTML = (t.color ? '<i style="background:' + t.color + '"></i>' : "") + t.name + " · " + count;
      b.addEventListener("click", () => { filter = t.id; render(); });
      f.appendChild(b);
    });
  }

  function renderLibrary() {
    if (filter !== "all" && !library.some(w => w.type === filter)) filter = "all";
    renderFilters();
    const key = keyOf(current);
    const planned = days[key] || [];
    const lib = $("lib"); lib.innerHTML = "";
    const shown = library.filter(w => filter === "all" || w.type === filter);
    if (!shown.length) {
      lib.innerHTML = '<div class="empty"><p>Your library is empty. Saved workouts show up here so you can reuse them on any day.</p></div>';
      return;
    }
    shown.forEach(w => {
      const t = typeOf(w.type);
      const on = planned.includes(w.id);
      const c = document.createElement("div");
      c.className = "lib-card" + (on ? " added" : "");
      c.innerHTML =
        '<div><span class="tag" style="background:' + t.color + '">' + t.name + "</span></div>" +
        "<h4>" + esc(w.name) + "</h4>" +
        (w.from ? "<p>From " + esc(w.from) + "</p>" : "") +
        "<p>" + w.items.length + " exercise" + (w.items.length === 1 ? "" : "s") + ": " + esc(w.items.slice(0, 3).map(i => i.name).join(", ")) + (w.items.length > 3 ? "…" : "") + "</p>" +
        '<div class="row"><button class="btn small' + (on ? "" : " primary") + '" data-act="add">' + (on ? "Added ✓" : "Add to day") + '</button>' +
        '<button class="btn small" data-act="share">Share</button><button class="btn small" data-act="edit">Edit</button><button class="btn small ghost danger" data-act="del">Delete</button></div>';
      c.querySelector('[data-act="add"]').addEventListener("click", () => {
        if (on) { days[key] = planned.filter(x => x !== w.id); toast("Removed from this day"); }
        else { days[key] = planned.concat(w.id); toast("Added " + w.name); }
        saveDays(); render();
      });
      c.querySelector('[data-act="share"]').addEventListener("click", () => openShare(w));
      c.querySelector('[data-act="edit"]').addEventListener("click", () => openBuilder(w));
      const del = c.querySelector('[data-act="del"]');
      del.addEventListener("click", () => {
        if (!del.classList.contains("armed")) {
          del.classList.add("armed"); del.textContent = "Confirm delete";
          setTimeout(() => { del.classList.remove("armed"); del.textContent = "Delete"; }, 3000);
          return;
        }
        library = library.filter(x => x.id !== w.id);
        Object.keys(days).forEach(k => { days[k] = days[k].filter(x => x !== w.id); if (!days[k].length) delete days[k]; });
        saveLib(); saveDays(); render(); toast("Deleted " + w.name);
      });
      lib.appendChild(c);
    });
  }

  function toggle(key, id, val) {
    const done = store.get("done:" + key, {});
    if (val) done[id] = true; else delete done[id];
    store.set("done:" + key, done);
    render();
  }

  function render() {
    const s = sessionFor(current);
    $("dateLine").textContent = DOW[s.dow] + " · " + current.getDate() + " " + MONTHS[current.getMonth()] + " " + current.getFullYear() + " · Week " + s.wk + (keyOf(current) === todayKey() ? " · Today" : "");
    $("title").innerHTML = DOW[s.dow] + '<span class="split">' + ([liftLabel(s.liftType), cardioLabel(s.cardioType)].filter(Boolean).join(" + ") || "Rest day") + "</span>";
    $("sugGrid").hidden = !s.lift && !s.cardio;
    $("sugGrid").classList.toggle("single", !s.lift || !s.cardio);
    renderSetup(); renderWeek(); renderLift(s); renderCardio(s); renderMine(); renderLibrary();
  }

  function swap(kind) {
    const key = keyOf(current);
    const sw = store.get("swap:" + key, { lift: 0, cardio: 0 });
    sw[kind] = (sw[kind] || 0) + 1;
    store.set("swap:" + key, sw);
    const done = store.get("done:" + key, {});
    Object.keys(done).forEach(k => { if (k.startsWith(kind + "-")) delete done[k]; });
    store.set("done:" + key, done);
    render();
  }

  // ---------- Builder ----------
  const dlg = $("builder");
  let editing = null; // id of workout being edited, or null for new
  let bType = "lifting";

  function renderTypes() {
    const wrap = $("bTypes"); wrap.innerHTML = "";
    TYPES.forEach(t => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", String(bType === t.id)); b.setAttribute("aria-pressed", String(bType === t.id));
      b.innerHTML = '<i style="background:' + t.color + '"></i>' + t.name;
      b.addEventListener("click", () => { bType = t.id; renderTypes(); });
      wrap.appendChild(b);
    });
  }

  let rowSeq = 0;
  function addRow(it) {
    it = it || {};
    const n = ++rowSeq;
    const r = document.createElement("div");
    r.className = "brow";
    r.innerHTML =
      '<input type="text" class="b-name" id="bn' + n + '" placeholder="Exercise" aria-label="Exercise name" value="' + esc(it.name) + '">' +
      '<input type="text" class="b-sets" id="bs' + n + '" placeholder="Sets" aria-label="Sets" inputmode="numeric" value="' + esc(it.sets) + '">' +
      '<input type="text" class="b-reps" id="br' + n + '" placeholder="Reps / time" aria-label="Reps or time" value="' + esc(it.reps) + '">' +
      '<input type="text" class="b-note" id="bt' + n + '" placeholder="Notes (weight, rest, cue)" aria-label="Notes" value="' + esc(it.note) + '">' +
      '<button type="button" class="x" aria-label="Remove exercise">×</button>';
    r.querySelector(".x").addEventListener("click", () => { r.remove(); if (!$("bRows").children.length) addRow(); });
    $("bRows").appendChild(r);
    return r;
  }

  function openBuilder(w, draft) {
    editing = w ? w.id : null;
    const src = w || draft || null;
    $("bTitle").textContent = w ? "Edit workout" : "New workout";
    $("bName").value = src ? src.name : "";
    bType = src ? src.type : (filter !== "all" ? filter : "lifting");
    renderTypes();
    $("bRows").innerHTML = "";
    (src && src.items.length ? src.items : [{}, {}, {}]).forEach(it => addRow(it));
    const k = keyOf(current);
    $("bDate").textContent = k === todayKey() ? "today" : DOW[dowMon(current)] + " " + current.getDate() + " " + MONTHS[current.getMonth()].slice(0, 3);
    $("bAssign").checked = w ? (days[k] || []).includes(w.id) : true;
    $("bErr").hidden = true;
    $("bSave").textContent = w ? "Save changes" : "Save workout";
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    setTimeout(() => $("bName").focus(), 30);
  }
  function closeBuilder() { if (dlg.open) dlg.close(); }

  $("bform").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("bName").value.trim();
    const items = [...$("bRows").querySelectorAll(".brow")].map(r => ({
      name: r.querySelector(".b-name").value.trim(),
      sets: r.querySelector(".b-sets").value.trim(),
      reps: r.querySelector(".b-reps").value.trim(),
      note: r.querySelector(".b-note").value.trim()
    })).filter(i => i.name);
    const err = $("bErr");
    if (!name) { err.textContent = "Give the workout a name."; err.hidden = false; $("bName").focus(); return; }
    if (!items.length) { err.textContent = "Add at least one exercise with a name."; err.hidden = false; return; }
    let w;
    if (editing) { w = library.find(x => x.id === editing); Object.assign(w, { name, type: bType, items }); }
    else { w = { id: uid(), name, type: bType, items }; library.unshift(w); }
    const k = keyOf(current);
    const list = days[k] || [];
    if ($("bAssign").checked && !list.includes(w.id)) days[k] = list.concat(w.id);
    if (!$("bAssign").checked && list.includes(w.id)) days[k] = list.filter(x => x !== w.id);
    saveLib(); saveDays(); closeBuilder(); render();
    toast(editing ? "Saved changes" : "Saved " + name);
  });
  $("addRow").addEventListener("click", () => addRow().querySelector("input").focus());
  $("bCancel").addEventListener("click", closeBuilder);
  $("bClose").addEventListener("click", closeBuilder);
  dlg.addEventListener("click", e => { if (e.target === dlg) closeBuilder(); });

  // Customize a suggested session: open it as a new draft
  $("custLift").addEventListener("click", () => {
    const s = sessionFor(current);
    if (!s.lift) return;
    openBuilder(null, { name: s.lift.name, type: s.liftType === "rest" ? "mobility" : "lifting",
      items: s.lift.ex.map(e => ({ name: e.name, sets: String(e.sets), reps: e.reps, note: "Rest " + e.rest + (e.rpe >= 5 ? ", RPE " + e.rpe : "") })) });
  });
  $("custCardio").addEventListener("click", () => {
    const s = sessionFor(current);
    if (!s.cardio) return;
    openBuilder(null, { name: s.cardio.name + " (" + s.mode.name + ")", type: s.cardioType === "sprints" ? "hiit" : "cardio",
      items: cardioRows(s.cardio.segs, s.mode).map(r => ({ name: r.count > 1 ? r.label.replace(/^\d+ × /, "") : r.label, sets: r.count > 1 ? String(r.count) : "",
        reps: r.on, note: [ZONES[r.zone].n + " " + ZONES[r.zone].d, r.off ? r.off + " between" : "", r.modeCue, r.note].filter(Boolean).join(". ") })) });
  });

  // ---------- Backup ----------
  $("exportBtn").addEventListener("click", () => {
    const data = { app: "daily-training-card", version: 1, exported: new Date().toISOString(), library, days, done: {} };
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith(PREFIX + "done:")) data.done[k.slice(PREFIX.length + 5)] = JSON.parse(localStorage.getItem(k));
      }
    } catch (e) {}
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "training-backup-" + todayKey() + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("importBtn").addEventListener("click", () => $("importFile").click());
  $("importFile").addEventListener("change", e => {
    const f = e.target.files[0]; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const d = JSON.parse(rd.result);
        if (!Array.isArray(d.library)) throw new Error("bad");
        d.library.forEach(w => { const c = cleanWorkout(w); if (c && !library.some(x => x.id === c.id)) library.push(c); });
        Object.entries(d.days || {}).forEach(([k, ids]) => {
          if (DATE_KEY.test(k) && Array.isArray(ids)) days[k] = [...new Set((days[k] || []).concat(ids.filter(i => typeof i === "string")))];
        });
        Object.entries(d.done || {}).forEach(([k, v]) => {
          if (!DATE_KEY.test(k) || !v || typeof v !== "object") return;
          const done = store.get("done:" + k, {});
          Object.keys(v).forEach(id => { if (DONE_KEY.test(id)) done[id] = true; });
          store.set("done:" + k, done);
        });
        saveLib(); saveDays(); render(); toast("Imported " + d.library.length + " workouts");
      } catch (err) { toast("That file isn't a training backup. Choose a .json file made with Export backup."); }
      e.target.value = "";
    };
    rd.readAsText(f);
  });

  // ---------- Share links ----------
  // A plan travels in the link's #w= part, which browsers never send to a server.
  // Links come from outside, so everything read from one is treated as untrusted:
  // size-capped, stripped to plain fields, shown as text, and saved only on a click.
  const MAX_CODE = 30000, MAX_ITEMS = 40;
  const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/, DONE_KEY = /^(lift|cardio|mine)-[\w-]{1,80}$/, ID_KEY = /^[\w-]{1,40}$/;
  const b64enc = s => btoa(Array.from(new TextEncoder().encode(s), c => String.fromCharCode(c)).join("")).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const b64dec = s => new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0)));
  // Removes control characters and the invisible marks that can disguise text direction
  const clip = (x, n) => (typeof x === "string" || typeof x === "number" ? String(x) : "").replace(/[\u0000-\u001f\u007f-\u009f‎‏‪-‮⁦-⁩]/g, " ").trim().slice(0, n);
  const cleanItem = i => ({ name: clip(i.name, 100), sets: clip(i.sets, 20), reps: clip(i.reps, 40), note: clip(i.note, 300) });
  const cleanType = t => TYPES.some(x => x.id === t) ? t : "other";

  function cleanWorkout(w) {
    if (!w || typeof w !== "object" || !Array.isArray(w.items)) return null;
    const name = clip(w.name, 100);
    const items = w.items.slice(0, MAX_ITEMS).filter(i => i && typeof i === "object").map(cleanItem).filter(i => i.name);
    if (!name || !items.length) return null;
    return { id: typeof w.id === "string" && ID_KEY.test(w.id) ? w.id : uid(), name, type: cleanType(w.type), items, from: clip(w.from, 60), msg: clip(w.msg, 300) };
  }

  // Format: [1, plan name, from, message, [[weekday or -1, workout name, type, [[name, sets, reps, note]]]]]
  function encodeShare(p) {
    return b64enc(JSON.stringify([1, p.name, p.from, p.msg, p.days.map(d => [d.dow, d.name, d.type, d.items.map(i => [i.name, i.sets, i.reps, i.note])])]));
  }
  function decodeShare(code) {
    if (code.length > MAX_CODE) return null;
    try {
      const data = JSON.parse(b64dec(code));
      if (!Array.isArray(data) || data[0] !== 1 || !Array.isArray(data[4])) return null;
      const seen = new Set(), planDays = [];
      data[4].slice(0, 7).forEach(d => {
        if (!Array.isArray(d) || !Array.isArray(d[3])) return;
        const dow = d[0];
        if (!Number.isInteger(dow) || dow < -1 || dow > 6 || seen.has(dow)) return;
        const items = d[3].slice(0, MAX_ITEMS).filter(Array.isArray)
          .map(i => cleanItem({ name: i[0], sets: i[1], reps: i[2], note: i[3] })).filter(i => i.name);
        if (!items.length) return;
        seen.add(dow);
        planDays.push({ dow, name: clip(d[1], 100), type: cleanType(d[2]), items });
      });
      if (!planDays.length) return null;
      return { name: clip(data[1], 100) || "Shared plan", from: clip(data[2], 60), msg: clip(data[3], 300), days: planDays };
    } catch (e) { return null; }
  }
  const shareUrl = code => location.origin + location.pathname + "#w=" + code;

  async function copyLink(input) {
    try { await navigator.clipboard.writeText(input.value); toast("Link copied"); }
    catch (e) { input.focus(); input.select(); toast("Copy the selected link"); }
  }

  const shareDlg = $("shareDlg"), recvDlg = $("recvDlg");
  let sharing = null, incoming = null;

  function updateShareLink() {
    const w = sharing;
    $("shLink").value = shareUrl(encodeShare({ name: w.name, from: $("shFrom").value.trim(), msg: $("shMsg").value.trim(),
      days: [{ dow: -1, name: w.name, type: w.type, items: w.items }] }));
  }
  function openShare(w) {
    sharing = w;
    $("shTitle").textContent = w.name;
    $("shFrom").value = prefs.from || "";
    $("shMsg").value = "";
    $("shSend").hidden = typeof navigator.share !== "function";
    updateShareLink();
    shareDlg.showModal();
  }
  $("shFrom").addEventListener("input", () => { prefs.from = $("shFrom").value.trim(); savePrefs(); updateShareLink(); });
  $("shMsg").addEventListener("input", updateShareLink);
  $("shClose").addEventListener("click", () => shareDlg.close());
  $("shLink").addEventListener("focus", e => e.target.select());
  $("shCopy").addEventListener("click", () => copyLink($("shLink")));
  $("shSend").addEventListener("click", () => {
    navigator.share({ title: sharing.name, url: $("shLink").value }).catch(() => {});
  });

  function checkShareLink() {
    const m = location.hash.match(/^#w=([\w-]+)$/);
    if (!m) return;
    history.replaceState(null, "", location.pathname + location.search);
    if (window.top !== window.self) return; // Never prompt from inside another site's frame
    const p = decodeShare(m[1]);
    if (!p) { toast("That workout link is incomplete. Ask for a new one."); return; }
    incoming = p;
    const single = p.days.length === 1 && p.days[0].dow < 0;
    $("rcFrom").textContent = p.from ? "From " + p.from : "Shared with you";
    $("rcTitle").textContent = p.name;
    $("rcMsg").textContent = p.msg;
    $("rcMsg").hidden = !p.msg;
    $("rcItems").innerHTML = p.days.map(d => {
      const t = typeOf(d.type);
      return '<li class="rc-day"><span class="tag" style="background:' + t.color + '">' + t.name + "</span>" + esc(d.dow >= 0 ? DOW[d.dow] : "") + (d.name ? (d.dow >= 0 ? " · " : "") + esc(d.name) : "") + "</li>" +
        d.items.map(i => "<li><b>" + esc(i.name) + (i.note ? "<small>" + esc(i.note) + "</small>" : "") + "</b><span>" + (i.sets ? esc(i.sets) + " × " : "") + esc(i.reps) + "</span></li>").join("");
    }).join("");
    const now = atNoon(new Date());
    const start = single ? current : atNoon(new Date(now.getTime() + ((7 - dowMon(now)) % 7) * DAY_MS));
    $("rcDate").value = keyOf(start);
    $("rcDateLabel").textContent = single ? "Do it on" : "Start the week of";
    $("rcDay").textContent = single ? "Add to this day" : "Add to this week";
    if (!recvDlg.open) recvDlg.showModal();
  }

  // Saving always makes new entries, or reuses an identical one. A link never changes existing workouts.
  function saveIncoming() {
    const p = incoming;
    return p.days.map(d => {
      const name = d.dow < 0 ? (d.name || p.name) : p.name + " · " + (d.name || DOW[d.dow]);
      const same = library.find(x => x.name === name && JSON.stringify(x.items) === JSON.stringify(d.items));
      const w = same || { id: uid(), name, type: d.type, items: d.items, from: p.from, msg: p.msg };
      if (!same) library.unshift(w);
      return { dow: d.dow, id: w.id };
    });
  }
  $("rcSkip").addEventListener("click", () => recvDlg.close());
  $("rcLib").addEventListener("click", () => {
    saveIncoming(); saveLib(); recvDlg.close(); render(); toast("Saved " + incoming.name);
  });
  $("rcDay").addEventListener("click", () => {
    const saved = saveIncoming();
    const m = $("rcDate").value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const picked = m ? new Date(+m[1], +m[2] - 1, +m[3], 12) : current;
    const monday = picked.getTime() - dowMon(picked) * DAY_MS;
    let first = null;
    saved.forEach(s => {
      const d = s.dow < 0 ? picked : atNoon(new Date(monday + s.dow * DAY_MS));
      const k = keyOf(d);
      if (!(days[k] || []).includes(s.id)) days[k] = (days[k] || []).concat(s.id);
      if (!first || d < first) first = d;
    });
    current = first;
    saveLib(); saveDays(); recvDlg.close(); render(); toast("Added " + incoming.name);
  });

  // ---------- Build page ----------
  const CARDIO_PICKS = [
    ["Easy Run", "30 min"], ["Tempo Run", "20 min"], ["Interval Run", "6 × 3 min"], ["Long Run", "60 min"], ["Hill Sprints", "10 × 15 s"],
    ["Steady Row", "30 min"], ["Row Intervals", "8 × 500 m"], ["2K Row", "2000 m"],
    ["Easy Ride", "45 min"], ["Bike Intervals", "6 × 3 min"], ["Climb Repeats", "5 × 5 min"],
    ["Easy Swim", "30 min"], ["Swim Intervals", "10 × 100 m"],
    ["Brisk Walk", "30 min"], ["Incline Walk", "30 min"], ["Hike", "60 min"],
    ["Ski Erg Intervals", "8 × 1 min"], ["Elliptical", "30 min"], ["Stair Climber", "20 min"], ["Jump Rope", "10 × 1 min"]
  ].map(([name, reps]) => ({ name, cue: reps, sets: "1", reps }));

  const fromPools = keys => [...new Map(keys.flatMap(k => POOL[k]).map(e => [e.name, { name: e.name, cue: e.cue, sets: "3", reps: "10" }])).values()];
  const PICK_GROUPS = [
    { id: "chest", name: "Chest", list: fromPools(["hpush", "fly"]) },
    { id: "back", name: "Back", list: fromPools(["vpull", "hpull", "deadlift", "lats", "traps"]) },
    { id: "shoulders", name: "Shoulders", list: fromPools(["vpush", "lateral", "rear"]) },
    { id: "legs", name: "Legs", list: fromPools(["squat", "hinge", "lunge", "quadiso", "hamcurl", "calves"]) },
    { id: "arms", name: "Arms", list: fromPools(["biceps", "triceps"]) },
    { id: "core", name: "Core", type: "core", list: fromPools(["core", "carry"]) },
    { id: "bw", name: "Bodyweight", list: fromPools(["bwpush", "bwpull", "bwlegs", "bwhinge"]) },
    { id: "cardio", name: "Cardio", type: "cardio", list: CARDIO_PICKS },
    { id: "mobility", name: "Mobility", type: "mobility", list: LIFTS.recovery[0].ex.map(e => ({ name: e.name, cue: e.cue, sets: String(e.sets), reps: e.reps })) }
  ];

  const emptyWeek = () => DOW.map(() => ({ name: "", type: "lifting", items: [] }));
  function loadDraft() {
    const d = store.get("draft", null);
    const week = emptyWeek();
    if (d && Array.isArray(d.week)) d.week.slice(0, 7).forEach((x, i) => {
      if (!x || !Array.isArray(x.items)) return;
      week[i] = { name: clip(x.name, 100), type: cleanType(x.type), items: x.items.slice(0, MAX_ITEMS).filter(Boolean).map(cleanItem) };
    });
    return { name: clip(d && d.name, 100), msg: clip(d && d.msg, 300), week };
  }
  let plan = loadDraft(), bDay = dowMon(new Date()), pickGroup = "chest", pickQuery = "";
  const saveDraft = () => store.set("draft", plan);
  const usedDays = () => plan.week.map((d, i) => ({ dow: i, name: d.name.trim(), type: d.type, items: d.items.filter(x => x.name.trim()) })).filter(d => d.items.length);

  function changed() { saveDraft(); $("bResult").hidden = true; renderBuildBar(); }

  function renderBuildWeek() {
    const wrap = $("bWeek"); wrap.innerHTML = "";
    plan.week.forEach((d, i) => {
      const b = document.createElement("button");
      b.className = "day" + (i === bDay ? " sel" : "");
      b.setAttribute("aria-label", DOW[i] + ", " + d.items.length + " exercises");
      b.innerHTML = '<span class="dn">' + DOW[i].slice(0, 3) + '</span><span class="dd">' + d.items.length + '</span><span class="df">' + (d.items.length ? "exercises" : "Rest") + "</span>";
      b.addEventListener("click", () => { bDay = i; renderBuild(); });
      wrap.appendChild(b);
    });
  }

  function renderPicker() {
    $("pickTitle").textContent = "Add to " + DOW[bDay];
    const gc = $("pickGroups"); gc.innerHTML = "";
    PICK_GROUPS.forEach(g => gc.appendChild(chip(g.name, !pickQuery && pickGroup === g.id, null, () => {
      pickGroup = g.id; pickQuery = ""; $("pickSearch").value = ""; renderPicker();
    })));
    const q = pickQuery.toLowerCase();
    const seen = new Set();
    const list = (q ? PICK_GROUPS : PICK_GROUPS.filter(g => g.id === pickGroup))
      .flatMap(g => g.list.map(e => Object.assign({ group: g }, e)))
      .filter(e => (!q || e.name.toLowerCase().includes(q)) && !seen.has(e.name) && seen.add(e.name));
    const day = plan.week[bDay];
    const ul = $("picks"); ul.innerHTML = "";
    if (!list.length) { ul.innerHTML = '<li class="hint">No match. Add it as your own exercise below.</li>'; return; }
    list.forEach(e => {
      const on = day.items.some(x => x.name === e.name);
      const li = document.createElement("li");
      li.innerHTML = '<button class="pick" aria-pressed="' + on + '"><span>' + esc(e.name) + "<small>" + esc(e.cue) + '</small></span><span class="add">' + (on ? "✓" : "+") + "</span></button>";
      li.firstChild.addEventListener("click", () => {
        if (on) day.items = day.items.filter(x => x.name !== e.name);
        else {
          if (day.items.length >= MAX_ITEMS) { toast("A day can hold " + MAX_ITEMS + " exercises."); return; }
          if (!day.items.length && e.group.type) day.type = e.group.type;
          day.items.push({ name: e.name, sets: e.sets, reps: e.reps, note: "" });
        }
        changed(); renderBuild();
      });
      ul.appendChild(li);
    });
  }

  function renderSheet() {
    const day = plan.week[bDay];
    $("sheetDay").textContent = DOW[bDay];
    $("sheetCount").textContent = day.items.length ? day.items.length + " exercise" + (day.items.length === 1 ? "" : "s") : "No exercises yet";
    $("dName").value = day.name;
    const tc = $("dTypes"); tc.innerHTML = "";
    TYPES.forEach(t => tc.appendChild(chip(t.name, day.type === t.id, t.color, () => { day.type = t.id; changed(); renderSheet(); })));
    const rows = $("dRows"); rows.innerHTML = "";
    if (!day.items.length) { rows.innerHTML = '<p class="hint">Pick exercises from the list. Leave a day empty to make it a rest day.</p>'; return; }
    day.items.forEach((it, i) => {
      const r = document.createElement("div");
      r.className = "brow has-move";
      r.innerHTML =
        '<input type="text" class="b-name" maxlength="100" aria-label="Exercise name">' +
        '<input type="text" class="b-sets" maxlength="20" aria-label="Sets" placeholder="Sets">' +
        '<input type="text" class="b-reps" maxlength="40" aria-label="Reps or time" placeholder="Reps / time">' +
        '<input type="text" class="b-note" maxlength="300" aria-label="Notes" placeholder="Notes">' +
        '<button class="x up" aria-label="Move up">↑</button><button class="x del" aria-label="Remove exercise">×</button>';
      [["b-name", "name"], ["b-sets", "sets"], ["b-reps", "reps"], ["b-note", "note"]].forEach(([cls, key]) => {
        const input = r.querySelector("." + cls);
        input.value = it[key];
        input.addEventListener("input", () => { it[key] = input.value; changed(); });
      });
      r.querySelector(".up").disabled = i === 0;
      r.querySelector(".up").addEventListener("click", () => { [day.items[i - 1], day.items[i]] = [day.items[i], day.items[i - 1]]; changed(); renderSheet(); });
      r.querySelector(".del").addEventListener("click", () => { day.items.splice(i, 1); changed(); renderBuild(); });
      rows.appendChild(r);
    });
  }

  function renderBuildBar() {
    const used = usedDays(), n = used.reduce((a, d) => a + d.items.length, 0);
    $("bSummary").textContent = n ? used.length + " day" + (used.length === 1 ? "" : "s") + " · " + n + " exercise" + (n === 1 ? "" : "s") : "Nothing added yet";
    $("bShare").disabled = $("bSave").disabled = !n;
  }

  function renderBuild() { renderBuildWeek(); renderPicker(); renderSheet(); renderBuildBar(); }

  function planForShare() {
    return { name: clip(plan.name, 100) || "Training plan", from: clip(prefs.from, 60), msg: clip(plan.msg, 300),
      days: usedDays().map(d => ({ dow: d.dow, name: clip(d.name, 100), type: d.type, items: d.items.map(cleanItem).filter(i => i.name) })) };
  }

  $("pName").value = plan.name;
  $("pFrom").value = prefs.from || "";
  $("pMsg").value = plan.msg;
  $("pName").addEventListener("input", e => { plan.name = e.target.value; changed(); });
  $("pFrom").addEventListener("input", e => { prefs.from = e.target.value.trim(); savePrefs(); $("bResult").hidden = true; });
  $("pMsg").addEventListener("input", e => { plan.msg = e.target.value; changed(); });
  $("dName").addEventListener("input", e => { plan.week[bDay].name = e.target.value; changed(); });
  $("pickSearch").addEventListener("input", e => { pickQuery = e.target.value.trim(); renderPicker(); });
  $("bLink").addEventListener("focus", e => e.target.select());

  function addOwn() {
    const name = clip($("ownName").value, 100), day = plan.week[bDay];
    if (!name) return;
    if (day.items.length >= MAX_ITEMS) { toast("A day can hold " + MAX_ITEMS + " exercises."); return; }
    day.items.push({ name, sets: "3", reps: "10", note: "" });
    $("ownName").value = "";
    changed(); renderBuild();
  }
  $("ownAdd").addEventListener("click", addOwn);
  $("ownName").addEventListener("keydown", e => { if (e.key === "Enter") addOwn(); });
  $("bClearDay").addEventListener("click", () => { plan.week[bDay] = emptyWeek()[0]; changed(); renderBuild(); });

  $("bReset").addEventListener("click", e => {
    const b = e.target;
    if (!b.classList.contains("armed")) {
      b.classList.add("armed"); b.textContent = "Confirm start over";
      setTimeout(() => { b.classList.remove("armed"); b.textContent = "Start over"; }, 3000);
      return;
    }
    b.classList.remove("armed"); b.textContent = "Start over";
    plan = { name: "", msg: "", week: emptyWeek() };
    $("pName").value = ""; $("pMsg").value = "";
    changed(); renderBuild();
  });

  $("bShare").addEventListener("click", () => {
    const code = encodeShare(planForShare());
    if (code.length > MAX_CODE) { toast("This plan is too long for one link. Shorten the notes."); return; }
    $("bLink").value = shareUrl(code);
    $("bResult").hidden = false;
    copyLink($("bLink"));
  });
  $("bSave").addEventListener("click", () => {
    const p = planForShare();
    incoming = p;
    saveIncoming(); saveLib(); render();
    toast("Saved to your library");
  });

  function routeView() {
    const build = location.hash === "#build";
    $("viewToday").hidden = build;
    $("viewBuild").hidden = !build;
    $("tabToday").toggleAttribute("aria-current", false);
    $("tabBuild").toggleAttribute("aria-current", false);
    $(build ? "tabBuild" : "tabToday").setAttribute("aria-current", "page");
  }
  window.addEventListener("hashchange", () => { checkShareLink(); routeView(); });

  // ---------- Misc ----------
  let toastTimer;
  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2400);
  }

  $("prev").addEventListener("click", () => { current = atNoon(new Date(current.getTime() - DAY_MS)); render(); });
  $("next").addEventListener("click", () => { current = atNoon(new Date(current.getTime() + DAY_MS)); render(); });
  $("todayBtn").addEventListener("click", () => { current = atNoon(new Date()); render(); });
  $("swapLift").addEventListener("click", () => swap("lift"));
  $("swapCardio").addEventListener("click", () => swap("cardio"));
  $("newBtn").addEventListener("click", () => openBuilder());
  document.addEventListener("keydown", e => {
    if (document.querySelector("dialog[open]") || e.target.matches("input, textarea, select")) return;
    if (e.key === "ArrowLeft") $("prev").click();
    if (e.key === "ArrowRight") $("next").click();
  });

  render();
  renderBuild();
  checkShareLink();
  routeView();
})();

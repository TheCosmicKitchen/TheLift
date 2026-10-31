// Starter programs for the plan builder. These are simplified versions based on
// published programs, not official copies. Weekdays: 0 = Monday ... 6 = Sunday.
// Exercise rows: [name, sets, reps, rest, RPE, note, superset with the row above]
const PRESETS = (function () {
  const day = (d, n, t, x) => ({ d, n, t, x });
  const lift = (d, n, x) => day(d, n, "lifting", x);
  const SQUAT = "Back Squat", BENCH = "Barbell Bench Press", PRESS = "Standing Overhead Press", DEAD = "Conventional Deadlift", ROW = "Barbell Bent-Over Row";
  const AMRAP = "Last set: as many reps as you can with good form";

  // Couch to 5K: three identical or stepped runs a week, with a 5-minute walk either side
  const WALK_IN = ["Brisk Walk", "1", "5 min", "", "", "Warm-up"], WALK_OUT = ["Brisk Walk", "1", "5 min", "", "", "Cool-down"];
  const c25kRun = (d, n, rows) => day(d, n, "cardio", [WALK_IN, ...rows, WALK_OUT]);
  const c25k = (label, a, b, c) => ({ label, week: [c25kRun(0, "Run 1", a), c25kRun(2, "Run 2", b || a), c25kRun(4, "Run 3", c || a)] });
  const intervals = (sets, run, walk, note) => ["Run/Walk Intervals", sets, run, "", "", ("Walk " + walk + " between runs. " + (note || "")).trim()];
  const steady = mins => ["Easy Run", "1", mins + " min", "", "", "Continuous, at a pace you could talk at"];
  const piece = (run, walk) => ["Easy Run", "1", run, "", "", walk ? "Then walk " + walk : ""];

  // 5/3/1 with Boring But Big: the main lift's percentages change each week of the cycle
  const wendler = (label, reps, pct, top) => {
    const main = name => [name, "3", reps, "3 min", "", pct + " of training max." + (top ? " " + top : "")];
    const bbb = name => [name, "5", "10", "90 s", "", "Boring But Big: 50–60% of training max"];
    return { label, week: [
      lift(0, "Press day", [main(PRESS), bbb(PRESS), ["Chin-ups", "5", "10", "90 s"]]),
      lift(1, "Deadlift day", [main(DEAD), bbb(DEAD), ["Hanging Leg Raise", "5", "15", "60 s"]]),
      lift(3, "Bench day", [main(BENCH), bbb(BENCH), ["Single-Arm Dumbbell Row", "5", "10", "90 s"]]),
      lift(4, "Squat day", [main(SQUAT), bbb(SQUAT), ["Lying Leg Curl", "5", "10", "60 s"]])
    ] };
  };

  return [
    { id: "ss", cat: "Strength", name: "Novice Linear 3×5", level: "Beginner", days: 3, weeks: 12, based: "Starting Strength, Mark Rippetoe",
      about: "Three full-body days built on the big barbell lifts. Add a little weight every session for as long as you can. Swap the A and B days each week.",
      week: [
        lift(0, "Workout A", [[SQUAT, "3", "5", "3 min", "8"], [BENCH, "3", "5", "3 min", "8"], [DEAD, "1", "5", "3 min", "8"]]),
        lift(2, "Workout B", [[SQUAT, "3", "5", "3 min", "8"], [PRESS, "3", "5", "3 min", "8"], [DEAD, "1", "5", "3 min", "8"]]),
        lift(4, "Workout A", [[SQUAT, "3", "5", "3 min", "8"], [BENCH, "3", "5", "3 min", "8"], [DEAD, "1", "5", "3 min", "8"]])
      ] },
    { id: "sl", cat: "Strength", name: "Beginner 5×5", level: "Beginner", days: 3, weeks: 12, based: "StrongLifts 5×5",
      about: "Alternate two workouts, three days a week, with more volume than a 3×5 program. Add weight whenever you finish all your reps. Swap A and B each week.",
      week: [
        lift(0, "Workout A", [[SQUAT, "5", "5", "3 min", "8"], [BENCH, "5", "5", "3 min", "8"], [ROW, "5", "5", "3 min", "8"]]),
        lift(2, "Workout B", [[SQUAT, "5", "5", "3 min", "8"], [PRESS, "5", "5", "3 min", "8"], [DEAD, "1", "5", "3 min", "8"]]),
        lift(4, "Workout A", [[SQUAT, "5", "5", "3 min", "8"], [BENCH, "5", "5", "3 min", "8"], [ROW, "5", "5", "3 min", "8"]])
      ] },
    { id: "gs", cat: "Strength", name: "AMRAP Linear", level: "Beginner", days: 3, weeks: 12, based: "Greyskull LP",
      about: "Three sets of five, with an all-out last set that shows when you can add more weight. Alternate bench and press each session.",
      week: [
        lift(0, "Bench and squat", [[BENCH, "3", "5", "2 min", "9", AMRAP], [ROW, "3", "5", "2 min", "9", AMRAP], [SQUAT, "3", "5", "3 min", "9", AMRAP]]),
        lift(2, "Press and deadlift", [[PRESS, "3", "5", "2 min", "9", AMRAP], ["Chin-ups", "3", "5", "2 min", "9", AMRAP], [DEAD, "1", "5", "3 min", "9", AMRAP]]),
        lift(4, "Bench and squat", [[BENCH, "3", "5", "2 min", "9", AMRAP], [ROW, "3", "5", "2 min", "9", AMRAP], [SQUAT, "3", "5", "3 min", "9", AMRAP]])
      ] },
    { id: "gz", cat: "Strength", name: "Four-Day Tiered Linear", level: "Late beginner", days: 4, weeks: 12, based: "GZCLP, Cody Lefever",
      about: "Each day has one heavy lift, one volume lift and one lighter accessory. A good next step once simple linear programs stall.",
      week: [
        lift(0, "Squat day", [[SQUAT, "5", "3", "3–5 min", "8", AMRAP], [BENCH, "3", "10", "2–3 min", "8"], ["Lat Pulldown", "3", "15", "60–90 s", "8", AMRAP]]),
        lift(1, "Press day", [[PRESS, "5", "3", "3–5 min", "8", AMRAP], [DEAD, "3", "10", "2–3 min", "8"], ["Single-Arm Dumbbell Row", "3", "15", "60–90 s", "8", AMRAP]]),
        lift(3, "Bench day", [[BENCH, "5", "3", "3–5 min", "8", AMRAP], [SQUAT, "3", "10", "2–3 min", "8"], ["Lat Pulldown", "3", "15", "60–90 s", "8", AMRAP]]),
        lift(4, "Deadlift day", [[DEAD, "5", "3", "3–5 min", "8", AMRAP], [PRESS, "3", "10", "2–3 min", "8"], ["Single-Arm Dumbbell Row", "3", "15", "60–90 s", "8", AMRAP]])
      ] },
    { id: "w531", cat: "Strength", name: "5/3/1 Boring But Big", level: "Intermediate", days: 4, based: "5/3/1, Jim Wendler",
      about: "A slow, steady four-week cycle. Heavy sets on one main lift, then five sets of ten for size. Your training max is about 90% of your best single.",
      phases: [
        wendler("Week 1", "5+", "65%, 75%, 85%", "Max reps on the last set"),
        wendler("Week 2", "3+", "70%, 80%, 90%", "Max reps on the last set"),
        wendler("Week 3", "5/3/1+", "75%, 85%, 95%", "Max reps on the last set"),
        wendler("Deload", "5", "40%, 50%, 60%", "Keep it light")
      ] },

    { id: "phul", cat: "Muscle", name: "Power + Hypertrophy Upper/Lower", level: "Intermediate", days: 4, weeks: 12, based: "PHUL, Brandon Campbell",
      about: "Two heavy days and two higher-rep days, training every muscle twice a week.",
      week: [
        lift(0, "Upper power", [[BENCH, "4", "3–5", "3 min", "8"], ["Incline Dumbbell Press", "4", "6–10", "2 min", "8"], [ROW, "4", "3–5", "3 min", "8"], ["Lat Pulldown", "4", "6–10", "2 min", "8"], [PRESS, "3", "5–8", "2 min", "8"], ["EZ-Bar Curl", "3", "6–10", "90 s", "8"], ["EZ-Bar Skull Crusher", "3", "6–10", "90 s", "8"]]),
        lift(1, "Lower power", [[SQUAT, "4", "3–5", "3 min", "8"], [DEAD, "4", "3–5", "3 min", "8"], ["Leg Press", "4", "10–15", "2 min", "8"], ["Seated Leg Curl", "4", "6–10", "90 s", "8"], ["Standing Calf Raise", "4", "6–10", "60 s", "8"]]),
        lift(3, "Upper hypertrophy", [["Incline Barbell Press", "4", "8–12", "90 s", "8"], ["Dumbbell Fly", "4", "8–12", "60 s", "8"], ["Seated Cable Row", "4", "8–12", "90 s", "8"], ["Single-Arm Dumbbell Row", "4", "8–12", "60 s", "8"], ["Dumbbell Lateral Raise", "4", "8–12", "60 s", "8"], ["Incline Dumbbell Curl", "4", "8–12", "60 s", "8"], ["Rope Triceps Pushdown", "4", "8–12", "60 s", "8"]]),
        lift(4, "Lower hypertrophy", [["Front Squat", "4", "8–12", "2 min", "8"], ["Bulgarian Split Squat", "4", "8–12", "90 s", "8"], ["Leg Extension", "4", "10–15", "60 s", "8"], ["Lying Leg Curl", "4", "10–15", "60 s", "8"], ["Seated Calf Raise", "4", "8–12", "60 s", "8"], ["Standing Calf Raise", "4", "8–12", "60 s", "8"]])
      ] },
    { id: "phat", cat: "Muscle", name: "Power + Hypertrophy Five-Day", level: "Advanced", days: 5, weeks: 12, based: "PHAT, Layne Norton",
      about: "Two power days and three volume days. It's a big step up in weekly work, so try the four-day version first.",
      week: [
        lift(0, "Upper power", [[ROW, "3", "3–5", "3 min", "8"], ["Pull-ups", "2", "6–10", "2 min", "8"], [BENCH, "3", "3–5", "3 min", "8"], ["Weighted Dips", "2", "6–10", "2 min", "8"], ["Seated Dumbbell Shoulder Press", "3", "6–10", "2 min", "8"], ["EZ-Bar Curl", "3", "6–10", "90 s", "8"], ["EZ-Bar Skull Crusher", "3", "6–10", "90 s", "8"]]),
        lift(1, "Lower power", [[SQUAT, "3", "3–5", "3 min", "8"], ["Hack Squat", "2", "6–10", "2 min", "8"], ["Leg Extension", "2", "6–10", "90 s", "8"], ["Romanian Deadlift", "3", "5–8", "2 min", "8"], ["Lying Leg Curl", "2", "6–10", "90 s", "8"], ["Standing Calf Raise", "3", "6–10", "60 s", "8"]]),
        lift(3, "Back and shoulders", [[ROW, "6", "3", "90 s", "7", "Fast, explosive reps with about 65% of your 3–5 rep weight"], ["Seated Cable Row", "3", "8–12", "90 s", "8"], ["Lat Pulldown", "3", "8–12", "90 s", "8"], ["Dumbbell Lateral Raise", "3", "12–20", "60 s", "9"], ["Dumbbell Shrug", "2", "12–15", "60 s", "8"], ["Face Pull", "3", "12–20", "60 s", "8"]]),
        lift(4, "Lower hypertrophy", [[SQUAT, "6", "3", "90 s", "7", "Fast, explosive reps with about 65% of your 3–5 rep weight"], ["Leg Press", "3", "8–12", "90 s", "8"], ["Leg Extension", "3", "12–20", "60 s", "9"], ["Lying Leg Curl", "3", "12–20", "60 s", "9"], ["Seated Calf Raise", "4", "8–12", "60 s", "8"]]),
        lift(5, "Chest and arms", [[BENCH, "6", "3", "90 s", "7", "Fast, explosive reps with about 65% of your 3–5 rep weight"], ["Incline Dumbbell Press", "3", "8–12", "90 s", "8"], ["Cable Fly", "2", "12–20", "60 s", "9"], ["Preacher Curl", "3", "8–12", "60 s", "8"], ["Hammer Curl", "2", "12–20", "60 s", "9"], ["Overhead Tricep Extension", "3", "8–12", "60 s", "8"], ["Rope Triceps Pushdown", "2", "12–20", "60 s", "9"]])
      ] },

    { id: "rr", cat: "No gym", name: "Bodyweight Recommended Routine", level: "All levels", days: 3, weeks: 12, based: "r/bodyweightfitness Recommended Routine",
      about: "Paired supersets using only a bar and something to row from. Use an easier version of any move until you can hit the reps with good form.",
      week: [0, 2, 4].map(d => day(d, "Full body", "other", [
        ["Pull-ups", "3", "5–8", "90 s"], ["Bodyweight Squat", "3", "5–8", "90 s", "", "Progress toward single-leg squats", true],
        ["Weighted Dips", "3", "5–8", "90 s", "", "Use plain dips or an easier version"], ["Single-Leg Romanian Deadlift", "3", "5–8", "90 s", "", "", true],
        ["Inverted Row", "3", "5–8", "90 s"], ["Push-ups", "3", "5–8", "90 s", "", "", true],
        ["Hanging Leg Raise", "3", "8–12", "60 s"], ["Side Plank", "3", "30 s / side", "60 s", "", "", true]
      ])) },
    { id: "ss-kb", cat: "No gym", name: "Kettlebell Swings + Get-Ups", level: "All levels", days: 5, weeks: 12, based: "Simple & Sinister, Pavel Tsatsouline",
      about: "One bell, about 20 minutes. Move up a bell once the full session feels easy within the time limits.",
      week: [0, 1, 3, 4, 5].map(d => day(d, "Swings and get-ups", "other", [
        ["Kettlebell Swing", "10", "10", "", "", "One-arm, switching hands each set. All 100 swings within 5 minutes"],
        ["Turkish Get-Up", "10", "1", "", "", "Rest 1 minute after swings. One rep each minute, alternating sides"]
      ])) },

    { id: "c25k", cat: "Running", name: "Couch to 5K", level: "Beginner", days: 3, based: "NHS Couch to 5K",
      about: "Nine weeks from no running to 30 minutes non-stop. Do one week at a time, and repeat any week if you need to.",
      phases: [
        c25k("Week 1", [intervals("8", "1 min", "90 s")]),
        c25k("Week 2", [intervals("6", "90 s", "2 min")]),
        c25k("Week 3", [piece("90 s", "90 s"), piece("3 min", "3 min"), piece("90 s", "90 s"), piece("3 min")]),
        c25k("Week 4", [piece("3 min", "90 s"), piece("5 min", "2.5 min"), piece("3 min", "90 s"), piece("5 min")]),
        c25k("Week 5", [intervals("3", "5 min", "3 min")], [intervals("2", "8 min", "5 min")], [steady(20)]),
        c25k("Week 6", [piece("5 min", "3 min"), piece("8 min", "3 min"), piece("5 min")], [intervals("2", "10 min", "3 min")], [steady(25)]),
        c25k("Week 7", [steady(25)]),
        c25k("Week 8", [steady(28)]),
        c25k("Week 9", [steady(30)])
      ] },
    { id: "run80", cat: "Running", name: "80/20 Runner Week", level: "Intermediate", days: 4, weeks: 8, based: "Polarized training (80/20)",
      about: "Most of your running stays easy, so the one hard day can be properly hard.",
      week: [
        day(1, "Easy", "cardio", [["Easy Run", "1", "40 min", "", "", "Conversational pace"]]),
        day(2, "Intervals", "cardio", [["Easy Run", "1", "10 min", "", "", "Warm-up"], ["Interval Run", "6", "3 min", "2 min", "9", "Hard but repeatable. Jog the rest"], ["Easy Run", "1", "5 min", "", "", "Cool-down"]]),
        day(4, "Easy", "cardio", [["Easy Run", "1", "40 min", "", "", "Conversational pace"]]),
        day(6, "Long run", "cardio", [["Long Run", "1", "75 min", "", "", "Easy. Add about 10 minutes every other week"]])
      ] },
    { id: "hm", cat: "Running", name: "First Half Marathon Base", level: "Beginner", days: 4, weeks: 12, based: "General novice half marathon structure",
      about: "Three short runs and one long run, with the long run growing each week. Build toward about 10 miles before race day.",
      week: [
        day(1, "Easy", "cardio", [["Easy Run", "1", "3 miles", "", "", "Conversational pace"]]),
        day(2, "Easy", "cardio", [["Easy Run", "1", "3 miles", "", "", "Conversational pace"]]),
        day(3, "Easy", "cardio", [["Easy Run", "1", "3 miles", "", "", "Conversational pace"]]),
        day(5, "Long run", "cardio", [["Long Run", "1", "4 miles", "", "", "Add about half a mile a week"]])
      ] },

    { id: "n4x4", cat: "Cardio", name: "Norwegian 4×4", level: "Intermediate", days: 3, weeks: 8, based: "NTNU 4×4 interval research",
      about: "Two hard interval days and one longer moderate day. Works on any machine, on a bike, or running.",
      week: [
        day(1, "4×4 intervals", "hiit", [["Easy Ride", "1", "10 min", "", "", "Warm-up on any machine"], ["Interval Work", "4", "4 min", "3 min", "9", "85–95% of max heart rate. Keep moving easily during the rest"], ["Easy Ride", "1", "5 min", "", "", "Cool-down"]]),
        day(3, "4×4 intervals", "hiit", [["Easy Ride", "1", "10 min", "", "", "Warm-up on any machine"], ["Interval Work", "4", "4 min", "3 min", "9", "85–95% of max heart rate. Keep moving easily during the rest"], ["Easy Ride", "1", "5 min", "", "", "Cool-down"]]),
        day(5, "Long moderate", "cardio", [["Easy Ride", "1", "45 min", "", "", "Steady, moderate effort on any machine"]])
      ] },
    { id: "row2k", cat: "Cardio", name: "2K Row Builder", level: "Beginner", days: 3, weeks: 4, based: "Concept2 2000m training plans",
      about: "A steady row, some intervals and an easy timed piece. Row your 2K test at the end of the block.",
      week: [
        day(0, "Easy 2K", "cardio", [["2K Row", "1", "2000 m", "", "", "Easy pace. Note your time"]]),
        day(2, "Intervals", "cardio", [["Steady Row", "1", "5 min", "", "", "Warm-up"], ["Row Intervals", "4", "4 min", "3 min", "8", "Hold the same split every rep"], ["Steady Row", "1", "5 min", "", "", "Cool-down"]]),
        day(4, "Steady", "cardio", [["Steady Row", "1", "30 min", "", "", "18–20 strokes a minute. You can hold a conversation"]])
      ] },
    { id: "sst", cat: "Cardio", name: "Sweet Spot Cycling Base", level: "Intermediate", days: 4, weeks: 6, based: "Sweet spot training (88–94% FTP)",
      about: "Two focused sessions just under threshold, plus easy riding. Use a power meter or a smart trainer if you have one.",
      week: [
        day(1, "3 × 15", "cardio", [["Easy Ride", "1", "15 min", "", "", "Warm-up"], ["Sweet Spot Intervals", "3", "15 min", "5 min", "8", "Step up: 88%, 90%, then 92% of FTP"], ["Easy Ride", "1", "10 min", "", "", "Cool-down"]]),
        day(2, "Recovery", "cardio", [["Easy Ride", "1", "30 min", "", "", "Very easy spin"]]),
        day(3, "2 × 20", "cardio", [["Easy Ride", "1", "15 min", "", "", "Warm-up"], ["Sweet Spot Intervals", "2", "20 min", "5 min", "8", "90% of FTP. Stay under 94%"], ["Easy Ride", "1", "10 min", "", "", "Cool-down"]]),
        day(5, "Long endurance", "cardio", [["Easy Ride", "1", "2 hours", "", "", "Steady and comfortable"]])
      ] },
    { id: "swim", cat: "Cardio", name: "Beginner Swim Fitness", level: "Beginner", days: 3, weeks: 4, based: "Common beginner swim sets",
      about: "About 900 yards a session, with technique ahead of speed. Add a repeat or two each week as it gets easier.",
      week: [0, 2, 4].map(d => day(d, "Swim", "cardio", [
        ["Easy Swim", "1", "200 yd", "", "", "Warm-up"],
        ["Swim Intervals", "8", "75 yd", "20 s", "7", "Long, smooth strokes"],
        ["Easy Swim", "1", "100 yd", "", "", "Cool-down"]
      ])) },

    { id: "hybrid", cat: "Hybrid", name: "Strength + Running", level: "Intermediate", days: 6, weeks: 8, based: "Concurrent training guidance",
      about: "Strength days are spaced out and sit before easy runs, so your legs are fresh for the sessions that matter.",
      week: [
        lift(0, "Full body A", [[SQUAT, "3", "5", "3 min", "8"], [BENCH, "3", "5", "3 min", "8"], ["Single-Arm Dumbbell Row", "3", "10", "90 s", "8"], ["Hanging Leg Raise", "3", "10", "60 s", "8"]]),
        day(1, "Easy run", "cardio", [["Easy Run", "1", "30 min", "", "", "Conversational pace"]]),
        day(2, "Intervals", "cardio", [["Easy Run", "1", "10 min", "", "", "Warm-up"], ["Interval Run", "6", "3 min", "2 min", "9", "Hard but repeatable"], ["Easy Run", "1", "5 min", "", "", "Cool-down"]]),
        lift(3, "Full body B", [[DEAD, "3", "5", "3 min", "8"], [PRESS, "3", "5", "3 min", "8"], ["Pull-ups", "3", "6–8", "2 min", "8"], ["Farmer's Carry", "3", "40 m", "60 s", "8"]]),
        day(4, "Easy run", "cardio", [["Easy Run", "1", "30 min", "", "", "Conversational pace"]]),
        day(5, "Long run", "cardio", [["Long Run", "1", "60 min", "", "", "Easy all the way"]])
      ] }
  ];
})();

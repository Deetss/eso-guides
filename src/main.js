import './style.css';

// ==========================================
// DATA DICTIONARIES
// ==========================================

const ROUTINE_DATA = {
  dailies: [
    { id: 'mount', title: 'Mount Upgrade', badge: 'Stablemaster', desc: 'Upgrade mount Speed (+1%) at any stablemaster. Time-gated, critical for movement.' },
    { id: 'writs', title: 'Daily Crafting Writs', badge: 'Crafting Boards', desc: 'Craft certification boards in Vivec City or Leyawiin. Restocks materials and returns ~5k gold.' },
    { id: 'dungeon', title: 'Random Normal Dungeon', badge: 'Activity Finder', desc: 'Provides massive XP bonus, mail reward, and 10 Transmute Stones.' },
    { id: 'bg', title: 'Random Battleground', badge: 'Activity Finder', desc: 'Huge XP chunk, levels up Assault line for Resolving Vigor execute.' },
    { id: 'endeavors', title: 'Daily Endeavors', badge: 'L Key Menu', desc: 'Complete 3 simple tasks to earn Seals of Endeavor for free cash-shop items.' },
  ],
  weeklies: [
    { id: 'pledges', title: 'Undaunted Daily Pledges', badge: 'Capital Capitals', desc: 'Level 45+ pledge runs. Bank Undaunted Keys for monster shoulders at CP 160.' },
    { id: 'weekly_endeavor', title: 'Weekly Endeavor', badge: 'L Key Menu', desc: 'Higher-difficulty task yielding a massive stack of Seals of Endeavor.' },
  ]
};

// ==========================================
// DYNAMIC ICON SYSTEM
// Maps display skill line names → UESP icon filename prefix.
// Extend this map when adding new classes.
// ==========================================

const SKILL_LINE_UESP_PREFIX = {
  // Nightblade
  'Assassination':        'Assassination',
  'Shadow':               'Shadow',
  'Siphoning':            'Siphoning',
  // Weapon
  'Dual Wield':           'Dual_Wield',
  'Bow':                  'Bow',
  'Two Handed':           'Two_Handed',
  'One Hand and Shield':  'One_Hand_and_Shield',
  'Destruction Staff':    'Destruction_Staff',
  'Restoration Staff':    'Restoration_Staff',
  // PvP / Guild
  'Alliance War':         'Assault',
  'Fighters Guild':       'Fighters_Guild',
  'Mages Guild':          'Mages_Guild',
  'Undaunted':            'Undaunted',
  'Psijic Order':         'Psijic_Order',
  // Armor
  'Heavy Armor':          'Heavy_Armor',
  'Medium Armor':         'Medium_Armor',
  'Light Armor':          'Light_Armor',
  // Dragonknight
  'Ardent Flame':         'Ardent_Flame',
  'Draconic Power':       'Draconic_Power',
  'Earthen Heart':        'Earthen_Heart',
  // Sorcerer
  'Dark Magic':           'Dark_Magic',
  'Daedric Summoning':    'Daedric_Summoning',
  'Storm Calling':        'Storm_Calling',
  // Templar
  'Aedric Spear':         'Aedric_Spear',
  "Dawn's Wrath":         'Dawn%27s_Wrath',
  'Restoring Light':      'Restoring_Light',
  // Warden
  'Animal Companions':    'Animal_Companions',
  'Green Balance':        'Green_Balance',
  "Winter's Embrace":     'Winter%27s_Embrace',
  // Necromancer
  'Grave Lord':           'Grave_Lord',
  'Bone Tyrant':          'Bone_Tyrant',
  'Living Death':         'Living_Death',
  // Arcanist
  'Herald of the Tome':       'Herald_of_the_Tome',
  'Soldier of Apocrypha':     'Soldier_of_Apocrypha',
  'Curative Runeforms':       'Curative_Runeforms',
};

/**
 * Builds the UESP Special:FilePath icon URL for any ESO skill.
 * @param {string} line  - The display skill line name (e.g. "Assassination")
 * @param {string} name  - The exact morph/skill name (e.g. "Surprise Attack")
 * @returns {string} Full UESP icon URL
 */
function buildSkillIconUrl(line, name) {
  const prefix = SKILL_LINE_UESP_PREFIX[line] || line.replace(/\s+/g, '_');
  const safeName = name.replace(/\s+/g, '_').replace(/'/g, '%27');
  return `https://en.uesp.net/wiki/Special:FilePath/ON-icon-skill-${prefix}-${safeName}.png`;
}

// ==========================================
// BUILD DATA
// ==========================================

const BUILD_DATA = {
  nightblade: {
    skills: {
      frontBar: {
        title: "Front Bar — Dual Wield (Daggers)",
        description: "Main damage bar. Execute attacks and high-APM spammables are slotted here.",
        skills: [
          {
            num: "1", name: "Surprise Attack", line: "Assassination",
            morphFrom: "Veiled Strike", morphAlt: "Concealed Weapon",
            morphReason: "Surprise Attack converts to Physical damage and guarantees a Critical Strike when flanking. Concealed Weapon stays Magic damage and grants Minor Expedition — better for PvP mobility, worse for PvE DPS.",
            link: "https://eso-hub.com/en/skills/nightblade/assassination/surprise-attack",
            why: "Main spammable. Deals Physical damage, applies Sundered status, and guarantees a Critical Strike when attacking from the flank."
          },
          {
            num: "2", name: "Killer's Blade", line: "Assassination",
            morphFrom: "Assassin's Blade", morphAlt: "Impale",
            morphReason: "Killer's Blade heals you on each kill — essential self-sustain in prolonged fights. Impale is ranged but offers no healing.",
            link: "https://eso-hub.com/en/skills/nightblade/assassination/killers-blade",
            why: "Execute spammable. Deals 300% more damage to targets below 25% Health, and heals you on a successful kill."
          },
          {
            num: "3", name: "Rapid Strikes", line: "Dual Wield",
            morphFrom: "Flurry", morphAlt: "Bloodthirsty Strike",
            morphReason: "Rapid Strikes delivers 5 hits per cast — each one procs weapon enchants and light attack weave windows. Bloodthirsty Strike is a single enhanced hit with execute scaling.",
            link: "https://eso-hub.com/en/skills/weapon/dual-wield/rapid-strikes",
            why: "Multi-hit channel spammable. 5 rapid strikes per cast, each proccing weapon enchantment and building momentum."
          },
          {
            num: "4", name: "Relentless Focus", line: "Assassination",
            morphFrom: "Grim Focus", morphAlt: "Merciless Resolve",
            morphReason: "Relentless Focus grants a permanent passive Weapon Damage buff while slotted. Merciless Resolve fires a stronger spectral bow proc but loses that passive — overall lower sustained DPS.",
            link: "https://eso-hub.com/en/skills/nightblade/assassination/relentless-focus",
            why: "Passive Weapon Damage buff while slotted. Converts into a spectral bow burst after 5 light attacks are registered."
          },
          {
            num: "5", name: "Leeching Strikes", line: "Siphoning",
            morphFrom: "Siphoning Strikes", morphAlt: "Siphoning Attacks",
            morphReason: "Leeching Strikes restores both Stamina and Magicka on every auto attack — best all-around sustain morph. Siphoning Attacks grants Major Brutality but lacks the resource return.",
            link: "https://eso-hub.com/en/skills/nightblade/siphoning/leeching-strikes",
            why: "Sustain toggle. Restores Stamina and Magicka on every light/heavy auto attack. Keep this active on both bars."
          },
          {
            num: "Ult", name: "Incapacitating Strike", line: "Assassination",
            morphFrom: "Death Stroke", morphAlt: "Soul Harvest",
            morphReason: "Incapacitating Strike stuns and amplifies all your damage to target by 20% for 6s at a low Ultimate cost. Soul Harvest passively generates Ultimate on kills but has higher base cost and no damage amp.",
            link: "https://eso-hub.com/en/skills/nightblade/assassination/incapacitating-strike",
            why: "Low-cost Ultimate. Stuns target and increases all your damage dealt to them by 20% for 6 seconds."
          }
        ]
      },
      backBar: {
        title: "Back Bar — Bow Setup",
        description: "Buffs, DoTs, and mobility setup. Deploy all back bar skills before swapping to your front bar.",
        skills: [
          {
            num: "1", name: "Endless Hail", line: "Bow",
            morphFrom: "Volley", morphAlt: "Arrow Barrage",
            morphReason: "Endless Hail sustains the arrow rain DoT, keeping your back-bar weapon glyph active at all times. Arrow Barrage has a longer duration and extra ticks — preferred for PvP.",
            link: "https://eso-hub.com/en/skills/weapon/bow/endless-hail",
            why: "Sustained arrow rain AoE DoT. Keeps your back-bar weapon enchantment active throughout the rotation."
          },
          {
            num: "2", name: "Poison Injection", line: "Bow",
            morphFrom: "Poison Arrow", morphAlt: "Venom Arrow",
            morphReason: "Poison Injection deals up to 100% bonus damage on targets below 50% HP — passive execute scaling. Venom Arrow applies Major Defile (healing reduction), better for PvP.",
            link: "https://eso-hub.com/en/skills/weapon/bow/poison-injection",
            why: "Single-target Poison DoT with built-in execute scaling — deals up to 100% bonus damage below 50% target HP."
          },
          {
            num: "3", name: "Twisting Path", line: "Shadow",
            morphFrom: "Path of Darkness", morphAlt: "Refreshing Path",
            morphReason: "Twisting Path grants Major Expedition (+30% speed) while inside the AoE — critical for repositioning and kiting. Refreshing Path heals allies inside, better for group/support roles.",
            link: "https://eso-hub.com/en/skills/nightblade/shadow/twisting-path",
            why: "Shadow AoE path. Deals Magic Damage and grants Major Expedition (+30% move speed) to you and allies inside."
          },
          {
            num: "4", name: "Dark Shade", line: "Shadow",
            morphFrom: "Summon Shade", morphAlt: "Shadow Image",
            morphReason: "Dark Shade passively deals extra magic damage and applies Minor Maim. Shadow Image creates a portal anchor for repositioning — better for PvP mobility/escaping.",
            link: "https://eso-hub.com/en/skills/nightblade/shadow/dark-shade",
            why: "Summons a shade that deals Magic Damage and applies Minor Maim (reduces target damage dealt by 5%)."
          },
          {
            num: "5", name: "Resolving Vigor", line: "Alliance War",
            morphFrom: "Vigor", morphAlt: "Echoing Vigor",
            morphReason: "Resolving Vigor delivers a burst heal at the end of the HoT — stronger single-target self-sustain. Echoing Vigor extends the heal to nearby allies, better for group play.",
            link: "https://eso-hub.com/en/skills/alliance-war/assault-skills/resolving-vigor",
            why: "Primary self-heal. Stamina-scaling HoT with a burst heal at the end. Vital for all solo content and dungeons."
          },
          {
            num: "Ult", name: "Flawless Dawnbreaker", line: "Fighters Guild",
            morphFrom: "Dawnbreaker", morphAlt: "Dawnbreaker of Smiting",
            morphReason: "Flawless Dawnbreaker grants a passive +3% Weapon Damage bonus while slotted — this passive alone justifies the back bar slot. Dawnbreaker of Smiting adds a stun but loses the passive.",
            link: "https://eso-hub.com/en/skills/guild/fighters-guild/flawless-dawnbreaker",
            why: "Slotted primarily for its passive +3% Weapon Damage buff. The active also deals Physical damage and applies a burn DoT."
          }
        ]
      }
    },
    gearSets: {
      pve: {
        starter: [
          { name: "Order's Wrath", source: "Crafted (High Isle)", type: "Body (5 Pieces)", why: "Outstanding critical chance and increases Critical Damage and Healing by 8%. Essential starter set." },
          { name: "Hunding's Rage", source: "Crafted (6 Traits)", type: "Weapons & Jewelry", why: "Reliable raw physical stats. Gives Weapon Damage, Critical Rating, and Max Stamina." },
          { name: "Slimecraw", source: "Vet Wayrest Sewers I", type: "Monster Head (1 Piece)", why: "Highest 1-piece critical rating in the game. Easy dungeon run to guarantee at CP 160." }
        ],
        lateGame: [
          { name: "Arms of Relequen", source: "Cloudrest Trial (Somerset)", type: "Body (5 Pieces)", why: "S-Tier single target DPS. Light and Heavy attacks apply stacks of wind damage that ramp up to massive amounts." },
          { name: "Pillar of Nirn", source: "Falkreath Hold Dungeon", type: "Jewelry / Weapons", why: "A/S-Tier proc damage set. Dealing damage creates a metallic fracture on the floor, bleeding targets for massive ticks." },
          { name: "Ansuul's Torment", source: "Sanity's Edge Trial (Necrom)", type: "Body (5 Pieces)", why: "S-Tier passive set. Provides constant flat damage boost, which increases by an extra 7% whenever an enemy dies." },
          { name: "Coral Riptide", source: "Dreadsail Reef Trial", type: "Body (5 Pieces)", why: "S-Tier set for expert resource control. Increases your weapon damage scaling as your current Stamina drops." },
          { name: "Velothi Ur-Mage's Amulet", source: "Antiquities (Necrom Mythic)", type: "Necklace (1 Piece)", why: "S-Tier Mythic. Gives +15% flat damage to all monster hits, reducing reliance on strict light-attack weaving." },
          { name: "Zaan", source: "Vet Scalecaller Peak", type: "Monster Set (2 Pieces)", why: "The strongest single-target beam proc. Hooks a fire beam between you and target, ramping up ticks." }
        ]
      },
      pvp: {
        starter: [
          { name: "Shattered Fate", source: "Crafted (Apocrypha)", type: "Weapons / Body (5 Pieces)", why: "Provides an enormous 7,918 Armor Penetration. Essential for busting through tanky PvP armor blocks." },
          { name: "Wretched Vitality", source: "Crafted (Blackwood)", type: "Weapons / Body (5 Pieces)", why: "S-Tier sustain set. Grants 260 Magicka and Stamina Recovery when you apply a major and minor debuff to a target." },
          { name: "Balorgh", source: "Vet March of Sacrifices", type: "Monster Set (2 Pieces)", why: "S-Tier burst set. Grants massive Weapon Damage and Armor Penetration for 12 seconds equal to the amount of Ultimate consumed." }
        ],
        lateGame: [
          { name: "Rallying Cry", source: "Rewards for the Worthy (Cyrodiil)", type: "Weapons & Jewelry", why: "S-Tier PvP survival. Grants 300 Weapon Damage and 1,650 Critical Resistance to you and your group upon landing a critical heal." },
          { name: "Plaguebreak", source: "Rewards for the Worthy / Cyrodiil", type: "Weapons / Body", why: "Excellent for group PvP. Applies a spreading plague dot that explodes for massive damage if a target dies or tries to purge it." },
          { name: "Sea-Serpent's Coil", source: "Antiquities (High Isle Mythic)", type: "Necklace (1 Piece)", why: "Reduces incoming damage by 40% when at full health, and grants a massive 10 seconds of Major Courage and Major Berserk when hit." },
          { name: "Oakensoul Ring", source: "Antiquities (High Isle Mythic)", type: "Ring (1 Piece)", why: "Top-tier one-bar build mythic. Grants 14 permanent positive buffs (Major Protection, Resolve, Courage, etc.) at the cost of blocking your back bar." }
        ]
      }
    },
    equipment: {
      pve: {
        head: { name: "Slimecraw (Helm)", set: "Slimecraw", weight: "Light Armor", trait: "Divines", glyph: "Max Stamina", desc: "Best-in-slot critical chance 1-piece helm.", quality: "legendary", armor: "2,120", icon: "ON-icon-armor-Head-Slimecraw.png" },
        shoulder: { name: "Arms of Relequen (Epaulets)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Allows maintaining Trial set 5-piece bonus on body.", quality: "legendary", armor: "1,980", icon: "ON-icon-armor-Arm_Cops-Welkynar.png" },
        chest: { name: "Arms of Relequen (Jack)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "2,580", icon: "ON-icon-armor-Jack-Welkynar.png" },
        hands: { name: "Arms of Relequen (Bracers)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "1,220", icon: "ON-icon-armor-Bracers-Welkynar.png" },
        waist: { name: "Arms of Relequen (Belt)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "1,110", icon: "ON-icon-armor-Belt-Welkynar.png" },
        legs: { name: "Arms of Relequen (Guards)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "2,330", icon: "ON-icon-armor-Guards-Welkynar.png" },
        feet: { name: "Pillar of Nirn (Boots)", set: "Pillar of Nirn", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Allows maintaining dungeon bleed set 5-piece bonus on weapons/jewelry.", quality: "legendary", armor: "1,880", icon: "ON-icon-armor-Boots-Dreadhorn.png" },
        neck: { name: "Velothi Ur-Mage's Amulet", set: "Velothi Ur-Mage's Amulet", weight: "Mythic Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Boosts monster hit damage by 15%, grants Minor Force.", quality: "mythic", icon: "ON-icon-armor-Velothi_Ur-Mage%27s_Amulet.png" },
        ring1: { name: "Pillar of Nirn (Ring)", set: "Pillar of Nirn", weight: "Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Part of the bleed-proc jewelry.", quality: "legendary", icon: "ON-icon-minor_adornment-Ring.png" },
        ring2: { name: "Pillar of Nirn (Ring)", set: "Pillar of Nirn", weight: "Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Part of the bleed-proc jewelry.", quality: "legendary", icon: "ON-icon-minor_adornment-Ring.png" },
        mainHand: { name: "Pillar of Nirn Dagger", set: "Pillar of Nirn", weight: "One-Handed", trait: "Precise", glyph: "Poison Damage", desc: "Standard PvE dagger spammable main hand.", quality: "legendary", damage: "1,337", icon: "ON-icon-weapon-Dagger-Dreadhorn.png" },
        offHand: { name: "Pillar of Nirn Dagger", set: "Pillar of Nirn", weight: "One-Handed", trait: "Charged", glyph: "Flame Damage", desc: "Standard PvE dagger off hand to apply status effects.", quality: "legendary", damage: "1,337", icon: "ON-icon-weapon-Dagger-Dreadhorn.png" },
        backBar: { name: "Maelstrom Bow", set: "Pillar of Nirn", weight: "Two-Handed", trait: "Infused", glyph: "Weapon Damage", desc: "Maintains Weapon Damage glyph when firing Endless Hail.", quality: "legendary", damage: "1,550", icon: "ON-icon-weapon-Bow-Maelstrom.png" }
      },
      pvp: {
        head: { name: "Balorgh (Helm)", set: "Balorgh", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Ramps up spell/weapon damage and penetration based on ultimate consumed.", quality: "epic", armor: "2,210", icon: "ON-icon-armor-Head-Balorgh.png" },
        shoulder: { name: "Balorgh (Shoulders)", set: "Balorgh", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Paired with helm for 2-piece burst.", quality: "epic", armor: "2,050", icon: "ON-icon-armor-Shoulders-Balorgh.png" },
        chest: { name: "Shattered Fate (Cuirass)", set: "Shattered Fate", weight: "Heavy Armor", trait: "Reinforced", glyph: "Max Stamina", desc: "Heavy chest piece for extra armor rating.", quality: "epic", armor: "2,780", icon: "ON-icon-armor-Cuirass-Welkynar.png" },
        hands: { name: "Shattered Fate (Gauntlets)", set: "Shattered Fate", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Part of the flat penetration set.", quality: "epic", armor: "1,290", icon: "ON-icon-armor-Bracers-Welkynar.png" },
        waist: { name: "Shattered Fate (Sash)", set: "Shattered Fate", weight: "Light Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Light piece to gain armor pen passive.", quality: "epic", armor: "1,170", icon: "ON-icon-armor-Sash-Welkynar.png" },
        legs: { name: "Shattered Fate (Greaves)", set: "Shattered Fate", weight: "Heavy Armor", trait: "Reinforced", glyph: "Max Stamina", desc: "Heavy legs for survival.", quality: "epic", armor: "2,460", icon: "ON-icon-armor-Greaves-Welkynar.png" },
        feet: { name: "Shattered Fate (Sabaton)", set: "Shattered Fate", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Part of the flat penetration set.", quality: "epic", armor: "1,950", icon: "ON-icon-armor-Boots-Welkynar.png" },
        neck: { name: "Sea-Serpent's Coil", set: "Sea-Serpent's Coil", weight: "Mythic Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Gives Major Berserk and Courage when taking damage.", quality: "mythic", icon: "ON-icon-armor-Sea-Serpent%27s_Coil.png" },
        ring1: { name: "Rallying Cry (Ring)", set: "Rallying Cry", weight: "Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Sustain & Crit Resistance jewelry.", quality: "epic", icon: "ON-icon-minor_adornment-Ring.png" },
        ring2: { name: "Rallying Cry (Ring)", set: "Rallying Cry", weight: "Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Sustain & Crit Resistance jewelry.", quality: "epic", icon: "ON-icon-minor_adornment-Ring.png" },
        mainHand: { name: "Rallying Cry Greatsword", set: "Rallying Cry", weight: "Two-Handed", trait: "Nirnhoned", glyph: "Disease Damage", desc: "High weapon damage 2H sword for burst combos.", quality: "epic", damage: "1,620", icon: "ON-icon-weapon-Greatsword-Welkynar.png" },
        offHand: { name: "None (2H Greatsword)", set: "None", weight: "None", trait: "None", glyph: "None", desc: "Two-handed weapon slots block off hand.", quality: "legendary", icon: "" },
        backBar: { name: "Wretched Vitality Bow", set: "Wretched Vitality", weight: "Two-Handed", trait: "Defending", glyph: "Escapist Poison", desc: "Buff/heal bar with massive sustain return on debuffs.", quality: "epic", damage: "1,520", icon: "ON-icon-weapon-Bow-Welkynar.png" }
      }
    },
    stats: {
      pve: {
        stamina: "32,400",
        health: "21,200",
        magicka: "13,800",
        weaponDamage: "6,480",
        criticalChance: "56.2%",
        penetration: "5,820",
        critResist: "0"
      },
      pvp: {
        stamina: "30,800",
        health: "24,500",
        magicka: "14,200",
        weaponDamage: "5,950",
        criticalChance: "38.4%",
        penetration: "14,840",
        critResist: "1,650"
      }
    },
    cp: {
      warfare: {
        name: "Warfare",
        icon: "⚡",
        color: "cp-warfare",
        nodes: [
          { name: "Fighting Finesse", points: "50", desc: "Increases your Critical Damage and Critical Healing by 8% (Slot)." },
          { name: "Precise Strikes", points: "40", desc: "Increases Critical Chance and Critical Rating passively." },
          { name: "Backstabber", points: "50", desc: "Increases Critical Damage by 10% when attacking from behind (Slot)." },
          { name: "Thaumaturge", points: "50", desc: "Increases your Damage over Time (DoT) output by 6% (Slot)." }
        ]
      },
      fitness: {
        name: "Fitness",
        icon: "🛡️",
        color: "cp-fitness",
        nodes: [
          { name: "Boundless Vitality", points: "50", desc: "Grants 1400 Max Health (Slot)." },
          { name: "Rejuvenation", points: "50", desc: "Grants 150 Health, Magicka, and Stamina Recovery (Slot)." },
          { name: "Fortified", points: "30", desc: "Grants 1730 Armor rating passively." },
          { name: "Bloody Renewal", points: "50", desc: "Restores Stamina whenever you land a killing blow on an enemy (Slot)." }
        ]
      },
      craft: {
        name: "Craft",
        icon: "🌱",
        color: "cp-craft",
        nodes: [
          { name: "Steed's Blessing", points: "50", desc: "Increases your out-of-combat movement speed by 20% (Slot)." },
          { name: "Gilded Fingers", points: "50", desc: "Increases gold acquired from loot drops by 10% passively." },
          { name: "Liquid Efficiency", points: "50", desc: "Gives a 10% chance to not consume a potion or poison on use (Slot)." },
          { name: "Rationer", points: "30", desc: "Adds 30 minutes to the duration of any eaten food or drink (Slot)." }
        ]
      }
    }
  },
  arcanist: {
    skills: {
      frontBar: {
        title: "Front Bar — Dual Wield (Daggers)",
        description: "Generate Crux and stack buffs. Deploy Cephaliarch's Flail and Fatecarver in a tight combo.",
        skills: [
          {
            num: "1", name: "Cephaliarch's Flail", line: "Herald of the Tome",
            morphFrom: "Abyssal Impact", morphAlt: "Tentacular Dread",
            morphReason: "Cephaliarch's Flail generates Crux, heals you, and applies the Abyssal Ink debuff (+5% damage taken). Tentacular Dread consumes Crux instead of generating it, which breaks your beam rotation.",
            link: "https://eso-hub.com/en/skills/arcanist/herald-of-the-tome/cephaliarchs-flail",
            why: "Core Crux generator. Lashes out with tentacles, healing you and placing a 5% damage amplification debuff on all targets."
          },
          {
            num: "2", name: "Pragmatic Fatecarver", line: "Herald of the Tome",
            morphFrom: "Fatecarver", morphAlt: "Exhausting Fatecarver",
            morphReason: "Pragmatic Fatecarver grants you a massive damage shield while channeling, preventing knockbacks and interrupts. Exhausting Fatecarver adds slightly longer duration but leaves you highly vulnerable.",
            link: "https://eso-hub.com/en/skills/arcanist/herald-of-the-tome/pragmatic-fatecarver",
            why: "Main channel DPS. Consumes active Crux to blast enemies with a beam of pure energy, gaining a CC-immune shield during execution."
          },
          {
            num: "3", name: "Inspired Scholarship", line: "Herald of the Tome",
            morphFrom: "Tome-Bearer's Inspiration", morphAlt: "Recuperative Treatise",
            morphReason: "Inspired Scholarship triggers passive class damage pulses every 3 seconds instead of 5. Recuperative Treatise restores resources instead but yields less raw DPS.",
            link: "https://eso-hub.com/en/skills/arcanist/herald-of-the-tome/inspired-scholarship",
            why: "Passively fires magic pulses and generates Crux automatically during combat while active."
          },
          {
            num: "4", name: "Camouflaged Hunter", line: "Fighters Guild",
            morphFrom: "Expert Hunter", morphAlt: "Evil Hunter",
            morphReason: "Camouflaged Hunter grants passive Major Savagery (+Crit rating) and Minor Berserk when attacking from flanking angles. Slotted primarily for passives.",
            link: "https://eso-hub.com/en/skills/guild/fighters-guild/camouflaged-hunter",
            why: "Passive slot. Grants Major Savagery/Prophecy and increases Critical Damage output by 5% when flanking."
          },
          {
            num: "5", name: "Barbed Trap", line: "Fighters Guild",
            morphFrom: "Beast Trap", morphAlt: "Lightweight Beast Trap",
            morphReason: "Barbed Trap deals physical bleed damage and triggers Minor Force (+10% Critical Damage). Lightweight morph allows throwing it but has shorter duration.",
            link: "https://eso-hub.com/en/skills/guild/fighters-guild/barbed-trap",
            why: "Deals physical damage over time and provides the essential Minor Force critical damage multiplier."
          },
          {
            num: "Ult", name: "The Languid Eye", line: "Herald of the Tome",
            morphFrom: "The Unblinking Eye", morphAlt: "The Tide King's Gaze",
            morphReason: "The Languid Eye deals Magic damage that increases by 7% every 0.5s. The Tide King's Gaze follows targets automatically but has lower maximum damage potential.",
            link: "https://eso-hub.com/en/skills/arcanist/herald-of-the-tome/the-languid-eye",
            why: "Summons a beam of energy that snares targets and ramps up in damage the longer it stays active."
          }
        ]
      },
      backBar: {
        title: "Back Bar — Bow Setup",
        description: "Deploy arrow rain, pull/cluster enemies, and activate armor buffs.",
        skills: [
          {
            num: "1", name: "Endless Hail", line: "Bow",
            morphFrom: "Volley", morphAlt: "Arrow Barrage",
            morphReason: "Endless Hail sustains the arrow rain DoT, keeping your back-bar weapon glyph active. Arrow Barrage has shorter duration.",
            link: "https://eso-hub.com/en/skills/weapon/bow/endless-hail",
            why: "Sustained arrow rain AoE DoT. Maintains back-bar weapon enchantment active throughout your rotation."
          },
          {
            num: "2", name: "Rune of Displacement", line: "Herald of the Tome",
            morphFrom: "Runebreak", morphAlt: "Fulminating Rune",
            morphReason: "Rune of Displacement pulls all nearby targets together, which is crucial for maximizing your Fatecarver beam hits. Fulminating Rune deals more damage but lacks control.",
            link: "https://eso-hub.com/en/skills/arcanist/herald-of-the-tome/rune-of-displacement",
            why: "AoE grouping skill. Pulses to pull all surrounding targets into a single point, setting up massive Fatecarver parses."
          },
          {
            num: "3", name: "Cruxweaver Armor", line: "Soldier of Apocrypha",
            morphFrom: "Fatewoven Armor", morphAlt: "Unbreakable Fate",
            morphReason: "Cruxweaver Armor increases armor values (Major Resolve) and automatically generates Crux when hit. Unbreakable Fate consumes Crux to boost blocking.",
            link: "https://eso-hub.com/en/skills/arcanist/soldier-of-apocrypha/cruxweaver-armor",
            why: "Defense & utility. Buffs armor and automatically constructs Crux resources when you take damage."
          },
          {
            num: "4", name: "Rune of the Colorless Pool", line: "Soldier of Apocrypha",
            morphFrom: "Rune of Eldritch Horror", morphAlt: "Rune of Uncanny Adoration",
            morphReason: "Rune of the Colorless Pool applies Minor Brittle (+Crit damage taken) and Minor Vulnerability. Rune of Uncanny Adoration charms targets but has no debuffs.",
            link: "https://eso-hub.com/en/skills/arcanist/soldier-of-apocrypha/rune-of-the-colorless-pool",
            why: "S-Tier debuff. Stuns enemies and inflicts Minor Brittle and Minor Vulnerability to amplify critical and raw damage taken."
          },
          {
            num: "5", name: "Resolving Vigor", line: "Alliance War",
            morphFrom: "Vigor", morphAlt: "Echoing Vigor",
            morphReason: "Resolving Vigor delivers a burst heal at the end of the HoT — stronger single-target self-sustain.",
            link: "https://eso-hub.com/en/skills/alliance-war/assault-skills/resolving-vigor",
            why: "Stamina-scaling self-heal. Essential recovery skill for solo content and dungeons."
          },
          {
            num: "Ult", name: "Flawless Dawnbreaker", line: "Fighters Guild",
            morphFrom: "Dawnbreaker", morphAlt: "Dawnbreaker of Smiting",
            morphReason: "Flawless Dawnbreaker grants a passive +3% Weapon Damage bonus while slotted on the active bar.",
            link: "https://eso-hub.com/en/skills/guild/fighters-guild/flawless-dawnbreaker",
            why: "Slotted primarily for its passive +3% Weapon Damage buff."
          }
        ]
      }
    },
    gearSets: {
      pve: {
        starter: [
          { name: "Order's Wrath", source: "Crafted (High Isle)", type: "Body (5 Pieces)", why: "Outstanding critical chance and increases Critical Damage by 8%. Standard starter set." },
          { name: "Deadly Strike", source: "Cyrodiil (PvP Vendor)", type: "Weapons & Jewelry", why: "Crucial class multiplier. Increases all channel (Fatecarver) and DoT damage by 15%." },
          { name: "Slimecraw", source: "Vet Wayrest Sewers I", type: "Monster Head (1 Piece)", why: "Highest 1-piece critical rating in the game." }
        ],
        lateGame: [
          { name: "Arms of Relequen", source: "Cloudrest Trial (Somerset)", type: "Body (5 Pieces)", why: "Wind stacks deal physical damage. Ideal for trials." },
          { name: "Deadly Strike", source: "Cyrodiil (PvP Vendor)", type: "Jewelry / Weapons", why: "Flat +15% damage bonus to channels (Fatecarver) and DoT ticks. Essential endgame set." },
          { name: "Velothi Ur-Mage's Amulet", source: "Antiquities (Necrom Mythic)", type: "Necklace (1 Piece)", why: "S-Tier Arcanist Mythic. Adds +15% flat damage to all monster hits and grants Minor Force." },
          { name: "Slimecraw", source: "Vet Wayrest Sewers I", type: "Monster Set (1 Piece)", why: "Provides Critical rating to pair with Velothi." }
        ]
      },
      pvp: {
        starter: [
          { name: "Shattered Fate", source: "Crafted (Apocrypha)", type: "Weapons / Body (5 Pieces)", why: "Enormous 7,918 Armor Penetration." },
          { name: "Wretched Vitality", source: "Crafted (Blackwood)", type: "Weapons / Body (5 Pieces)", why: "S-Tier sustain set." },
          { name: "Balorgh", source: "Vet March of Sacrifices", type: "Monster Set (2 Pieces)", why: "Burst damage multiplier." }
        ],
        lateGame: [
          { name: "Rallying Cry", source: "Rewards for the Worthy (Cyrodiil)", type: "Weapons & Jewelry", why: "PvP survival. Crit heals grant weapon damage and crit resistance." },
          { name: "Plaguebreak", source: "Rewards for the Worthy / Cyrodiil", type: "Weapons / Body", why: "Explosive group plague dot." },
          { name: "Oakensoul Ring", source: "Antiquities (High Isle Mythic)", type: "Ring (1 Piece)", why: "One-bar Arcanist mythic. Grants 14 buffs." }
        ]
      }
    },
    equipment: {
      pve: {
        head: { name: "Slimecraw (Helm)", set: "Slimecraw", weight: "Light Armor", trait: "Divines", glyph: "Max Stamina", desc: "Best-in-slot critical chance 1-piece helm.", quality: "legendary", armor: "2,120", icon: "ON-icon-armor-Head-Slimecraw.png" },
        shoulder: { name: "Deadly Strike (Epaulets)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "1,980", icon: "ON-icon-armor-Arm_Cops-Welkynar.png" },
        chest: { name: "Deadly Strike (Jack)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "2,580", icon: "ON-icon-armor-Jack-Welkynar.png" },
        hands: { name: "Deadly Strike (Bracers)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "1,220", icon: "ON-icon-armor-Bracers-Welkynar.png" },
        waist: { name: "Deadly Strike (Belt)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "1,110", icon: "ON-icon-armor-Belt-Welkynar.png" },
        legs: { name: "Deadly Strike (Guards)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "2,330", icon: "ON-icon-armor-Guards-Welkynar.png" },
        feet: { name: "Pillar of Nirn (Boots)", set: "Pillar of Nirn", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Bleed-proc dungeon set.", quality: "legendary", armor: "1,880", icon: "ON-icon-armor-Boots-Dreadhorn.png" },
        neck: { name: "Velothi Ur-Mage's Amulet", set: "Velothi Ur-Mage's Amulet", weight: "Mythic Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Boosts monster hit damage by 15%, grants Minor Force.", quality: "mythic", icon: "ON-icon-armor-Velothi_Ur-Mage%27s_Amulet.png" },
        ring1: { name: "Pillar of Nirn (Ring)", set: "Pillar of Nirn", weight: "Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Part of the bleed-proc jewelry.", quality: "legendary", icon: "ON-icon-minor_adornment-Ring.png" },
        ring2: { name: "Pillar of Nirn (Ring)", set: "Pillar of Nirn", weight: "Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Part of the bleed-proc jewelry.", quality: "legendary", icon: "ON-icon-minor_adornment-Ring.png" },
        mainHand: { name: "Pillar of Nirn Dagger", set: "Pillar of Nirn", weight: "One-Handed", trait: "Precise", glyph: "Poison Damage", desc: "Precise dagger for crit rate.", quality: "legendary", damage: "1,337", icon: "ON-icon-weapon-Dagger-Dreadhorn.png" },
        offHand: { name: "Pillar of Nirn Dagger", set: "Pillar of Nirn", weight: "One-Handed", trait: "Charged", glyph: "Flame Damage", desc: "Charged dagger off hand.", quality: "legendary", damage: "1,337", icon: "ON-icon-weapon-Dagger-Dreadhorn.png" },
        backBar: { name: "Maelstrom Bow", set: "Pillar of Nirn", weight: "Two-Handed", trait: "Infused", glyph: "Weapon Damage", desc: "Maintains Weapon Damage glyph.", quality: "legendary", damage: "1,550", icon: "ON-icon-weapon-Bow-Maelstrom.png" }
      },
      pvp: {
        head: { name: "Balorgh (Helm)", set: "Balorgh", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Ramps up spell/weapon damage and penetration based on ultimate consumed.", quality: "epic", armor: "2,210", icon: "ON-icon-armor-Head-Balorgh.png" },
        shoulder: { name: "Balorgh (Shoulders)", set: "Balorgh", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Paired with helm for 2-piece burst.", quality: "epic", armor: "2,050", icon: "ON-icon-armor-Shoulders-Balorgh.png" },
        chest: { name: "Shattered Fate (Cuirass)", set: "Shattered Fate", weight: "Heavy Armor", trait: "Reinforced", glyph: "Max Stamina", desc: "Heavy chest piece for extra armor rating.", quality: "epic", armor: "2,780", icon: "ON-icon-armor-Cuirass-Welkynar.png" },
        hands: { name: "Shattered Fate (Gauntlets)", set: "Shattered Fate", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Part of the flat penetration set.", quality: "epic", armor: "1,290", icon: "ON-icon-armor-Bracers-Welkynar.png" },
        waist: { name: "Shattered Fate (Sash)", set: "Shattered Fate", weight: "Light Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Light piece to gain armor pen passive.", quality: "epic", armor: "1,170", icon: "ON-icon-armor-Sash-Welkynar.png" },
        legs: { name: "Shattered Fate (Greaves)", set: "Shattered Fate", weight: "Heavy Armor", trait: "Reinforced", glyph: "Max Stamina", desc: "Heavy legs for survival.", quality: "epic", armor: "2,460", icon: "ON-icon-armor-Greaves-Welkynar.png" },
        feet: { name: "Shattered Fate (Sabaton)", set: "Shattered Fate", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Part of the flat penetration set.", quality: "epic", armor: "1,950", icon: "ON-icon-armor-Boots-Welkynar.png" },
        neck: { name: "Sea-Serpent's Coil", set: "Sea-Serpent's Coil", weight: "Mythic Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Gives Major Berserk and Courage when taking damage.", quality: "mythic", icon: "ON-icon-armor-Sea-Serpent%27s_Coil.png" },
        ring1: { name: "Rallying Cry (Ring)", set: "Rallying Cry", weight: "Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Sustain & Crit Resistance jewelry.", quality: "epic", icon: "ON-icon-minor_adornment-Ring.png" },
        ring2: { name: "Rallying Cry (Ring)", set: "Rallying Cry", weight: "Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Sustain & Crit Resistance jewelry.", quality: "epic", icon: "ON-icon-minor_adornment-Ring.png" },
        mainHand: { name: "Rallying Cry Greatsword", set: "Rallying Cry", weight: "Two-Handed", trait: "Nirnhoned", glyph: "Disease Damage", desc: "High weapon damage 2H sword for burst combos.", quality: "epic", damage: "1,620", icon: "ON-icon-weapon-Greatsword-Welkynar.png" },
        offHand: { name: "None (2H Greatsword)", set: "None", weight: "None", trait: "None", glyph: "None", desc: "Two-handed weapon slots block off hand.", quality: "legendary", icon: "" },
        backBar: { name: "Wretched Vitality Bow", set: "Wretched Vitality", weight: "Two-Handed", trait: "Defending", glyph: "Escapist Poison", desc: "Buff/heal bar with massive sustain return on debuffs.", quality: "epic", damage: "1,520", icon: "ON-icon-weapon-Bow-Welkynar.png" }
      }
    },
    stats: {
      pve: {
        stamina: "33,100",
        health: "20,500",
        magicka: "14,600",
        weaponDamage: "6,220",
        criticalChance: "58.4%",
        penetration: "6,920",
        critResist: "0"
      },
      pvp: {
        stamina: "31,400",
        health: "25,100",
        magicka: "15,200",
        weaponDamage: "5,750",
        criticalChance: "36.2%",
        penetration: "13,920",
        critResist: "1,650"
      }
    },
    cp: {
      warfare: {
        name: "Warfare",
        icon: "⚡",
        color: "cp-warfare",
        nodes: [
          { name: "Biting Aura", points: "50", desc: "Increases your Area of Effect (AoE) damage by 6% (Slot)." },
          { name: "Thaumaturge", points: "50", desc: "Increases your Damage over Time (DoT) output by 6% (Slot)." },
          { name: "Fighting Finesse", points: "50", desc: "Increases your Critical Damage and Critical Healing by 8% (Slot)." },
          { name: "Wrathful Strikes", points: "50", desc: "Increases your Weapon and Spell Damage by 205 passively." }
        ]
      },
      fitness: {
        name: "Fitness",
        icon: "🛡️",
        color: "cp-fitness",
        nodes: [
          { name: "Boundless Vitality", points: "50", desc: "Grants 1400 Max Health (Slot)." },
          { name: "Rejuvenation", points: "50", desc: "Grants 150 Health, Magicka, and Stamina Recovery (Slot)." },
          { name: "Fortified", points: "30", desc: "Grants 1730 Armor rating passively." },
          { name: "Bloody Renewal", points: "50", desc: "Restores Stamina whenever you land a killing blow on an enemy (Slot)." }
        ]
      },
      craft: {
        name: "Craft",
        icon: "🌱",
        color: "cp-craft",
        nodes: [
          { name: "Steed's Blessing", points: "50", desc: "Increases your out-of-combat movement speed by 20% (Slot)." },
          { name: "Gilded Fingers", points: "50", desc: "Increases gold acquired from loot drops by 10% passively." },
          { name: "Liquid Efficiency", points: "50", desc: "Gives a 10% chance to not consume a potion or poison on use (Slot)." },
          { name: "Rationer", points: "30", desc: "Adds 30 minutes to the duration of any eaten food or drink (Slot)." }
        ]
      }
    }
  }
};

let activeClass = localStorage.getItem("eso_active_class") || "nightblade";

let SKILL_BARS = BUILD_DATA[activeClass].skills;
let GEAR_SETS = BUILD_DATA[activeClass].gearSets;
let CHARACTER_EQUIPMENT = BUILD_DATA[activeClass].equipment;
let CHARACTER_STATS = BUILD_DATA[activeClass].stats;
let CP_CONSTELLATIONS = BUILD_DATA[activeClass].cp;

const SET_BONUSES = {
  "Slimecraw": {
    header: "Slimecraw (1/2 items)",
    bonuses: [
      { text: "(1 item) Adds 771 Critical Chance", active: true },
      { text: "(2 items) Gain Minor Berserk at all times, increasing your damage dealt by 5%", active: false }
    ]
  },
  "Arms of Relequen": {
    header: "Arms of Relequen (5/5 items)",
    bonuses: [
      { text: "(2 items) Adds 657 Critical Chance", active: true },
      { text: "(3 items) Gain Minor Slayer at all times, increasing damage in Trials by 5%", active: true },
      { text: "(4 items) Adds 657 Critical Chance", active: true },
      { text: "(5 items) Light/Heavy attacks apply wind stacks dealing physical damage per tick, stacking up to 10 times.", active: true }
    ]
  },
  "Pillar of Nirn": {
    header: "Pillar of Nirn (5/5 items)",
    bonuses: [
      { text: "(2 items) Adds 1096 Max Stamina", active: true },
      { text: "(3 items) Adds 657 Critical Chance", active: true },
      { text: "(4 items) Adds 129 Weapon Damage", active: true },
      { text: "(5 items) Dealing damage bleeds target for 2000 physical damage over 10 seconds.", active: true }
    ]
  },
  "Velothi Ur-Mage's Amulet": {
    header: "Velothi Ur-Mage's Amulet (1/1 items)",
    bonuses: [
      { text: "(1 item) Adds 1650 Offensive Penetration", active: true },
      { text: "(1 item) Increases your damage dealt to monsters by 15%", active: true },
      { text: "(1 item) Grants Minor Force, increasing Critical Damage by 10%", active: true },
      { text: "(1 item) Reduces your Light/Heavy Attack damage by 99%", active: true }
    ]
  },
  "Shattered Fate": {
    header: "Shattered Fate (5/5 items)",
    bonuses: [
      { text: "(2 items) Adds 129 Weapon Damage", active: true },
      { text: "(3 items) Adds 657 Critical Chance", active: true },
      { text: "(4 items) Adds 129 Weapon Damage", active: true },
      { text: "(5 items) Adds 7918 Armor Penetration", active: true }
    ]
  },
  "Wretched Vitality": {
    header: "Wretched Vitality (5/5 items)",
    bonuses: [
      { text: "(2 items) Adds 129 Magicka Recovery", active: true },
      { text: "(3 items) Adds 129 Stamina Recovery", active: true },
      { text: "(4 items) Adds 129 Magicka & Stamina Recovery", active: true },
      { text: "(5 items) Applying Major/Minor debuffs grants 260 recovery for 15s.", active: true }
    ]
  },
  "Balorgh": {
    header: "Balorgh (2/2 items)",
    bonuses: [
      { text: "(1 item) Adds 129 Weapon Damage", active: true },
      { text: "(2 items) Consuming Ultimate grants weapon damage and penetration for 12s.", active: true }
    ]
  },
  "Sea-Serpent's Coil": {
    header: "Sea-Serpent's Coil (1/1 items)",
    bonuses: [
      { text: "(1 item) Reduces incoming damage by 40% when at full health.", active: true },
      { text: "(1 item) Gain Major Courage and Major Berserk for 10s upon taking damage.", active: true }
    ]
  },
  "Rallying Cry": {
    header: "Rallying Cry (5/5 items)",
    bonuses: [
      { text: "(2 items) Adds 657 Critical Chance", active: true },
      { text: "(3 items) Adds 1096 Max Stamina", active: true },
      { text: "(4 items) Adds 1096 Max Magicka", active: true },
      { text: "(5 items) Critical heals grant 300 weapon damage and 1650 crit resist.", active: true }
    ]
  },
  "Oakensoul Ring": {
    header: "Oakensoul Ring (1/1 items)",
    bonuses: [
      { text: "(1 item) Grants permanent Major Resolve, Courage, Protection, and 10+ other buffs.", active: true },
      { text: "(1 item) Prevents bar-swapping to back bar.", active: true }
    ]
  }
};


const RESEARCH_TRAITS = [
  { id: "armor_divines", title: "Divines (Armor)", type: "Armor", tag: "Crit/Mundus", desc: "Increases Mundus Stone efficiency. Crucial for stacking critical rating via the Thief mundus." },
  { id: "weapon_precise", title: "Precise (Weapon)", type: "Weapons", tag: "Crit Chance", desc: "Increases Weapon Critical chance. Slot on your front-bar Dual Wield daggers." },
  { id: "weapon_infused", title: "Infused (Weapon)", type: "Weapons", tag: "Glyph Uptime", desc: "Increases weapon enchantment effect and reduces cooldown. Slot on back-bar Bow with Weapon Damage glyph." },
  { id: "jewelry_bloodthirsty", title: "Bloodthirsty (Jewelry)", type: "Jewelry", tag: "Execute Dmg", desc: "Increases weapon damage against targets below 90% Health, scaling down to 350+ damage." }
];

// ==========================================
// ACTIVE BUFFS & SYNERGIES SYSTEM
// ==========================================

const BUFF_DEFINITIONS = {
  minor_force: { name: "Minor Force", type: "buff", desc: "Increases Critical Damage by 10%.", icon: "⚡" },
  minor_slayer: { name: "Minor Slayer", type: "buff", desc: "Increases damage dealt in Dungeons and Trials by 5%.", icon: "⚔️" },
  minor_berserk: { name: "Minor Berserk", type: "buff", desc: "Increases damage dealt by 5%.", icon: "🔥" },
  major_savagery: { name: "Major Savagery & Prophecy", type: "buff", desc: "Increases Weapon and Spell Critical rating by 2,629 (+12% Crit Chance).", icon: "👁️" },
  major_resolve: { name: "Major Resolve", type: "buff", desc: "Increases Physical and Spell Resistance by 5,940.", icon: "🛡️" },
  minor_brittle: { name: "Minor Brittle", type: "debuff", desc: "Increases Critical Damage taken by target by 10%.", icon: "❄️" },
  minor_vulnerability: { name: "Minor Vulnerability", type: "debuff", desc: "Increases damage taken by target by 5%.", icon: "🎯" },
  minor_maim: { name: "Minor Maim", type: "debuff", desc: "Reduces target's damage dealt by 5%.", icon: "🥀" },
  major_courage: { name: "Major Courage", type: "buff", desc: "Increases Weapon and Spell Damage by 430.", icon: "👑" },
  major_berserk: { name: "Major Berserk", type: "buff", desc: "Increases damage dealt by 10%.", icon: "🩸" },
  major_protection: { name: "Major Protection", type: "buff", desc: "Reduces damage taken by 10%.", icon: "💫" }
};

function getActiveBuffs() {
  const active = [];
  const currentEquip = CHARACTER_EQUIPMENT[gearMode] || {};
  
  // Helper to check slotted set
  const hasSet = (setName) => Object.values(currentEquip).some(item => item && item.set === setName);
  
  // Helper to check slotted skill
  const hasSkill = (skillName) => {
    return Object.values(SKILL_BARS).some(bar => 
      bar.skills.some(skill => skill.name === skillName)
    );
  };

  // 1. Oakensoul Ring Check (Gives 10+ buffs)
  if (hasSet("Oakensoul Ring")) {
    active.push({ ...BUFF_DEFINITIONS.major_courage, source: "Oakensoul Ring" });
    active.push({ ...BUFF_DEFINITIONS.major_resolve, source: "Oakensoul Ring" });
    active.push({ ...BUFF_DEFINITIONS.major_protection, source: "Oakensoul Ring" });
    active.push({ ...BUFF_DEFINITIONS.minor_berserk, source: "Oakensoul Ring" });
    active.push({ ...BUFF_DEFINITIONS.minor_force, source: "Oakensoul Ring" });
    active.push({ name: "Major Prophecy & Savagery", type: "buff", desc: "Increases Critical rating by 2,629.", icon: "👁️", source: "Oakensoul Ring" });
    active.push({ name: "Minor Intellect & Endurance", type: "buff", desc: "Increases Magicka and Stamina Recovery by 15%.", icon: "🌀", source: "Oakensoul Ring" });
  } else {
    // Standard checks if NOT using Oakensoul
    
    // Velothi Ur-Mage's Amulet
    if (hasSet("Velothi Ur-Mage's Amulet")) {
      active.push({ ...BUFF_DEFINITIONS.minor_force, source: "Velothi Ur-Mage's Amulet" });
      active.push({ ...BUFF_DEFINITIONS.minor_slayer, source: "Velothi Ur-Mage's Amulet" });
    }
    
    // Sea-Serpent's Coil
    if (hasSet("Sea-Serpent's Coil")) {
      active.push({ ...BUFF_DEFINITIONS.major_courage, source: "Sea-Serpent's Coil (on damage)" });
      active.push({ ...BUFF_DEFINITIONS.major_berserk, source: "Sea-Serpent's Coil (on damage)" });
    }
  }

  // 2. Set Bonuses Slayer Checks
  if (hasSet("Arms of Relequen") && !hasSet("Oakensoul Ring")) {
    // Velothi amulet already pushes minor_slayer, so check duplication
    if (!active.some(b => b.name === "Minor Slayer")) {
      active.push({ ...BUFF_DEFINITIONS.minor_slayer, source: "Arms of Relequen" });
    }
  }

  // 3. Skill Triggers
  if (hasSkill("Barbed Trap") && !active.some(b => b.name === "Minor Force")) {
    active.push({ ...BUFF_DEFINITIONS.minor_force, source: "Barbed Trap" });
  }
  if (hasSkill("Camouflaged Hunter")) {
    active.push({ ...BUFF_DEFINITIONS.major_savagery, source: "Camouflaged Hunter" });
    if (!active.some(b => b.name === "Minor Berserk")) {
      active.push({ ...BUFF_DEFINITIONS.minor_berserk, source: "Camouflaged Hunter (Flanking)" });
    }
  }
  if (hasSkill("Dark Shade")) {
    active.push({ ...BUFF_DEFINITIONS.minor_maim, source: "Dark Shade" });
  }
  if (hasSkill("Cruxweaver Armor") && !active.some(b => b.name === "Major Resolve")) {
    active.push({ ...BUFF_DEFINITIONS.major_resolve, source: "Cruxweaver Armor" });
  }
  if (hasSkill("Rune of the Colorless Pool")) {
    active.push({ ...BUFF_DEFINITIONS.minor_brittle, source: "Rune of the Colorless Pool" });
    active.push({ ...BUFF_DEFINITIONS.minor_vulnerability, source: "Rune of the Colorless Pool" });
  }

  // 4. Mundus Stone Triggers (with Divines math)
  if (activeMundus === "shadow") {
    const divinesCount = Object.values(currentEquip).filter(item => item && item.trait === "Divines").length;
    const shadowBonus = (9 * (1 + divinesCount * 0.091)).toFixed(1);
    active.push({ name: "The Shadow Mundus", type: "buff", desc: `Increases Critical Damage by ${shadowBonus}% (+${divinesCount} Divines pieces).`, icon: "🌙", source: "Mundus Stone" });
  } else if (activeMundus === "thief") {
    const divinesCount = Object.values(currentEquip).filter(item => item && item.trait === "Divines").length;
    const thiefBonus = ((1333 * (1 + divinesCount * 0.091)) / 219.6).toFixed(1);
    active.push({ name: "The Thief Mundus", type: "buff", desc: `Increases Critical Chance by ${thiefBonus}% (+${divinesCount} Divines pieces).`, icon: "⭐", source: "Mundus Stone" });
  } else if (activeMundus === "lover") {
    const divinesCount = Object.values(currentEquip).filter(item => item && item.trait === "Divines").length;
    const loverBonus = Math.round(2744 * (1 + divinesCount * 0.091));
    active.push({ name: "The Lover Mundus", type: "buff", desc: `Increases Physical and Spell Penetration by ${loverBonus} (+${divinesCount} Divines pieces).`, icon: "❤️", source: "Mundus Stone" });
  } else if (activeMundus === "warrior") {
    const divinesCount = Object.values(currentEquip).filter(item => item && item.trait === "Divines").length;
    const warriorBonus = Math.round(238 * (1 + divinesCount * 0.091));
    active.push({ name: "The Warrior Mundus", type: "buff", desc: `Increases Weapon/Spell Damage by ${warriorBonus} (+${divinesCount} Divines pieces).`, icon: "⚔️", source: "Mundus Stone" });
  }

  return active;
}

function getCalculatedStats() {
  const baseStats = BUILD_DATA[activeClass].stats[gearMode];
  const currentEquip = CHARACTER_EQUIPMENT[gearMode] || {};
  
  // Parse base values
  let weaponDamage = parseInt(baseStats.weaponDamage.replace(/,/g, ''));
  let criticalChance = parseFloat(baseStats.criticalChance.replace(/%/g, ''));
  let penetration = parseInt(baseStats.penetration.replace(/,/g, ''));
  
  // Calculate Divines count
  const divinesCount = Object.values(currentEquip).filter(item => item && item.trait === "Divines").length;
  const divinesMultiplier = 1 + (divinesCount * 0.091);
  
  let damageBonus = 0;
  let critBonus = 0;
  let penBonus = 0;
  let shadowCritDamageBonus = 0;

  if (activeMundus === "thief") {
    const rating = 1333 * divinesMultiplier;
    critBonus = rating / 219.6; // ~219.6 rating = 1% crit chance
  } else if (activeMundus === "shadow") {
    shadowCritDamageBonus = 9 * divinesMultiplier;
  } else if (activeMundus === "lover") {
    penBonus = Math.round(2744 * divinesMultiplier);
  } else if (activeMundus === "warrior") {
    damageBonus = Math.round(238 * divinesMultiplier);
  }

  return {
    stamina: baseStats.stamina,
    health: baseStats.health,
    magicka: baseStats.magicka,
    critResist: baseStats.critResist,
    // Calculated values
    weaponDamage: Math.round(weaponDamage + damageBonus).toLocaleString(),
    criticalChance: (criticalChance + critBonus).toFixed(1) + "%",
    penetration: Math.round(penetration + penBonus).toLocaleString(),
    // Raw bonuses for UI feedback
    damageBonus,
    critBonus,
    penBonus,
    shadowCritDamageBonus,
    divinesCount,
    divinesPercent: (divinesCount * 9.1).toFixed(1) + "%"
  };
}

const ROTATION_SEQUENCES = {
  nightblade: [
    { name: "Leeching Strikes", bar: "back", key: "5", desc: "Pre-buff on back bar to guarantee Stamina sustain from auto-attacks." },
    { name: "Relentless Focus", bar: "back", key: "4", desc: "Pre-buff to start building light attack stacks for the Spectral Bow burst." },
    { name: "Endless Hail", bar: "back", key: "1", desc: "Cast arrow rain AoE DoT to trigger back-bar weapon glyphs." },
    { name: "Poison Injection", bar: "back", key: "2", desc: "Apply single-target poison execute DoT to the boss." },
    { name: "Twisting Path", bar: "back", key: "3", desc: "Deploy shadow path DoT for Major Expedition speed and AoE magic damage." },
    { name: "Weapon Swap", bar: "front", key: "Swap", desc: "Switch to Front Bar (Dual Daggers) to begin spammable weave." },
    { name: "Surprise Attack", bar: "front", key: "1", desc: "Main spammable. Cast from behind target for guaranteed Critical Strikes." },
    { name: "Rapid Strikes", bar: "front", key: "3", desc: "Multi-hit channel spammable to trigger front-bar enchantments." },
    { name: "Relentless Focus", bar: "front", key: "4", desc: "Fire the Spectral Bow proc once you hit 5 light attack stacks." },
    { name: "Incapacitating Strike", bar: "front", key: "Ult", desc: "Fire ultimate to stun boss and amplify all damage dealt by 20% for 6s." }
  ],
  arcanist: [
    { name: "Cruxweaver Armor", bar: "back", key: "3", desc: "Pre-buff Major Resolve (+armor) and generate Crux when taking damage." },
    { name: "Inspired Scholarship", bar: "back", key: "5", desc: "Pre-buff to generate Crux automatically and add class damage pulses." },
    { name: "Endless Hail", bar: "back", key: "1", desc: "Deploy arrow rain AoE DoT to keep back-bar enchantment active." },
    { name: "Rune of Displacement", bar: "back", key: "2", desc: "Pull all nearby enemies into a tight pack, priming them for the beam." },
    { name: "Weapon Swap", bar: "front", key: "Swap", desc: "Switch to Front Bar (Daggers) to activate building multipliers." },
    { name: "Cephaliarch's Flail", bar: "front", key: "1", desc: "Lash targets to build 1st Crux, apply Abyssal Ink, and heal." },
    { name: "Cephaliarch's Flail", bar: "front", key: "1", desc: "Lash again to build 2nd Crux and refresh ink." },
    { name: "Cephaliarch's Flail", bar: "front", key: "1", desc: "Lash a 3rd time to reach maximum (3) Crux stacks." },
    { name: "Pragmatic Fatecarver", bar: "front", key: "2", desc: "Channel the main beam. Consumes all 3 Crux for 100% damage shield and massive DPS." },
    { name: "The Languid Eye", bar: "front", key: "Ult", desc: "Cast ultimate beam to melt high-priority targets with scaling damage." }
  ]
};

let rotationStep = 0;
let rotationPlaying = false;
let rotationTimer = null;

// ==========================================
// APP STATE & STORAGE
// ==========================================

let activeTab = localStorage.getItem("eso_active_tab") || "routine";
let checkedTasks = JSON.parse(localStorage.getItem("eso_checked_tasks")) || {};
let researchedTraits = JSON.parse(localStorage.getItem("eso_researched_traits")) || {};
let gearMode = localStorage.getItem("eso_gear_mode") || "pve";
let activeMundus = localStorage.getItem("eso_active_mundus") || "none";
let currentCp = parseInt(localStorage.getItem("eso_current_cp")) || 160;

const CP_PRIORITIES = {
  warfare: ["Fighting Finesse", "Precise Strikes", "Backstabber", "Thaumaturge"],
  fitness: ["Boundless Vitality", "Fortified", "Rejuvenation", "Bloody Renewal"],
  craft: ["Steed's Blessing", "Rationer", "Gilded Fingers", "Liquid Efficiency"]
};

function getCpAllocatedPoints(constellationKey, nodeName, maxPointsVal) {
  const totalConstellationPoints = Math.floor(currentCp / 3);
  const priorities = CP_PRIORITIES[constellationKey] || [];
  const maxPoints = parseInt(maxPointsVal);
  
  let pointsLeft = totalConstellationPoints;
  
  for (const name of priorities) {
    let nodeMax = 50;
    if (name === "Precise Strikes") nodeMax = 40;
    if (name === "Fortified" || name === "Rationer") nodeMax = 30;
    
    const allocated = Math.min(pointsLeft, nodeMax);
    if (name === nodeName) {
      return allocated;
    }
    pointsLeft -= allocated;
  }
  
  return 0;
}

// ==========================================
// AUTO-RESET: Dailies & Weeklies
// ESO daily reset = midnight local time
// ESO weekly reset = Monday (getDay() === 1)
// ==========================================

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
}

function getThisWeekKey() {
  const now = new Date();
  // Find the most recent Monday
  const day = now.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const diffToMonday = (day === 0) ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  return `${monday.getFullYear()}-${monday.getMonth()}-${monday.getDate()}`;
}

function runAutoReset() {
  const todayKey = getTodayKey();
  const weekKey = getThisWeekKey();

  const lastDailyReset = localStorage.getItem("eso_last_daily_reset");
  const lastWeeklyReset = localStorage.getItem("eso_last_weekly_reset");

  const dailyIds = new Set(ROUTINE_DATA.dailies.map(d => d.id));
  const weeklyIds = new Set(ROUTINE_DATA.weeklies.map(w => w.id));

  // Reset dailies if it's a new day
  if (lastDailyReset !== todayKey) {
    dailyIds.forEach(id => delete checkedTasks[id]);
    localStorage.setItem("eso_last_daily_reset", todayKey);
    localStorage.setItem("eso_checked_tasks", JSON.stringify(checkedTasks));
  }

  // Reset weeklies if it's a new week (new Monday)
  if (lastWeeklyReset !== weekKey) {
    weeklyIds.forEach(id => delete checkedTasks[id]);
    localStorage.setItem("eso_last_weekly_reset", weekKey);
    localStorage.setItem("eso_checked_tasks", JSON.stringify(checkedTasks));
  }
}

runAutoReset();

// ==========================================
// TOOLTIP CONTROLLER
// ==========================================

const tooltip = document.getElementById("global-tooltip");
const ttTitle = document.getElementById("tooltip-title");
const ttLine = document.getElementById("tooltip-line");
const ttDesc = document.getElementById("tooltip-desc");

function initTooltipEvents() {
  document.querySelectorAll("[data-tooltip-title]").forEach(el => {
    el.addEventListener("mouseenter", (e) => {
      ttTitle.innerHTML = e.currentTarget.getAttribute("data-tooltip-title");
      ttLine.innerHTML = e.currentTarget.getAttribute("data-tooltip-line");
      ttDesc.innerHTML = e.currentTarget.getAttribute("data-tooltip-desc");
      
      tooltip.style.opacity = "1";
    });
    
    el.addEventListener("mousemove", (e) => {
      // Offset position slightly from mouse cursor
      const offsetWidth = tooltip.offsetWidth;
      let left = e.pageX + 15;
      if (left + offsetWidth > window.innerWidth) {
        left = e.pageX - offsetWidth - 15;
      }
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${e.pageY + 15}px`;
    });
    
    el.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  });
}

// ==========================================
// RENDERING FUNCTIONS
// ==========================================

function updateProgressBar() {
  const totalTasks = ROUTINE_DATA.dailies.length + ROUTINE_DATA.weeklies.length;
  const completedTasks = Object.values(checkedTasks).filter(Boolean).length;
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const fill = document.getElementById("progress-fill");
  const percentText = document.getElementById("progress-percent");
  const countText = document.getElementById("progress-count");
  
  if (fill) fill.style.width = `${percent}%`;
  if (percentText) percentText.innerText = `${percent}%`;
  if (countText) countText.innerText = `${completedTasks}/${totalTasks} Routine Tasks Done`;
}

function toggleRoutineTask(id) {
  checkedTasks[id] = !checkedTasks[id];
  localStorage.setItem("eso_checked_tasks", JSON.stringify(checkedTasks));
  
  const card = document.getElementById(`routine-card-${id}`);
  if (card) {
    if (checkedTasks[id]) {
      card.classList.add("checked");
    } else {
      card.classList.remove("checked");
    }
  }
  updateProgressBar();
}

function resetRoutine() {
  checkedTasks = {};
  localStorage.setItem("eso_checked_tasks", JSON.stringify(checkedTasks));
  renderView();
}

function toggleResearch(id) {
  researchedTraits[id] = !researchedTraits[id];
  localStorage.setItem("eso_researched_traits", JSON.stringify(researchedTraits));
  
  const slot = document.getElementById(`research-slot-${id}`);
  if (slot) {
    if (researchedTraits[id]) {
      slot.classList.remove("active-slot");
      slot.querySelector(".research-circle").innerText = "✓";
      slot.querySelector(".research-circle").style.borderColor = "var(--color-success-border)";
      slot.querySelector(".research-circle").style.color = "var(--color-success-border)";
    } else {
      slot.classList.add("active-slot");
      slot.querySelector(".research-circle").innerText = "⏳";
      slot.querySelector(".research-circle").style.borderColor = "var(--gold-border)";
      slot.querySelector(".research-circle").style.color = "var(--gold-primary)";
    }
  }
}

// VIEW 1: ROUTINE
function getRoutineHtml() {
  // Compute time-until-reset strings
  const now = new Date();

  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const msToMidnight = midnight - now;
  const hDaily = Math.floor(msToMidnight / 3600000);
  const mDaily = Math.floor((msToMidnight % 3600000) / 60000);
  const dailyResetLabel = `Resets in ${hDaily}h ${mDaily}m`;

  const daysUntilMonday = (now.getDay() === 1) ? 7 : (1 + 7 - now.getDay()) % 7 || 7;
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0);
  const msToMonday = nextMonday - now;
  const dWeekly = Math.floor(msToMonday / 86400000);
  const hWeekly = Math.floor((msToMonday % 86400000) / 3600000);
  const weeklyResetLabel = dWeekly > 0 ? `Resets in ${dWeekly}d ${hWeekly}h` : `Resets in ${hWeekly}h`;

  const dailiesHtml = ROUTINE_DATA.dailies.map(item => {
    const isChecked = !!checkedTasks[item.id];
    return `
      <div class="routine-card ${isChecked ? 'checked' : ''}" id="routine-card-${item.id}" data-id="${item.id}">
        <div class="checkbox-container"></div>
        <div class="card-details">
          <div class="card-header-row">
            <span class="card-title">${item.title}</span>
            <span class="card-badge">${item.badge}</span>
          </div>
          <p class="card-desc">${item.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  const weekliesHtml = ROUTINE_DATA.weeklies.map(item => {
    const isChecked = !!checkedTasks[item.id];
    return `
      <div class="routine-card ${isChecked ? 'checked' : ''}" id="routine-card-${item.id}" data-id="${item.id}">
        <div class="checkbox-container"></div>
        <div class="card-details">
          <div class="card-header-row">
            <span class="card-title">${item.title}</span>
            <span class="card-badge">${item.badge}</span>
          </div>
          <p class="card-desc">${item.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="view-header">
      <h2>📅 Daily &amp; Weekly Routine Tracker</h2>
      <p class="view-desc">Track time-gated stable master updates, writs, and random runs to speed-run your progression to CP 160.</p>
    </div>
    
    <div class="grid-2">
      <!-- Routine Lists -->
      <div class="routine-section">
        <div class="routine-group-header">
          <h3 class="routine-group-title">Everyday Checks</h3>
          <span class="reset-timer">⏱ ${dailyResetLabel}</span>
        </div>
        <div class="card-list">${dailiesHtml}</div>
        
        <div class="routine-group-header" style="margin-top: 16px;">
          <h3 class="routine-group-title">Weekly Resets</h3>
          <span class="reset-timer">⏱ ${weeklyResetLabel}</span>
        </div>
        <div class="card-list">${weekliesHtml}</div>
      </div>
      
      <!-- Progress Bar Panel -->
      <div class="progress-panel">
        <div class="progress-header">
          <h3>Progress Tracker</h3>
        </div>
        
        <div class="progress-bar-container">
          <div class="progress-bar-fill" id="progress-fill"></div>
        </div>
        
        <div class="progress-stats">
          <span id="progress-count">0/7 Tasks Done</span>
          <span class="stat-highlight" id="progress-percent">0%</span>
        </div>

        <div class="reset-info-badge">
          <span>🔄 Dailies auto-reset at midnight</span>
          <span>📅 Weeklies reset each Monday</span>
        </div>
        
        <button class="btn-action" id="btn-reset-routine">Reset Routine</button>
      </div>
    </div>
  `;

}

// VIEW 2: SKILL BARS
function getSkillsHtml() {
  const barsHtml = Object.values(SKILL_BARS).map(bar => {
    const slots = bar.skills.map(skill => {
      const iconUrl = buildSkillIconUrl(skill.line, skill.name);
      const altIconUrl = skill.morphAlt ? buildSkillIconUrl(skill.line, skill.morphAlt) : '';
      const baseIconUrl = skill.morphFrom ? buildSkillIconUrl(skill.line, skill.morphFrom) : '';

      // Rich morph section for the tooltip
      const morphHtml = skill.morphFrom ? `
        <div style="margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08); font-size:0.8rem;">
          <div style="color:#6d5930; font-weight:600; letter-spacing:0.05em; margin-bottom:6px; font-size:0.7rem;">MORPH CHAIN</div>
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:8px; color:#94a3b8;">
            <img src="${baseIconUrl}" style="width:20px;height:20px;border-radius:3px;opacity:0.6;" onerror="this.style.display='none';" />
            <span style="opacity:0.7;">${skill.morphFrom}</span>
            <span style="color:#6d5930; font-size:0.8rem;">→</span>
            <img src="${iconUrl}" style="width:20px;height:20px;border-radius:3px;border:1px solid #6d5930;" onerror="this.style.display='none';" />
            <span style="color:#d5b875; font-weight:600;">${skill.name}</span>
          </div>
          <div style="display:flex; gap:8px; margin-bottom:8px; align-items:flex-start;">
            <div style="flex:1; background:rgba(74,222,128,0.07); border:1px solid rgba(74,222,128,0.2); border-radius:5px; padding:5px 7px; display:flex; align-items:center; gap:6px;">
              <img src="${iconUrl}" style="width:18px;height:18px;border-radius:3px;" onerror="this.style.display='none';" />
              <span style="color:#4ade80; font-weight:600; font-size:0.75rem;">✓ ${skill.name}</span>
            </div>
            <div style="flex:1; background:rgba(239,68,68,0.05); border:1px solid rgba(239,68,68,0.15); border-radius:5px; padding:5px 7px; display:flex; align-items:center; gap:6px;">
              <img src="${altIconUrl}" style="width:18px;height:18px;border-radius:3px;opacity:0.5;" onerror="this.style.display='none';" />
              <span style="color:#ef4444; opacity:0.7; font-size:0.75rem;">✗ ${skill.morphAlt}</span>
            </div>
          </div>
          <div style="color:#94a3b8; font-size:0.75rem; line-height:1.4; font-style:italic;">${skill.morphReason}</div>
        </div>
      ` : '';

      const skillTt = `
        <div class="skill-tt-card" style="display:flex; gap:12px; align-items:flex-start; min-width:280px; max-width:340px;">
          <img src="${iconUrl}" style="width:52px; height:52px; border:1px solid var(--gold-border); border-radius:4px; object-fit:cover; background:rgba(0,0,0,0.5); flex-shrink:0;" onerror="this.style.display='none';" />
          <div style="flex-grow:1;">
            <div style="font-size:0.88rem; line-height:1.5; color:var(--text-secondary);">${skill.why}</div>
            ${morphHtml}
          </div>
        </div>
      `.replace(/"/g, '&quot;').replace(/\n/g, '');

      return `
        <a href="${skill.link}" target="_blank" rel="noreferrer" class="skill-slot-card" style="text-decoration: none;"
             data-tooltip-title="${skill.name}" 
             data-tooltip-line="Skill Line: ${skill.line} (${skill.num})" 
             data-tooltip-desc="${skillTt}">
          <span class="skill-number">${skill.num}</span>
          <div class="skill-icon-placeholder">
            <img class="skill-real-icon" src="${iconUrl}" alt="${skill.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width:100%; height:100%; object-fit:cover; border-radius:4px;" />
            <span class="skill-fallback-icon" style="display:none; font-size:1.2rem;">⚔️</span>
          </div>
          <span class="skill-name-label">${skill.name}</span>
          <span class="skill-line-label">${skill.line}</span>
          ${skill.morphFrom ? `<span class="morph-badge" title="Morphed from ${skill.morphFrom}">↑ ${skill.morphFrom}</span>` : ''}
        </a>
      `;
    }).join('');

    return `
      <div class="skill-bar-section">
        <h3 class="skill-bar-title">${bar.title}</h3>
        <p class="card-desc" style="margin-bottom: 20px;">${bar.description}</p>
        <div class="skill-slots-grid">${slots}</div>
      </div>
    `;
  }).join('');

  const links = activeClass === "nightblade" ? [
    { label: "Skinny Cheeks Stamblade Guide", url: "https://www.skinnycheeks.gg/nightblade", icon: "🔥" },
    { label: "AlcastHQ PvE DPS Guide", url: "https://alcasthq.com/eso-stamina-nightblade-build-for-pve/", icon: "⚔️" },
    { label: "ESO-Hub Nightblade Builds", url: "https://eso-hub.com/en/builds/nightblade", icon: "📜" }
  ] : [
    { label: "Skinny Cheeks Arcanist Guide", url: "https://www.skinnycheeks.gg/arcanist", icon: "🔥" },
    { label: "AlcastHQ Arcanist DPS Guide", url: "https://alcasthq.com/eso-arcanist-dps-build-pve/", icon: "⚡" },
    { label: "ESO-Hub Arcanist Builds", url: "https://eso-hub.com/en/builds/arcanist", icon: "📜" }
  ];

  const linksHtml = links.map(link => `
    <a href="${link.url}" target="_blank" rel="noreferrer" class="ext-link-btn">
      <span>${link.icon}</span> ${link.label}
    </a>
  `).join('');

  const rotation = ROTATION_SEQUENCES[activeClass];
  const stepCards = rotation.map((step, idx) => {
    const isActive = idx === rotationStep;
    const isPast = idx < rotationStep;
    
    // Find skill line for icon building
    let line = "Fighters Guild";
    if (step.bar === "front") {
      const match = SKILL_BARS.frontBar.skills.find(s => s.name === step.name);
      if (match) line = match.line;
    } else {
      const match = SKILL_BARS.backBar.skills.find(s => s.name === step.name);
      if (match) line = match.line;
    }
    
    const iconUrl = buildSkillIconUrl(line, step.name);
    
    return `
      <div class="rotation-step-card ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}" data-step-idx="${idx}">
        <span class="step-num">${idx + 1}</span>
        <div class="step-icon-placeholder" style="width:36px; height:36px; border-radius:4px; border: 1px solid var(--gold-border); background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          ${step.name === 'Weapon Swap' 
            ? `<span style="font-size: 1.1rem;">🔄</span>` 
            : `<img class="step-icon-img" src="${iconUrl}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width:100%; height:100%; object-fit:cover; border-radius:3px;" /><span style="display:none; font-size:1rem; align-items:center; justify-content:center; width:100%; height:100%;">⚔️</span>`
          }
        </div>
        <span class="step-name-label">${step.name}</span>
        <span class="step-key-badge bar-${step.bar}">Key ${step.key}</span>
      </div>
    `;
  }).join('');

  const activeStepInfo = rotation[rotationStep];
  const trainerHtml = `
    <!-- Rotation Trainer Widget -->
    <div class="rotation-trainer-box" style="margin-top: 32px; border-top: 2px solid rgba(213, 184, 117, 0.15); padding-top: 24px;">
      <div class="trainer-header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px; flex-wrap:wrap; gap:10px;">
        <h3 class="skill-bar-title" style="margin-bottom:0;">🎯 Dynamic Combat Rotation Trainer</h3>
        <div class="rotation-control-panel" style="display:flex; gap:6px;">
          <button id="btn-rot-prev" class="rot-ctrl-btn" ${rotationStep === 0 ? 'disabled' : ''}>⏮️ Prev</button>
          <button id="btn-rot-play" class="rot-ctrl-btn play-btn" style="min-width: 95px;">${rotationPlaying ? '⏸️ Pause' : '▶️ Auto-Play'}</button>
          <button id="btn-rot-next" class="rot-ctrl-btn" ${rotationStep === rotation.length - 1 ? 'disabled' : ''}>Next ⏭️</button>
          <button id="btn-rot-reset" class="rot-ctrl-btn">🔄 Reset</button>
        </div>
      </div>
      <p class="card-desc" style="margin-bottom: 20px;">Learn the optimal spell sequence. Use the playback controls to step through or auto-play the rotation.</p>
      
      <div class="rotation-steps-track">
        ${stepCards}
      </div>
      
      <div class="active-step-details" style="background: rgba(0,0,0,0.25); border: 1px solid var(--card-border); border-radius: 6px; padding: 12px 16px; margin-top: 16px;">
        <div style="font-size: 0.65rem; color: var(--gold-primary); font-weight: 700; letter-spacing: 1.5px; margin-bottom: 4px; text-transform: uppercase;">
          ACTIVE STEP INFO (Key ${activeStepInfo.key} &bull; ${activeStepInfo.bar.toUpperCase()} BAR)
        </div>
        <h4 style="margin: 0 0 6px 0; color: var(--text-primary); font-family: 'Outfit', sans-serif; font-size: 1.05rem;">${activeStepInfo.name}</h4>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; font-style: italic;">${activeStepInfo.desc}</p>
      </div>
    </div>
  `;

  return `
    <div class="view-header">
      <h2>⚔️ ${BUILD_DATA[activeClass].name} DPS Skill Setup</h2>
      <p class="view-desc">Click any skill block below to open its detailed database entry on ESO-Hub. Hover to inspect tooltips.</p>
    </div>
    
    <!-- Top-Tier Build Reference Links -->
    <div class="external-links-panel">
      <h4 class="links-panel-title">🏆 Top-Tier ${BUILD_DATA[activeClass].name} Build References</h4>
      <div class="links-row">
        ${linksHtml}
      </div>
    </div>

    ${barsHtml}

    ${trainerHtml}
  `;
}

// VIEW 3: GEARING
function getEsoTooltipHtml(item) {
  let resourceValueHtml = "";
  if (item.armor) {
    resourceValueHtml = `<div class="eso-tt-armor">ARMOR: ${item.armor}</div>`;
  } else if (item.damage) {
    resourceValueHtml = `<div class="eso-tt-damage">DAMAGE: ${item.damage}</div>`;
  }
  
  let headerHtml = "";
  if (item.icon || resourceValueHtml) {
    headerHtml = `
      <div class="eso-tt-header-layout" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 8px;">
        <div class="eso-tt-header-stats" style="flex-grow: 1;">
          ${resourceValueHtml}
        </div>
        ${item.icon ? `
          <div class="eso-tt-image-wrapper" style="flex-shrink: 0;">
            <img src="https://en.uesp.net/wiki/Special:FilePath/${item.icon}" style="width: 96px; height: 96px; border: 1px solid var(--gold-border); border-radius: 4px; object-fit: cover; background: rgba(0,0,0,0.5); box-shadow: 0 0 8px rgba(0,0,0,0.6);" onerror="this.style.display='none';" />
          </div>
        ` : ''}
      </div>
    `;
  }
  
  // Get set bonuses list if they exist
  let setHtml = "";
  const setDetails = SET_BONUSES[item.set];
  if (setDetails) {
    const listItems = setDetails.bonuses.map(b => 
      `<li class="${b.active ? 'active-bonus' : 'inactive-bonus'}">${b.text}</li>`
    ).join('');
    
    setHtml = `
      <div class="eso-tt-set-container">
        <div class="eso-tt-set-header">${setDetails.header}</div>
        <ul class="eso-tt-set-list">${listItems}</ul>
      </div>
    `;
  }
  
  return `
    <div class="eso-tt-card">
      ${headerHtml}
      <div class="eso-tt-section">
        <div class="eso-tt-prop"><strong>TRAIT:</strong> ${item.trait}</div>
        <div class="eso-tt-prop"><strong>GLYPH:</strong> ${item.glyph}</div>
      </div>
      <div class="eso-tt-divider"></div>
      <div class="eso-tt-desc">${item.desc}</div>
      ${setHtml ? `<div class="eso-tt-divider"></div>${setHtml}` : ''}
    </div>
  `;
}

function getSlotSvg(slotId) {
  let paths = "";
  if (slotId === "head") {
    // Helmet
    paths = `<path d="M12 2a5 5 0 0 0-5 5v3a1 1 0 0 1-1 1H5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-1a1 1 0 0 1-1-1V7a5 5 0 0 0-5-5z" fill="currentColor"/>`;
  } else if (slotId === "shoulder") {
    // Pauldron
    paths = `<path d="M12 2 2 7v5c0 5.25 3.83 10.15 9 11.35 5.17-1.2 9-6.1 9-11.35V7L12 2z" fill="currentColor"/>`;
  } else if (slotId === "chest") {
    // Chest plate
    paths = `<path d="M12 2c-3 0-5 2-5 5v3c0 2-2 4-2 6v2c0 2 2 3 5 3h4c3 0 5-1 5-3v-2c0-2-2-4-2-6V7c0-3-2-5-5-5z" fill="currentColor"/>`;
  } else if (slotId === "hands") {
    // Gauntlets
    paths = `<path d="M12 2a3 3 0 0 0-3 3v8H7V7a1 1 0 0 0-2 0v8a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5V5a3 3 0 0 0-3-3h-4z" fill="currentColor"/>`;
  } else if (slotId === "waist") {
    // Belt
    paths = `<path d="M2 10h20v4H2zm8-2h4v8h-4z" fill="currentColor"/>`;
  } else if (slotId === "legs") {
    // Greaves
    paths = `<path d="M6 2h12l1 10v10h-5V14H10v8H5V12z" fill="currentColor"/>`;
  } else if (slotId === "feet") {
    // Sabaton
    paths = `<path d="M5 2h5v12l4 4v4H3v-4l2-4V2z" fill="currentColor"/>`;
  } else if (slotId === "neck") {
    // Amulet
    paths = `<path d="M12 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M12 2C6.48 2 2 6.48 2 12h2a8 8 0 0 1 16 0h2C22 6.48 17.52 2 12 2z" fill="currentColor"/>`;
  } else if (slotId === "ring1" || slotId === "ring2") {
    // Ring
    paths = `<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="5" r="3" fill="currentColor"/>`;
  } else if (slotId === "mainHand" || slotId === "offHand") {
    // Dagger / Sword
    paths = `<path d="M19.5 2.5a2.12 2.12 0 0 0-3 0L7.6 11.4l-1.5-.1a1 1 0 0 0-.7.3L2.7 14.3a1 1 0 0 0 0 1.4l3.6 3.6a1 1 0 0 0 1.4 0l2.7-2.7a1 1 0 0 0 .3-.7l-.1-1.5 8.9-8.9a2.12 2.12 0 0 0 0-3z" fill="currentColor"/>`;
  } else if (slotId === "backBar") {
    // Bow
    paths = `<path d="M4 22a1 1 0 0 1-.7-.3l-1.5-1.5a1 1 0 0 1 0-1.4L18.8 1.8a1 1 0 0 1 1.4 0l1.5 1.5a1 1 0 0 1 0 1.4L4.7 21.7a1 1 0 0 1-.7.3zm14-16 1.5-1.5-1-1L17 5z" fill="currentColor"/>`;
  }
  return `<svg viewBox="0 0 24 24" width="18" height="18" style="display:block;">${paths}</svg>`;
}

// Keep a copy of the default equipment to restore it when deselected
let DEFAULT_CHARACTER_EQUIPMENT = JSON.parse(JSON.stringify(CHARACTER_EQUIPMENT));
let selectedSetName = null;

function switchRotationStep(stepIdx) {
  rotationStep = stepIdx;
  renderView();
}

function playRotation() {
  if (rotationPlaying) return;
  rotationPlaying = true;
  
  rotationTimer = setInterval(() => {
    const rotation = ROTATION_SEQUENCES[activeClass];
    if (rotationStep < rotation.length - 1) {
      rotationStep++;
      renderView();
    } else {
      rotationStep = 0;
      renderView();
    }
  }, 1500); // 1.5 seconds per step so the user can easily read details
  
  renderView();
}

function pauseRotation() {
  if (!rotationPlaying) return;
  rotationPlaying = false;
  clearInterval(rotationTimer);
  rotationTimer = null;
  renderView();
}

function switchClass(classId) {
  activeClass = classId;
  localStorage.setItem("eso_active_class", classId);
  
  SKILL_BARS = BUILD_DATA[activeClass].skills;
  GEAR_SETS = BUILD_DATA[activeClass].gearSets;
  CHARACTER_EQUIPMENT = BUILD_DATA[activeClass].equipment;
  CHARACTER_STATS = BUILD_DATA[activeClass].stats;
  CP_CONSTELLATIONS = BUILD_DATA[activeClass].cp;
  
  DEFAULT_CHARACTER_EQUIPMENT = JSON.parse(JSON.stringify(CHARACTER_EQUIPMENT));
  selectedSetName = null;
  
  // Reset rotation state
  pauseRotation();
  rotationStep = 0;
  
  // Set dropdown to match state (for initial load / back button)
  const dropdown = document.getElementById("class-select");
  if (dropdown) dropdown.value = classId;
  
  renderView();
}

function slotSet(setName) {
  const currentEquip = CHARACTER_EQUIPMENT[gearMode];
  
  // First, restore defaults for this mode to clean out any previously slotted sets
  CHARACTER_EQUIPMENT[gearMode] = JSON.parse(JSON.stringify(DEFAULT_CHARACTER_EQUIPMENT[gearMode]));
  const updatedEquip = CHARACTER_EQUIPMENT[gearMode];
  
  if (setName === "Deadly Strike") {
    updatedEquip.chest = { name: "Deadly Strike (Jack)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "2,580", icon: "ON-icon-armor-Jack-Welkynar.png" };
    updatedEquip.hands = { name: "Deadly Strike (Bracers)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "1,220", icon: "ON-icon-armor-Bracers-Welkynar.png" };
    updatedEquip.waist = { name: "Deadly Strike (Belt)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "1,110", icon: "ON-icon-armor-Belt-Welkynar.png" };
    updatedEquip.legs = { name: "Deadly Strike (Guards)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "2,330", icon: "ON-icon-armor-Guards-Welkynar.png" };
    updatedEquip.shoulder = { name: "Deadly Strike (Epaulets)", set: "Deadly Strike", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Boosts channel and dot damage by 15%.", quality: "legendary", armor: "1,980", icon: "ON-icon-armor-Arm_Cops-Welkynar.png" };
  } else if (setName === "Order's Wrath") {
    updatedEquip.chest = { name: "Order's Wrath (Jack)", set: "Order's Wrath", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Crafted critical chance set piece.", quality: "legendary", armor: "2,580", icon: "ON-icon-armor-Jack-Welkynar.png" };
    updatedEquip.hands = { name: "Order's Wrath (Bracers)", set: "Order's Wrath", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Crafted critical chance set piece.", quality: "legendary", armor: "1,220", icon: "ON-icon-armor-Bracers-Welkynar.png" };
    updatedEquip.waist = { name: "Order's Wrath (Belt)", set: "Order's Wrath", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Crafted critical chance set piece.", quality: "legendary", armor: "1,110", icon: "ON-icon-armor-Belt-Welkynar.png" };
    updatedEquip.legs = { name: "Order's Wrath (Guards)", set: "Order's Wrath", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Crafted critical chance set piece.", quality: "legendary", armor: "2,330", icon: "ON-icon-armor-Guards-Welkynar.png" };
    updatedEquip.feet = { name: "Order's Wrath (Boots)", set: "Order's Wrath", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Crafted critical chance set piece.", quality: "legendary", armor: "1,880", icon: "ON-icon-armor-Boots-Welkynar.png" };
  } else if (setName === "Hunding's Rage") {
    updatedEquip.ring1 = { name: "Hunding's Rage Ring", set: "Hunding's Rage", weight: "Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Crafted raw damage set piece.", quality: "legendary", icon: "ON-icon-minor_adornment-Ring.png" };
    updatedEquip.ring2 = { name: "Hunding's Rage Ring", set: "Hunding's Rage", weight: "Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Crafted raw damage set piece.", quality: "legendary", icon: "ON-icon-minor_adornment-Ring.png" };
    updatedEquip.mainHand = { name: "Hunding's Rage Dagger", set: "Hunding's Rage", weight: "One-Handed", trait: "Precise", glyph: "Poison Damage", desc: "Crafted raw damage main hand.", quality: "legendary", damage: "1,337", icon: "ON-icon-weapon-Dagger-Welkynar.png" };
    updatedEquip.offHand = { name: "Hunding's Rage Dagger", set: "Hunding's Rage", weight: "One-Handed", trait: "Charged", glyph: "Flame Damage", desc: "Crafted raw damage off hand.", quality: "legendary", damage: "1,337", icon: "ON-icon-weapon-Dagger-Welkynar.png" };
  } else if (setName === "Slimecraw") {
    updatedEquip.head = { name: "Slimecraw (Helm)", set: "Slimecraw", weight: "Light Armor", trait: "Divines", glyph: "Max Stamina", desc: "Best-in-slot critical chance 1-piece helm.", quality: "legendary", armor: "2,120", icon: "ON-icon-armor-Head-Slimecraw.png" };
    updatedEquip.shoulder = { name: "Slimecraw (Shoulders)", set: "Slimecraw", weight: "Light Armor", trait: "Divines", glyph: "Max Stamina", desc: "Pairing shoulder piece for full monster set.", quality: "legendary", armor: "1,980", icon: "ON-icon-armor-Shoulders-Slimecraw.png" };
  } else if (setName === "Arms of Relequen") {
    updatedEquip.shoulder = { name: "Arms of Relequen (Epaulets)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Allows maintaining Trial set 5-piece bonus on body.", quality: "legendary", armor: "1,980", icon: "ON-icon-armor-Arm_Cops-Welkynar.png" };
    updatedEquip.chest = { name: "Arms of Relequen (Jack)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "2,580", icon: "ON-icon-armor-Jack-Welkynar.png" };
    updatedEquip.hands = { name: "Arms of Relequen (Bracers)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "1,220", icon: "ON-icon-armor-Bracers-Welkynar.png" };
    updatedEquip.waist = { name: "Arms of Relequen (Belt)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "1,110", icon: "ON-icon-armor-Belt-Welkynar.png" };
    updatedEquip.legs = { name: "Arms of Relequen (Guards)", set: "Arms of Relequen", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "2,330", icon: "ON-icon-armor-Guards-Welkynar.png" };
  } else if (setName === "Pillar of Nirn") {
    updatedEquip.feet = { name: "Pillar of Nirn (Boots)", set: "Pillar of Nirn", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Allows maintaining dungeon bleed set 5-piece bonus on weapons/jewelry.", quality: "legendary", armor: "1,880", icon: "ON-icon-armor-Boots-Dreadhorn.png" };
    updatedEquip.ring1 = { name: "Pillar of Nirn (Ring)", set: "Pillar of Nirn", weight: "Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Part of the bleed-proc jewelry.", quality: "legendary", icon: "ON-icon-minor_adornment-Ring.png" };
    updatedEquip.ring2 = { name: "Pillar of Nirn (Ring)", set: "Pillar of Nirn", weight: "Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Part of the bleed-proc jewelry.", quality: "legendary", icon: "ON-icon-minor_adornment-Ring.png" };
    updatedEquip.mainHand = { name: "Pillar of Nirn Dagger", set: "Pillar of Nirn", weight: "One-Handed", trait: "Precise", glyph: "Poison Damage", desc: "Standard PvE dagger spammable main hand.", quality: "legendary", damage: "1,337", icon: "ON-icon-weapon-Dagger-Dreadhorn.png" };
    updatedEquip.offHand = { name: "Pillar of Nirn Dagger", set: "Pillar of Nirn", weight: "One-Handed", trait: "Charged", glyph: "Flame Damage", desc: "Standard PvE dagger off hand to apply status effects.", quality: "legendary", damage: "1,337", icon: "ON-icon-weapon-Dagger-Dreadhorn.png" };
  } else if (setName === "Ansuul's Torment") {
    updatedEquip.shoulder = { name: "Ansuul's Torment (Epaulets)", set: "Ansuul's Torment", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Allows maintaining Trial set 5-piece bonus on body.", quality: "legendary", armor: "1,980", icon: "ON-icon-armor-Arm_Cops-Welkynar.png" };
    updatedEquip.chest = { name: "Ansuul's Torment (Jack)", set: "Ansuul's Torment", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "2,580", icon: "ON-icon-armor-Jack-Welkynar.png" };
    updatedEquip.hands = { name: "Ansuul's Torment (Bracers)", set: "Ansuul's Torment", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "1,220", icon: "ON-icon-armor-Bracers-Welkynar.png" };
    updatedEquip.waist = { name: "Ansuul's Torment (Belt)", set: "Ansuul's Torment", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "1,110", icon: "ON-icon-armor-Belt-Welkynar.png" };
    updatedEquip.legs = { name: "Ansuul's Torment (Guards)", set: "Ansuul's Torment", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "2,330", icon: "ON-icon-armor-Guards-Welkynar.png" };
  } else if (setName === "Coral Riptide") {
    updatedEquip.shoulder = { name: "Coral Riptide (Epaulets)", set: "Coral Riptide", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Allows maintaining Trial set 5-piece bonus on body.", quality: "legendary", armor: "1,980", icon: "ON-icon-armor-Arm_Cops-Welkynar.png" };
    updatedEquip.chest = { name: "Coral Riptide (Jack)", set: "Coral Riptide", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "2,580", icon: "ON-icon-armor-Jack-Welkynar.png" };
    updatedEquip.hands = { name: "Coral Riptide (Bracers)", set: "Coral Riptide", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "1,220", icon: "ON-icon-armor-Bracers-Welkynar.png" };
    updatedEquip.waist = { name: "Coral Riptide (Belt)", set: "Coral Riptide", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "1,110", icon: "ON-icon-armor-Belt-Welkynar.png" };
    updatedEquip.legs = { name: "Coral Riptide (Guards)", set: "Coral Riptide", weight: "Medium Armor", trait: "Divines", glyph: "Max Stamina", desc: "Core PvE DPS trial set piece.", quality: "legendary", armor: "2,330", icon: "ON-icon-armor-Guards-Welkynar.png" };
  } else if (setName === "Velothi Ur-Mage's Amulet") {
    updatedEquip.neck = { name: "Velothi Ur-Mage's Amulet", set: "Velothi Ur-Mage's Amulet", weight: "Mythic Jewelry", trait: "Bloodthirsty", glyph: "Weapon Damage", desc: "Boosts monster hit damage by 15%, grants Minor Force.", quality: "mythic", icon: "ON-icon-armor-Velothi_Ur-Mage%27s_Amulet.png" };
  } else if (setName === "Zaan") {
    updatedEquip.head = { name: "Zaan (Helm)", set: "Zaan", weight: "Light Armor", trait: "Divines", glyph: "Max Stamina", desc: "Monster helm for scaling fire beam proc.", quality: "legendary", armor: "2,120", icon: "ON-icon-armor-Head-Slimecraw.png" };
    updatedEquip.shoulder = { name: "Zaan (Shoulders)", set: "Zaan", weight: "Light Armor", trait: "Divines", glyph: "Max Stamina", desc: "Monster shoulders for scaling fire beam proc.", quality: "legendary", armor: "1,980", icon: "ON-icon-armor-Shoulders-Slimecraw.png" };
  } else if (setName === "Shattered Fate") {
    updatedEquip.chest = { name: "Shattered Fate (Cuirass)", set: "Shattered Fate", weight: "Heavy Armor", trait: "Reinforced", glyph: "Max Stamina", desc: "Heavy chest piece for extra armor rating.", quality: "epic", armor: "2,780", icon: "ON-icon-armor-Cuirass-Welkynar.png" };
    updatedEquip.hands = { name: "Shattered Fate (Gauntlets)", set: "Shattered Fate", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Part of the flat penetration set.", quality: "epic", armor: "1,290", icon: "ON-icon-armor-Bracers-Welkynar.png" };
    updatedEquip.waist = { name: "Shattered Fate (Sash)", set: "Shattered Fate", weight: "Light Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Light piece to gain armor pen passive.", quality: "epic", armor: "1,170", icon: "ON-icon-armor-Sash-Welkynar.png" };
    updatedEquip.legs = { name: "Shattered Fate (Greaves)", set: "Shattered Fate", weight: "Heavy Armor", trait: "Reinforced", glyph: "Max Stamina", desc: "Heavy legs for survival.", quality: "epic", armor: "2,460", icon: "ON-icon-armor-Greaves-Welkynar.png" };
    updatedEquip.feet = { name: "Shattered Fate (Sabaton)", set: "Shattered Fate", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Part of the flat penetration set.", quality: "epic", armor: "1,950", icon: "ON-icon-armor-Boots-Welkynar.png" };
  } else if (setName === "Wretched Vitality") {
    updatedEquip.backBar = { name: "Wretched Vitality Bow", set: "Wretched Vitality", weight: "Two-Handed", trait: "Defending", glyph: "Escapist Poison", desc: "Buff/heal bar with massive sustain return on debuffs.", quality: "epic", damage: "1,520", icon: "ON-icon-weapon-Bow-Welkynar.png" };
  } else if (setName === "Balorgh") {
    updatedEquip.head = { name: "Balorgh (Helm)", set: "Balorgh", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Ramps up spell/weapon damage and penetration based on ultimate consumed.", quality: "epic", armor: "2,210", icon: "ON-icon-armor-Head-Balorgh.png" };
    updatedEquip.shoulder = { name: "Balorgh (Shoulders)", set: "Balorgh", weight: "Medium Armor", trait: "Well-Fitted", glyph: "Max Stamina", desc: "Paired with helm for 2-piece burst.", quality: "epic", armor: "2,050", icon: "ON-icon-armor-Shoulders-Balorgh.png" };
  } else if (setName === "Rallying Cry") {
    updatedEquip.ring1 = { name: "Rallying Cry (Ring)", set: "Rallying Cry", weight: "Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Sustain & Crit Resistance jewelry.", quality: "epic", icon: "ON-icon-minor_adornment-Ring.png" };
    updatedEquip.ring2 = { name: "Rallying Cry (Ring)", set: "Rallying Cry", weight: "Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Sustain & Crit Resistance jewelry.", quality: "epic", icon: "ON-icon-minor_adornment-Ring.png" };
    updatedEquip.mainHand = { name: "Rallying Cry Greatsword", set: "Rallying Cry", weight: "Two-Handed", trait: "Nirnhoned", glyph: "Disease Damage", desc: "High weapon damage 2H sword for burst combos.", quality: "epic", damage: "1,620", icon: "ON-icon-weapon-Greatsword-Welkynar.png" };
    updatedEquip.offHand = { name: "None (2H Greatsword)", set: "None", weight: "None", trait: "None", glyph: "None", desc: "Two-handed weapon slots block off hand.", quality: "legendary", icon: "" };
  } else if (setName === "Plaguebreak") {
    updatedEquip.mainHand = { name: "Plaguebreak Greatsword", set: "Plaguebreak", weight: "Two-Handed", trait: "Nirnhoned", glyph: "Poison Damage", desc: "Excellent group contagion weapon.", quality: "epic", damage: "1,620", icon: "ON-icon-weapon-Greatsword-Welkynar.png" };
    updatedEquip.offHand = { name: "None (2H Greatsword)", set: "None", weight: "None", trait: "None", glyph: "None", desc: "Two-handed weapon slots block off hand.", quality: "legendary", icon: "" };
  } else if (setName === "Sea-Serpent's Coil") {
    updatedEquip.neck = { name: "Sea-Serpent's Coil", set: "Sea-Serpent's Coil", weight: "Mythic Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Gives Major Berserk and Courage when taking damage.", quality: "mythic", icon: "ON-icon-armor-Sea-Serpent%27s_Coil.png" };
  } else if (setName === "Oakensoul Ring") {
    updatedEquip.ring1 = { name: "Oakensoul Ring", set: "Oakensoul Ring", weight: "Mythic Jewelry", trait: "Infused", glyph: "Weapon Damage", desc: "Top-tier one-bar build mythic ring.", quality: "mythic", icon: "ON-icon-armor-Oakensoul_Ring.png" };
  }
}

function renderGearSlot(slotId, slotLabel, equipment) {
  const item = equipment[slotId];
  if (!item) return "";
  
  const quality = item.quality || "legendary";
  const ttEscaped = getEsoTooltipHtml(item).replace(/"/g, '&quot;').replace(/\n/g, '');
  
  const isHighlighted = selectedSetName && item.set && item.set.toLowerCase() === selectedSetName.toLowerCase();
  
  return `
    <div class="gear-slot q-${quality}-border ${isHighlighted ? 'slot-highlight' : ''}" 
         data-tooltip-title="<span class='eso-tt-title eso-q-${quality}'>${item.name}</span>" 
         data-tooltip-line="${item.weight} &bull; Level CP 160" 
         data-tooltip-desc="${ttEscaped}">
      <div class="slot-icon-label q-${quality}-icon">
        ${item.icon ? `<img src="https://en.uesp.net/wiki/Special:FilePath/${item.icon}" class="gear-icon-img" alt="" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="display:block; width:100%; height:100%; object-fit:cover; border-radius:3px;" />` : ''}
        <div class="fallback-svg" style="${item.icon ? 'display:none;' : 'display:block;'} width:18px; height:18px;">
          ${getSlotSvg(slotId)}
        </div>
      </div>
      <div class="slot-meta">
        <span class="slot-item-name eso-q-${quality}">${item.name}</span>
        <div class="slot-item-details">
          <span>${item.trait}</span>
          <span>${item.glyph}</span>
        </div>
      </div>
    </div>
  `;
}

function getGearHtml() {
  const currentSets = GEAR_SETS[gearMode] || GEAR_SETS.pve;
  const currentEquip = CHARACTER_EQUIPMENT[gearMode] || CHARACTER_EQUIPMENT.pve;
  const stats = getCalculatedStats();

  const activeBuffs = getActiveBuffs();
  const buffsHtml = activeBuffs.map(b => `
    <div class="buff-badge" data-tooltip-title="${b.name}" data-tooltip-line="Source: ${b.source}" data-tooltip-desc="${b.desc}">
      <span class="buff-icon">${b.icon}</span>
      <span class="buff-name">${b.name}</span>
    </div>
  `).join('');

  const buffsBoxHtml = `
    <div class="buffs-box" style="margin-top: 16px;">
      <div class="stats-header">ACTIVE BUFFS &amp; SYNERGIES</div>
      <div class="buffs-list-grid">
        ${buffsHtml || '<div class="no-buffs-hint">No active combat buffs. Slot gear sets or check skill triggers to activate multipliers.</div>'}
      </div>
    </div>
  `;
  
  const starterHtml = currentSets.starter.map(set => {
    const isSelected = selectedSetName === set.name;
    return `
      <div class="gear-card ${isSelected ? 'card-selected' : ''}" style="cursor: pointer;" data-set-name="${set.name}"
           data-tooltip-title="${set.name}"
           data-tooltip-line="${set.type} • ${set.source}"
           data-tooltip-desc="${set.why}">
        <div class="gear-header">
          <h4 class="gear-name">${set.name}</h4>
          <span class="gear-type">${set.type}</span>
        </div>
        <span class="gear-source">${set.source}</span>
        <p class="gear-why">${set.why.length > 80 ? set.why.substring(0, 77) + '...' : set.why}</p>
        <div class="gear-card-click-hint">${isSelected ? 'Active Selection' : 'Click to slot this set'}</div>
      </div>
    `;
  }).join('');

  const lateHtml = currentSets.lateGame.map(set => {
    const isSelected = selectedSetName === set.name;
    return `
      <div class="gear-card ${isSelected ? 'card-selected' : ''}" style="cursor: pointer;" data-set-name="${set.name}"
           data-tooltip-title="${set.name}"
           data-tooltip-line="${set.type} • ${set.source}"
           data-tooltip-desc="${set.why}">
        <div class="gear-header">
          <h4 class="gear-name">${set.name}</h4>
          <span class="gear-type">${set.type}</span>
        </div>
        <span class="gear-source">${set.source}</span>
        <p class="gear-why">${set.why.length > 80 ? set.why.substring(0, 77) + '...' : set.why}</p>
        <div class="gear-card-click-hint">${isSelected ? 'Active Selection' : 'Click to slot this set'}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="view-header">
      <h2>🛡️ CP 160 Gearing Milestones (Update 50)</h2>
      <p class="view-desc">Select between PvE and PvP gear setups below. Hover over any slot or card to view detailed set properties.</p>
    </div>

    <!-- PvE vs PvP Sub Tabs -->
    <div class="sub-tabs-container">
      <button class="sub-tab-btn ${gearMode === 'pve' ? 'active' : ''}" data-gear-mode="pve">⚔️ PvE DPS Sets</button>
      <button class="sub-tab-btn ${gearMode === 'pvp' ? 'active' : ''}" data-gear-mode="pvp">🛡️ PvP Burst & Survival</button>
    </div>

    <!-- Character Equipment Grid Layout -->
    <div class="character-sheet-container">
      <h3 class="gear-tier-title" style="margin-top: 0; margin-bottom: 20px;">🛡️ Character Gear Slots Layout</h3>
      <div class="character-sheet-layout">
        <!-- Left Column: Armor -->
        <div class="sheet-column">
          ${renderGearSlot("head", "HD", currentEquip)}
          ${renderGearSlot("shoulder", "SH", currentEquip)}
          ${renderGearSlot("chest", "CH", currentEquip)}
          ${renderGearSlot("hands", "HN", currentEquip)}
          ${renderGearSlot("waist", "WS", currentEquip)}
          ${renderGearSlot("legs", "LG", currentEquip)}
          ${renderGearSlot("feet", "FT", currentEquip)}
        </div>
        
        <!-- Stats Center -->
        <div class="sheet-center">
          <!-- Mundus selector -->
          <div class="mundus-selector-container" style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.15); border: 1px solid var(--card-border); border-radius: 6px; padding: 10px 14px;">
            <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); letter-spacing: 0.5px; font-family: 'Outfit', sans-serif;">🔮 MUNDUS STONE</span>
            <select id="mundus-select" class="class-select-dropdown" style="padding: 2px 6px; font-size: 0.76rem;">
              <option value="none" ${activeMundus === 'none' ? 'selected' : ''}>None</option>
              <option value="thief" ${activeMundus === 'thief' ? 'selected' : ''}>The Thief (+Crit Chance)</option>
              <option value="shadow" ${activeMundus === 'shadow' ? 'selected' : ''}>The Shadow (+Crit Damage)</option>
              <option value="lover" ${activeMundus === 'lover' ? 'selected' : ''}>The Lover (+Penetration)</option>
              <option value="warrior" ${activeMundus === 'warrior' ? 'selected' : ''}>The Warrior (+Weapon Damage)</option>
            </select>
          </div>

          <div class="stats-box">
            <div class="stats-header">STAT TOTALS</div>
            
            <div class="stat-resource-bar stamina-bar">
              <span class="resource-label">STAMINA</span>
              <span class="resource-value">${stats.stamina}</span>
            </div>
            
            <div class="stat-resource-bar health-bar">
              <span class="resource-label">HEALTH</span>
              <span class="resource-value">${stats.health}</span>
            </div>
            
            <div class="stat-resource-bar magicka-bar">
              <span class="resource-label">MAGICKA</span>
              <span class="resource-value">${stats.magicka}</span>
            </div>
            
            <div class="stat-details-list">
              <div class="stat-detail-item">
                <span>Weapon Damage</span>
                <span>${stats.damageBonus > 0 ? `<span style="color: #4ade80;" title="+${stats.damageBonus} from Warrior Mundus (boosted by ${stats.divinesPercent} Divines)">${stats.weaponDamage}</span>` : stats.weaponDamage}</span>
              </div>
              <div class="stat-detail-item">
                <span>Critical Chance</span>
                <span>${stats.critBonus > 0 ? `<span style="color: #4ade80;" title="+${stats.critBonus.toFixed(1)}% from Thief Mundus (boosted by ${stats.divinesPercent} Divines)">${stats.criticalChance}</span>` : stats.criticalChance}</span>
              </div>
              <div class="stat-detail-item">
                <span>Armor Penetration</span>
                <span>${stats.penBonus > 0 ? `<span style="color: #4ade80;" title="+${stats.penBonus} from Lover Mundus (boosted by ${stats.divinesPercent} Divines)">${stats.penetration}</span>` : stats.penetration}</span>
              </div>
              <div class="stat-detail-item">
                <span>Critical Resist</span>
                <span>${stats.critResist}</span>
              </div>
            </div>
          </div>
          ${buffsBoxHtml}
        </div>
        
        <!-- Right Column: Jewelry & Weapons -->
        <div class="sheet-column">
          ${renderGearSlot("neck", "NK", currentEquip)}
          ${renderGearSlot("ring1", "R1", currentEquip)}
          ${renderGearSlot("ring2", "R2", currentEquip)}
          <div style="margin-top: 12px; border-top: 1px solid var(--card-border); padding-top: 12px; display: flex; flex-direction: column; gap: 12px;">
            ${renderGearSlot("mainHand", "MH", currentEquip)}
            ${gearMode === 'pve' ? renderGearSlot("offHand", "OH", currentEquip) : ''}
            ${renderGearSlot("backBar", "BB", currentEquip)}
          </div>
        </div>
      </div>
    </div>
    
    <h3 class="gear-tier-title"><span>🌟</span> Starter Sets Summary</h3>
    <div class="gear-grid" style="margin-bottom: 40px;">${starterHtml}</div>
    
    <h3 class="gear-tier-title"><span>🏆</span> Endgame Targets Summary</h3>
    <div class="gear-grid">${lateHtml}</div>
  `;
}

// VIEW 4: CHAMPION POINTS
function getCpHtml() {
  const constellationsHtml = Object.values(CP_CONSTELLATIONS).map(c => {
    const nodes = c.nodes.map(n => {
      const allocated = getCpAllocatedPoints(c.name.toLowerCase(), n.name, n.points);
      const isSlotted = n.desc.includes("(Slot)");
      const maxPts = parseInt(n.points);
      const percent = Math.round((allocated / maxPts) * 100);
      
      return `
        <div class="cp-node ${allocated === maxPts ? 'completed' : ''} ${allocated > 0 ? 'active' : ''}">
          <div class="cp-node-header" style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:6px;">
            <span style="color:${allocated === maxPts ? 'var(--gold-primary)' : 'var(--text-primary)'};">${n.name} ${isSlotted ? '<span style="font-size:0.7rem; color:var(--gold-secondary); opacity:0.85;">[Slot]</span>' : ''}</span>
            <span class="cp-node-points" style="font-size:0.8rem; color:${allocated > 0 ? '#4ade80' : 'var(--text-muted)'};">${allocated} / ${n.points} pts</span>
          </div>
          <p class="cp-node-desc" style="font-size:0.76rem; color:var(--text-secondary); line-height:1.4; margin:0 0 10px 0;">${n.desc}</p>
          
          <!-- CP Progress Bar -->
          <div class="cp-progress-bar-container" style="height:4px; background:rgba(255,255,255,0.05); border-radius:2px; overflow:hidden; position:relative;">
            <div class="cp-progress-fill" style="width:${percent}%; height:100%; background:${allocated === maxPts ? 'var(--gold-primary)' : '#4ade80'}; transition: width 0.3s ease;"></div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="cp-constellation ${c.color}">
        <div class="cp-title-row">
          <span class="cp-icon">${c.icon}</span>
          <h3 class="cp-const-name">${c.name}</h3>
        </div>
        <div class="cp-item-list">${nodes}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="view-header">
      <h2>🌟 Champion Point Constellations</h2>
      <p class="view-desc">Optimal CP allocations based on your level. Key slottable nodes are indicated below.</p>
    </div>

    <!-- CP Level Panel Slider -->
    <div class="cp-level-panel" style="background: rgba(0, 0, 0, 0.25); border: 1px solid var(--card-border); border-radius: 8px; padding: 20px; margin-bottom: 24px; display: flex; flex-direction: column; gap: 12px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-family:'Cinzel', serif; font-size:0.95rem; color:var(--gold-primary); font-weight:700; letter-spacing:0.5px;">🌟 ADJUST YOUR CHAMPION POINTS</span>
        <span id="cp-badge-val" style="font-family:'Outfit', sans-serif; font-size:1.1rem; font-weight:700; color:#ffffff; background:rgba(213,184,117,0.15); border:1px solid var(--gold-border); padding:3px 12px; border-radius:4px;">CP ${currentCp}</span>
      </div>
      <input type="range" id="cp-range" min="160" max="1600" step="10" value="${currentCp}" style="width:100%; accent-color:var(--gold-primary); cursor:pointer;" />
      <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted);">
        <span>CP 160 (Gear Cap)</span>
        <span>CP 600 (Mid Game)</span>
        <span>CP 1200 (Late Game)</span>
        <span>CP 1600 (Max Slottables)</span>
      </div>
    </div>
    
    <div class="cp-view-grid">${constellationsHtml}</div>
  `;
}

// VIEW 5: CRAFTING RESEARCH
function getResearchHtml() {
  const slotsHtml = RESEARCH_TRAITS.map(t => {
    const isResearched = !!researchedTraits[t.id];
    return `
      <div class="research-slot ${isResearched ? '' : 'active-slot'}" id="research-slot-${t.id}" data-id="${t.id}">
        <div class="research-circle" style="${isResearched ? 'border-color: var(--color-success-border); color: var(--color-success-border);' : ''}">
          ${isResearched ? '✓' : '⏳'}
        </div>
        <div class="research-info">
          <h4>${t.title}</h4>
          <span class="research-tag">${t.tag}</span>
          <p class="card-desc" style="margin-top: 4px;">${t.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="view-header">
      <h2>🔨 Crafting Trait Research Queue</h2>
      <p class="view-desc">Time-gated research takes weeks. Toggle items in this checklist to track your research status toward crafting Order's Wrath (3 traits needed).</p>
    </div>
    
    <div class="research-grid">${slotsHtml}</div>
  `;
}

// View Router
function renderView() {
  const container = document.getElementById("view-container");
  if (!container) return;

  if (activeTab === "routine") {
    container.innerHTML = getRoutineHtml();
    updateProgressBar();
    
    // Add Event Listeners for Routine cards
    container.querySelectorAll(".routine-card").forEach(card => {
      card.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        toggleRoutineTask(id);
      });
    });
    
    // Reset Button
    const btnReset = document.getElementById("btn-reset-routine");
    if (btnReset) {
      btnReset.addEventListener("click", resetRoutine);
    }
    
  } else if (activeTab === "skills") {
    container.innerHTML = getSkillsHtml();
    initTooltipEvents();

    // Add Event Listeners for Rotation steps and controls
    container.querySelectorAll(".rotation-step-card").forEach(card => {
      card.addEventListener("click", (e) => {
        const stepIdx = parseInt(e.currentTarget.getAttribute("data-step-idx"));
        pauseRotation(); // Stop auto-play on manual select
        switchRotationStep(stepIdx);
      });
    });

    const btnPrev = document.getElementById("btn-rot-prev");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        pauseRotation();
        if (rotationStep > 0) switchRotationStep(rotationStep - 1);
      });
    }

    const btnPlay = document.getElementById("btn-rot-play");
    if (btnPlay) {
      btnPlay.addEventListener("click", () => {
        if (rotationPlaying) {
          pauseRotation();
        } else {
          playRotation();
        }
      });
    }

    const btnNext = document.getElementById("btn-rot-next");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        pauseRotation();
        const rotation = ROTATION_SEQUENCES[activeClass];
        if (rotationStep < rotation.length - 1) switchRotationStep(rotationStep + 1);
      });
    }

    const btnResetRot = document.getElementById("btn-rot-reset");
    if (btnResetRot) {
      btnResetRot.addEventListener("click", () => {
        pauseRotation();
        switchRotationStep(0);
      });
    }
  } else if (activeTab === "gear") {
    container.innerHTML = getGearHtml();
    initTooltipEvents();
    
    // Add Event Listeners for Gearing sub tabs
    container.querySelectorAll(".sub-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const mode = e.currentTarget.getAttribute("data-gear-mode");
        // Restore defaults for current mode before switching
        CHARACTER_EQUIPMENT[gearMode] = JSON.parse(JSON.stringify(DEFAULT_CHARACTER_EQUIPMENT[gearMode]));
        gearMode = mode;
        localStorage.setItem("eso_gear_mode", mode);
        selectedSetName = null; // Clear selection state
        renderView();
      });
    });
    
    // Add click listeners to gear cards to highlight slots and slot items
    container.querySelectorAll(".gear-card").forEach(card => {
      card.addEventListener("click", (e) => {
        const setName = e.currentTarget.getAttribute("data-set-name");
        
        if (selectedSetName === setName) {
          selectedSetName = null;
          // Restore default equipment
          CHARACTER_EQUIPMENT[gearMode] = JSON.parse(JSON.stringify(DEFAULT_CHARACTER_EQUIPMENT[gearMode]));
        } else {
          selectedSetName = setName;
          // Slot the set items
          slotSet(setName);
        }
        renderView();
      });
    });

    // Add listener for Mundus selector
    const mundusSelect = container.querySelector("#mundus-select");
    if (mundusSelect) {
      mundusSelect.addEventListener("change", (e) => {
        activeMundus = e.target.value;
        localStorage.setItem("eso_active_mundus", activeMundus);
        renderView();
      });
    }
  } else if (activeTab === "cp") {
    container.innerHTML = getCpHtml();
    
    const cpRange = container.querySelector("#cp-range");
    if (cpRange) {
      cpRange.addEventListener("input", (e) => {
        currentCp = parseInt(e.target.value);
        localStorage.setItem("eso_current_cp", currentCp);
        const badge = container.querySelector("#cp-badge-val");
        if (badge) badge.innerText = `CP ${currentCp}`;
      });
      
      cpRange.addEventListener("change", () => {
        renderView();
      });
    }
  } else if (activeTab === "research") {
    container.innerHTML = getResearchHtml();
    
    // Add Event Listeners for Research slots
    container.querySelectorAll(".research-slot").forEach(slot => {
      slot.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        toggleResearch(id);
      });
    });
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

async function loadLiveProfile() {
  let data = null;
  
  // 1. Try fetching local relative file (dev/static mode)
  try {
    const response = await fetch('./live_profile.json');
    if (response.ok) {
      data = await response.json();
    }
  } catch (e) {}

  // 2. If no relative file, try fetching from the Local Companion GUI App (localhost:42069)
  if (!data) {
    try {
      const response = await fetch('http://localhost:42069/profile');
      if (response.ok) {
        data = await response.json();
      }
    } catch (e) {}
  }

  // 3. Apply profile data if loaded
  if (data && !data.error) {
    console.log("Loaded companion profile:", data);
    
    // Auto-apply CP
    if (data.cp) {
      currentCp = data.cp;
      localStorage.setItem("eso_current_cp", currentCp);
    }
    
    // Auto-apply Mundus
    if (data.activeMundus) {
      activeMundus = data.activeMundus;
      localStorage.setItem("eso_active_mundus", activeMundus);
    }
    
    // Auto-apply class
    if (data.class) {
      let matchedClass = "nightblade";
      if (data.class.toLowerCase().includes("arcanist")) {
        matchedClass = "arcanist";
      }
      if (matchedClass !== activeClass) {
        switchClass(matchedClass);
      }
    }
    
    // Auto-apply equipment
    if (data.equipment) {
      const currentEquip = CHARACTER_EQUIPMENT[gearMode] || CHARACTER_EQUIPMENT.pve;
      Object.keys(data.equipment).forEach(slot => {
        if (currentEquip[slot]) {
          if (data.equipment[slot].setName && data.equipment[slot].setName !== "None") {
            currentEquip[slot].set = data.equipment[slot].setName;
          }
          if (data.equipment[slot].trait && data.equipment[slot].trait !== "None") {
            currentEquip[slot].trait = data.equipment[slot].trait;
          }
        }
      });
    }
    // Auto-apply checkedTasks
    if (data.checkedTasks) {
      checkedTasks = data.checkedTasks;
      localStorage.setItem("eso_checked_tasks", JSON.stringify(checkedTasks));
    }
    
    // Auto-check Mount Upgrade task if cooldown is active in-game
    if (typeof data.mountCooldownSeconds === 'number' && data.mountCooldownSeconds > 0) {
      checkedTasks.mount = true;
      localStorage.setItem("eso_checked_tasks", JSON.stringify(checkedTasks));
    }
    
    renderView();
  }
}

function switchTab(tabId) {
  activeTab = tabId;
  localStorage.setItem("eso_active_tab", tabId);
  
  document.querySelectorAll(".nav-item").forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  
  renderView();
}

document.addEventListener("DOMContentLoaded", () => {
  // Setup Navigation listeners
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const tabId = e.currentTarget.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Setup Class Selector listener
  const classSelect = document.getElementById("class-select");
  if (classSelect) {
    classSelect.value = activeClass;
    classSelect.addEventListener("change", (e) => {
      switchClass(e.target.value);
    });
  }

  // Set up initial active class guide references
  switchClass(activeClass);
  
  // Load sync client profile if available
  loadLiveProfile();
});

export interface UserInputs {
  name: string;
  age: number;
  gender: string;
  relationship: string;
  language: string;
  mood: string;
  nickname?: string;
  occupation?: string;
  country?: string;
  favoriteMemory?: string;
  favoriteActivity?: string;
  favoriteCharacter?: string;
  favoriteColor?: string;
  keywords?: string;
}

export interface WishesResult {
  main: string;
  emotional: string;
  funny: string;
  inspirational: string;
  religious: string;
  whatsapp: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  short: string;
  quote: string;
  santa: string;
  gift: string;
  movie: string;
  song: string;
}

// Age classification utility
export function getAgeCategory(age: number): string {
  if (age <= 12) return 'Child';
  if (age <= 19) return 'Teen';
  if (age <= 35) return 'Young Adult';
  if (age <= 55) return 'Adult';
  return 'Senior';
}

// Localized greetings dictionary
const LOCALIZED_GREETINGS: Record<string, string> = {
  'English': 'Merry Christmas!',
  'Telugu': 'క్రిస్మస్ పండుగ శుభాకాంక్షలు! 🎄',
  'Hindi': 'क्रिसमस की हार्दिक शुभकामनाएँ! 🎅',
  'Tamil': 'கிறிஸ்துமஸ் நல்வாழ்த்துக்கள்! 🌟',
  'Kannada': 'ಕ್ರಿಸ್ಮಸ್ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು! 🎁',
  'Malayalam': 'ക്രിസ്മസ് ആശംസകൾ! ❄️',
  'English + Telugu': 'Merry Christmas! క్రిస్మస్ శుభాకాంక్షలు! 🎄❤️'
};

// Selection arrays for random items
const MOVIES = [
  { title: "Home Alone (1990)", desc: "A true classic full of holiday hijinks and cozy nostalgia." },
  { title: "Elf (2003)", desc: "Guaranteed to bring big laughs and spread Christmas cheer loud and clear." },
  { title: "The Polar Express (2004)", desc: "A magical, visual feast that makes you believe in the spirit of Christmas again." },
  { title: "It's a Wonderful Life (1946)", desc: "A deeply heartwarming classic that reminds us of the true value of love and family." },
  { title: "The Christmas Chronicles (2018)", desc: "A modern, action-packed Santa adventure full of fun and high spirits." },
  { title: "Klaus (2019)", desc: "An incredibly animated, touching origin story of Santa Claus that will warm any heart." },
  { title: "A Christmas Carol (2009)", desc: "A fantastic, spooky, and ultimately redemptive holiday tale." },
  { title: "Love Actually (2003)", desc: "A delightful multi-story holiday romance showing love is all around." }
];

const SONGS = [
  { title: "All I Want for Christmas Is You - Mariah Carey", desc: "The ultimate modern holiday anthem to dance around the tree." },
  { title: "Jingle Bell Rock - Bobby Helms", desc: "A classic upbeat tune that gets everyone snapping their fingers." },
  { title: "Silent Night - Franz Xaver Gruber", desc: "A beautiful, serene, and calming hymn for a peaceful Christmas night." },
  { title: "White Christmas - Bing Crosby", desc: "The bestselling single of all time, packed with dreamy, snow-covered nostalgia." },
  { title: "Last Christmas - Wham!", desc: "The ultimate 80s synth-pop festive classic to sing along to." },
  { title: "It's Beginning to Look a Lot Like Christmas - Michael Bublé", desc: "Smooth, velvety vocals that bring immediate warmth and elegance." },
  { title: "Carol of the Bells - Pentatonix", desc: "A thrilling, fast-paced acapella arrangement full of winter energy." }
];

const GIFTS = [
  { item: "Customized Photo Album", desc: "A beautifully curated book of your best moments together." },
  { item: "Cozy Weighted Blanket & Hot Chocolate Kit", desc: "The ultimate winter comfort package for cold nights." },
  { item: "Smart Home Assistant or Portable Speaker", desc: "For filling their home with festive tunes and smart convenience." },
  { item: "Personalized Handwritten Letter & Gift Voucher", desc: "A deeply touching message paired with their favorite shopping brand." },
  { item: "Premium Coffee or Tea Brewing Set", desc: "A rich selection of flavors to start their winter mornings right." },
  { item: "DIY Christmas Goodie Basket", desc: "Handmade cookies, chocolates, and festive candles crafted by you." },
  { item: "Indoor Smart Garden Kit", desc: "A touch of fresh, green life to grow herbs indoors during the winter." }
];

const SANTA_FACTS = [
  "Santa Claus is inspired by St. Nicholas, a generous 4th-century Christian bishop in modern-day Turkey known for helping the poor.",
  "In 1897, an 8-year-old girl wrote to the Sun newspaper, prompting the famous editorial response: 'Yes, Virginia, there is a Santa Claus.'",
  "Santa's red suit was popularized by historical Coca-Cola advertisements in the 1930s drawn by artist Haddon Sundblom.",
  "To deliver gifts to every home on Earth, Santa's sleigh would need to travel at roughly 3,000 times the speed of sound!",
  "In Germany and Austria, Santa has a companion named Krampus, who handles the naughty list with a slightly spooky vibe.",
  "The US military's NORAD tracks Santa's flight every Christmas Eve, a tradition that started in 1955 from a misprinted phone number."
];

const JOKES = [
  { q: "Why does Santa go down the chimney?", a: "Because it soots him!" },
  { q: "What do you call an elf who sings?", a: "A wrapper!" },
  { q: "Why are Christmas trees bad at knitting?", a: "Because they always drop their needles!" },
  { q: "What did Adam say on the day before Christmas?", a: "It's Christmas, Eve!" },
  { q: "What do you get if you cross Santa with a detective?", a: "Santa Clues!" },
  { q: "What is Santa's favorite track event?", a: "The pole vault!" }
];

const TRIVIA = [
  { q: "Which country started the tradition of putting up a Christmas tree?", a: "Germany." },
  { q: "What was the first song played in space in 1965?", a: "Jingle Bells." },
  { q: "How many ghosts appear in Charles Dickens' A Christmas Carol?", a: "Four (Marley, Christmas Past, Present, and Yet to Come)." },
  { q: "Which popular Christmas beverage is also known as 'milk punch'?", a: "Eggnog." },
  { q: "In what country is it a tradition to eat KFC on Christmas Day?", a: "Japan." }
];

const QUOTES = [
  "Christmas waves a magic wand over this world, and behold, everything is softer and more beautiful. — Norman Vincent Peale",
  "Christmas is not a time nor a season, but a state of mind. To cherish peace and goodwill, to be plenteous in mercy, is to have the real spirit of Christmas. — Calvin Coolidge",
  "The best of all gifts around any Christmas tree: the presence of a happy family all wrapped up in each other. — Burton Hillis",
  "Christmas is doing a little something extra for someone. — Charles M. Schulz",
  "He who has not Christmas in his heart will never find it under a tree. — Roy L. Smith"
];

// Helper to select random element
function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Main generation function
export function generateWishes(inputs: UserInputs): WishesResult {
  const {
    name,
    age,
    relationship,
    language,
    mood,
    nickname,
    occupation,
    country,
    favoriteMemory,
    favoriteActivity,
    favoriteCharacter,
    favoriteColor,
    keywords
  } = inputs;

  const displayName = nickname || name;
  const ageCat = getAgeCategory(age);
  const greeting = LOCALIZED_GREETINGS[language] || LOCALIZED_GREETINGS['English'];
  const keywordList = keywords ? keywords.split(',').map(k => k.trim()) : [];
  
  // Custom injections
  const memStr = favoriteMemory ? ` I still smile thinking about ${favoriteMemory}—what a beautiful memory.` : '';
  const actStr = favoriteActivity ? ` I hope you get to enjoy plenty of ${favoriteActivity} this season.` : '';
  const charStr = favoriteCharacter ? ` May your day feel as magical as something out of a story with ${favoriteCharacter}.` : '';
  const colorStr = favoriteColor ? ` Imagine the tree glowing in beautiful shades of ${favoriteColor} just for you.` : '';
  const keywordStr = keywordList.length > 0 ? ` Wishing you a season filled with ${keywordList.join(', ')}.` : '';
  const jobStr = occupation ? ` May you take a wonderful break from your amazing work as a ${occupation}.` : '';

  // 1. MAIN WISH
  let mainWish = `${greeting} Dearest ${displayName}, as a cherished ${relationship}, you bring so much warmth to my life. I hope this Christmas wraps you in joy, love, and wonderful comfort.${memStr}${actStr}${charStr}${colorStr}${keywordStr} Have a magical, blessed, and truly beautiful holiday!`;
  if (language === 'Telugu') {
    mainWish = `నా ప్రియమైన ${relationship} ${displayName} కి ${greeting} ఈ క్రిస్మస్ పండుగ నీ జీవితంలో ఎనలేని సంతోషాన్ని, ఆరోగ్యాన్ని, విజయాలను నింపాలని కోరుకుంటున్నాను.${memStr} క్రిస్మస్ శుభాకాంక్షలు!`;
  } else if (language === 'Hindi') {
    mainWish = `प्रिय ${relationship} ${displayName}, आपको ${greeting} मेरी कामना है कि यह पावन पर्व आपके जीवन में सुख, शांति और समृद्धि लेकर आए।${memStr} क्रिसमस की ढेर सारी बधाई!`;
  }

  // 2. EMOTIONAL WISH
  let emotionalWish = `To my dear ${displayName}, having you as my ${relationship} is one of the greatest blessings in my life. Christmas is a reminder of how precious our bond is. Thank you for always being there. May this holiday bring you peace and fill your heart with absolute contentment.`;
  if (language === 'Telugu') {
    emotionalWish = `నా ప్రియమైన ${displayName}, నా జీవితంలో నీవు నా ${relationship} గా ఉండటం దేవుడిచ్చిన గొప్ప వరం. ఈ పండుగ వేళ నీపై నాకున్న ప్రేమాభిమానాలను తెలియజేస్తున్నాను. నీవు ఎల్లప్పుడూ సంతోషంగా ఉండాలని నా ఆకాంక్ష.`;
  }

  // 3. FUNNY WISH
  let funnyWish = `Merry Christmas, ${displayName}! 🎄 I was going to get you something absolutely incredible, but then I remembered you already have me as a ${relationship}. What more could you possibly ask for? Eat too much, sleep all day, and let's blame Santa! 🎅`;
  if (mood === 'Funny') {
    funnyWish = `Hey ${displayName}, congratulations on surviving another year! I hope Santa fills your socks with cash instead of coal, and may your holiday bills be as light as a snowflake. Enjoy the food before the New Year resolution guilt kicks in! 😂`;
  }

  // 4. INSPIRATIONAL WISH
  let inspirationalWish = `As we look at the glowing lights of Christmas, ${displayName}, remember that your light shines brighter than any decoration. May this season inspire you to dream bigger, love deeper, and step into the New year with strength and confidence. As a wonderful ${ageCat.toLowerCase()}, you have a gorgeous path ahead of you. You've got this, my amazing ${relationship}!`;

  // 5. RELIGIOUS WISH
  let religiousWish = `May the divine grace of our Lord Jesus Christ fill your home with peace, hope, and love this Christmas, ${displayName}. Let us celebrate the miraculous birth of Savior and reflect on His eternal blessings. Have a truly holy and blessed Christmas.`;

  // 6. WHATSAPP STATUS
  const whatsapp = `🎄 Merry Christmas to my wonderful ${relationship}, ${displayName}! Wishing you endless smiles, cozy moments, and holiday cheer! ✨❤️ #Christmas2026`;

  // 7. INSTAGRAM CAPTION
  const instagram = `Sweater weather, festive lights, and spending time with my favorite ${relationship} ${displayName}. 🎄❄️ Couldn't ask for a better holiday season. #MerryChristmas #HolidayVibes #CozySeason`;

  // 8. TWITTER POST
  const twitter = `Wishing my amazing ${relationship} ${displayName} a very Merry Christmas! 🎅 Let the festive season begin. #MerryChristmas #Gratitude`;

  // 9. LINKEDIN GREETING
  let linkedin = `Wishing a very Merry Christmas and a happy holiday season to my esteemed ${relationship}, ${displayName}. ${jobStr ? jobStr : 'Thank you for your valuable support throughout the year. Wishing you continued success and a restful break.'}`;

  // 10. SHORT WISH
  const short = `Merry Christmas, ${displayName}! Sending you lots of love and warm holiday hugs. 🎄❤️`;

  // 11. CHRISTMAS QUOTE
  const quote = `"${getRandom(QUOTES)}" — Sending you this inspiring quote to brighten your Christmas day, ${displayName}!`;

  // 12. SANTA MESSAGE
  const santa = `Ho Ho Ho! 🎅 Greetings from the North Pole, ${displayName}! Rudolph and I are flying all the way to ${country || 'your home'} because we checked our list twice, and we see you've been an absolutely wonderful ${relationship} this year. Keep spreading that beautiful smile! 🎁🦌`;


  // 13. GIFT SUGGESTION
  const selectedGift = getRandom(GIFTS);
  const gift = `🎁 Recommended Gift for ${displayName}: "${selectedGift.item}". Rationale: ${selectedGift.desc} (Fits beautifully with their favorite color ${favoriteColor || 'red'} or activity ${favoriteActivity || 'holiday bonding'}).`;

  // 14. MOVIE RECOMMENDATION
  const selectedMovie = getRandom(MOVIES);
  const movie = `🎬 Recommended Movie Night: "${selectedMovie.title}". Description: ${selectedMovie.desc} (Perfect to watch while enjoying ${favoriteActivity || 'cozy fireside chats'}).`;

  // 15. SONG RECOMMENDATION
  const selectedSong = getRandom(SONGS);
  const song = `🎵 Festive Tune of the Day: "${selectedSong.title}". Description: ${selectedSong.desc} (Great addition to your holiday playlist!).`;

  // Apply customizations to each based on options
  return {
    main: mainWish,
    emotional: emotionalWish,
    funny: funnyWish,
    inspirational: inspirationalWish,
    religious: religiousWish,
    whatsapp,
    instagram,
    twitter,
    linkedin,
    short,
    quote,
    santa,
    gift,
    movie,
    song
  };
}

// Extra static helpers
export const SANTA_FACT = () => getRandom(SANTA_FACTS);
export const CHRISTMAS_JOKE = () => getRandom(JOKES);
export const CHRISTMAS_TRIVIA = () => getRandom(TRIVIA);
export const DAILY_QUOTE = () => getRandom(QUOTES);
export const RANDOM_RECIPE = () => {
  const recipes = [
    { title: "Festive Gingerbread Cookies", desc: "A delightful holiday treat baked with ginger, cinnamon, molasses, and decorated with white icing." },
    { title: "Classic Spiced Eggnog", desc: "A smooth, creamy traditional beverage flavored with vanilla, nutmeg, and a splash of milk." },
    { title: "Hot Chocolate Peppermint Melt", desc: "Warm milk chocolate mixed with crushed candy canes, topped with mini marshmallows and chocolate drizzle." },
    { title: "Roast Cranberry & Pecan Brie", desc: "Baked brie cheese topped with warm, sweet cranberry sauce and toasted pecans, served with crackers." }
  ];
  return getRandom(recipes);
};

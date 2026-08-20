import 'dotenv/config'
import { PrismaClient } from '../generated/db'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Use DIRECT_URL (non-pooled) so the seed script works outside pgBouncer
const pool = new Pool({ connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })



const articles = [
  {
    title: 'What to do when malaria hits at midnight',
    slug: 'what-to-do-when-malaria-hits',
    category: 'Malaria',
    excerpt:
      'Most students wait too long before acting. Here is exactly what to do in the first 6 hours when you suspect malaria.',
    readTime: '4 min read',
    author: 'Comfort Health Pharmacist',
    isPublished: true,
    isFeatured: true,
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2960&auto=format&fit=crop',
    tags: ['malaria', 'emergency', 'symptoms', 'treatment'],
    content: `# What to do when malaria hits at midnight

Malaria is one of the most common health challenges facing university students in Ghana. Knowing what to do in the first few hours can make a significant difference in how quickly you recover.

## Recognising the symptoms

The classic signs of malaria include:
- Sudden high fever (above 38°C)
- Severe headache
- Chills and shivering
- Body aches and fatigue
- Nausea and sometimes vomiting
- Sweating

These symptoms can appear suddenly, often at night, which is why many students find themselves sick at midnight with no immediate access to a pharmacy.

## What to do in the first 6 hours

**Step 1 — Take your temperature**
If you have a thermometer, check your temperature. A fever above 38°C combined with the symptoms above strongly suggests malaria. If you do not have a thermometer, note whether you feel unusually hot to the touch.

**Step 2 — Take paracetamol immediately**
Paracetamol (650mg for adults) will help bring down your fever and reduce body pain while you arrange treatment. This is not a treatment for malaria — it only manages your symptoms temporarily.

**Step 3 — Stay hydrated**
Fever causes significant fluid loss. Drink water consistently. Oral Rehydration Salts (ORS) are even better if you have them.

**Step 4 — Get a malaria test as soon as possible**
The only way to confirm malaria is through a Rapid Diagnostic Test (RDT) or blood smear. Most pharmacies and clinics offer these. The UMaT campus clinic provides testing services.

**Step 5 — Start treatment immediately after confirmation**
If the test confirms malaria, begin treatment immediately. Common first-line treatments in Ghana include Artemisinin-based Combination Therapies (ACTs) such as Artesunate-Amodiaquine or Artemether-Lumefantrine.

## Critical warning

**Never self-treat without confirmation.** Taking antimalarials without a positive test result contributes to drug resistance and can mask other conditions that need different treatment.

**Complete the full course.** Even if you feel better after 2 days, completing the full treatment course is essential. Stopping early allows the parasite to survive and return stronger.

## When to go to the hospital immediately

Go to the campus clinic or hospital without delay if you experience:
- Confusion or difficulty thinking clearly
- Inability to keep fluids down
- Seizures
- Difficulty breathing
- Fever above 40°C
- Symptoms that are getting worse rapidly

These may indicate severe malaria which requires intravenous treatment in a medical facility.

## Prevention is always better

- Sleep under a treated mosquito net every night
- Use mosquito repellent especially in the evenings
- Wear long sleeves during peak mosquito hours (dusk to dawn)
- Eliminate standing water near your accommodation

*This article is for educational purposes only. Always consult a licensed healthcare provider for personal medical decisions.*`,
  },
  {
    title: 'Paracetamol vs Ibuprofen — which one should you take?',
    slug: 'paracetamol-vs-ibuprofen',
    category: 'Medications',
    excerpt:
      'Both reduce pain and fever but they work differently and are right for different situations. Here is how to choose.',
    readTime: '3 min read',
    author: 'Comfort Health Pharmacist',
    isPublished: true,
    isFeatured: false,
    tags: ['paracetamol', 'ibuprofen', 'pain relief', 'fever'],
    content: `# Paracetamol vs Ibuprofen — which one should you take?

Two of the most commonly used medicines in Ghana are Paracetamol and Ibuprofen. Many students take whichever one they have available without knowing the difference. Understanding when to use each one helps you get better faster and avoid side effects.

## What is Paracetamol?

Paracetamol (also called Acetaminophen) is a pain reliever and fever reducer. It works in the brain to reduce your perception of pain and lower your body temperature.

**Best for:**
- Headaches
- Fever (including malaria fever)
- General body pain
- Toothache
- Period pain

**Safe for:** Almost everyone including people with stomach problems, pregnant women (under medical guidance), and people taking blood thinners.

**Standard adult dose:** 500mg to 1000mg every 4 to 6 hours. Maximum 4000mg per day.

## What is Ibuprofen?

Ibuprofen is a Non-Steroidal Anti-Inflammatory Drug (NSAID). It reduces pain, fever AND inflammation. This makes it more powerful for certain conditions.

**Best for:**
- Muscle pain and sports injuries
- Dental pain
- Menstrual cramps
- Swelling and inflammation
- Back pain
- Arthritis

**NOT safe for:** People with stomach ulcers, kidney problems, or heart conditions. Avoid on an empty stomach.

**Standard adult dose:** 200mg to 400mg every 4 to 6 hours with food. Maximum 1200mg per day without medical supervision.

## Quick decision guide

| Situation | Take this |
|---|---|
| Fever from malaria or flu | Paracetamol |
| Headache | Paracetamol |
| Twisted ankle with swelling | Ibuprofen |
| Period cramps | Ibuprofen |
| General body pain | Either |
| Stomach is empty | Paracetamol |
| Stomach ulcer history | Paracetamol only |

## Can you take both together?

Yes, under certain circumstances paracetamol and ibuprofen can be taken together because they work through different mechanisms. However this should only be done when one alone is not providing adequate relief and you should speak to a pharmacist first.

*This article is for educational purposes only. Always consult a licensed healthcare provider for personal medical decisions.*`,
  },
  {
    title: 'Why you should never share antibiotics with a friend',
    slug: 'why-you-should-never-share-antibiotics',
    category: 'Medications',
    excerpt:
      'It feels helpful but sharing antibiotics is one of the most dangerous health mistakes students make. Here is why.',
    readTime: '3 min read',
    author: 'Comfort Health Pharmacist',
    isPublished: true,
    isFeatured: false,
    tags: ['antibiotics', 'medication safety', 'resistance'],
    content: `# Why you should never share antibiotics with a friend

On university campuses across Ghana, sharing antibiotics between friends is extremely common. Someone gets sick, a roommate has leftover Amoxicillin, and they share it. It feels helpful and practical. But it is one of the most dangerous health habits that exists. Here is exactly why.

## Antibiotics only work for bacterial infections

The most important thing to understand about antibiotics is that they only treat bacterial infections. They do absolutely nothing against viruses.

The common cold, flu, most sore throats, and COVID-19 are caused by viruses. Taking antibiotics for these conditions does not help you recover faster. It does nothing for the infection. But it does cause significant harm in other ways.

## The wrong antibiotic can make you worse

Different antibiotics work against different types of bacteria. Amoxicillin works against certain bacteria. Ciprofloxacin works against others. Metronidazole works against a completely different category.

If your friend has a urinary tract infection (UTI) and gives you their antibiotics for what you think is a similar infection, you may be taking the wrong antibiotic entirely. Some infections will get worse if treated with the wrong antibiotic.

## Incomplete courses cause resistance

Antibiotic resistance is one of the most serious global health crises of our time. It happens when bacteria evolve to survive antibiotic treatment. This evolution is accelerated when people:
- Take antibiotics they do not need
- Stop taking them before completing the full course
- Take someone else's leftover antibiotics

When you share antibiotics, the recipient often takes only a few days worth. This kills the weak bacteria but leaves the stronger ones alive. Those stronger bacteria multiply and become harder to treat.

## What to do instead

If you are sick and think you need antibiotics:
1. Visit the campus clinic for proper diagnosis
2. Get a prescription from a licensed doctor
3. Complete the FULL course even when you feel better
4. Never save leftover antibiotics for later

*This article is for educational purposes only. Always consult a licensed healthcare provider for personal medical decisions.*`,
  },
  {
    title: 'Managing exam anxiety — strategies that actually work',
    slug: 'managing-exam-anxiety',
    category: 'Mental Health',
    excerpt:
      'Exam stress is real and it affects academic performance. These evidence-based strategies help you stay calm and focused.',
    readTime: '5 min read',
    author: 'Comfort Health Team',
    isPublished: true,
    isFeatured: false,
    tags: ['mental health', 'anxiety', 'exams', 'stress', 'students'],
    content: `# Managing exam anxiety — strategies that actually work

Exam season at UMaT and universities across Ghana is one of the most stressful periods in any student's life. A certain level of stress is normal and even helpful — it motivates you to prepare. But when anxiety becomes overwhelming, it actually impairs the very memory and thinking ability you need to perform well.

## Understanding exam anxiety

Exam anxiety is not a sign of weakness or poor preparation. It is a physiological response where your body's stress system activates in anticipation of a perceived threat. Your heart rate increases, your breathing quickens, and your brain shifts into a defensive mode that is actually counterproductive for complex thinking.

Recognising what is happening in your body is the first step to managing it.

## Strategies that genuinely work

**1. Prepare consistently, not frantically**
The most effective anxiety reducer is genuine preparation spread over time. Cramming the night before increases anxiety because your brain knows you are not ready. Consistent study over weeks builds genuine confidence.

**2. Control your breathing**
When anxiety spikes — before an exam or during — slow your breathing deliberately. Breathe in for 4 counts, hold for 4, breathe out for 6. This activates your parasympathetic nervous system and physically calms the stress response within minutes.

**3. Sleep is not optional**
Many students sacrifice sleep during exam season believing more study hours compensate. The opposite is true. Sleep is when your brain consolidates memories and learning. A student who studies for 6 hours and sleeps 8 hours will outperform a student who studies for 10 hours and sleeps 4.

**4. Eat before your exam**
Your brain consumes approximately 20% of your body's energy. Sitting an exam on an empty stomach impairs concentration, increases irritability, and worsens anxiety. Eat a balanced meal with complex carbohydrates 1 to 2 hours before your exam.

**5. Exercise regularly during exam season**
Even 20 minutes of walking per day significantly reduces cortisol (the stress hormone) and improves mood and cognitive function. This is not a luxury — it is a performance strategy.

**6. Reframe the anxiety**
Research by psychologist Alison Wood Brooks found that people who said "I am excited" before a performance task outperformed those who tried to calm themselves down. Anxiety and excitement are physiologically similar. Telling yourself you are excited rather than anxious can genuinely improve performance.

## When to seek help

If anxiety is so severe that you cannot study, sleep, or function normally, speak to someone. The UMaT student support services exist for this reason. You are not alone and there is no shame in asking for help.

*This article is for educational purposes only. Always consult a licensed healthcare provider for personal medical decisions.*`,
  },
  {
    title: 'What to eat during exam season to stay sharp',
    slug: 'what-to-eat-during-exam-season',
    category: 'Nutrition',
    excerpt:
      'What you eat directly affects how well your brain works. These foods help you stay focused, energised, and sharp during exams.',
    readTime: '4 min read',
    author: 'Comfort Health Team',
    isPublished: true,
    isFeatured: false,
    tags: ['nutrition', 'exams', 'brain health', 'food', 'energy'],
    content: `# What to eat during exam season to stay sharp

Your brain is approximately 2% of your body weight but consumes around 20% of your energy. What you eat during exam season directly determines how well your memory, concentration, and problem-solving work when you need them most.

## Foods that genuinely improve brain function

**Eggs**
Eggs are one of the best brain foods available and they are affordable in Ghana. They contain choline, which your brain uses to produce acetylcholine — a neurotransmitter essential for memory and learning. Eating two eggs for breakfast before studying or before an exam is one of the most evidence-backed nutrition strategies for students.

**Groundnuts (peanuts)**
Groundnuts are rich in Vitamin E, healthy fats, and protein. Vitamin E protects brain cells from oxidative stress. A handful of groundnuts as a snack during study sessions is both affordable and genuinely beneficial.

**Bananas**
Bananas provide glucose (brain fuel), Vitamin B6 (which helps produce serotonin and norepinephrine that affect mood and focus), and potassium. They are one of the best quick energy snacks before an exam.

**Beans and legumes**
Beans are rich in complex carbohydrates that release energy slowly, keeping your blood sugar stable for hours. Stable blood sugar means stable concentration. A meal of rice and beans before a long exam session is an excellent choice.

**Water**
Dehydration impairs cognitive function more than almost any other nutritional factor. Even mild dehydration of 1-2% reduces memory, attention, and mood. Drink water consistently throughout the day. Aim for at least 8 glasses. This is especially important in Tarkwa's heat.

## What to avoid during exam season

**Excessive caffeine**
One or two cups of tea or coffee can improve alertness. More than that increases anxiety, disrupts sleep, and creates energy crashes that impair performance. Many students drink far too much caffeine during exam season and it makes their anxiety significantly worse.

**Sugary snacks and energy drinks**
Sugary snacks cause rapid blood sugar spikes followed by crashes. The crash hits exactly when you need to be focused. Energy drinks combine excessive caffeine with sugar — a combination that feels helpful briefly but impairs performance.

**Heavy, fatty meals before exams**
Large fatty meals redirect blood flow to your digestive system and away from your brain. Eat light, nutritious meals before exams rather than heavy ones.

## A practical exam day meal plan

**Morning:** Eggs (any style) with bread or rice, a banana, water

**Mid-morning snack:** Groundnuts or fruit

**Lunch (if exams are afternoon):** Rice and beans or kenkey with fish, water

**Before evening study:** Light snack — fruit, groundnuts, or bread with eggs

*This article is for educational purposes only. Always consult a licensed healthcare provider for personal medical decisions.*`,
  },
  {
    title: 'Exam season health guide — staying sharp all the way through',
    slug: 'exam-season-health-guide',
    category: 'Nutrition',
    excerpt:
      'The vitamins, sleep habits, and foods that top students use to stay sharp when it matters most.',
    readTime: '5 min read',
    author: 'Comfort Health Team',
    isPublished: true,
    isFeatured: false,
    tags: ['exams', 'nutrition', 'sleep', 'vitamins', 'performance'],
    content: `# Exam season health guide — staying sharp all the way through

Every student wants to perform their best during exams. But the habits around exam season — the late nights, the skipped meals, the energy drinks — often make performance worse, not better. This guide covers what actually works.

## The three pillars of exam performance

Your academic performance during exam season is built on three foundations: sleep, nutrition, and stress management. Neglecting any one of them undermines the other two.

## Sleep — the most undervalued study tool

Sleep is when your brain moves information from short-term to long-term memory. This process cannot happen if you are not sleeping.

**What top-performing students do:**
- Maintain consistent sleep times even during exam season
- Aim for 7 to 9 hours per night
- Avoid screens for 30 minutes before bed
- Keep their room cool and dark

**What hurts your performance:**
- All-night study sessions (they impair recall the next day)
- Inconsistent sleep schedules
- Relying on caffeine to stay awake

## Vitamins worth taking during exam season

**Vitamin B-complex**
B vitamins support energy production and nervous system function. They are water-soluble, meaning your body excretes what it does not use. They are safe to supplement and genuinely helpful during high-stress periods.

**Vitamin C**
Stress depletes Vitamin C stores. Supplementing 500mg daily during exam season supports immune function and helps manage cortisol levels.

**Magnesium**
Many students are deficient in magnesium, especially those who drink a lot of caffeine. Magnesium helps with sleep quality and reduces anxiety. Take 200-400mg before bed.

## The 20-minute rule for breaks

Research consistently shows that studying for more than 90 minutes without a break reduces retention and increases fatigue. Every 90 minutes, take a genuine 15-20 minute break:
- Walk outside
- Eat a snack
- Do some light stretching

This is not wasted time. It is an investment in the quality of your next study session.

*This article is for educational purposes only. Always consult a licensed healthcare provider for personal medical decisions.*`,
  },
]

async function seedArticles() {
  console.log('🌱 Seeding health articles...\n')

  for (const article of articles) {
    await prisma.healthArticle.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    })
    console.log(`  ✅ ${article.title}`)
  }

  const count = await prisma.healthArticle.count({ where: { isPublished: true } })
  console.log(`\n✅ Done — ${count} published articles in database`)
  await prisma.$disconnect()
}

seedArticles().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})

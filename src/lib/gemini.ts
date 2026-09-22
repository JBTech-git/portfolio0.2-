import { profile, formatExperienceLabel, getExperienceDuration } from '../data/profile'
import { projects } from '../data/projects'
import { experience } from '../data/experience'
import { skillGroups } from '../data/skills'

const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.6-flash'
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined

export function hasGeminiKey() {
  return Boolean(API_KEY?.trim())
}

export function buildPortfolioContext() {
  const exp = formatExperienceLabel(getExperienceDuration())
  const projectLines = projects
    .map(
      (p, i) =>
        `${i + 1}. ${p.title} — ${p.desc} (tags: ${p.tags.join(', ')})${
          p.status === 'placeholder' ? ' [placeholder]' : ''
        }${p.github && p.github !== '#' ? ` · ${p.github}` : ''}`,
    )
    .join('\n')
  const experienceLines = experience
    .map((e) => `${e.dates}: ${e.role} @ ${e.org} (${e.type}) — ${e.desc}`)
    .join('\n')
  const educationLines = experience
    .filter((e) => e.type === 'education')
    .map((e) => `${e.dates}: ${e.role} @ ${e.org} (${e.location}) — ${e.desc}`)
    .join('\n')
  const workLines = experience
    .filter((e) => e.type === 'work')
    .map((e) => `${e.dates}: ${e.role} @ ${e.org} (${e.location}) — ${e.desc}`)
    .join('\n')

  return `You are DEV-AI, a concise portfolio assistant for ${profile.name}.
Answer only using the portfolio facts below. Be friendly, clear, and brief (2–6 sentences unless listing items).
If the user greets you (hi, hello, hey, good morning, how are you, etc.), reply warmly and naturally like a helpful human would — then invite them to ask about Jayanta.
Only answer questions about Jayanta Barman: his skills, projects, experience, qualifications, education, background, interests, strengths, resume, contact, employer, location, and other portfolio-related topics.
If the question is about anything else (general knowledge, other people, coding help, homework, news, jokes, or unrelated tasks), do not answer it.
Reply with exactly: "DEV-AI only answers questions about Jayanta Barman — his skills, projects, experience, qualifications, education, background, interests, resume, contact, and other portfolio-related topics."
Never invent employers, degrees, or projects that are not listed.

PROFILE
- Name: ${profile.name}
- Role: ${profile.role}
- Location: ${profile.location}
- Experience: ${exp}
- Focus: ${profile.focus}
- Stack: ${profile.primaryStack.join(', ')}
- Summary: ${profile.summary}
- Email: ${profile.email}
- Phone: ${profile.phone}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- WhatsApp: ${profile.whatsapp}
- Site: ${profile.site}
- Free AI resume builder: ${profile.resumeBuilder}

ABOUT
${profile.humanAbout.map((l) => `- ${l}`).join('\n')}

EXPLORING
${profile.exploring.map((l) => `- ${l}`).join('\n')}

EDUCATION / QUALIFICATIONS
${educationLines}

WORK EXPERIENCE
${workLines}

FULL TIMELINE
${experienceLines}

PROJECTS
${projectLines}

SKILLS
- Backend: ${skillGroups.Backend.join(', ')}
- Frontend: ${skillGroups.Frontend.join(', ')}
- Infrastructure: ${skillGroups.Infrastructure.join(', ')}
- Soft skills: ${skillGroups.SoftSkills.join(', ')}

STATS
- Projects delivered: ${profile.stats.projectsDelivered}
- Happy clients: ${profile.stats.happyClients}
`
}

type ChatTurn = { role: 'user' | 'model'; text: string }

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> }
    finishReason?: string
  }>
  error?: { message?: string }
}

export async function askGemini(question: string, history: ChatTurn[] = []): Promise<string> {
  if (!API_KEY?.trim()) {
    throw new Error('Missing VITE_GEMINI_API_KEY')
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

  const contents = [
    ...history.map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
    { role: 'user' as const, parts: [{ text: question }] },
  ]

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY.trim(),
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildPortfolioContext() }],
      },
      contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 1024,
      },
    }),
  })

  const data = (await res.json()) as GeminiResponse

  if (!res.ok) {
    throw new Error(data.error?.message || `Gemini HTTP ${res.status}`)
  }

  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim()
  if (!text) {
    throw new Error('Gemini returned an empty response')
  }
  return text
}

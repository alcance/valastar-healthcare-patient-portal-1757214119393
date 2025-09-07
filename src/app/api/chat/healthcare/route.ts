import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase'

// Initialize OpenAI client
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }
  return new OpenAI({ apiKey })
}

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json()

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Get OpenAI client
    const openai = getOpenAIClient()

    // Default healthcare system prompt
    const defaultSystemPrompt = `You are a helpful healthcare assistant for a medical portal. You provide general health information and guidance, but you always remind users to consult with qualified healthcare professionals for medical advice, diagnosis, or treatment.

Key guidelines:
- Be helpful and empathetic
- Provide general health information only
- Never diagnose or recommend specific treatments
- Always suggest consulting healthcare professionals for medical concerns
- Keep responses concise and clear
- If asked about emergency symptoms, recommend immediate medical attention
- Respect patient privacy and confidentiality`

    // Prepare messages for OpenAI
    const openAIMessages = [
      {
        role: 'system' as const,
        content: systemPrompt || defaultSystemPrompt
      },
      ...messages.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    ]

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: openAIMessages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    })

    const assistantMessage = completion.choices[0]?.message?.content

    if (!assistantMessage) {
      throw new Error('No response from OpenAI')
    }

    // Optional: Log conversation to database for analytics/improvement
    try {
      const supabase = createClient()
      await supabase.from('chat_logs').insert({
        user_message: messages[messages.length - 1]?.content,
        assistant_response: assistantMessage,
        created_at: new Date().toISOString()
      })
    } catch (logError) {
      // Don't fail the request if logging fails
      console.warn('Failed to log conversation:', logError)
    }

    return NextResponse.json({
      content: assistantMessage,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Healthcare chat API error:', error)
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI integration not configured' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
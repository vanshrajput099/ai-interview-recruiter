import { Camera, Computer, DollarSign, LayoutDashboard, Puzzle, Settings, User, Users, Workflow } from "lucide-react";

export const interview_type =
    [
        {
            name: "Technical",
            id: "technical",
            icon: Computer
        },
        {
            name: "Behavioural",
            id: "behavioural",
            icon: User
        },
        {
            name: "Experience",
            id: "experience",
            icon: Workflow
        },
        {
            name: "Problem Solving",
            id: "problem_solving",
            icon: Puzzle
        },
        {
            name: "Leadership",
            id: "leadership",
            icon: Users
        }
    ]

export const PROMPT = `
    You are an expert technical interviewer.
    Based on the following inputs, generate a well-structured list of high - quality interview questions:
    Job Title: {{jobTitle}}
    Job Description: {{jobDescription}}
    Interview Duration: {{duration}}
    Interview Type: {{type}}
    
    📝 Your task:
    Analyze the job description to identify key responsibilities, required skills, and expected experience.
    Generate a list of interview questions depends on interview duration
    Adjust the number and depth of questions to match the interview duration.
    Ensure the questions match the tone and structure of a real - life { { type } } interview.
    ❌ Format your response in JSON format with array list of questions.
    format: interviewQuestions = [
        {
            question: "",
            type: 'Technical/Behavioral/Experience/Problem Solving/Leasership'
        }, {
            ...
    }]
    🎯 The goal is to create a structured, relevant, and time - optimized interview plan for a {{jobTitle}} role.`

export const assistantOptions = {
    name: "AI Recruiter",
    firstMessage: "Hi {{userName}}, how are you? Ready for your interview on {{JobPosition}}?",
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
    },
    voice: {
        provider: "playht",
        voiceId: "jennifer",
    },
    model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `
      You are an AI voice assistant conducting interviews.
      Your job is to ask candidates interview questions, assess their responses.
      Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
      "Hey there! Welcome to your {{JobPosition}} interview. Let’s get started with a few questions!"
      Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions ask one by one:
      Questions: {{questionList}}
      If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
      "Need a hint? Think about how React tracks component updates!"
      Provide brief, encouraging feedback after each answer. Example:
      "Nice! That’s a solid answer."
      "Hmm, not quite! Want to try again?"
      Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
      After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
      "That was great! You handled some tough questions well. Keep sharpening your skills!"
      End on a positive note:
      "Thanks for chatting! Hope to see you crushing projects soon!"
      Key Guidelines:
      ✅ Be friendly, engaging, and witty
      ✅ Keep responses short and natural, like a real conversation
      ✅ Adapt based on the candidate’s confidence level
      ✅ Ensure the interview remains focused on React
      `.trim(),
            },
        ],
    },
};

export const feedbackPROMPT = `
{{conversation}}
Depends on this Interview Conversation between assistant and user,
Be very strict on the basis of the conversation , If conversation is less or very less give all the marks as 0
Be more and more strict please
Give me feedback for user interview.Give me rating out of 10 for technical Skills,
Communication, Problem Solving, Experince.Also give me summery in 3 lines  
about the interview and one line to let me know whether is recommanded
for hire or not with msg.Give me response in JSON format
{
    feedback: {
        rating: {
            techicalSkills: 5,
                communication: 6,
                    problemSolving: 4,
                        experince: 7
        },
        summery: <in 3 Line >,
            Recommendation: '',
                RecommendationMsg: ''
    }
}`

export const sideBar = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard"
    },
    {
        name: "Scheduled Interviews",
        icon: Camera,
        href: "/scheduled-interview"
    },
    {
        name: "All Interviews",
        icon: Computer,
        href: "/all-interview"
    },
    {
        name: "Billing",
        icon: DollarSign,
        href: "/pricing"
    },
]

export const colors = [
    { color: "bg-purple-700" }, { color: "bg-red-700" }, { color: "bg-blue-700" }, { color: "bg-green-700" }, { color: "bg-yellow-700" }
]

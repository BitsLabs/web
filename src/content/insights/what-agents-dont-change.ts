import type { Article } from "./types";

export const whatAgentsDontChange: Article = {
  slug: "what-agents-dont-change",
  date: "2026-08-16",
  readingMinutes: 7,
  content: {
    en: {
      title: "What Agents Don't Change",
      description:
        "Production is the cheap part now. The things that actually made a business hard — distribution, trust, judgment, permission — did not get any easier.",
      body: [
        {
          type: "paragraph",
          text: "There is a particular kind of excitement that arrives the first time you watch an agent do a day of work in four minutes. It is not fake. The capability is real, it is improving quickly, and anyone who dismisses it because the early demos were clumsy is going to be wrong in an expensive way.",
        },
        {
          type: "paragraph",
          text: "But something odd happens when teams try to turn that excitement into a business. The agent works. The pipeline runs. And the company still does not. We keep seeing the same pattern, and it is worth naming plainly: in almost every agent-first business we have looked at, the agent was not the hard part. The hard part was everything the agent was never going to touch.",
        },
        {
          type: "heading",
          text: "Production was never the moat",
        },
        {
          type: "paragraph",
          text: "Most businesses that look automatable are really a chain of three things: producing something, getting it in front of someone, and being trusted enough that they act on it. Agents have made the first link dramatically cheaper. They have done almost nothing to the other two.",
        },
        {
          type: "paragraph",
          text: "This matters more than it sounds, because cheap things do not create advantage. The moment a capability becomes available to everyone with a credit card, it stops being a differentiator and becomes a baseline. If your plan is \"we can generate this at scale,\" your plan is available to your competitors at the same price, on the same afternoon. Whatever was scarce before the agents arrived is still scarce. That is where the business is.",
        },
        {
          type: "heading",
          text: "The bottleneck moves; it doesn't disappear",
        },
        {
          type: "paragraph",
          text: "When you remove a constraint, you do not get an unconstrained system. You get a system constrained somewhere else, usually somewhere with much less code in it. You can generate ten thousand of something tonight. You cannot get ten thousand strangers to care by morning, and no amount of orchestration will change that.",
        },
        {
          type: "paragraph",
          text: "So the first question for an agent-first business is not what the agent can produce. It is: once production is free, what is the next thing that runs out? Attention. Permission. Trust. Regulatory headroom. Someone's willingness to reply. Find that ceiling before you build, because it determines whether the business exists at all — and it is almost never fixed by better prompts.",
        },
        {
          type: "heading",
          text: "Automate production, never participation",
        },
        {
          type: "paragraph",
          text: "This is the single most useful operating rule we have found, and it draws a clean line through most of the hard cases.",
        },
        {
          type: "paragraph",
          text: "Generating a hundred pieces of work in a batch is leverage. Showing up in a hundred conversations as though you were a person is something else entirely — and every platform, community, and legal system treats it as something else entirely. The distinction is not about how good the output is. It is about whether the other party believes they are dealing with a human being, and whether that belief is true.",
        },
        {
          type: "paragraph",
          text: "Cross that line and the failure mode is not a bad review. It is a permanent ban, a regulator, or a reputation in a small market that you cannot rebuild. Stay on the production side of it and agents are close to pure upside.",
        },
        {
          type: "heading",
          text: "Design around reversibility, not capability",
        },
        {
          type: "paragraph",
          text: "The instinctive question when building with agents is \"what can it do?\" It is the wrong question, because the answer keeps growing and it tells you nothing about how to build. The useful question is: what happens if it does this wrong five hundred times before anyone notices?",
        },
        {
          type: "paragraph",
          text: "That reframing gives you an architecture almost for free. Reversible work — drafting, transforming, analysing, anything that lives inside your own systems — can run unattended, because the cost of being wrong is the cost of running it again. Irreversible or outward-facing work — anything that reaches a third party, moves money, or cannot be recalled — needs a gate. Not because the agent is unreliable, but because the asymmetry is brutal: the marginal cost of being wrong is nearly zero, and the marginal cost of being publicly wrong at scale is nearly unbounded.",
        },
        {
          type: "heading",
          text: "Put the gate where it scales",
        },
        {
          type: "paragraph",
          text: "Having decided that something needs human approval, most teams put the gate in the obvious place: on each artifact. Every output gets reviewed before it goes out. This feels responsible and it works beautifully at ten items a day. At a thousand, you have not built an automated business. You have hired yourself as a reviewer, and the agent has become a machine for generating your homework.",
        },
        {
          type: "paragraph",
          text: "The fix is to move the gate up a level. Approve the template, the policy, the class of action — once, carefully — and let the per-item decision become mechanical. A good gate is roughly constant in your attention as volume grows. If your review time scales linearly with output, the automation is not finished; it has just relocated the labour.",
        },
        {
          type: "quote",
          text: "If reviewing the work scales linearly with producing it, you have not automated the business. You have automated your way into a queue.",
        },
        {
          type: "heading",
          text: "Checks beat instructions",
        },
        {
          type: "paragraph",
          text: "Everyone building with language models learns to write careful instructions. Fewer teams learn the more important lesson: instructions reduce a class of failure, but verification eliminates it.",
        },
        {
          type: "paragraph",
          text: "If an agent asserts something that will reach a customer — a fact, a figure, a claim about their business — that assertion should be checkable against source data by a piece of code that has no opinions. Anything that cannot be traced back to a fact you actually hold does not ship. This is unglamorous work and it is the difference between a system you can leave running and a system that quietly embarrasses you at volume.",
        },
        {
          type: "paragraph",
          text: "The pattern that holds up: the agent proposes, code verifies, a human approves the policy rather than the instance.",
        },
        {
          type: "heading",
          text: "The ceilings you can't code around",
        },
        {
          type: "paragraph",
          text: "Every agent-first business eventually meets a limit that has nothing to do with its architecture. Rate limits. Delivery reputation. Platform terms. Consent rules that differ by country and do not care how elegant the pipeline is. These are not edge cases to handle later; they are frequently the actual shape of the business.",
        },
        {
          type: "paragraph",
          text: "The expensive mistake is discovering them last — after the system is built, when the answer is not a refactor but a different plan. Find the externally imposed ceiling first. If it turns out that the thing you wanted to do at scale is only lawful, or only deliverable, at a fraction of that scale, you would much rather know in week one than in month five.",
        },
        {
          type: "heading",
          text: "Supervision is a system, not a moment",
        },
        {
          type: "paragraph",
          text: "As soon as software acts on your behalf in the world, someone remains accountable for what it did, and it is not the software. That accountability does not require you to personally read everything — which is impossible and would defeat the point. It requires that a system existed: a gate that was actually enforced, a log of what ran and why, a separation between proposing an action and executing it.",
        },
        {
          type: "paragraph",
          text: "Build that early. Retrofitting an audit trail onto a system that has already been acting autonomously for six months is one of the least enjoyable projects in software, and the moment you need it is precisely the moment you cannot create it.",
        },
        {
          type: "heading",
          text: "What this adds up to",
        },
        {
          type: "paragraph",
          text: "Agent-first does not mean software does the work and you collect the proceeds. It means the scarce resource shifts. Your attention stops going into producing things and starts going into deciding things — which templates are good enough, which actions are safe to delegate, where the real ceiling sits, what must never be automated at all.",
        },
        {
          type: "paragraph",
          text: "That is a genuinely better place to spend a founder's attention, and it is why the shift is worth making. But it is a shift in where the difficulty lives, not a removal of it. The businesses that work are the ones that let agents take the cheap half and then put serious, human effort into the half that stayed expensive.",
        },
      ],
    },
  },
};

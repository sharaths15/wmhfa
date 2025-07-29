import { LifeBuoy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromptSuggestion = ({ text }: { text: string }) => (
  <button className="p-4 bg-surface border border-border rounded-lg text-left hover:border-primary hover:bg-primary/5 transition-all duration-200">
    <p className="font-semibold text-text">{text}</p>
    <p className="text-sm text-text-light">Get help with this topic</p>
  </button>
);

export const AISupportPage = () => {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full w-48 h-48 -z-10 animate-pulse"></div>
            <LifeBuoy className="text-primary" size={72} />
          </div>
          <h2 className="text-4xl font-extrabold mt-6 text-text">
            How can I support you?
          </h2>
          <p className="text-text-light mt-2 max-w-lg">
            I'm your MHFAider assistant. Ask me about resources, conversation
            starters, or de-escalation techniques.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-12 w-full">
          <PromptSuggestion text="Starting a difficult conversation" />
          <PromptSuggestion text="Finding local mental health resources" />
          <PromptSuggestion text="Self-care tips for First Aiders" />
          <PromptSuggestion text="Understanding workplace anxiety" />
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="relative">
          <textarea
            placeholder="e.g., How do I approach a colleague who seems withdrawn?"
            className="w-full p-4 pr-16 border bg-surface border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition shadow-sm resize-none text-base"
            rows={2}
          />
          <Button className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0">
            <Sparkles className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-center text-text-light mt-2">
          Our AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

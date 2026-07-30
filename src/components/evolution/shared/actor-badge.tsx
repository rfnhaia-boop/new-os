import { ActorReference } from "@/data/evolution";
import { User, Bot, Cog } from "lucide-react";

interface ActorBadgeProps {
  actor: ActorReference;
  className?: string;
}

export function ActorBadge({ actor, className = "" }: ActorBadgeProps) {
  const getIcon = () => {
    switch (actor.type) {
      case "human":
        return <User className="w-3 h-3 text-indigo-400" />;
      case "ai_agent":
        return <Bot className="w-3 h-3 text-purple-400" />;
      case "system":
        return <Cog className="w-3 h-3 text-emerald-400" />;
    }
  };

  const getColors = () => {
    switch (actor.type) {
      case "human":
        return "bg-indigo-500/10 border-indigo-500/20 text-indigo-300";
      case "ai_agent":
        return "bg-purple-500/10 border-purple-500/20 text-purple-300";
      case "system":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-300";
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium ${getColors()} ${className}`}>
      {getIcon()}
      {actor.name || actor.id}
    </div>
  );
}

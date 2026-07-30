interface ObjectiveCardProps {
  title: string;
  content: string;
}

export function ObjectiveCard({ title, content }: ObjectiveCardProps) {
  return (
    <div className="my-6 bg-gradient-to-br from-emerald-900/20 to-[#111111] border border-emerald-500/20 rounded-xl p-6">
      <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-white font-medium">{content}</p>
    </div>
  );
}

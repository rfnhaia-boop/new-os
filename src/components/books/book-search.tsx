import { Search } from "lucide-react";

interface BookSearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function BookSearch({ value, onChange, placeholder = "Buscar manuais e playbooks..." }: BookSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-[#111111] border border-[#27272A] rounded-xl text-sm text-white placeholder-[#A1A1AA] focus:outline-none focus:border-indigo-500 transition-colors"
      />
    </div>
  );
}

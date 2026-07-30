import Image from "next/image";

interface UserAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ name, avatarUrl, size = "md" }: UserAvatarProps) {
  const getInitials = (userName: string) => {
    const parts = userName.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (parts[0]?.[0] || "").toUpperCase();
  };

  const dimensions = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  return (
    <div className={`relative shrink-0 flex items-center justify-center rounded-full overflow-hidden bg-[#1A1A1A] border border-[#27272A] text-white font-semibold ${dimensions[size]}`}>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 64px) 100vw, 64px"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}

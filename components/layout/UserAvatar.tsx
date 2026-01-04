"use client";

import Image from "next/image";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  size?: "sm" | "md" | "lg";
}

export const UserAvatar = ({ name, image, size = "md" }: UserAvatarProps) => {
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    
    const names = name.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return (
      names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase()
    );
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const initials = getInitials(name);

  const getBackgroundColor = (initials: string) => {
    const colors = [
      "bg-primary-100",
    ];
    
    const charCode = initials.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  if (image) {
    return (
      <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <Image
          src={image}
          alt={name || "Usuario"}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${getBackgroundColor(
        initials
      )} rounded-full flex items-center justify-center text-primary-500 font-semibold`}
    >
      {initials}
    </div>
  );
};

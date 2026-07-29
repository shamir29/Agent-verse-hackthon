import React, { useRef, useState } from 'react';
import { soundFX } from '../../utils/soundFX';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.25;
    const distY = (e.clientY - centerY) * 0.25;
    setPosition({ x: distX, y: distY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    soundFX.playHover();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundFX.playClick();
    if (onClick) onClick(e);
  };

  let baseStyle = "relative inline-flex items-center justify-center font-medium tracking-tight rounded-full transition-transform duration-200 ease-out cursor-pointer select-none active:scale-95";

  let sizeStyle = "px-6 py-3 text-sm";
  if (size === 'sm') sizeStyle = "px-4 py-2 text-xs";
  if (size === 'lg') sizeStyle = "px-8 py-4 text-base";
  if (size === 'xl') sizeStyle = "px-10 py-5 text-lg font-semibold";

  let variantStyle = "bg-[#2563EB] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:bg-[#1D4ED8]";
  if (variant === 'secondary') variantStyle = "bg-[#16A34A] text-white shadow-lg shadow-emerald-500/25 hover:bg-[#15803D]";
  if (variant === 'outline') variantStyle = "bg-white/80 text-slate-800 border border-slate-200 hover:bg-white shadow-sm";
  if (variant === 'dark') variantStyle = "bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20";

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface IconTextProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}

function IconText({ src, alt, children, className }: IconTextProps) {
  return (
    <span className={`flex items-center gap-1 ${className ?? ''}`}>
      <img src={src} alt={alt} className="h-4 w-4" />
      {children}
    </span>
  );
}

export default IconText;

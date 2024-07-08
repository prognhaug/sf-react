// Define IconProps interface
interface IconProps {
  name: keyof typeof svgIcons;
  className?: string;
}

// SVG React component for 'xcircle'
const XCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

// Update svgIcons to store React components
const svgIcons = {
  xcircle: XCircleIcon,
};

// Updated Icon component
const Icon = ({ name, className }: IconProps) => {
  const SvgIcon = svgIcons[name];
  return (
    <div className={className}>
      <SvgIcon />
    </div>
  );
};

export default Icon;

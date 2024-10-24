interface Props{
    color:"green" | "red" | "yellow",
    size: number,
}

const CircleIcon = ({ color, size} : Props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  };
  
  export default CircleIcon;
  
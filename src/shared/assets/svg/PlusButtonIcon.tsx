interface PlusButtonIconProps {
  color?: string;
}

const PlusButtonIcon = ({ color = 'white' }: PlusButtonIconProps) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15C30 16.9698 29.612 18.9204 28.8582 20.7403C28.1044 22.5601 26.9995 24.2137 25.6066 25.6066C24.2137 26.9995 22.5601 28.1044 20.7403 28.8582C18.9204 29.612 16.9698 30 15 30C13.0302 30 11.0796 29.612 9.25975 28.8582C7.43986 28.1044 5.78628 26.9995 4.3934 25.6066C3.00052 24.2137 1.89563 22.5601 1.14181 20.7403C0.387986 18.9204 0 16.9698 0 15C8.9407e-08 11.0218 1.58035 7.20644 4.3934 4.3934ZM15 3C11.8174 3 8.76515 4.26428 6.51472 6.51472C4.26428 8.76515 3 11.8174 3 15C3 16.5759 3.31039 18.1363 3.91345 19.5922C4.5165 21.0481 5.40041 22.371 6.51472 23.4853C7.62902 24.5996 8.95189 25.4835 10.4078 26.0866C11.8637 26.6896 13.4241 27 15 27C16.5759 27 18.1363 26.6896 19.5922 26.0866C21.0481 25.4835 22.371 24.5996 23.4853 23.4853C24.5996 22.371 25.4835 21.0481 26.0866 19.5922C26.6896 18.1363 27 16.5759 27 15C27 11.8174 25.7357 8.76515 23.4853 6.51472C21.2348 4.26428 18.1826 3 15 3ZM15 9C15.8284 9 16.5 9.67157 16.5 10.5V13.5H19.5C20.3284 13.5 21 14.1716 21 15C21 15.8284 20.3284 16.5 19.5 16.5H16.5V19.5C16.5 20.3284 15.8284 21 15 21C14.1716 21 13.5 20.3284 13.5 19.5V16.5H10.5C9.67157 16.5 9 15.8284 9 15C9 14.1716 9.67157 13.5 10.5 13.5H13.5V10.5C13.5 9.67157 14.1716 9 15 9Z"
        fill={color}
      />
    </svg>
  );
};

export default PlusButtonIcon;

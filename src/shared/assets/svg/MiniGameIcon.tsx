interface MiniGameIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const MiniGameIcon = ({
  size = 36,
  color = '#727272',
  className,
}: MiniGameIconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.8181 4.31802C15.662 3.47411 16.8066 3 18.0001 3C19.1936 3 20.3382 3.47411 21.1821 4.31802C22.026 5.16193 22.5001 6.30653 22.5001 7.5C22.5001 8.69347 22.026 9.83807 21.1821 10.682C20.3382 11.5259 19.1936 12 18.0001 12C16.8066 12 15.662 11.5259 14.8181 10.682C13.9742 9.83807 13.5001 8.69347 13.5001 7.5C13.5001 6.30653 13.9742 5.16193 14.8181 4.31802ZM18.0001 6C17.6023 6 17.2207 6.15803 16.9394 6.43934C16.6581 6.72064 16.5001 7.10218 16.5001 7.5C16.5001 7.89782 16.6581 8.27936 16.9394 8.56066C17.2207 8.84197 17.6023 9 18.0001 9C18.3979 9 18.7795 8.84196 19.0608 8.56066C19.3421 8.27936 19.5001 7.89782 19.5001 7.5C19.5001 7.10218 19.3421 6.72064 19.0608 6.43934C18.7795 6.15804 18.3979 6 18.0001 6ZM6.0031 17.25C6.83153 17.25 7.5031 17.9216 7.5031 18.75V25.677L15.4381 29.4251C15.438 29.4251 15.4382 29.4251 15.4381 29.4251C16.2392 29.8034 17.1142 29.9996 18.0001 29.9996C18.886 29.9996 19.7609 29.8034 20.5619 29.4252C20.5619 29.4252 20.562 29.4252 20.5619 29.4252L28.5001 25.6756V18.75C28.5001 17.9216 29.1717 17.25 30.0001 17.25C30.8285 17.25 31.5001 17.9216 31.5001 18.75V25.8339C31.5172 26.214 31.449 26.5934 31.3003 26.9441C31.0574 27.5263 30.6072 27.9979 30.0366 28.2676L21.8433 32.1378C20.6416 32.7052 19.329 32.9996 18.0001 32.9996C16.6712 32.9996 15.3588 32.7053 14.1571 32.1379L5.96219 28.267C5.49459 28.0454 5.10522 27.6871 4.84549 27.2396C4.59747 26.8122 4.47883 26.3226 4.5031 25.83V18.75C4.5031 17.9216 5.17467 17.25 6.0031 17.25Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 9C18.8284 9 19.5 9.67157 19.5 10.5V12.8747C20.1722 12.987 20.8349 13.1753 21.4749 13.4395L29.9208 16.9354C29.9221 16.936 29.9233 16.9365 29.9246 16.937C30.3807 17.1242 30.7725 17.4403 31.052 17.8466C31.3322 18.2541 31.4873 18.7345 31.4982 19.2289C31.5091 19.7233 31.3754 20.2101 31.1134 20.6295C30.852 21.0479 30.4745 21.381 30.0268 21.5882C30.0257 21.5887 30.0246 21.5892 30.0235 21.5897L21.8356 25.4018C20.6343 25.9609 19.325 26.2507 18 26.2507C16.6749 26.2507 15.3659 25.961 14.1646 25.4019L5.97615 21.5896C5.52744 21.3838 5.14848 21.0515 4.8858 20.6334C4.62169 20.213 4.48674 19.7244 4.49769 19.2281C4.50863 18.7318 4.66498 18.2496 4.94735 17.8412C5.23147 17.4304 5.62664 17.1194 6.07806 16.9359L14.5238 13.44C15.1638 13.1757 15.8277 12.987 16.5 12.8747V10.5C16.5 9.67157 17.1715 9 18 9ZM16.5 15.9374C16.2189 16.0087 15.9418 16.1002 15.6707 16.2122C15.6704 16.2123 15.6709 16.2121 15.6707 16.2122L8.18708 19.3097L15.4304 22.6821C15.4303 22.682 15.4304 22.6821 15.4304 22.6821C16.2352 23.0566 17.1123 23.2507 18 23.2507C18.8876 23.2507 19.7646 23.0567 20.5693 22.6822C20.5693 22.6822 20.5694 22.6821 20.5693 22.6822L27.8128 19.3097L20.33 16.2125C20.3297 16.2124 20.3302 16.2126 20.33 16.2125C20.0589 16.1006 19.781 16.0087 19.5 15.9374V19.5C19.5 20.3284 18.8284 21 18 21C17.1715 21 16.5 20.3284 16.5 19.5V15.9374Z"
      fill={color}
    />
  </svg>
);
export default MiniGameIcon;

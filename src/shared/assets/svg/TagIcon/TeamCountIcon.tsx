const TeamCountIcon = ({ color = '#01C612' }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-[1.25rem] w-[1.25rem] laptop:h-[0.75rem] laptop:w-[0.75rem]"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.0538 3.38714C7.8352 2.60573 8.89501 2.16675 10.0001 2.16675C11.1051 2.16675 12.165 2.60573 12.9464 3.38714C13.7278 4.16854 14.1667 5.22835 14.1667 6.33342C14.1667 7.43848 13.7278 8.49829 12.9464 9.27969C12.165 10.0611 11.1051 10.5001 10.0001 10.5001C8.89501 10.5001 7.8352 10.0611 7.0538 9.27969C6.2724 8.49829 5.83341 7.43848 5.83341 6.33342C5.83341 5.22835 6.2724 4.16854 7.0538 3.38714ZM10.0001 3.83341C9.33704 3.83341 8.70115 4.09681 8.23231 4.56565C7.76347 5.03449 7.50008 5.67037 7.50008 6.33342C7.50008 6.99646 7.76347 7.63234 8.23231 8.10118C8.70115 8.57002 9.33704 8.83342 10.0001 8.83342C10.6631 8.83342 11.299 8.57002 11.7678 8.10118C12.2367 7.63234 12.5001 6.99646 12.5001 6.33342C12.5001 5.67037 12.2367 5.03449 11.7678 4.56565C11.299 4.09681 10.6631 3.83341 10.0001 3.83341ZM8.33341 13.8334C7.67037 13.8334 7.03449 14.0968 6.56565 14.5656C6.09681 15.0345 5.83341 15.6704 5.83341 16.3334V18.0001C5.83341 18.4603 5.46032 18.8334 5.00008 18.8334C4.53984 18.8334 4.16675 18.4603 4.16675 18.0001V16.3334C4.16675 15.2283 4.60573 14.1685 5.38714 13.3871C6.16854 12.6057 7.22835 12.1667 8.33341 12.1667H11.6667C12.7718 12.1667 13.8316 12.6057 14.613 13.3871C15.3944 14.1685 15.8334 15.2283 15.8334 16.3334V18.0001C15.8334 18.4603 15.4603 18.8334 15.0001 18.8334C14.5398 18.8334 14.1667 18.4603 14.1667 18.0001V16.3334C14.1667 15.6704 13.9034 15.0345 13.4345 14.5656C12.9657 14.0968 12.3298 13.8334 11.6667 13.8334H8.33341Z"
      fill={color}
    />
  </svg>
);

export default TeamCountIcon;

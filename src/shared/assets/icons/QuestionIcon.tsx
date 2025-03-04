import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const QuestionIcon = ({
  width = 36,
  height = 36,
  color = '#727272',
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 3C18.8284 3 19.5 3.67157 19.5 4.5V6C19.5 6.82843 18.8284 7.5 18 7.5C17.1716 7.5 16.5 6.82843 16.5 6V4.5C16.5 3.67157 17.1716 3 18 3ZM7.33934 7.33934C7.92513 6.75355 8.87487 6.75355 9.46066 7.33934L10.5107 8.38934C11.0964 8.97513 11.0964 9.92487 10.5107 10.5107C9.92487 11.0964 8.97513 11.0964 8.38934 10.5107L7.33934 9.46066C6.75355 8.87487 6.75355 7.92513 7.33934 7.33934ZM28.6607 7.33934C29.2464 7.92512 29.2464 8.87487 28.6607 9.46066L27.6107 10.5107C27.0249 11.0964 26.0751 11.0964 25.4893 10.5107C24.9036 9.92488 24.9036 8.97513 25.4893 8.38934L26.5393 7.33934C27.1251 6.75355 28.0749 6.75355 28.6607 7.33934ZM18 12C16.7407 12 15.5133 12.3962 14.4917 13.1325C13.4701 13.8689 12.7061 14.908 12.3079 16.1026C11.9097 17.2973 11.8974 18.587 12.2729 19.789C12.6484 20.991 13.3926 22.0444 14.4 22.8C14.4547 22.8411 14.5066 22.8858 14.5553 22.934C14.8842 23.2595 15.1776 23.6169 15.4317 24H20.5683C20.8224 23.6169 21.1158 23.2595 21.4447 22.934C21.4934 22.8858 21.5453 22.8411 21.6 22.8C22.6074 22.0444 23.3516 20.991 23.7271 19.789C24.1026 18.587 24.0903 17.2973 23.6921 16.1026C23.2939 14.908 22.5299 13.8689 21.5083 13.1325C20.4867 12.3962 19.2593 12 18 12ZM22.7454 26.2567C22.7904 26.1799 22.8287 26.0988 22.8596 26.0141C23.026 25.6909 23.239 25.3928 23.4924 25.1298C24.9567 24.0018 26.0389 22.4496 26.5906 20.6835C27.1538 18.8805 27.1355 16.946 26.5381 15.1539C25.9408 13.3619 24.7948 11.8033 23.2624 10.6988C21.73 9.59434 19.8889 9 18 9C16.1111 9 14.27 9.59434 12.7376 10.6988C11.2052 11.8033 10.0592 13.3619 9.46185 15.1539C8.86451 16.946 8.84616 18.8805 9.40938 20.6835C9.96106 22.4496 11.0433 24.0018 12.5076 25.1298C12.761 25.3928 12.974 25.6909 13.1404 26.0141C13.1713 26.0988 13.2096 26.1799 13.2546 26.2567C13.295 26.3512 13.3316 26.4474 13.3642 26.5453C13.5503 27.1037 13.6024 27.6981 13.5162 28.2803C13.5054 28.3531 13.5 28.4265 13.5 28.5C13.5 29.6935 13.9741 30.8381 14.818 31.682C15.6619 32.5259 16.8065 33 18 33C19.1935 33 20.3381 32.5259 21.182 31.682C22.0259 30.8381 22.5 29.6935 22.5 28.5C22.5 28.4265 22.4946 28.3531 22.4838 28.2803C22.3976 27.6981 22.4497 27.1037 22.6358 26.5453C22.6684 26.4474 22.705 26.3512 22.7454 26.2567ZM19.4831 27H16.5169C16.5742 27.5255 16.5696 28.0575 16.5024 28.5848C16.5232 28.9517 16.6781 29.2994 16.9393 29.5607C17.2206 29.842 17.6022 30 18 30C18.3978 30 18.7794 29.842 19.0607 29.5607C19.3219 29.2994 19.4768 28.9517 19.4976 28.5848C19.4304 28.0575 19.4258 27.5255 19.4831 27ZM3 18C3 17.1716 3.67157 16.5 4.5 16.5H6C6.82843 16.5 7.5 17.1716 7.5 18C7.5 18.8284 6.82843 19.5 6 19.5H4.5C3.67157 19.5 3 18.8284 3 18ZM28.5 18C28.5 17.1716 29.1716 16.5 30 16.5H31.5C32.3284 16.5 33 17.1716 33 18C33 18.8284 32.3284 19.5 31.5 19.5H30C29.1716 19.5 28.5 18.8284 28.5 18Z"
        fill={color}
      />
    </svg>
  );
};

export default QuestionIcon;

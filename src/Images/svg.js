export function Humidity({ prop }) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path
        d="M21 14.7C21 18.1794 19.0438 21 15.5 21C11.9562 21 10 18.1794 10 14.7C10 11.2206 15.5 3 15.5 3C15.5 3 21 11.2206 21 14.7Z"
        stroke={prop ? "white" : "rgb(31 41 55)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.2C8 9.7464 7.11083 11 5.5 11C3.88917 11 3 9.7464 3 8.2C3 6.6536 5.5 3 5.5 3C5.5 3 8 6.6536 8 8.2Z"
        stroke={prop ? "white" : "rgb(31 41 55)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Wind({ prop }) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path
        d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3"
        stroke={prop ? "white" : "rgb(31 41 55)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Location({ prop }) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path
        d="M19 12C19 15.866 15.866 19 12 19M19 12C19 8.13401 15.866 5 12 5M19 12H21M12 19C8.13401 19 5 15.866 5 12M12 19V21M5 12C5 8.13401 8.13401 5 12 5M5 12H3M12 5V3M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
        stroke={prop ? "white" : "rgb(31 41 55)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Rain({ prop }) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path
        d="M10.5 21L12 18M14.5 21L16 18M6.5 21L8 18M8.8 15C6.14903 15 4 12.9466 4 10.4137C4 8.31435 5.6 6.375 8 6C8.75283 4.27403 10.5346 3 12.6127 3C15.2747 3 17.4504 4.99072 17.6 7.5C19.0127 8.09561 20 9.55741 20 11.1402C20 13.2719 18.2091 15 16 15L8.8 15Z"
        stroke={prop ? "white" : "rgb(31 41 55)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Arrow(prop) {
  return (
    <svg
      width="24px"
      height="24px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
      transform={`rotate(${prop.transform})`}
    >
      <path
        d="M10.9792 4.26973L4.59197 18.4636C4.10239 19.5516 3.85761 20.0955 3.9608 20.4146C4.05015 20.6908 4.2714 20.9042 4.55064 20.9836C4.87315 21.0753 5.40801 20.8112 6.47772 20.283L11.2921 17.9055C11.552 17.7771 11.682 17.713 11.8181 17.6877C11.9387 17.6653 12.0624 17.6653 12.183 17.6877C12.3192 17.713 12.4491 17.7771 12.709 17.9055L17.5234 20.283C18.5931 20.8112 19.128 21.0753 19.4505 20.9836C19.7298 20.9042 19.951 20.6908 20.0403 20.4146C20.1435 20.0955 19.8988 19.5516 19.4092 18.4636L13.0219 4.26973C12.6979 3.54967 12.5359 3.18964 12.3108 3.07837C12.1153 2.98169 11.8859 2.98169 11.6903 3.07837C11.4653 3.18964 11.3032 3.54967 10.9792 4.26973Z"
        stroke={prop.prop ? "white" : "rgb(31 41 55)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
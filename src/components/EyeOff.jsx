import React from "react";

export const EyeOff = ({ className }) => {
    return (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.11 1 12C2.06 9.47 3.96 7.42 6.29 6.29M9.35 6.29C10.19 6.13 11.07 6.04 12 6.04C17 6.04 21.27 9.93 23 14.04C22.68 14.81 22.28 15.53 21.82 16.18M1 1L23 23"
                stroke="#ACACAC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.88 9.88C10.42 9.34 11.17 9 12 9C13.66 9 15 10.34 15 12C15 12.83 14.66 13.58 14.12 14.12"
                stroke="#ACACAC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

import React from 'react';

export default function Facebook({ isDark }: { isDark?: boolean }) {
  return isDark ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 10V14H10V21H14V14H17L18 10H14V8C14 7.73478 14.1054 7.48043 14.2929 7.29289C14.4804 7.10536 14.7348 7 15 7H18V3H15C13.6739 3 12.4021 3.52678 11.4645 4.46447C10.5268 5.40215 10 6.67392 10 8V10H7Z"
        stroke="#2E2A26"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 10.001V14.001H10V21.001H14V14.001H17L18 10.001H14V8.00098C14 7.73576 14.1054 7.48141 14.2929 7.29387C14.4804 7.10633 14.7348 7.00098 15 7.00098H18V3.00098H15C13.6739 3.00098 12.4021 3.52776 11.4645 4.46544C10.5268 5.40312 10 6.67489 10 8.00098V10.001H7Z"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

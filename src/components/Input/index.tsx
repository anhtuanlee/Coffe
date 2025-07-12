import React from 'react';

interface TInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, placeholder, ...props }: TInputProps) => {
  return (
    <div className="relative outline-none focus-within:outline-none focus:outline-none">
      <input
        name={props.name}
        placeholder=""
        className="peer w-full border-b border-bd-light-soft bg-bg-primary py-8 text-20 text-txt-light-primary outline-none transition-all duration-400 focus-within:outline-none focus:border-bd-dark-strong focus:pb-5 focus:pt-11 focus:outline-none [&:not(:placeholder-shown)]:pb-5 [&:not(:placeholder-shown)]:pt-11"
        {...props}
      />
      {label && (
        <label
          htmlFor={props.name}
          className="pointer-events-none absolute left-0 top-1/2 origin-top-left -translate-y-1/2 text-20 font-medium text-txt-light-primary transition-all duration-400 peer-focus:-translate-y-full peer-focus:scale-[0.65] peer-focus:text-txt-light-secondary peer-[&:not(:placeholder-shown)]:-translate-y-full peer-[&:not(:placeholder-shown)]:scale-[0.65]"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;

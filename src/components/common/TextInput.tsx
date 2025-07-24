import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
type Rule = (value: string) => string | boolean;
type Type = 'text' | 'password' | 'email';
interface Props {
  value: string;
  type: Type;
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  wrapClassName?: string;
  errorTextClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  rules?: Rule[];
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordEyes?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    label,
    value,
    id,
    name,
    className = '',
    onChange,
    rules,
    type,
    wrapClassName = '',
    placeholder = '',
    disabled = false,
    maxLength,
    errorTextClassName,
    labelClassName = '',
    autoComplete = '',
    showPasswordEyes = false,
  } = props;
  const [inputType, setInputType] = useState<Type>(type);
  const [errorText, setErrorText] = useState<string[]>([]);
  const textInputRef = useRef<HTMLInputElement>(null);
  const isError = errorText.length > 0;

  useImperativeHandle(ref, () => textInputRef.current!);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validate(e.target.value);
  };

  const handleChangeInputType = () => {
    setInputType((prevValue) => (prevValue === 'password' ? 'text' : 'password'));
  };
  const validate = (value: string) => {
    if (rules) {
      const errorTextArr = [];
      for (const item of rules) {
        errorTextArr.push(item(value));
      }
      setErrorText(errorTextArr.filter((item) => typeof item === 'string'));
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${wrapClassName}`}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="flex flex-col relative">
        <input
          id={id}
          className={`border rounded pl-2 pr-8 ${className}`}
          name={name}
          type={inputType}
          value={value}
          onChange={handleOnChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          ref={textInputRef}
          auto-complete={autoComplete}
        />
        {showPasswordEyes && type === 'password' && (
          <button className="b-eye-input" onClick={handleChangeInputType} type="button">
            <span className="material-symbols-outlined">
              {inputType === 'password' ? 'visibility' : 'visibility_off'}
            </span>
          </button>
        )}
      </div>
      {isError &&
        errorText.map((item, index) => {
          return (
            <span className={errorTextClassName ?? 'b-validate-error'} key={index}>
              {item}
            </span>
          );
        })}
    </div>
  );
});

export default Input;

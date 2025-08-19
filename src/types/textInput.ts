type Rule = (value: string) => string | boolean;
export type Type = 'text' | 'password' | 'email';
export interface Props {
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

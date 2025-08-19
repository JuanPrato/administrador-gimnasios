import { useId, useState, type ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

interface BasicProps<T, V = string> {
  label: string;
  placeholder?: string;
  name: string;
  formData: T;
  handleChange: (name: string, value: V) => void;
  loading: boolean;
  required?: boolean;
  error?: () => string | undefined;
}

function returnInputProps<T>(props: BasicProps<T>) {
  return {
    placeholder: props.placeholder,
    value: props.formData[props.name as keyof T] as string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => props.handleChange(props.name, e.target.value),
    required: props.required ?? true,
    disabled: props.loading,
    className: props.error?.() !== undefined ? "ring ring-red-500" : ""
  }
}

export function TextInput<T>(props: BasicProps<T>) {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>{props.label}</Label>
      <Input
        id={id}
        type="text"
        {...returnInputProps(props)}
      />
      <span className="text-red-400 text-xs">{props.error?.()}</span>
    </>
  );
}

export function EmailInput<T>(props: BasicProps<T>) {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>{props.label}</Label>
      <Input
        id={id}
        type="email"
        {...returnInputProps(props)}
      />
      <span className="text-red-400 text-xs">{props.error?.()}</span>
    </>
  );
}

export function PasswordInput<T>(props: BasicProps<T>) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Label htmlFor={id}>{props.label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={props.formData[props.name as keyof T] as string}
          onChange={(e) => props.handleChange(props.name, e.target.value)}
          required
          disabled={props.loading}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          disabled={props.loading}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    </>
  );
}

export function CheckboxInput<T>(props: BasicProps<T, boolean>) {
  const id = useId();

  return (
    <>
      <Checkbox
        id={id}
        checked={props.formData[props.name as keyof T] as boolean}
        onCheckedChange={(checked) => props.handleChange(props.name, checked as boolean)}
        disabled={props.loading}
      />
      <Label htmlFor={id} className="text-sm font-normal">
        {props.label}
      </Label>
    </>
  );

}

export function TextareaInput<T>(props: BasicProps<T>) {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>{props.label}</Label>
      <Textarea
        id={id}
        value={props.formData[props.name as keyof T] as string}
        onChange={(e) => props.handleChange(props.name, e.target.value)}
        placeholder={props.placeholder}
        rows={3}
      />
    </>
  );
}

type SelectProps<T, V = string> = BasicProps<T, V> & {
  values: { value: string, text: string }[]
}

export function SelectInput<T>(props: SelectProps<T>) {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>{props.label}</Label>
      <Select
        value={props.formData[props.name as keyof T] as string}
        onValueChange={(e) => props.handleChange(props.name, e)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona un plan" />
        </SelectTrigger>
        <SelectContent>
          {
            props.values.map(({ value, text }) => (
              <SelectItem value={value} key={value}>{text}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>
      <span className="text-red-400 text-xs">{props.error?.()}</span>
    </>
  );
}
import { useId, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface BasicProps<T, V = string> {
  label: string;
  placeholder?: string;
  name: string;
  formData: T;
  handleChange: (name: string, value: V) => void;
  loading: boolean;
}

export function EmailInput<T>({ label, placeholder, name, formData, handleChange, loading }: BasicProps<T>) {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="email"
        placeholder={placeholder}
        value={formData[name as keyof T] as string}
        onChange={(e) => handleChange(name, e.target.value)}
        required
        disabled={loading}
      />
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
import { useState } from "react";

interface IOpts<T> {
  onSubmit: ((values: T) => void) | ((values: T) => Promise<void>);
  onSuccess?: () => void;
  errors?: (name: keyof T) => string | undefined;
}

export function useForm<T>(initialValue?: T, opts?: IOpts<T>) {
  const [formData, setFormData] = useState<T>(initialValue ?? ({} as T));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await opts?.onSubmit(formData);
      if (opts?.onSuccess) opts.onSuccess();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(true); // Limpiar error al escribir
  };

  function getProps(name: keyof T) {
    return {
      name,
      formData,
      handleChange: handleInputChange,
      loading,
      error: () => opts?.errors?.(name),
    };
  }

  return {
    loading,
    error: opts?.errors ?? error,
    submit,
    getProps,
    formData,
  };
}

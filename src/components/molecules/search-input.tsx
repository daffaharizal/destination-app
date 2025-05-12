import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

export default function SearchInput({
  onSearch,
  placeholder
}: {
  onSearch: (value: string) => void;
  placeholder: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((value: string) => onSearch(value), 300),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <Input
      placeholder={placeholder}
      className="max-w-48 w-full"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

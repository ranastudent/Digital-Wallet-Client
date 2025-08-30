import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TransactionFilterProps {
  onFilter: (query: string) => void;
  query: string;
  setQuery: (query: string) => void;
}

const TransactionFilter = ({ onFilter, query, setQuery }: TransactionFilterProps) => {
  return (
    <div className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="Search by phone number"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64"
      />
      <Button onClick={() => onFilter(query)}>Search</Button>
    </div>
  );
};

export default TransactionFilter;

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BFHLFrontend() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);
  const [error, setError] = useState("");
 useEffect(() => {
    document.title = "22BCS15779"; 
  }, []);
  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. Must contain a 'data' array.");
      }

      const res = await fetch("https://bajajtest-weax.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedInput),
      });

      const data = await res.json();
      setResponse(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredResponse = () => {
    if (!response) return null;
    let result = {};
    if (filter.includes("Alphabets")) result.alphabets = response.alphabets;
    if (filter.includes("Numbers")) result.numbers = response.numbers;
    if (filter.includes("Highest Alphabet")) result.highest_alphabet = response.highest_alphabet;
    return result;
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">BFHL Challenge</h1>
      <textarea
        className="w-full border p-2 mb-4"
        rows="4"
        placeholder='Enter JSON (e.g., { "data": ["A","1","B"] })'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      ></textarea>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Button onClick={handleSubmit}>Submit</Button>

      {response && (
        <Card className="mt-6 p-4">
          <Select multiple onValueChange={setFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alphabets">Alphabets</SelectItem>
              <SelectItem value="Numbers">Numbers</SelectItem>
              <SelectItem value="Highest Alphabet">Highest Alphabet</SelectItem>
            </SelectContent>
          </Select>

          <CardContent>
            <pre className="mt-4 p-2 bg-gray-100 border">{JSON.stringify(filteredResponse(), null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

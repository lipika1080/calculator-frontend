import { useState } from "react";
import { Button, Input, Select, VStack, Text } from "@chakra-ui/react";
import { calculate } from "../api";

const Calculator = () => {
  const [numbers, setNumbers] = useState<string>("");
  const [operation, setOperation] = useState<string>("add");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = async () => {
    const numArray = numbers.split(",").map((num) => parseFloat(num.trim()));
    const response = await calculate(operation, numArray);
    if (response) setResult(response.result);
  };

  return (
    <VStack spacing={4} p={5}>
      <Text fontSize="2xl" fontWeight="bold">Calculator</Text>
      <Input 
        placeholder="Enter numbers (comma separated)" 
        value={numbers} 
        onChange={(e) => setNumbers(e.target.value)} 
      />
      <Select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="add">Addition</option>
        <option value="subtract">Subtraction</option>
        <option value="multiply">Multiplication</option>
        <option value="divide">Division</option>
      </Select>
      <Button colorScheme="blue" onClick={handleCalculate}>Calculate</Button>
      {result !== null && <Text fontSize="lg">Result: {result}</Text>}
    </VStack>
  );
};

export default Calculator;

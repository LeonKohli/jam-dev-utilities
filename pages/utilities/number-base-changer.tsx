import { useCallback, useEffect, useState } from "react";
import { Textarea } from "@/components/ds/TextareaComponent";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ds/CardComponent";
import { Button } from "@/components/ds/ButtonComponent";
import { Label } from "@/components/ds/LabelComponent";
import Header from "@/components/Header";
import { CMDK } from "@/components/CMDK";
import { useCopyToClipboard } from "@/components/hooks/useCopyToClipboard";
import CallToActionGrid from "@/components/CallToActionGrid";
import Meta from "@/components/Meta";
import { Combobox } from "@/components/ds/ComboboxComponent";

export default function NumberBaseChanger() {
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { buttonText, handleCopy } = useCopyToClipboard();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.currentTarget;
      setInput(value.trim());
    },
    []
  );

  useEffect(() => {
    try {
      setOutput(convertBase(input, fromBase, toBase));
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "Invalid input");
    }
  }, [input, fromBase, toBase]);

  return (
    <main>
      <Meta
        title="Number Base Changer | Free & Open-Source Dev Utils"
        description="Easily convert numbers between different bases (binary, decimal, hexadecimal) with our free online Number Base Changer. Perfect for developers and mathematicians looking for quick base conversions"
      />
      <Header />
      <CMDK />

      <section className="container max-w-2xl mb-12">
        <PageHeader
          title="Number Base Changer"
          description="Free, Open Source & Ad-free"
        />
      </section>

      <section className="container max-w-2xl mb-6">
        <Card className="flex flex-col p-6 hover:shadow-none shadow-none rounded-xl">
          <div>
            <Label>Number</Label>
            <Textarea
              className="mb-6"
              value={input}
              onChange={handleChange}
              rows={3}
            />

            <div className="mb-6 flex w-full gap-4">
              <div className="flex flex-1 flex-col">
                <Label>From</Label>
                <Combobox
                  data={data}
                  onSelect={(value) => setFromBase(parseInt(value))}
                  defaultValue="10"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <Label>To</Label>
                <Combobox
                  data={data}
                  onSelect={(value) => setToBase(parseInt(value))}
                  defaultValue="2"
                />
              </div>
            </div>

            <Label>Result</Label>
            <Textarea value={output} rows={3} readOnly className="mb-4" />
            <Button variant="outline" onClick={() => handleCopy(output)}>
              {buttonText}
            </Button>
          </div>
        </Card>
      </section>

      <CallToActionGrid />
    </main>
  );
}

const convertBase = (num: string, fromBase: number, toBase: number): string => {
  if (!num) return "";

  // Handle hexadecimal input (both uppercase and lowercase)
  const normalizedNum = fromBase === 16 ? num.toLowerCase() : num;

  // Split the number into integer and fractional parts
  const [intPart, fracPart = ""] = normalizedNum.split(".");

  // Convert integer part
  const intValue = parseInt(intPart, fromBase);
  if (isNaN(intValue)) throw new Error("Invalid integer part");
  let result = intValue.toString(toBase);

  // Convert fractional part if it exists
  if (fracPart) {
    let fracValue = 0;
    let divisor = fromBase;
    for (const digit of fracPart) {
      const digitValue = parseInt(digit, fromBase);
      if (isNaN(digitValue) || digitValue >= fromBase) {
        throw new Error("Invalid fractional part");
      }
      fracValue += digitValue / divisor;
      divisor *= fromBase;
    }

    if (fracValue > 0) {
      result += ".";
      for (let i = 0; i < 8; i++) { // Limit to 8 decimal places
        fracValue *= toBase;
        const digit = Math.floor(fracValue);
        result += digit.toString(toBase);
        fracValue -= digit;
        if (fracValue === 0) break;
      }
    }
  }

  return result;
};

const data = [
  { value: "2", label: "Binary (2)" },
  { value: "8", label: "Octal (8)" },
  { value: "10", label: "Decimal (10)" },
  { value: "16", label: "Hexadecimal (16)" },
];
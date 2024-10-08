import { useCallback, useState } from "react";
import { Textarea } from "@/components/ds/TextareaComponent";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ds/CardComponent";
import { Button } from "@/components/ds/ButtonComponent";
import { Label } from "@/components/ds/LabelComponent";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ds/CheckboxComponent";
import { CMDK } from "@/components/CMDK";
import { useCopyToClipboard } from "@/components/hooks/useCopyToClipboard";
import CallToActionGrid from "@/components/CallToActionGrid";
import CsvToJsonSEO from "@/components/seo/CsvToJsonSEO";
import Meta from "@/components/Meta";
import { convertCSVtoJSON } from "@/components/utils/csv-to-json.utils";

export default function CSVtoJSON() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { buttonText, handleCopy } = useCopyToClipboard();
  const [lowercase, setLowercase] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.currentTarget.value;
      setInput(value);

      if (value.trim() === "") {
        setOutput("");
        return;
      }

      try {
        const json = convertCSVtoJSON(value.trim(), lowercase);
        setOutput(json);
      } catch (errorMessage: unknown) {
        setOutput(errorMessage as string);
      }
    },
    [lowercase]
  );

  const toggleLowercase = useCallback(() => {
    setLowercase((prevValue) => {
      const nextValue = !prevValue;

      if (input === "") {
        setOutput("");
        return nextValue;
      }

      try {
        const json = convertCSVtoJSON(input, nextValue);
        setOutput(json);
      } catch {
        setOutput("Invalid CSV input");
      }

      return nextValue;
    });
  }, [input]);

  return (
    <main>
      <Meta
        title="CSV to JSON Converter by Jam.dev | Free, Open Source & Ad-free"
        description="Convert CSV files to JSON format quickly and easily with Jam's free online CSV to JSON converter. Just paste your CSV file and get the JSON result. That's it."
      />
      <Header />
      <CMDK />

      <section className="container max-w-2xl mb-12">
        <PageHeader
          title="CSV to JSON Converter"
          description="Fast, free, open source, ad-free tools."
        />
      </section>

      <section className="container max-w-2xl mb-6">
        <Card className="flex flex-col p-6 hover:shadow-none shadow-none rounded-xl">
          <div>
            <Label>CSV</Label>
            <Textarea
              rows={6}
              placeholder="Paste CSV here"
              onChange={handleChange}
              className="mb-6"
              value={input}
            />

            <div className="flex justify-between items-center mb-2">
              <Label className="mb-0">JSON</Label>
              <div className="flex items-center">
                <Checkbox
                  id="lowercase"
                  onCheckedChange={toggleLowercase}
                  className="mr-1"
                />
                <label
                  htmlFor="lowercase"
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  lowercase keys
                </label>
              </div>
            </div>

            <Textarea value={output} rows={6} readOnly className="mb-4" />
            <Button variant="outline" onClick={() => handleCopy(output)}>
              {buttonText}
            </Button>
          </div>
        </Card>
      </section>

      <CallToActionGrid />

      <section className="container max-w-2xl">
        <CsvToJsonSEO />
      </section>
    </main>
  );
}

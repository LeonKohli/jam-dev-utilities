import { useCallback, useState } from "react";
import { Textarea } from "@/components/ds/TextareaComponent";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ds/CardComponent";
import { Button } from "@/components/ds/ButtonComponent";
import { Label } from "@/components/ds/LabelComponent";
import Header from "@/components/Header";
import { CMDK } from "@/components/CMDK";
import { useCopyToClipboard } from "@/components/hooks/useCopyToClipboard";
import QueryParamsToJsonSEO from "@/components/seo/QueryParamsToJsonSEO";
import CallToActionGrid from "@/components/CallToActionGrid";
import Meta from "../../components/Meta";
import { convertQueryParamsToJSON } from "../../components/utils/query-params-to-json.utils";

export default function QueryParamsToJSON() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { buttonText, handleCopy } = useCopyToClipboard();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.currentTarget;
      setInput(value);

      if (value.trim() === "") {
        setOutput("");
        return;
      }

      try {
        const output = convertQueryParamsToJSON(value.trim());
        setOutput(output);
      } catch (error) {
        setOutput("Invalid input, please provide valid query parameters");
      }
    },
    []
  );

  return (
    <main>
      <Meta
        title="Query Params to JSON Converter by Jam.dev | Free, Open Source & Ad-free"
        description="This free tool is a quick and easy way to convert URL query parameters into JSON format. If you work with web applications, APIs, or data manipulation, you can use Jam's tool to transform query strings into structured JSON objects."
      />
      <Header />
      <CMDK />

      <section className="container max-w-2xl mb-12">
        <PageHeader
          title="Query Params to JSON"
          description="Free, Open Source & Ad-free"
        />
      </section>

      <section className="container max-w-2xl mb-6">
        <Card className="flex flex-col p-6 hover:shadow-none shadow-none rounded-xl">
          <div>
            <Label>Query Parameters</Label>
            <Textarea
              rows={6}
              placeholder="Paste here"
              onChange={handleChange}
              className="mb-6"
              value={input}
            />
            <Label>JSON Output</Label>
            <Textarea value={output} rows={6} readOnly className="mb-4" />
            <Button variant="outline" onClick={() => handleCopy(output)}>
              {buttonText}
            </Button>
          </div>
        </Card>
      </section>

      <CallToActionGrid />

      <section className="container max-w-2xl">
        <QueryParamsToJsonSEO />
      </section>
    </main>
  );
}

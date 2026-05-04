import { Block, PageHeader } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import data from "@/data/data.json";

export default function CasesPage() {
  return (
    <>
      <PageHeader title={"Кейсы"} />
      {data.cases.map((item, i) => (
        <Block key={i}>
          <Accordion type="single" collapsible>
            <AccordionItem value={item.title}>
              <AccordionTrigger className="text-xl items-center">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.text}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Block>
      ))}
    </>
  );
}
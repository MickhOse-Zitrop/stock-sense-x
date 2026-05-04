import { Block, PageHeader } from "@/components/shared";
import { Calculator, TrendingUp } from "lucide-react";
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Slider,
} from "@/components/ui";

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title={"Расчет запасов"}
        description={"Калькулятор страхового запаса и точки заказа"}
      />
      <div className="w-full grid grid-cols-2 gap-5">
        <Block
          title="Параметры расчета"
          icon={<Calculator className="text-primary" />}
        >
          <FieldGroup>
            <Field>
              <FieldLabel>Средний спрос (ед/день)</FieldLabel>
              <Input />
            </Field>
            <Field>
              <FieldLabel>Лид-тайм (дней)</FieldLabel>
              <Input />
            </Field>
            <Field>
              <FieldLabel>Уровень сервиса (%)</FieldLabel>
              <Input />
              <Slider />
            </Field>
            <Button size="lg">Рассчитать</Button>
          </FieldGroup>
        </Block>
        <Block
          title="Результаты"
          icon={<TrendingUp className="text-green-500" />}
        >
          <div className="h-full flex flex-col gap-3 items-center justify-center">
            <Calculator size={64} className="text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Введите параметры и нажмите &#34;Рассчитать&#34;
            </p>
          </div>
        </Block>
      </div>
    </>
  );
}
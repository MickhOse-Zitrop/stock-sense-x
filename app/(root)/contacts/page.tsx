import { Block, PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";

export default function ContactsPage() {
  return (
    <>
      <PageHeader title={"Контакты"} />
      <div className="w-full grid grid-cols-2 gap-8">
        <Block title="Тех. поддержка">
          <p className="text-muted-foreground">
            Если у Вас срочный вопрос — закажите звонок.
          </p>
          <Button variant="link" className="w-fit p-0 font-semibold">
            Заказать звонок
          </Button>
        </Block>
        <Block title="Обращения">
          <p className="text-muted-foreground">
            Если у Вас возник вопрос — напишите нам.
          </p>
          <Button variant="link" className="w-fit p-0 font-semibold">
            mm.bussiness@internet.ru
          </Button>
        </Block>
        <Block title="Официальные запросы">
          <p className="text-muted-foreground">
            Для отправки и получения деловых документов.
          </p>
          <Button variant="link" className="w-fit p-0 font-semibold">
            mm.bussiness@internet.ru
          </Button>
        </Block>
        <Block title="Партнерам">
          <p className="text-muted-foreground">
            Узнайте подробные условия для сотрудничества.
          </p>
          <Button variant="link" className="w-fit p-0 font-semibold">
            Подробнее
          </Button>
        </Block>
      </div>
    </>
  );
}
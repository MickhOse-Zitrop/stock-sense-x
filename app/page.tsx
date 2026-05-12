import {
  Block,
  Container,
  Footer,
  Header,
  LearnDialog,
  LoginDialog,
  PageHeader,
} from "@/components/shared";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import data from "@/data/data.json";

export default function HomePage() {
  return (
    <>
      <Header intro />
      <div className="flex justify-center h-170 w-full bg-primary selection:bg-primary-foreground selection:text-primary">
        <Container className="h-full justify-center py-20">
          <div className="h-full w-full grid grid-cols-2 gap-3">
            <div className="w-full flex flex-col gap-8.75 justify-center text-primary-foreground">
              <h1 className="text-5xl font-bold">StockSenseX</h1>
              <p className="text-sm">
                StockSenseX — цифровая платформа для управления поставками и
                запасами Автоматизируйте прогнозирование спроса, анализ товарных
                категорий и расчет оптимального уровня запасов. Система помогает
                сократить издержки, повысить оборачиваемость и улучшить уровень
                сервиса с помощью ML-моделей и интерактивных дашбордов.
              </p>
              <div className="flex gap-5 items-center">
                <LoginDialog>
                  <Button
                    className="shadow-xl/40"
                    variant="secondary"
                    size="lg"
                  >
                    Вход в аккаунт
                  </Button>
                </LoginDialog>
                <Link href="/-1/upload-data">
                  <Button className="shadow-xl/40">
                    Демо-версия
                    <MoveRight />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-full w-full select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/image.png"
                alt="Image"
                className="absolute h-full w-full object-cover rounded-4xl"
              />
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-10">
        <PageHeader title={"Наши продукты"} />
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 w-full">
          {data.ourProducts.map((product) => (
            <Block title={product.title} key={product.title}>
              <p className="text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <LearnDialog
                title={product.title}
                description={product.description}
              >
                {product.text}
              </LearnDialog>
            </Block>
          ))}
        </div>
        <Separator />
        <PageHeader title={"О нас"} />
        <Block title="Наша команда">
          <p>
            Мы — команда разработчиков и аналитиков, создающих решения для
            оптимизации цепочек поставок с использованием современных технологий
            и машинного обучения. Наша цель — помочь бизнесу принимать точные,
            обоснованные решения на основе данных и повышать эффективность
            управления запасами и спросом.
          </p>
          <div className="flex gap-4">
            {data.about.map((member) => (
              <Card
                className="relative mx-auto w-full max-w-sm pt-0"
                key={member.name}
              >
                <div className="absolute inset-0 z-30 aspect-video" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="relative z-20 aspect-video w-full object-cover select-none"
                />
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Block>
        <Separator />
        <PageHeader title={"Кейсы"}>
          <Link href="/cases">
            <Button>
              Больше кейсов
              <MoveRight />
            </Button>
          </Link>
        </PageHeader>
        <div className="flex gap-4 w-full">
          {data.cases.map((item) => (
            <Block title={item.title} key={item.title}>
              <p className="text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <Link href={"/cases"} className="w-fit">
                <Button>Смотреть еще</Button>
              </Link>
            </Block>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
}
import {
  Calculator,
  ChartNoAxesCombined,
  ChartPie,
  Home,
  LayoutDashboard,
  PcCase,
  Phone,
  Upload,
} from "lucide-react";

export const menuItems = [
  {
    title: "Загрузка данных",
    icon: <Upload />,
    link: "upload-data",
  },
  {
    title: "ABC-XYZ Анализ",
    icon: <ChartPie />,
    link: "analysis",
  },
  {
    title: "Прогнозирование спроса",
    icon: <ChartNoAxesCombined />,
    link: "forecast",
  },
  {
    title: "Дашборд KPI",
    icon: <LayoutDashboard />,
    link: "dashboard",
  },
  {
    title: "Расчет запасов",
    icon: <Calculator />,
    link: "inventory",
  },
];
export const linkItems = [
  {
    title: "Главная",
    icon: <Home />,
    link: "/",
  },
  {
    title: "Кейсы",
    icon: <PcCase />,
    link: "/cases",
  },
  {
    title: "Контакты",
    icon: <Phone />,
    link: "/contacts",
  },
];
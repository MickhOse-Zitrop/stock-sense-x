import { Block, PageHeader, ProForm } from "@/components/shared";

export default function ProPage() {
  return (
    <>
      <PageHeader title="Аккаунт Pro" />
      <Block className="items-center">
        <ProForm className="w-md" />
      </Block>
    </>
  );
}
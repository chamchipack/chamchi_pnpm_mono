import CSR_ProductHeaderButton from './CSR_ProductHeaderButton';

export default function SSR_ProductHeader({
  marketName,
  alias,
}: {
  marketName: string;
  alias: string;
}) {
  return (
    <>
      <CSR_ProductHeaderButton marketName={marketName} alias={alias} />
    </>
  );
}

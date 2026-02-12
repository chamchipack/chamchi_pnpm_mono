export default function Title({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <>
      <p className="text-md">{title}</p>
      <p className="text-xs">{desc}</p>
    </>
  );
}

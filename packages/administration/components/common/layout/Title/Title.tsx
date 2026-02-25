export default function Title({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <>
      <h1 className="text-3xl font-black tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="text-slate-500 text-sm mt-1 font-medium">{desc}</p>
    </>
  );
}

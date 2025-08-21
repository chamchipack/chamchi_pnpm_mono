'use client';

type TypeValue = '' | 'store' | 'product';
type Type = { value: TypeValue; label: string };

interface TypeFilterChipProps {
  onClick?: () => void; // 클릭 이벤트 (선택 사항)
  value: Type;
}

export default function ToggleChip({ value, onClick }: TypeFilterChipProps) {
  // const searchParams = useSearchParams();
  // const router = useRouter();

  // const [value, setValue] = useState<string>(type || 'store');

  // const toggle = () => {
  //   const next = value === 'store' ? 'product' : 'store';
  //   const current = new URLSearchParams(Array.from(searchParams.entries()));

  //   if (next === 'product') current.set('type', 'product');
  //   else current.delete('type');

  //   router.replace(`?${current.toString()}`);
  // };

  // useEffect(() => {
  //   setValue(type || 'store');
  // }, [type]);

  return (
    <button
      onClick={onClick}
      className={`h-7 px-3 rounded-full text-xs font-medium transition-colors duration-200 bg-main text-white`}
    >
      {value?.label}
    </button>
  );
}

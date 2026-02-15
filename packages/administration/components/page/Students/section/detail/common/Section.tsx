import Slider from '@mui/material/Slider';

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center justify-between border-t border-gray-100 px-2 pt-4 pb-1 ">
      <span className="text-sm font-medium text-gray-600">{title}</span>
      <div className="">{children}</div>
    </div>
  );
}

export function SliderRow({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value} 회</span>
      </div>

      <Slider
        min={0}
        max={max}
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        sx={{
          color: '#e83b64',
          height: 6,
          '& .MuiSlider-thumb': {
            width: 18,
            height: 18,
          },
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-rail': {
            opacity: 0.3,
          },
        }}
      />
    </div>
  );
}

export function SelectButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-2xl text-sm font-medium border transition ${
        active
          ? 'bg-main text-white'
          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}

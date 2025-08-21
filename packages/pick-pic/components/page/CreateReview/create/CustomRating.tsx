import { Star, StarHalf } from 'lucide-react';

interface CustomRatingProps {
  value: number; // 0.5 단위
  onChange: (value: number) => void;
}

export default function CustomRating({ value, onChange }: CustomRatingProps) {
  const handleClick = (i: number, isHalf: boolean) => {
    const newValue = isHalf ? i + 0.5 : i + 1;
    onChange(newValue);
  };

  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => {
        const filled = value >= i + 1;
        const half = value >= i + 0.5 && value < i + 1;

        return (
          <div key={i} className="relative w-6 h-6">
            <button
              className="absolute inset-0 w-1/2 h-full left-0 z-10"
              onClick={() => handleClick(i, true)}
            />
            <button
              className="absolute inset-0 w-1/2 h-full right-0 z-10"
              onClick={() => handleClick(i, false)}
            />

            {filled ? (
              <Star className="text-yellow-400 w-5 h-5 fill-yellow-400" />
            ) : half ? (
              <StarHalf className="text-yellow-400 w-5 h-5 fill-yellow-400" />
            ) : (
              <Star className="text-gray-300 w-5 h-5" />
            )}
          </div>
        );
      })}
    </div>
  );
}

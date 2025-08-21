'use client';

import { Star } from 'lucide-react';

interface Props {
  iconSize?: number;
  rating: number;
}

export default function StarRatingscore({ rating, iconSize }: Props) {
  if (!rating) return null;

  const size = iconSize || 18;
  const formattedRating = rating.toFixed(1);

  return (
    <div className="flex items-center mr-1">
      <Star color="#FFC300" width={size} height={size} />
      <span className="ml-1 text-sm font-medium text-gray-800">
        {formattedRating}
      </span>
    </div>
  );
}

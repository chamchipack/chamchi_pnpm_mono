'use client';

interface EmptyDataOverlayProps {
  title: string;
  subTitle?: string;
}

export default function EmptyDataOverlay({
  title,
  subTitle,
}: EmptyDataOverlayProps) {
  return (
    <div className="flex flex-col justify-center items-center mt-28 w-full text-center">
      <p className="text-base font-bold text-gray-500">{title}</p>

      {subTitle && <p className="text-sm text-gray-500 mt-1">{subTitle}</p>}

      <img
        src="/icons/exclamation.png"
        alt="No Notification"
        className="w-[70px] h-[70px] mt-2"
      />
    </div>
  );
}

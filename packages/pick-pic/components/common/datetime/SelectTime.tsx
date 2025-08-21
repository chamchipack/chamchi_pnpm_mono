'use client';

import TimePicker from './TimePicker';

interface SelectTimeProps {
  onClose: () => void;
  selectedHour: string;
  selectedMinute: string;
  setSelectedHour: (hour: string) => void;
  setSelectedMinute: (minute: string) => void;
}

const hours = [...Array(24)].map((_, i) => i.toString().padStart(2, '0'));
const minutes = ['00', '30'];

export default function SelectTime({
  onClose,
  selectedHour,
  selectedMinute,
  setSelectedHour,
  setSelectedMinute,
}: SelectTimeProps) {
  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / 40);
    setSelectedHour(hours[index] || '00');
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / 40);
    setSelectedMinute(minutes[index] || '00');
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-center">
        <TimePicker
          time={hours}
          handleTimeScroll={handleHourScroll}
          selectedTime={selectedHour}
          setSelectedTime={setSelectedHour}
        />
        <span className="text-2xl mx-3">:</span>
        <TimePicker
          time={minutes}
          handleTimeScroll={handleMinuteScroll}
          selectedTime={selectedMinute}
          setSelectedTime={setSelectedMinute}
        />
      </div>
    </div>
  );
}

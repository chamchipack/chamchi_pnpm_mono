'use client';

import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import DayTimeSelector from './DayTimeSelector';

interface Props {
  weekLimit: number;
  form: any;
}

const CSR_DayTimeSelector = ({ weekLimit, form }: Props) => {
  const [selectedDate, setSelectedDate] = useRecoilState<string | null>(
    dateSelectionAtom,
  );

  const [localDate, setLocalDate] = useState<string | null>(null);

  useEffect(() => {
    setLocalDate(selectedDate);
  }, [selectedDate]);

  return (
    <div>
      <DayTimeSelector
        weeksLimit={weekLimit}
        form={form}
        initialDateTime={localDate || ''}
      />
    </div>
  );
};

export default React.memo(CSR_DayTimeSelector);

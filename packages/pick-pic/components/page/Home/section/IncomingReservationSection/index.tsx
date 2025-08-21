'use client';

import CustomChip from '@/components/common/chip/CustomChip';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { useIncomingOrders } from './hooks/useIncomingOrders';
import ReservationCard from './ReservationCard';

export default function IncomingReservation({ userId }: { userId: string }) {
  // const { _id } = useUserInfoKeys(['_id']);
  const { items, index, handleNext, handleRouter } = useIncomingOrders(userId);

  if (!items.length) return null;

  const item = items[index];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <CustomChip status={item?.status} />
        <div className="flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-xs">
          <AlertCircle size={12} className="text-gray-600" />
          <span>진행중인 주문 {items.length}건</span>
          <ChevronRight
            size={20}
            className="cursor-pointer text-gray-600"
            onClick={handleNext}
          />
        </div>
      </div>

      <div className="relative h-[110px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={item._id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full"
          >
            <ReservationCard
              item={item}
              onClick={() => handleRouter(item._id)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

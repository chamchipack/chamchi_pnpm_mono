import { Search } from 'lucide-react';
import TaskTabs from './Tab';

export default function TaskPage() {
  return (
    <div className="bg-white">
      <main className="">
        {/* CSR Component: 탭 전환 기능이 포함된 클라이언트 컴포넌트 */}
        <TaskTabs />
      </main>
    </div>
  );
}

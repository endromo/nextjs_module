import { ModuleManagerProvider } from '@/contexts/ModuleManagerContext';
import { MainApp } from '@/components/MainApp';

export default function Home() {
  return (
    <ModuleManagerProvider>
      <MainApp />
    </ModuleManagerProvider>
  );
}
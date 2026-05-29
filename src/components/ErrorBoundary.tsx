import { Component, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0E0D] flex flex-col items-center justify-center px-6 text-center">
          <div className="w-14 h-14 rounded-full bg-[#FF4D4F]/10 flex items-center justify-center mb-4">
            <AlertTriangle className="text-[#FF4D4F]" size={26} strokeWidth={1.5} />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#E8F0EC]">Something broke</h1>
          <p className="text-sm text-[#E8F0EC]/50 mt-2 max-w-sm">An unexpected error occurred while rendering Keeta Pulse. Reload to try again.</p>
          <Button className="mt-5 bg-[#00E599] text-[#0A0E0D] hover:bg-[#00E599]/90" onClick={() => window.location.reload()}>Reload app</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
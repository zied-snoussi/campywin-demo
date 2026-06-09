'use client';
import { ClientLayout } from '@/components/layout/client-layout';
import { MessagesUI } from '@/components/messages/messages-ui';
import { CLIENT_CONVERSATIONS } from '@/lib/mock-data';

export default function ClientMessagesPage() {
  return (
    <ClientLayout>
      <div className="mb-5">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Messages</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Échangez avec les organisateurs et le support CampyWin</p>
      </div>
      <MessagesUI conversations={CLIENT_CONVERSATIONS} title="Messages" />
    </ClientLayout>
  );
}

'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import MessagesPage from '@/app/candidate/messages/page';

export default function AdminMessagesPage() {
  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex">
      <Sidebar role="admin" />
      <div className="flex-1 ml-56 md:ml-60">
        <MessagesPage />
      </div>
    </div>
  );
}

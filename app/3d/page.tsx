import React from 'react';
import ModelComponent from '@/components/3d/ModelComponent';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Model',
  description: '3D Model',
};

export default function ModelPage() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white">
      <ModelComponent />
    </div>
  );
}

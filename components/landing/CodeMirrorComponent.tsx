'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { javascript } from '@codemirror/lang-javascript';

export default function CodeMirrorComponent({ code }: { code: string }) {
  return (
    <div className="bg-black p-2 flex flex-col gap-4 text-white rounded-xs">
      <CodeMirror value={code} theme="dark" extensions={[javascript()]} />
    </div>
  );
}

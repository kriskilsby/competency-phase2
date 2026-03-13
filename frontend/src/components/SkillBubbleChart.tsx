// frontend/src/components/SkillBubbleChart.tsx
// ZAxis controls bubble size (bigger = more experience).
// XAxis uses skill names.
// Tooltip shows volume.

'use client';

import { useEffect, useState } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis } from 'recharts';
import { fetchSkillVolumes } from '@/lib/api';

type SkillData = {
  cv_id: number;
  skill: string;
  type: string;
  volume: number;
};

export default function SkillBubbleChart() {
  const [data, setData] = useState<SkillData[]>([]);

  useEffect(() => {
    fetchSkillVolumes().then(setData).catch(console.error);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full h-[500px]">
      <h2 className="text-xl font-bold mb-4">Top Skills by Project Volume</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <XAxis dataKey="skill" type="category" name="Skill" interval={0} tick={{ fontSize: 12 }} />
          <YAxis dataKey="volume" type="number" name="Volume" />
          <ZAxis dataKey="volume" range={[100, 2000]} name="Volume" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value: any, name: string, props: any) => [value, name]}
            labelFormatter={(label: any) => `Skill: ${label}`}
          />
          <Scatter data={data} fill="#E73D5C" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
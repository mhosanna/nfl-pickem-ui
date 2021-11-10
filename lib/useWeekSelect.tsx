import { useEffect, useState } from 'react';
import { season } from '../config';
import Select from '../components/Select';
import { useGetWeeksBySeasonQuery } from '../types/generated-queries';

export default function useWeekSelect(initial = {}) {
  const { data, error, loading } = useGetWeeksBySeasonQuery({
    variables: { season },
  });

  const [dropdownLabel, setDropdownLabel] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    if (data) {
      const { weeks } = data;
      setDropdownLabel(weeks[0]?.label);
      const week = weeks.filter((week) => week.label === dropdownLabel);
      setSelectedWeek(week[0]);
    }
  }, [data]);

  useEffect(() => {
    const week = data?.weeks.filter((week) => week.label === dropdownLabel);
    if (week) {
      setSelectedWeek(week[0]);
    }
  }, [dropdownLabel]);

  const weekSelector = (
    <Select
      label="Select a Week"
      value={dropdownLabel}
      onChange={(ev) => setDropdownLabel(ev.target.value)}
    >
      {data?.weeks.map((week) => {
        return (
          <option key={week.id} value={week.label}>
            {week.label}
          </option>
        );
      })}
    </Select>
  );

  return {
    loading,
    error,
    weekSelector,
    selectedWeek,
  };
}

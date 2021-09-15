import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { season } from "../config";
import Select from "../components/Select";

const gameFragment = gql`
  fragment GameFragment on Game {
    homeTeam {
      id
      name
      city
      abbreviation
    }
    awayTeam {
      id
      name
      city
      abbreviation
    }
    week {
      id
    }
    spread
    winner {
      id
    }
  }
`;

export const WEEKS_BY_SEASON_QUERY = gql`
  query GET_ALL_WEEKS_BY_SEASON($season: String) {
    weeks(where: { season: { equals: $season } }, orderBy: { id: desc }) {
      id
      label
      games {
        id
        ...GameFragment
      }
    }
  }
  ${gameFragment}
`;

export default function useWeekSelect(initial = {}) {
  const { data, error, loading } = useQuery(WEEKS_BY_SEASON_QUERY, {
    variables: { season },
  });

  const [dropdownLabel, setDropdownLabel] = useState("");
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

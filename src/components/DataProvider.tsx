/** @jsxImportSource @emotion/react */

import { csv, DSVRowArray, DSVRowString } from "d3";
import React, { useState, useEffect, useContext, useMemo } from "react";
import fightByFighters from "../data/fight_by_fighters.csv";
import fightersList from "../data/fighters_list.csv";
import fightStrikes from "../data/fight_str.csv";

const csvLocations = {
  fightByFighters,
  fightersList,
  fightStrikes,
};

interface IDataContext {
  fightByFighters: DSVRowArray;
  fightersList: DSVRowArray;
  fightStrikes: DSVRowArray;
}

const empty: DSVRowArray = (() => {
  const array: any = [];
  array.columns = [];
  return array;
})();

const defaultDataContext: IDataContext = {
  fightByFighters: empty,
  fightersList: empty,
  fightStrikes: empty,
};

const DataContext = React.createContext(defaultDataContext);

/**
 * Provides data to all child components, accessible by the `useData` hook
 */
export const DataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<IDataContext>(defaultDataContext);

  // Fetch and parse data
  useEffect(() => {
    Object.entries(csvLocations).forEach(([key, value]) =>
      csv(value).then((result) =>
        setData((old) => ({
          ...old,
          [key]: result,
        }))
      )
    );
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

/**
 * Get fighter list data
 */
export const useIsDataLoading = () => {
  const { fightersList, fightByFighters, fightStrikes } =
    useContext(DataContext);
  return (
    !fightersList.length && !fightByFighters.length && !fightStrikes.length
  );
};

/**
 * Get fighter list data
 */
export const useFighterList = () => {
  const { fightersList } = useContext(DataContext);
  return fightersList;
};

/**
 * Get fight data by fighter name
 */
export const useFighterFights = (fighter: string) => {
  const { fightByFighters } = useContext(DataContext);
  const filteredFights = useMemo(() => {
    if (fighter) {
      return fightByFighters.filter((row) => row.fighter === fighter);
    }
    return [];
  }, [fightByFighters, fighter]);
  return filteredFights;
};

/**
 * Get fighter strike data by fighter name
 */
export const useFighterStrikes = (fighter: string) => {
  const { fightStrikes } = useContext(DataContext);
  const filteredFights = useMemo(() => {
    if (fighter) {
      return fightStrikes.filter((row) => row.fighter === fighter);
    }
    return [];
  }, [fightStrikes, fighter]);
  return filteredFights;
};

/**
 * Get fighter strike data by fighter name
 */
export const useCumulativeFighterStrikes = (fighter: string) => {
  const fighterStrikes = useFighterStrikes(fighter);

  const [given, taken] = useMemo(() => {
    const given = getFighterStrikesCumulative(fighterStrikes);
    const taken = getFighterStrikesCumulative(fighterStrikes, true);
    return [given, taken];
  }, [fighterStrikes]);

  return { given, taken };
};

const fighterStrikeColumns = [
  ["leg", "Leg Hits"],
  ["leg_misses", "Leg Misses"],
  ["body", "Body Hits"],
  ["body_misses", "Body Misses"],
  ["head", "Head Hits"],
  ["head_misses", "Head Misses"],
];

const fighterStrikeTakenColumns = [
  ["opponent_leg", "Leg Hits"],
  ["opponent_leg_misses", "Leg Misses"],
  ["opponent_body", "Body Hits"],
  ["opponent_body_misses", "Body Misses"],
  ["opponent_head", "Head Hits"],
  ["opponent_head_misses", "Head Misses"],
];

/**
 * Get cumulative fighter strike data by fighter name
 */
const getFighterStrikesCumulative = (
  fighterStrikes: DSVRowString<string>[],
  taken?: boolean
) => {
  if (!fighterStrikes.length) {
    return [];
  }

  const columns = taken ? fighterStrikeTakenColumns : fighterStrikeColumns;

  // Transform strike data
  const strikes = fighterStrikes.reduce((strikes: any[], fight) => {
    columns.forEach(([strikeType, strikeTitle], index) => {
      strikes.push({
        date: fight.date,
        strikeType: strikeTitle,
        count: fight[strikeType],
      });
    });
    return strikes;
  }, []);

  // Accumulate
  const strikesTally: Record<string, number> = {};
  strikes.forEach(({ strikeType, count }) => {
    const current = strikesTally[strikeType] ?? 0;
    strikesTally[strikeType] = current + Number(count);
  });

  // Transform into data array
  return Object.entries(strikesTally).map(([key, value]) => ({
    strikeType: key,
    count: value,
    order: columns.findIndex((column) => column[1] === key),
    group: key.split(" ")[0],
  }));
};

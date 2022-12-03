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
 * Get the minimum and maximum for a numberic item property
 */
const getMinMax = (list: Array<any>, key: string) =>
  list.reduce(
    ([min, max], item) => {
      const height = Number(item[key]);
      if (min > height) {
        min = height;
      }
      if (max < height) {
        max = height;
      }
      return [min, max];
    },
    [Infinity, 0]
  );

/**
 * Check if value is in a given range
 * Return true if value is zero to include missing values
 */
const getIsInRange = (value: number, [lower, upper]: [number, number]) =>
  value >= lower && value <= upper;

export interface IFighterListOptions {
  weightClass?: string;
  ageRange?: [number, number];
  heightRange?: [number, number];
  weightRange?: [number, number];
}

export interface IUseFighterList {
  unfilteredFighters: DSVRowArray<string>;
  fightersList: DSVRowArray<string>;
  ranges: {
    weightClasses: string[];
    ageRange: [number, number];
    heightRange: [number, number];
    weightRange: [number, number];
  };
}

/**
 * Filter data for a given range option
 */
const getFilterdRangeList = (
  list: DSVRowArray<string>,
  range: [number, number] | undefined,
  key: string
) => {
  if (!range) {
    return list;
  }
  const filteredList = list.filter((fighter) =>
    getIsInRange(Number(fighter[key]), range)
  );
  return Object.assign(filteredList, { columns: list.columns });
};

/**
 * Get fighter list data
 */
export const useFighterList = (
  options?: IFighterListOptions
): IUseFighterList => {
  const { fightersList } = useContext(DataContext);

  // Get all weight classes
  const weightClasses = useMemo(
    () =>
      fightersList
        .reduce((classes: string[], fighter) => {
          if (fighter.weight_class && !classes.includes(fighter.weight_class)) {
            classes.push(fighter.weight_class);
          }
          return classes;
        }, [])
        .sort(),
    [fightersList]
  );

  // Constrain to weight class if given
  const weightFiltered: DSVRowArray<string> = useMemo(() => {
    if (options?.weightClass) {
      const list = fightersList.filter(
        (fighter) => fighter.weight_class === options.weightClass
      );
      return Object.assign(list, { columns: fightersList.columns });
    }
    return fightersList;
  }, [options?.weightClass, fightersList]);

  // Get min and max ranges of weight class constrained set
  const [minAge, maxAge] = useMemo(
    () => getMinMax(weightFiltered, "age"),
    [weightFiltered]
  );
  const [minHeight, maxHeight] = useMemo(
    () => getMinMax(weightFiltered, "Height_cms"),
    [weightFiltered]
  );
  const [minWeight, maxWeight] = useMemo(
    () => getMinMax(weightFiltered, "Weight_lbs"),
    [weightFiltered]
  );

  // Filter by weight range if given
  const weightRangeFiltered: DSVRowArray<string> = useMemo(
    () =>
      getFilterdRangeList(weightFiltered, options?.weightRange, "Weight_lbs"),
    [weightFiltered, options?.weightRange]
  );

  // Filter by height range if given
  const heightRangeFiltered: DSVRowArray<string> = useMemo(
    () =>
      getFilterdRangeList(
        weightRangeFiltered,
        options?.heightRange,
        "Height_cms"
      ),
    [weightRangeFiltered, options?.heightRange]
  );

  // Filter by weight range if given
  const ageRangeFiltered: DSVRowArray<string> = useMemo(
    () => getFilterdRangeList(heightRangeFiltered, options?.ageRange, "age"),
    [heightRangeFiltered, options?.ageRange]
  );

  return {
    unfilteredFighters: fightersList,
    fightersList: ageRangeFiltered,
    ranges: {
      weightClasses,
      ageRange: [minAge, maxAge],
      heightRange: [minHeight, maxHeight],
      weightRange: [minWeight, maxWeight],
    },
  };
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

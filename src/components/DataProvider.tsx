/** @jsxImportSource @emotion/react */

import { csv, DSVRowArray } from "d3";
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
 * Get fight strike data by fighter name
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

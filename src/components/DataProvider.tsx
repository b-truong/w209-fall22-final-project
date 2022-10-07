/** @jsxImportSource @emotion/react */

import { csv, DSVRowArray } from "d3";
import React, { useState, useEffect, useContext } from "react";
import fightByFighters from "../data/fight_by_fighters.csv";
import fightersList from "../data/fighters_list.csv";

const csvLocations = {
  fightByFighters,
  fightersList,
};

interface IDataContext {
  fightByFighters: DSVRowArray;
  fightersList: DSVRowArray;
}

const empty: DSVRowArray = (() => {
  const array: any = [];
  array.columns = [];
  return array;
})();
const defaultDataContext: IDataContext = {
  fightByFighters: empty,
  fightersList: empty,
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
 * Access data loaded by the DataProvider
 */
export const useData = () => {
  const context = useContext(DataContext);
  return context;
};

import React, { useState } from "react";
import { YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Explorer from "@components/Explorer";
import SearchBar from "@components/SearchBar";
import type { HomeScreenProps } from "../navigationTypes";
import { SCREEN_PADDING, TODAY_TAB } from "../constants";

const Home = ({ navigation }: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  // Defaults to today's shows; Explorer switches to Favorites if any exist.
  const [selectedYear, setSelectedYear] = useState<number>(TODAY_TAB);
  return (
    <YStack flex={1} bg="$bg" px={SCREEN_PADDING} pt={insets.top} pb={insets.bottom}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Explorer
        goToShow={(show, availableShowsOnSelectedDate) => {
          navigation.navigate("ShowDetails", {
            show,
            availableShowsOnSelectedDate,
          });
        }}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
        searchTerm={searchTerm}
      />
    </YStack>
  );
};

export default Home;

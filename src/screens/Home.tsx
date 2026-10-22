import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Explorer from "@components/Explorer";
import SearchBar from "@components/SearchBar";
import type { HomeScreenProps } from "../navigationTypes";
import { SCREEN_PADDING, TODAY_TAB } from "../constants";
import { usePlayer } from "../context/PlayerContext";

const Home = ({ navigation }: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const { show: playingShow } = usePlayer();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(TODAY_TAB);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <YStack
        flex={1}
        bg="$bg"
        px={SCREEN_PADDING}
        pt={insets.top}
        pb={playingShow ? 0 : insets.bottom}
      >
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
    </TouchableWithoutFeedback>
  );
};

export default Home;

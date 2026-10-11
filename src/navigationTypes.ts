import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Show } from "./types";

export type RootStackParamList = {
  Home: undefined;
  ShowDetails: {
    show: Show;
    availableShowsOnSelectedDate: Show[];
  };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type ShowDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ShowDetails"
>;

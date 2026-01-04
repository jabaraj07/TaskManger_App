// src/navigation/types.ts
import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Task:undefined;
  Forgot: undefined;
  NewPassword: undefined;
  AddTask: undefined;
  ButtonScreen: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

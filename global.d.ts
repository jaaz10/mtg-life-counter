declare namespace ReactNavigation {
  interface RootParamList {
    home: undefined;
    other: undefined;
  }
}

declare module "expo-router" {
  interface SlotProps {
    children: React.ReactNode;
  }

  export const Slot: React.FC<SlotProps>;
}

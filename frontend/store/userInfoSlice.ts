import { StateCreator } from "zustand";
import { getAaveUsers } from "@/utils/getAaveUser";

export interface UserState {
  userAaveData: any[];
  setUserAaveData: (userAaveData: any[]) => void;
  getUserAaveData: () => Promise<void>;
  initialMessage: string;
  setInitialMessage: (initialMessage: string) => void;
}

export const createUserSlice: StateCreator<UserState> = (set) => ({
  userAaveData: [],
  setUserAaveData: (userAaveData) => set({ userAaveData }),
  getUserAaveData: async () => {
    try {
      const userData = await getAaveUsers();
      set({ userAaveData: userData || [] });
    } catch (error) {
      console.error('Failed to fetch AAVE data:', error);
      set({ userAaveData: [] });
    }
  },
  initialMessage: "",
  setInitialMessage: (initialMessage) => set({ initialMessage }),
});
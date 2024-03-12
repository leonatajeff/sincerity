import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { UserData } from 'src/ts/user.types'

interface AppState {
  user: UserData | null;
  history: string[]; // TODO: create a history object containing JD, Resume, etc.
}

const useAppStore = create<AppState>()(
    devtools(
      (set) => ({
        user: null,
        history: [],
        loginUser: (by: AppState) => set((state) => ({ user: by.user, history: by.history})),
        logoutUser: (by: UserData) => set((state) => ({ user: null, history: []})),
        recordHistory: (by: string) => set((state) => ({ history: [...state.history, by]}))
      })
    ),
  );
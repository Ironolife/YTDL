import create from 'zustand';
import { InfoResponse } from '../pages/api/info';

type InfoStoreState = {
	state: InfoResponse | null;

	setState: (res: InfoResponse) => void;
};

export const useInfoStore = create<InfoStoreState>((set) => ({
	state: null,

	setState: (res) => set({ state: res }),
}));

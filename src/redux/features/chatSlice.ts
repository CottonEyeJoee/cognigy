import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ChatState {
	history: Message[];
}

export enum Origin {
	User = 'user',
	Bot = 'bot',
}

interface Data {
	imgSrc?: string;
}

interface Message {
	origin: Origin;
	text: string;
	data: Data;
	id: string;
}

export interface Reply {
	source: Origin;
	text: string;
	data: Data;
	traceId: string;
}

const initialState: ChatState = {
	history: [],
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		postMessage: (state, action: PayloadAction<Message>) => {
			state.history.push(action.payload);
		},
		getMessage: (state, action: PayloadAction<Reply>) => {
			const { source: origin, text, data, traceId: id } = action.payload;
			state.history.push({ origin, text, data, id });
		},
	},
});

export const { postMessage, getMessage } = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat.history;

export default chatSlice.reducer;

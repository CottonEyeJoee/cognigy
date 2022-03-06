export enum TypingStatus {
	active = 'typingOn',
	inactive = 'typingOff',
}

export enum GeneralStatus {
	Loading = 'loading',
	Idle = 'idle',
	Error = 'error',
}

export enum ThemeMode {
	Dark = 'dark',
	Light = 'light',
}

export enum Origin {
	User = 'user',
	Bot = 'bot',
}

export interface Data {
	imgSrc?: string
}

export interface Message {
	origin: Origin
	text: string
	data: Data
	id: string
}

export interface Reply {
	source: Origin
	text: string
	data: Data
	traceId: string
}

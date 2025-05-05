import React, { createContext, useReducer, useContext, ReactNode } from 'react';

export interface PollState {
  categories: string[];
  title: string;
  description: string;
  participants: string[];
  image: string | null;
  endDate: Date | null;
  preferences: {
    isPublic: boolean;
    showStatsBeforeEnd: boolean;
    showCreatorName: boolean;
  };
}

const initialState: PollState = {
  categories: [],
  title: '',
  description: '',
  participants: [],
  image: null,
  endDate: null,
  preferences: {
    isPublic: false,
    showCreatorName: false,
    showStatsBeforeEnd: false,

  },
};

type PollAction =
  | { type: 'SET_CATEGORIES'; payload: string[] }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_PARTICIPANTS'; payload: string[] }
  | { type: 'SET_IMAGE'; payload: string | null }
  | { type: 'SET_END_DATE'; payload: Date }
  | { type: 'SET_PREFERENCES'; payload: Partial<PollState['preferences']> }
  | { type: 'RESET' };

function pollReducer(state: PollState, action: PollAction): PollState {
  console.log('PollReducer:', action);
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_PARTICIPANTS':
      return { ...state, participants: action.payload };
    case 'SET_IMAGE':
      return { ...state, image: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_PREFERENCES':
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const PollContext = createContext<{
  state: PollState;
  dispatch: React.Dispatch<PollAction>;
} | undefined>(undefined);

PollContext.displayName = 'PollContext'

export function PollProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pollReducer, initialState);
  console.log('PollProvider rendered');
  return (
    <PollContext.Provider value={{ state, dispatch }}>
      {children}
    </PollContext.Provider>
  );
}

export function usePoll() {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error('usePoll must be used within a PollProvider');
  }
  return context;
}
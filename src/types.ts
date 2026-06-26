export type ActiveView = 'discover' | 'overview' | 'canvas' | 'chapters' | 'itinerary';

export interface Trip {
  id: string;
  name: string;
  destination: string;
  dates: string;
  weather: string;
  budgetUsed: number;
  budgetTotal: number;
  days: {
    name: string;
    date: string;
    activities: Activity[];
  }[];
}

export interface Activity {
  id: string;
  time: string;
  category: string;
  title: string;
  location: string;
  description: string;
  cost: number;
  costFormatted: string;
  image: string;
  tags: string[];
  completed?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'aura';
  text: string;
  timestamp: Date;
}

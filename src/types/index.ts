export interface Puppy {
  id: string;
  name: string;
  breed: string;
  gender: 'boy' | 'girl' | 'boy & girl';
  age: string;
  hasVideo?: boolean;
  status: 'Available' | 'Reserved' | 'Gone home';
  color: string;
  image: string;
  href: string;
  origin?: 'local' | 'imported';
  meta?: string;
}

export interface PolaroidPhoto {
  id: number;
  caption: string;
  image: string;
  style: string;
  family?: string;
  location?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

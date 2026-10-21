export interface JourneyStep {
  number: number;
  title: string;
  description: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: 1,
    title: 'Choose your breed',
    description: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle."
  },
  {
    number: 2,
    title: 'Get photos & details',
    description: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.'
  },
  {
    number: 3,
    title: 'Secure & safe delivery',
    description: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.'
  }
];

export const TRUST_STAMPS = [
  {
    id: 'vet',
    title: 'Vet-checked & healthy',
    description: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.',
    stampType: 'round',
    color: '#a24a1a',
    tilt: '-8deg'
  },
  {
    id: 'korea',
    title: 'Korea to Dubai, safely',
    description: 'Trusted breeders, safe travel, and premium care from start to finish.',
    stampType: 'ticket',
    color: '#1f6b45',
    tilt: '5deg'
  },
  {
    id: 'support',
    title: 'Support 24/7',
    description: 'Always here to help, from choosing your puppy to post-delivery support.',
    stampType: 'oval',
    color: '#5a3a28',
    tilt: '-4deg'
  },
  {
    id: 'trusted',
    title: 'Trusted by families worldwide',
    description: 'Puppies delivered to loving homes all around the world.',
    stampType: 'scallop',
    color: '#c2622b',
    tilt: '7deg'
  }
];

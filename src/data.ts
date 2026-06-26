import { Trip } from './types';

export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'tokyo-autumn',
    name: 'Autumn in Tokyo',
    destination: 'Tokyo, Japan',
    dates: 'Oct 12 — Oct 20, 2024',
    weather: '18°C Cloudy',
    budgetUsed: 1240,
    budgetTotal: 3000,
    days: [
      {
        name: 'Mon 14',
        date: 'Oct 14',
        activities: [
          {
            id: 'tokyo-1-1',
            time: '09:00 AM',
            category: 'Sightseeing',
            title: 'Senso-ji Temple Morning walk',
            location: 'Asakusa',
            description: 'Beat the crowds and visit Tokyo\'s oldest and most iconic Buddhist temple in the golden morning light.',
            cost: 0,
            costFormatted: 'Free',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3jF-jDMJ1eBhTUM_e85nSml2OKTq22A8C7Wm7Rg7717n_UyfYwDJlTiU0m5mD-QJjTpQ1UiosgiLlp5V38hlPrFok8Y3Cxoe1_Q64B_7pHktwvy1P92jGyPK_Rrh2uQ-wyyo9Jx9LeLM5ioXnhEgXtLlhlwaGwgV1EG2reLeskmhhzg6E4ELkXq7tG8B0UWxa8ZqQoR35EKPbMAYB89E5a2l_vHaXZVfKYtvdNNpK2GH6bKcIoeZstskxyhYUhAwyNGRvpT9jVIg',
            tags: ['Cultural', 'Historic']
          },
          {
            id: 'tokyo-1-2',
            time: '01:00 PM',
            category: 'Food',
            title: 'Shinjuku Ramen Tasting',
            location: 'Omoide Yokocho',
            description: 'Explore the narrow alleyways of Shinjuku and enjoy deep rich tonkotsu broth at local legendary stalls.',
            cost: 15,
            costFormatted: '¥2,200',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeUwMcWhbyQOXuUPuALBFKgaLRdacJgfGLc4DOhu0YxL9wbPWxn6B3Rmo0-4lWjGiqMM38_kKdasa8FEaO9qWVTn9WbWTcF5roog3BxgDW9Am1W7wKysWFtIjZHPN5bxr6eLxjCEvZ1smK-6U8Y1CohS469JH6WLu7ARL28VgDM6qPtrfpm1jDoeoX4vSYDXBdAOg0MMkuSAwm4VN2PEcqKU0hwbFBn5d3tBugIllp48v4x2u6DQPu6l8xnq_8V6B49QDzPFhUueg',
            tags: ['Culinary', 'Casual']
          }
        ]
      },
      {
        name: 'Tue 15',
        date: 'Oct 15',
        activities: [
          {
            id: 'tokyo-2-1',
            time: '10:00 AM',
            category: 'Architecture',
            title: 'Nakano Brutalist Archive',
            location: 'Setagaya District',
            description: 'A masterclass in 1970s concrete expressionism. Aura suggests visiting the rooftop terrace for a hidden view of the skyline.',
            cost: 25,
            costFormatted: '¥3,500',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfMM1EOcL6MEha2aCsiFcydUpNJ7D94jeGeeW_ovtlP2aH1evoGkfWl-cQyRFjeeUP6_KoH6xfSiFa9E0EvupW5NNLsk1uD435chGrnMcp3VfxODOPrx1_6SK0A3rCgQjBvI7egj527mmMPxVQs8gDluoQ40JKmhDTL5BDZjPN2SADf35S7rM0IfxsG3Mz5XScLdFMHueuyMcMc7WA-YcuJBhdmJ0QcCGVJSCvpW6sLAOkbiaRV8OL7IM3StqC3fOLCsc1sYNFTKw',
            tags: ['Cultural', '2 Hours'],
            completed: false
          },
          {
            id: 'tokyo-2-2',
            time: '08:00 PM',
            category: 'Nightlife',
            title: 'Blue Note Kissa',
            location: 'Shinjuku Goldengai',
            description: 'Legendary jazz haunt known for its rare vinyl collection and impeccably crafted old-fashioneds. Table reserved for 2.',
            cost: 50,
            costFormatted: '¥7,500',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKOc--iTblG6fFwv6q-IAPxpS7kqZ-Go48WMxgEnvPNhztn2VyQFraQ-7asQSVjuXWS_vEm3P3Omn-e9Ozi8GP2G1oQPxsSqfRC4qdwaMpimpj85Z_ZCpIHDRTcRLnpXu6HqC6na86oBy7jD8hb15IKF2BFh6lCB6lAEpqWo9RH0sq_LpuvhVO6upunMbQeSBexcdoYKZ20hxT0aSISxPOsbN5gWXyv1OGbpOTsZIGT-QF1UZhDx7oAhidQ9-r_ABvuSOEjGl_a2E',
            tags: ['Live Music', 'Reservation Confirmed'],
            completed: true
          }
        ]
      },
      {
        name: 'Wed 16',
        date: 'Oct 16',
        activities: [
          {
            id: 'tokyo-3-1',
            time: '11:00 AM',
            category: 'Shopping',
            title: 'Harajuku Avant-Garde Explore',
            location: 'Takeshita Street',
            description: 'Wander through futuristic boutiques, retro toy archives, and sensory culinary stalls.',
            cost: 30,
            costFormatted: '¥4,500',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo8JcTKNCfppr0gK7MW0xpgYlogfGp7im8KnTmhRmGSotIiUJoaj0DdPpMqp8u-JFMsH7uM-7g0fGOi7T7GItZPKZcHmoTUovrDeVuhUK_EqAtEd0a1eDut3RfDZnUF8ohbphVR6lzJMAejRb6Jq46kfo3Vp1dQ8r5naHqrzA78KT4CPhC0oVovnpLXqM6Vr216ReLHLboRCrr5m1p3082S3T4q5a0csVmR6Xp3NeQsXoDhSfjebgT9IyjbXbOBa2oe5alebrKrT4',
            tags: ['Fashion', 'Vibrant']
          }
        ]
      },
      {
        name: 'Thu 17',
        date: 'Oct 17',
        activities: []
      },
      {
        name: 'Fri 18',
        date: 'Oct 18',
        activities: []
      }
    ]
  },
  {
    id: 'berlin-dive',
    name: 'Berlin Cultural Deep Dive',
    destination: 'Berlin, Germany',
    dates: 'Sep 12 — Sep 18, 2024',
    weather: '18°C Cloudy',
    budgetUsed: 82.5,
    budgetTotal: 1000,
    days: [
      {
        name: 'Day 01',
        date: 'Sep 12',
        activities: []
      },
      {
        name: 'Day 02',
        date: 'Sep 13',
        activities: []
      },
      {
        name: 'Day 03',
        date: 'Sep 14',
        activities: []
      },
      {
        name: 'Today',
        date: 'Sep 15',
        activities: [
          {
            id: 'berlin-4-1',
            time: '09:00 AM',
            category: 'Architecture',
            title: 'Brutalist Museum Visit',
            location: 'Berlin, Germany',
            description: 'Explore the raw geometry of the Berlin modernism archive. Private tour included.',
            cost: 45,
            costFormatted: '€45.00',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ynx6UNmbqRhO4BU_ASqt6sD5DcxwMpTzxOW_fdQwoIBAnIqzkaQKaEeKS6xjBwnh4tkuEvk2MLjpokQTHQE5ZmpJMeu4Fc_xwGPP0xZUxupJ1fXzUIpi018C6hFLCtkSxejgyvRCvHizHQVATY1aiu1ewPkofzFZuVJHGm0VXaa1faNOIOYdAsnR5BS68jGxm71AUTtzFmMVoTwhIqlBoevCMsTPtQimvov60F__FNjlY1NADk6iprRL0tWihwNhezs8M0M5dlM',
            tags: ['Cultural', 'Archival']
          },
          {
            id: 'berlin-4-2',
            time: '08:00 PM',
            category: 'Nightlife',
            title: 'Hidden Jazz Bar',
            location: 'Berlin, Germany',
            description: 'A secret cellar venue known only to locals. VIP seating reserved near the stage.',
            cost: 25,
            costFormatted: '€25.00 entry',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD75ryoCzi68c8pk5vYst12KGh1PZTPCVXVGk6ZvzErJIH6d-Uo3jK57GV-d6d2U-qKBuh9Ju0Pmvbif4K1VxMX5hcEcV6PM97qad8XT9DsCn-GMuV1kmzSRtMh8Zy9EZEjr4PKGe5luDbE7hHrfIuzUx5uTKJAKiXk_fySpzvevmtEPUiidMICxWf9QHGREUM2x8mVLabRKe6NUa66k5I0vKFjNPpA2KR2uL9qvxfxEkuleqHmiGP831mmbyJmn8Eq776fQ-7M9cc',
            tags: ['Nightlife', 'Live Jazz']
          }
        ]
      },
      {
        name: 'Day 05',
        date: 'Sep 16',
        activities: []
      },
      {
        name: 'Day 06',
        date: 'Sep 17',
        activities: []
      }
    ]
  }
];

export const CHAPTERS_DATA = [
  {
    id: 'chap1',
    chapterNum: '01',
    title: 'The Neon Zen of Kyoto',
    description: 'Where silicon dreams meet thousand-year traditions. A curated immersion into the hyper-reality of Japan\'s future capital.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeUwMcWhbyQOXuUPuALBFKgaLRdacJgfGLc4DOhu0YxL9wbPWxn6B3Rmo0-4lWjGiqMM38_kKdasa8FEaO9qWVTn9WbWTcF5roog3BxgDW9Am1W7wKysWFtIjZHPN5bxr6eLxjCEvZ1smK-6U8Y1CohS469JH6WLu7ARL28VgDM6qPtrfpm1jDoeoX4vSYDXBdAOg0MMkuSAwm4VN2PEcqKU0hwbFBn5d3tBugIllp48v4x2u6DQPu6l8xnq_8V6B49QDzPFhUueg',
    accent: 'Kyoto, Japan',
    tip: 'Best time to visit for soft lighting: 5:45 PM near the Gion District expansion.'
  },
  {
    id: 'chap2',
    chapterNum: '02',
    title: 'Digital Temples',
    description: 'Step into sanctuaries where holography preserves the transient beauty of the seasons forever. A meditation in light and silence.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqQhuK1YShx26a9DrDqr-qBxlZCsegQLcBRZ4xzY89EaRixsG8jzlUQpJXHyxQGaqYpxmNL6cWGgZ_ehfHjcq5lnDlJYcaB0QDfASlUqnKqoB8jUn5T7qV4FX5wtuoJRf3ixmQ_Aeo63ZzVLSMkYmhxLhoBPA8LO3B7HnrPCpQ5N3ZCDlNvltj-64yZ-i6lMZzVPV8jCs9ffH2fFyRBTzGSh_yP0R4jEH6MJ6U6e7v_99HFdKeviwc08kiRfbu-uEt_7f4rw_8f8g',
    accent: 'Obsidian & Glass',
    tip: 'Strict silence observed. Deep meditation neural feedback syncing is available.'
  },
  {
    id: 'chap3',
    chapterNum: '03',
    title: 'Synthesized Nature',
    description: 'Breathe the engineered air of the Hanging Gardens of Chiyoda. A bio-luminescent forest designed for peak human recovery.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSl0EgmV6U5lr-LOIXNhy0am6J_g0693o7cJ3FTbora7gRcJbA9nCdolqf7w4o9oAl9c0Jtsdmw22E0OxUNO71bZAs8o69zNMkE_Km_k9y8qlPifJ4ZZrYmd6C62yud3ltX_NJwI6CO5WG4xxXoeFhlSpFMKSR2N-mD0J6UugUAQUrxTKbHM1ZynnjDc_5RUFfKJdV5aRbFz0D459yo9LfWNSgFJK4hrfV-xjcTLdrzws4O0fYqFcX384RmqYC_-IhMUF9KhlcjJk',
    accent: 'Lush & Luminescent',
    tip: 'Filtered pure air contains elevated oxygen and subtle hinoki cypress scents.'
  }
];

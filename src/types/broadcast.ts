export type Subject =
  | 'People_Jobs'
  | 'Body_Health'
  | 'Food_Drinks'
  | 'Home_Furniture'
  | 'School_Education'
  | 'Transportation_Directions'
  | 'Places_Buildings'
  | 'Time_Calendar'
  | 'Numbers_Quantities'
  | 'Colors_Shapes'
  | 'Animals_Plants'
  | 'Weather_Nature'
  | 'Hobbies_Activities'
  | 'Technology_Media'
  | 'Feelings_Emotions'
  | 'Actions_Daily'
  | 'Values_Personality'
  | 'Shopping_Money'
  | 'Un'
  | 'Re'
  | 'In'
  | 'Dis'
  | 'Pre'
  | 'Other';
export interface User {
  username: string;
  email: string;
  id: string;
  created_at: string;
}
export interface BroadcastData {
  title: string;
  content: string;
  subject: Subject;
  bgColor: string;
  hoverColor: string;
  icon: string;
  iconColor: string;
}

import type { BadgeColor } from '../types/index';

/**
 * 將 ISO 格式日期字串轉換為 `YYYY-MM-DD` 格式
 * @param {string} isoString - ISO 8601 日期字串，例如 `2025-08-08T09:26:43.000Z`
 * @returns {string} 轉換後的日期字串，例如 `2025-08-08`
 */
export const formatDate = (isoString: Date): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 根據類別字串回傳對應的 Badge 顏色設定。
 *
 * @param {string} category - 類別名稱，例如 "People_Jobs"、"Food_Drinks"。
 * @returns {BadgeColor} 回傳一個物件，包含背景色與文字色的 Tailwind class。
 *
 * @example
 * // 取得職業類別的顏色設定
 * const { bgColorClass, textColorClass } = getBadgeColor('People_Jobs');
 * // bgColorClass -> "bg-blue-500"
 * // textColorClass -> "text-white"
 */
export const getBadgeColor = (category: string): BadgeColor => {
  switch (category) {
    case 'Actions_Daily':
      return { bgColorClass: 'bg-teal-500', textColorClass: 'text-white' };
    case 'Animals_Plants':
      return { bgColorClass: 'bg-lime-500', textColorClass: 'text-white' };
    case 'Body_Health':
      return { bgColorClass: 'bg-red-500', textColorClass: 'text-white' };
    case 'Colors_Shapes':
      return { bgColorClass: 'bg-pink-500', textColorClass: 'text-white' };
    case 'Feelings_Emotions':
      return { bgColorClass: 'bg-rose-500', textColorClass: 'text-white' };
    case 'Food_Drinks':
      return { bgColorClass: 'bg-orange-500', textColorClass: 'text-white' };
    case 'Hobbies_Activities':
      return { bgColorClass: 'bg-yellow-500', textColorClass: 'text-slate-900' };
    case 'Home_Furniture':
      return { bgColorClass: 'bg-amber-500', textColorClass: 'text-white' };
    case 'Numbers_Quantities':
      return { bgColorClass: 'bg-gray-500', textColorClass: 'text-white' };
    case 'People_Jobs':
      return { bgColorClass: 'bg-blue-500', textColorClass: 'text-white' };
    case 'Places_Buildings':
      return { bgColorClass: 'bg-slate-500', textColorClass: 'text-white' };
    case 'School_Education':
      return { bgColorClass: 'bg-purple-500', textColorClass: 'text-white' };
    case 'Shopping_Money':
      return { bgColorClass: 'bg-emerald-500', textColorClass: 'text-white' };
    case 'Technology_Media':
      return { bgColorClass: 'bg-indigo-500', textColorClass: 'text-white' };
    case 'Time_Calendar':
      return { bgColorClass: 'bg-cyan-500', textColorClass: 'text-white' };
    case 'Transportation_Directions':
      return { bgColorClass: 'bg-green-500', textColorClass: 'text-white' };
    case 'Values_Personality':
      return { bgColorClass: 'bg-stone-500', textColorClass: 'text-white' };
    case 'Weather_Nature':
      return { bgColorClass: 'bg-sky-500', textColorClass: 'text-white' };
    default:
      return { bgColorClass: 'bg-zinc-500', textColorClass: 'text-white' };
  }
};

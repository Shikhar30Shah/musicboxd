import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function truncateString(str, max='25') {
  if(str?.length){
    return str.length > max ? str.substring(0, max)+'...' : str;
  }
  return '';
}

export function formatDate(date) {
  const dt = new Date(date);
  const temp = dt.toLocaleDateString();
  const day = temp.split('/')[1];
  const year = temp.split('/')[2];
  const month = dt.toLocaleDateString('en-US', { month: 'short' });
  const time = dt.toLocaleTimeString();
  return `${day.length > 1 ? day : '0'+day} ${month} ${year}, ${time}`;
}

export function formatDuration(duration) {
  if(duration) {
    const inSeconds = duration/1000;
    const hours = parseInt(inSeconds/3600);
    const minutes = parseInt(inSeconds/60);
    const seconds = parseInt(inSeconds%60);
    if(hours)
      return `${String(hours).length === 1 ? '0'+hours:hours}:${String(minutes).length === 1 ? '0'+minutes:minutes}:${String(seconds).length === 1 ? '0'+seconds:seconds}`
    return `${String(minutes).length === 1 ? '0'+minutes:minutes}:${String(seconds).length === 1 ? '0'+seconds:seconds}`
  }
  return '00:00'
}
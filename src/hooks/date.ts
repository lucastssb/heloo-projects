import { parseISO } from 'date-fns';

export function useStringToISO(dateString: string){
    return parseISO(dateString);
}
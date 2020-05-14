import * as moment from "moment";
import { useLanguage } from "../i18n";


//@TODO сделать другое форматирование, если Алекандр попросит
export function useFormatDate() {
    const [ language ] = useLanguage();

    return function (date) {
        moment.locale(language.toLowerCase());
        let momentDate = moment(date);
        return momentDate.format("LL");
    }
  
};
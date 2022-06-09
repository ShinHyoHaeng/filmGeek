import { useTranslation } from 'react-i18next';

export default function GetStatus({status}) {

    const { t } = useTranslation('translations', {keyPrefix:'pages.Detail.Featured'});
    
    switch (status){
        case 'Rumored':
            return t('rumored');
        case 'Planned':
            return t('planned');
        case "In Production":
            return t('inProduction');
        case "Post Production":
            return t('postProduction');
        case "Released":
            return t('released');
        case "Canceled":
            return t('canceled');
        default:
            return null;
    }
}

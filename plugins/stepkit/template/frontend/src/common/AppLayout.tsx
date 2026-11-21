// rule-ok: tylko w aplikacji, układ panelu z menu (makiety mają Shell)
import { NAVIGATION } from '@app/shared';
import { SideMenuLayout } from './SideMenuLayout';

/** Panel administracyjny: menu z boku (na telefonie pod przyciskiem). */
export const AppLayout = () => {
  return <SideMenuLayout items={NAVIGATION} />;
};

export type Styles = {
    'sidebarItem': string;
    'sidebarIcon': string;
    'modalContainer': string;
    'modalFooter': string;
    'errorText': string;
    'modalBtnContainer': string;
    'btnSoft': string;
    'btnPrimary': string;
  };
  
  export type ClassNames = keyof Styles;
  
  declare const styles: Styles;
  
  export default styles;
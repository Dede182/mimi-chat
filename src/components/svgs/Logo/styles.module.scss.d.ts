export type Styles = {
    'logo': string;
    'spin' : string;
  };
  
  export type ClassNames = keyof Styles;
  
  declare const styles: Styles;
  
  export default styles;
import styles from  './styles.module.scss';
import logoSvg from '@/assets/svgs/logo.svg';

interface LogoSvgProps {
    extra? : string
}

const LogoSvg  : React.FC<LogoSvgProps> = ({extra})  => {
  return (
       <img src={logoSvg} alt="logo" className={`${styles.logo} ${extra}`}/>
  )
}

export default LogoSvg
import styles from  './styles.module.scss';
import logoSvg from '@/assets/svgs/logo.svg';

interface LogoSvgProps {
    extra? : string
    animate ?: boolean
}

const LogoSvg  : React.FC<LogoSvgProps> = ({extra,animate})  => {

  return (
       <img src={logoSvg} alt="logo" className={`${styles.logo}  ${animate ? styles.spin : ''} ${extra}`}/>
  )
}

export default LogoSvg
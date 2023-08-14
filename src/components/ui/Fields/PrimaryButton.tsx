
interface PrimaryButtonProps {
    loading: string,
    btnClass?: string,
    type: "button" | "submit" | "reset" | undefined,
    onClick?: () => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
}

const loaderClass :string = 'loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6';
const PrimaryButton = ({
    loading,btnClass = "btn-primary",type,onClick,children
} : PrimaryButtonProps) => {
    
  return (
    <button
        type={type}
        onClick={onClick}
        className={`btn ${btnClass} px-8`}>
      {
        loading == 'fetching' ? <div className={loaderClass}></div> : children
      }
    </button>
  )
}

export default PrimaryButton
import { t } from 'i18next'

interface InputErrorProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any
}
const InputError = ({errors} : InputErrorProps) => {
  return (
    <div className="invalid-feedback">{errors ? t(errors.message !) : ''}</div>
  )
}

export default InputError
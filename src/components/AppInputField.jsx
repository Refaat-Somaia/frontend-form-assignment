import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function AppInputField({
    icon,
    placeholder = '',
    type = 'text',
    value,
    onChange,
    onFocus,
    eyeIcon = false,
    onBlur,
    hint = "",
    isInvalid = false,
    className = '',
    iconClassName = '',
    inputClassName = ''
}) {
    const [showPassword, setShowPassword] = useState(false)

    const getInputType = () => {
        if (type !== 'password') return type
        return showPassword ? 'text' : 'password'
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className={`my-4 m-auto relative flex flex-col justify-center ${className}`}>
            <div className={`flex relative text-fontColor w-full rtl`}>
                <input
                    maxLength={60}
                    type={getInputType()}
                    placeholder={placeholder}
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={`appInput transition-all duration-150 w-full bg-offColor  rounded-lg border-[2px] border-offColor 
            px-4 py-3 ${eyeIcon ? 'pr-10' : 'pr-4'} pl-10 ${isInvalid ? "bg-red-500" : ""}  
            focus:shadow outline-none focus:border-secondaryColor  active:border-secondaryColor ${inputClassName}`}
                />

                {icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-fontColor opacity-50 ${iconClassName}`}
                    />
                )}

                {eyeIcon && (
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fontColor opacity-50  hover:opacity-70 transition-opacity"
                        onClick={togglePasswordVisibility}
                    />
                )}
            </div>

            {hint && (
                <p className='-bottom-6 right-0 text-sm absolute text-fontColor opacity-55'>
                    {hint}
                </p>
            )}
        </div>
    )
}
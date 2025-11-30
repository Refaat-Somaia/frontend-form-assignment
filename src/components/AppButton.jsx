export default function AppButton({ isAtag = false, ref = "", bgColor = 'bg-primaryColor', textColor = 'text-white',
    text = '', isCentered = false,
    onClick = () => { }

    , width = "w-44", height = "h-14", type = "button"
}) {

    return (
        isAtag ?
            <a href={ref} className='flex justify-center items-center'>
                <button className={`${width} ${height} ${bgColor} appButton rounded-lg flex justify-center items-center cursor-pointer`}>
                    <p className={`${textColor}`}>{text} </p>
                </button>
            </a>
            :
            <button onClick={onClick} type={type} className={`${width} ${height} ${isCentered ? "m-auto" : ""} ${bgColor} appButton rounded-lg flex justify-center items-center cursor-default`}>
                <p className={`${textColor} font-medium`}>{text}</p>
            </button>
    )
}

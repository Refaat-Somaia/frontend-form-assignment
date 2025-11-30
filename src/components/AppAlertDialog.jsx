
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function AppAlertDialog({ isVisible = false, onClose, icon, message = "message", children }) {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };




    if (!isVisible) return null;

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isVisible ? "opacity-50 visible" : "opacity-0 invisible"
                    }`}
                onClick={handleOverlayClick}
                aria-hidden="true"
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25rem] max-w-[90vw] alert-in z-50 bg-offColor rounded-xl shadow-2xl transition-all duration-300 ${isVisible ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                    }`}
            >
                <div className="p-3">
                    <div className="flex items-center justify-between mb-4">


                    </div>
                    {icon && <FontAwesomeIcon icon={icon} className='block m-auto text-primaryColor opacity-0 text-6xl mb-3 icon-pop' />}
                    <div className="text-fontColor mb-6 text-center">
                        {message}
                    </div>

                    <div className="flex justify-center space-x-3">
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-primaryColor hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
                            >
                                Ok
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

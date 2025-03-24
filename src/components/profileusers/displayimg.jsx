import { Domain } from "../../utels/consts";

function Displayimg({setIsOpen,user}){
    return(
        <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
                    onClick={() => setIsOpen(false)} // Close when clicking outside
                  >
                    <div
                      className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-gray-700"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                      {/* Modal header */}
                      <div className="flex items-center justify-between p- border-b rounded-t dark:border-gray-600 border-gray-200">
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
      
                      {/* Modal body */}
                      <div className=" w-ful h-96 p-4 md:p-5 space-y-4">
                        <img  src={`${Domain}/${user.pictureUrl}` || "/default-profile.png"}
                          alt="Profile"
                          className="w-full h-full object-"
                        />
                      </div>
                    </div>
                  </div>
    )
}
export default Displayimg;
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto w-full max-w-screen-xl p-4 lg:py-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Smart TODO
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-semibold text-gray-900 uppercase dark:text-white">
                Follow Us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-600 transition">GitHub</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a href="#" className="hover:text-blue-600 transition">
              Smart TODO
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:mt-0 space-x-5">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition">
              <i className="fab fa-discord"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

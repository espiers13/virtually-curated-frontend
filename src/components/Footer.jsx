function Footer() {
  return (
    <footer className="bg-hovercolor w-full mt-auto">
      <div className="mx-auto max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="place-content-center">
            <a
              href="/"
              className="text-textcolor1 bg-pagebg p-4 w-48 hover:bg-actioncolor transition delay-150 duration-300 ease-in-out hover:shadow-md"
            >
              VIRTUALLY CURATED
            </a>
          </div>
          <div className="mr-5 mb-5">
            <div className="place-content-center sm:mt-10">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white ">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://api.artic.edu/docs/"
                    className="text-gray-200 hover:underline"
                  >
                    Art Institute Chicago
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.vam.ac.uk/"
                    className="text-gray-200 hover:underline"
                  >
                    V&A
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

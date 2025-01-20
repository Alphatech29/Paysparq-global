function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-primary-600 w-full px-24 pb-10 pt-20 flex flex-col">
      <div className="w-full flex justify-between items-center pb-10">
        <div className="w-96">
          <h2 className="">
            <a href="">
              <img src="/image/footer-logo.png" alt="" className="h-16 pb-4" />
            </a>
          </h2>
          <p className="text-base text-gray-300">
            Experience secure, efficient trading and seamless international
            payments with Paysparq—Nigeria’s premier Cryptocurrency and Gift
            Card Exchange. Manage all your transactions in one trusted platform.
          </p>
        </div>
        <div className="text-text">
          <h2 className="text-lg font-interSB pb-4 text-white">Products</h2>
          <ul className="list-menue">
            <li>
              <a href="" className="text-gray-300 text-base">
                Money Transfer
              </a>
            </li>
            <li>
              <a href="" className="text-gray-300 text-base">
                Currency Exchange
              </a>
            </li>
            <li>
              <a href="" className="text-gray-300 text-base">
                Airtime to Cash
              </a>
            </li>
            <li>
              <a href="" className="text-gray-300 text-base">
                USD Virtual Card
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <h2 className="text-lg font-interSB pb-4 text-white">Company</h2>
          <ul>
            <li>
              <a href="" className="text-gray-300 text-base">
                About Us
              </a>
            </li>
            <li>
              <a href="" className="text-gray-300 text-base">
                Careers
              </a>
            </li>
            <li>
              <a href="" className="text-gray-300 text-base">
                Contact
              </a>
            </li>
            <li>
              <a href="" className="text-gray-300 text-base">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <h2 className="text-lg font-interSB pb-4 text-white">Developers</h2>
          <ul>
            <li>
              <a href="" className="text-gray-300 text-base">
                API Reference
              </a>
            </li>
            <li>
              <a href="" className="text-gray-300 text-base">
                Documentation
              </a>
            </li>
            <li>
              <a href="" className="text-gray-300 text-base">
                Contact
              </a>
            </li>
            <li>
              <a href="" className="text-gray-300 text-base">
                Libraries
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className=" w-full flex items-center justify-center flex-col">
        <hr className="border-zinc-400 w-full" />
        <p className="text-gray-300 text-sm p-2">©2024-{currentYear} Paysparq Technologies Limited. All rights reserved.</p>
        <hr className="border-zinc-400 w-full" />
      </div>
    </div>
  );
}

export default Footer;

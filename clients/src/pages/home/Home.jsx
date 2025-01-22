import { AuroraHero } from "./../../../components/animation/AuroraHero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShieldHalved,faMeteor,faHeadset,faGaugeHigh,} from "@fortawesome/free-solid-svg-icons";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PublicIcon from '@mui/icons-material/Public';
function Home() {
 
  return (
    <>
      <AuroraHero />
      <div className="w-full pc:px-24 mobile:px-4 pc:pt-20 mobile:pt-10">
        <div className=" flex flex-col justify-center items-center pc:pb-[7rem] mobile:pb-12">
        <span className="font-interSB  mobile:text-base text-secondary">As Features In</span>
        <h1 className="pc:text-4xl mobile:text-xl  pc:pt-6 pc:w-2/4 mobile:w-full text-center text-secondary  font-bold"><span className="text-primary-600">Seamlessly</span> spend gift cards, crypto, airtime, and global currencies—anytime, anywhere!</h1>
        </div>
        <div className="pc:w-full justify-center  pc:flex items-center pc:gap-8 ">
          <div className=" pc:w-[40%] mobile:w-full  flex justify-center items-center flex-col gap-5">
            <div className="flex items-center flex-col bg-paysparq p-5 rounded-lg">
              <span className="pb-7">
              <img src="/image/time-19.png" alt="" width={50}/>
              </span>
              <h1 className="text-xl font-interSB font-semibold pb-5 text-secondary">
                Best Rates Guaranteed
              </h1>
              <p className="text-center text-secondary text-base">
              Trade digital assets, gift cards, and cryptocurrency instantly at unbeatable rates. Enjoy fast, secure transactions, competitive prices, and a seamless experience. Buy and sell confidently for maximum value.
              </p>
            </div>
            <div className=" flex items-center flex-col bg-paysparq p-5 rounded-lg">
            <span className="pb-7">
              <img src="/image/smartphone-16.png" alt="" width={50}/>
              </span>
              <h1 className="text-xl font-interSB font-semibold pb-5 text-secondary">
                Instant Airtime Deals
              </h1>
              <p className="text-center text-secondary text-base">
              Convert airtime to cash, purchase airtime, and send international airtime securely—all in one place. Enjoy fast, reliable, fee-free service with seamless support and top-notch security. Simplify your transactions today.
              </p>
            </div>
          </div>
          <div>
            <div className=" bg-primary-600 mobile:flex mobile:mt-4 pc:mt-0 mobile:justify-center mobile:items-center rounded-lg relative">
              <img
                src="/image/wigglynet3.png"
                alt=""
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full object-cover z-10"
              />
              <img
                src="/image/main-screen-left.png"
                alt="phone screen"
                loading="lazy"
                className="relative z-20 pc:w-[450px] mobile:w-[200px]"
                width={720}
              />
            </div>
          </div>
          <div className=" pc:w-[40%] mobile:mt-5 pc:mt-0 flex justify-center items-center flex-col gap-5">
            <div className="flex items-center flex-col bg-paysparq p-5 rounded-lg">
            <span className="pb-6"> <PublicIcon style={{ fontSize: '3rem', color: '#F66B04' }}/></span>
              <h1 className="text-xl mobile:text-center font-interSB font-semibold pb-5 text-secondary">
                Seamless Local & Global Transfers
              </h1>
              <p className="text-center text-secondary text-base">
              Send money locally and internationally with ease. Enjoy fast, secure, fee-free transfers, real-time tracking, full payment security, and instant delivery for a seamless, reliable experience!
              </p>
            </div>
            <div className="flex items-center flex-col bg-paysparq p-5 rounded-lg">
              <span className="pb-6"><CurrencyExchangeIcon style={{ fontSize: '3rem', color: '#F66B04' }}/></span>
              <h1 className="text-xl font-interSB font-semibold pb-5 text-secondary">
              Exchange currency
              </h1>
              <p className="text-center text-secondary text-base">
            Paysparq offers unbeatable exchange rates and stands as one of Africa’s largest currency exchange platforms. Enjoy fast, secure, and seamless transactions, making us your trusted choice for currency exchange.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-fll justify-between items-center pc:flex pc:px-24 mobile:px-5 py-16">
        <div className="pc:w-3/6 mobile:w-full">
          <h2 className="text-3xl font-interSB font-bold text-secondary">
            All-In-One Cryptocurrency Exchange for Your Trading Needs
          </h2>
          <p className="pt-4 tex-xl font-interSB font-medium text-secondary">
            Experience fee-free trading with instant payments, secure device
            authorization, 24/7 customer support, real-time updates, and
            seamless transactions for coins like Bitcoin, USDT, USDC, Pi, and
            more – all in one platform.
          </p>
          <Button
            size="xs"
            className="bg-primary-600 mt-3 p-2 text-lg hover:border-dash"
          >
            Trade Now <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className=" flex items-end">
          <motion.img
            src="/image/bitcoin_app2_y0tkz4.png"
            width={300}
            alt="bitcoin"
            loading="lazy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.9, 1, 0.9],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
      <div className="w-full pc:px-24 mobile:px-5 pc:pt-20 mobile:pt-10 flex justify-center items-center">
        <div className="w-[120%] pc:h-96 bg-primary-600 rounded-lg relative overflow-hidden">
          <img
            src="/image/wigglynet3.png"
            alt=""
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className=" pc:px-20 mobile:px-5 relative pc:flex items-center pc:justify-between mobile:justify-center z-20">
            <div className="pl-9 pt-4 mobile:hidden pc:flex">
              <img
                src="/image/cards-screen.png"
                alt=""
                width={300}
                loading="lazy"
              />
            </div>
            <div className="card pc:w-2/4 mobile:w-full flex flex-col items-center pc:pb-48 mobile:py-5">
              <h1 className="text-white text-center text-3xl font-interB font-bold pb-3">
                Get your virtual USD card instantly!
              </h1>
              <p className=" text-center pc:w-2/3 mobile:w-full font-interSB text-base text-white font-medium">
                Get your Paysparq virtual USD card instantly, eliminating
                delays. Manage recurring expenses easily with a powerful card
                accepted everywhere.
              </p>
              <a
                href="#"
                className="outline-none focus:outline-none  mt-5 flex justify-center items-center gap-2 bg-secondary rounded-lg py-2 px-9 text-white text-center text-base hover:shadow-lg hover:shadow-rose-500"
              >
                Create <HiOutlineArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="why-choose-us w-full py-16 pc:px-24 mobile:px-5 bg-white">
        <div className="flex-col w-full flex justify-center items-center">
          <span className="bg-primary-700 p-2 rounded-lg text-white text-base font-interSB">
            Why choose Paysparq?
          </span>
          <h1 className="mt-3 pt-5 pc:text-4xl mobile:text-3xl font-interSB font-bold text-secondary mobile:text-center">
            Transactions Made Easy!
          </h1>
        </div>
        <div className="pc:flex  justify-center items-center gap-3 w-full pc:pt-10 p mt-5">
          <div className="flex flex-col justify-center items-center pc:w-2/6 rounded-xl bg-paysparq p-10">
            <span>
              <FontAwesomeIcon
                icon={faGaugeHigh}
                size="3x"
                className="text-primary-600"
              />
            </span>
            <h3 className="text-xl font-interSB font-bold text-center text-secondary pt-4">
            Swift Transactions.
            </h3>
            <p className="pt-5 text-center text-sm">
              Paysparq is designed to be user-friendly, allowing you to easily
              access features and perform transactions conveniently.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mobile:mt-4  pc:w-2/6 rounded-xl bg-paysparq p-10">
            <span>
              <FontAwesomeIcon
                icon={faHeadset}
                size="3x"
                className="text-primary-600"
              />
            </span>
            <h3 className="text-lg font-interSB font-bold text-center text-secondary pt-4">
              Customer Support
            </h3>
            <p className="pt-5 text-center text-sm">
              Get prompt response to your complaints, issues or enquiries by
              using any of our available call or social channels.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mobile:mt-4 pc:w-2/6 rounded-xl bg-paysparq p-10">
            <span>
              <FontAwesomeIcon
                icon={faShieldHalved}
                size="3x"
                className="text-primary-600"
              />
            </span>
            <h3 className="text-lg font-interSB font-bold text-center text-secondary pt-4">
              Secure Platform
            </h3>
            <p className="pt-5 text-center text-sm">
              Paysparq leverages technology in its operations to ensure you can
              perform transactions securely and efficiently.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mobile:mt-4 pc:w-2/6 rounded-xl bg-paysparq p-10">
            <span>
              <FontAwesomeIcon
                icon={faMeteor}
                size="3x"
                className="text-primary-600"
              />
            </span>
            <h3 className="text-lg font-interSB font-bold text-center text-secondary pt-4">
              Fast & Reliable.
            </h3>
            <p className="pt-5 text-center text-sm">
              With years of experience, we`ve optimized our platform for speed,
              reliability, and seamless transaction performance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

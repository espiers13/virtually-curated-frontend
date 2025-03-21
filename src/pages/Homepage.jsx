import { vaImg, allImg, myImg, articImg } from "../../public/imgs/images";

function Homepage({ currentUser }) {
  let userLink = "/";
  const imgStyling = "rounded-t-md p-2 transition-all object-cover ...  ";

  const textStyling =
    "mb-1 xl:text-2xl md:text-xl sm:text-md tracking-tight text-white h-24 place-content-center tracking-wide";

  const textBoxStyling = "rounded-b-md min-h-14 place-content-center ";

  const animationStyling =
    "bg-hovercolor rounded-md min-h-52 m-0.5 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 mb-5 hover:shadow-md hover:bg-actioncolor";

  if (currentUser) {
    userLink = `/mycollections/${currentUser.username}/${currentUser.user_id}`;
  }

  return (
    <main className="bg-pagebg h-screen">
      <h1 className="text-4xl mt-8 mb-8 font-bold text-white tracking-widest">
        EXPLORE THE WORLD THROUGH ART
      </h1>

      <div className="grid grid-cols-2 gap-10 ml-5 mr-5">
        <a className={animationStyling} href="/search/va">
          <img
            src={vaImg}
            alt="Van Gogh - Starry Night"
            className={imgStyling}
          />
          <div className={textBoxStyling}>
            <h2 className={textStyling}>
              SEARCH <br />
              V&A COLLECTIONS
            </h2>
          </div>
        </a>

        <a className={animationStyling} href="/search/aioc">
          <img src={articImg} alt="UCL Butterflies" className={imgStyling} />
          <div className={textBoxStyling}>
            <h2 className={textStyling}>
              SEARCH <br /> ART INSTITUTE <br /> OF CHICAGO COLLECTIONS
            </h2>
          </div>
        </a>
        <a className={animationStyling} href="/collections">
          <img
            src={allImg}
            alt="Manchester Art Gallery"
            className={imgStyling}
          />
          <div className={textBoxStyling}>
            <h2 className={textStyling}>
              VIEW <br /> ALL COLLECTIONS
            </h2>
          </div>
        </a>

        <a className={animationStyling} href={userLink}>
          <img src={myImg} alt="Starry Night" className={imgStyling} />
          <div className={textBoxStyling}>
            <h2 className={textStyling}>
              VIEW
              <br /> MY COLLECTIONS
            </h2>
          </div>
        </a>
      </div>
    </main>
  );
}

export default Homepage;

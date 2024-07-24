import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { getAllNews } from "./utils/api";
import { formatedDate, saveNews } from "./utils/helper";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function App() {
  const [search, setSearch] = useState();
  const { data, isPending, isError } = useQuery({
    queryKey: ["news", search],
    queryFn: () => getAllNews(search),
  });

  const handleOnClick = (article) => {
    saveNews(article);
    window.open(article.url, "_blank");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target[0].value ?? null);
  };

  return (
    <main className={clsx("container w-full mx-auto min-h-screen p-5 lg:p-10")}>
      <section className="p-5 block lg:flex justify-between gap-5">
        <Link to="/viewed" className="">
          Viewed News
        </Link>
        <form className="flex gap-5" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search news..."
            className={clsx(
              "w-full p-3 rounded-lg border border-gray-300 outline-none focus:border-red-500 transition-all duration-200"
            )}
          />
          <button
            type="submit"
            className="bg-red-500 text-white h-full aspect-square p-3 rounded-lg w-fit hover:bg-red-600 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </section>
      {isPending && (
        <section>
          <ul className="grid grid-cols-1 lg:grid-cols-8 w-full gap-5 p-5">
            <li
              className={clsx(
                "p-4 rounded-xl bg-gray-200 animate-pulse min-h-[300px] w-full",
                "lg:col-start-1 lg:col-span-4 lg:row-span-2",
                "flex flex-col justify-end"
              )}
            >
              <div className="w-1/4 h-5 bg-gray-300 animate-pulse rounded-xl"></div>
              <div className="wfull h-4 rounded-xl bg-gray-300 animate-pulse mt-3"></div>
              <div className="w-full h-4 rounded-xl bg-gray-300 animate-pulse mt-3"></div>
              <div className="w-2/4 h-4 rounded-xl bg-gray-300 animate-pulse mt-3"></div>
            </li>
            <li className="lg:col-span-2 transition-all duration-200 rounded-xl min-h-[300px]">
              <div className="w-full h-[180px] bg-gray-300 animate-pulse rounded-xl"></div>
              <div className="w-1/4 h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-full h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-full h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-3/4 h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
            </li>{" "}
            <li className="lg:col-span-2 transition-all duration-200 rounded-xl min-h-[300px]">
              <div className="w-full h-[180px] bg-gray-300 animate-pulse rounded-xl"></div>
              <div className="w-1/4 h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-full h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-full h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-3/4 h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
            </li>{" "}
            <li className="lg:col-span-2 transition-all duration-200 rounded-xl min-h-[300px]">
              <div className="w-full h-[180px] bg-gray-300 animate-pulse rounded-xl"></div>
              <div className="w-1/4 h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-full h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-full h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-3/4 h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
            </li>{" "}
            <li className="lg:col-span-2 transition-all duration-200 rounded-xl min-h-[300px]">
              <div className="w-full h-[180px] bg-gray-300 animate-pulse rounded-xl"></div>
              <div className="w-1/4 h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-full h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-full h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
              <div className="w-3/4 h-3 bg-gray-300 animate-pulse rounded-lg mt-3"></div>
            </li>
          </ul>
        </section>
      )}
      {isError && (
        <section className="min-h-[65vh] w-full p-5 flex flex-col justify-center">
          <p className="text-center text-red-500">Failed to fetch news</p>
        </section>
      )}
      <section className="mt-10">
        <ul
          className={clsx("grid grid-cols-1 lg:grid-cols-8 w-full gap-5 p-5")}
        >
          {data?.articles.map((article, index) => {
            const datePublished = formatedDate(article.publishedAt);
            if (index == 0 || index % 10 == 0) {
              return (
                <li
                  onClick={() => handleOnClick(article)}
                  key={article.title}
                  className={clsx(
                    "relative p-4 rounded-xl overflow-clip group cursor-pointer min-h-[300px] w-full",
                    "lg:col-start-1 lg:col-span-4 lg:row-span-2"
                  )}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-black">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-0 left-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/0 w-full h-full group-hover:backdrop-blur-sm transition-all duration-300 flex flex-col justify-end p-5 text-white">
                    <p className="px-2 py-1 bg-gray-300 w-fit text-black rounded text-sm">
                      <span className="mr-3">
                        <FontAwesomeIcon icon={faCalendar} />
                      </span>
                      {datePublished}
                    </p>
                    <h2 className="line-clamp-2 font-medium text-xl relative z-10 mt-2">
                      {article.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-lg">
                      {article.description}
                    </p>
                    <p className="text-white text-xs mt-3">
                      <span className="mr-3">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      {article.author}
                    </p>
                  </div>
                </li>
              );
            } else if (index >= 7 && (index - 7) % 10 == 0) {
              return (
                <li
                  onClick={() => handleOnClick(article)}
                  key={article.title}
                  className={clsx(
                    "relative p-4 group h-full rounded-xl overflow-clip cursor-pointer min-h-[300px] w-full",
                    "lg:col-start-5 lg:col-span-4 lg:row-span-2"
                  )}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-black">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-0 left-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/0 w-full h-full group-hover:backdrop-blur-sm transition-all duration-300 flex flex-col justify-end p-5 text-white">
                    <p className="px-2 py-1 bg-gray-300 w-fit rounded text-sm">
                      <span className="mr-3">
                        <FontAwesomeIcon icon={faCalendar} />
                      </span>
                      {datePublished}
                    </p>
                    <h2 className="line-clamp-2 font-medium text-xl relative z-10 mt-2">
                      {article.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-lg">
                      {article.description}
                    </p>
                    <p className="text-white text-xs mt-3">
                      <span className="mr-3">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      {article.author}
                    </p>
                  </div>
                </li>
              );
            } else {
              return (
                <li
                  onClick={() => handleOnClick(article)}
                  key={article.title}
                  className="lg:col-span-2 hover:shadow hover:scale-[1.005] transition-all duration-200 rounded-xl overflow-clip cursor-pointer min-h-[300px]"
                >
                  <div className="w-full h-[180px] bg-red-300 top-0 left-0 relative">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="py-5 px-3">
                    <p className="px-2 py-1 bg-gray-300 w-fit rounded text-xs">
                      <span className="mr-3">
                        <FontAwesomeIcon icon={faCalendar} />
                      </span>
                      {datePublished}
                    </p>
                    <h2 className="line-clamp-2 font-medium text-base relative z-10 mt-2">
                      {article.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {article.description}
                    </p>
                    <p className="text-gray-500 text-xs mt-3">
                      <span className="mr-3">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      {article.author}
                    </p>
                  </div>
                  {/* Add more article content here */}
                </li>
              );
            }
          })}
        </ul>
      </section>
      <section className="flex justify-between p-5">
        <button className="bg-red-500 text-white p-3 rounded-lg w-fit">
          Previous
        </button>
        <button className="bg-red-500 text-white p-3 rounded-lg w-fit">
          Next
        </button>
      </section>
    </main>
  );
}

export default App;

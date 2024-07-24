import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSavedNews } from "./utils/helper";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Viewed() {
  const savedNews = getSavedNews();

  return (
    <main className="container min-h-screen w-full mx-auto p-5 lg:p-10">
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        <span className="ml-3">Back to News</span>
      </Link>
      <ul className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-5">
        {savedNews.map((article) => (
          <li key={article.title}>
            <a href={article.url} target="_blank">
              <div className="w-full h-[180px] relative bg-red-500">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-sm mt-3 line-clamp-2">{article.title}</h2>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

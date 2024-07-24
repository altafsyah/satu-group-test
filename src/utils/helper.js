export const formatedDate = (dateString) => {
  const date = new Date(dateString);

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[date.getUTCDay()];
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${dayName}, ${day} ${month} ${hours}.${minutes}`;
};

export const saveNews = (article) => {
  let savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];

  const isArticleExist = savedNews.some(
    (savedArticle) => savedArticle.url === article.url
  );

  if (!isArticleExist) {
    savedNews.push({
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage,
    });
    localStorage.setItem("savedNews", JSON.stringify(savedNews));
    return true;
  }

  return false;
};

export const getSavedNews = () => {
  let savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
  return savedNews;
};

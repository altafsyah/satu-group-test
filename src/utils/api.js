const baseUrl = "https://newsapi.org/v2/everything";

async function getAllNews(q) {
  try {
    let response = await fetch(
      `${baseUrl}?q=${q && q != "" ? q : "Indonesia"}&pageSize=20&language=id`,
      {
        headers: {
          "X-Api-Key": "d9fa499208e64bfbb5e8758ff5423a74",
        },
      },
    );

    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch news");
    }
  } catch (error) {
    return JSON.stringify({ error: error });
  }
}

export { getAllNews };

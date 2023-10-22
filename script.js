const topMoviesList = document.querySelector(".list");
const searchInput = document.querySelector(".search_input");
const searchButton = document.querySelector(".search-bar button");

const url =
  "https://api.themoviedb.org/3/discover/movie?api_key=0350783f5567adba763f73f89851b1f5&sort_by=popularity.desc";

// API 요청 보내기

let jsonData; // 데이터를 저장할 변수

// 데이터 가져오기 함수
async function fetchData() {
  try {
    const response = await fetch(url);
    jsonData = await response.json();
    // 데이터를 변수에 저장하고 나중에 사용할 수 있습니다.
    // jsonData 변수를 사용하여 다른 작업을 수행할 수 있습니다.
    return jsonData;
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다: " + error);
    throw error;
  }
}

function extractMovieTitles(data) {
  const movieTitles = data.results.map((movie) => movie.title);
  return movieTitles;
}

function extractOverview(data) {
  const movieOverview = data.results.map((movie) => movie.overview);
  return movieOverview;
}

function extractPosterUrls(data) {
  const posterUrls = data.results.map(
    (movie) => `https://image.tmdb.org/t/p/w400${movie.poster_path}`
  );
  return posterUrls;
}

fetchData()
  .then((data) => {
    const movieTitles = extractMovieTitles(data);
    const overView = extractOverview(data);
    const posterUrls = extractPosterUrls(data);

    for (const key in movieTitles) {
      const li = document.createElement("li");
      li.classList.add("moviename");

      const img = document.createElement("img");
      img.src = posterUrls[key]; // 이미지 URL 설정

      const paragrah = document.createElement("p");
      paragrah.classList.add("overview");

      li.textContent = Number(key) + 1 + ": " + movieTitles[key];
      paragrah.textContent = overView[key];

      topMoviesList.appendChild(li);
      topMoviesList.appendChild(img); // 이미지를 추가합니다.
      topMoviesList.appendChild(paragrah);
    }
  })
  .catch((error) => {
    console.error("데이터 추출 중 오류가 발생했습니다: " + error);
  });

//// SEARCH

let userInput;

function captureInput() {
  userInput = searchInput.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=0350783f5567adba763f73f89851b1f5&query=${userInput}`;
  const listResults = document.querySelector(".listResults"); // 선택한 목록 요소

  // Make an API request
  fetch(searchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const movies = data.results;
      if (movies.length > 0) {
        console.log("Movies found:");
        movies.forEach((movie) => {
          console.log(movie.title);

          // 각 영화에 대한 html li 요소 생성하기
          const listItem = document.createElement("li");
          const image = document.createElement("img");
          image.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`; // 포스터 이미지 URL
          image.alt = movie.title;
          listItem.appendChild(image);
          const title = document.createElement("span");
          title.textContent = movie.title;
          listItem.appendChild(title);

          listResults.appendChild(listItem); // li 요소를 목록에 추가
        });
      } else {
        console.log("No movies found.");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

searchButton.addEventListener("click", captureInput);
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    captureInput();
  }
});

// function captureInput() {
//   userInput = inputElement.value;
//   console.log(userInput);
//   const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=0350783f5567adba763f73f89851b1f5&query=${userInput}`;
//   console.log(searchUrl);
// }

// searchButton.addEventListener("click", captureInput);

// console.log(userInput);

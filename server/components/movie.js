const weatherApi = `http://www.omdbapi.com/?t="MOVIETITLE"&apikey=4e038712`;

    const titleCall = async () => {
      const response = await fetch(movieApi);
      const json = await response.json();
      const p = document.createElement("p");
      const body = document.querySelector("body");
      p.className = "movie title";
      p.innerHTML = json.main.title;
      body.append(p);
    };
console.log("HELOOOOOO", window);
// console.log("simpleWeb3", simpleWeb3);

const buildImage = async () => {
  console.log("buildImage");
  const nftIds = getQueryVariable("nftIds");
  console.log(nftIds);
  const nftUrl = getQueryVariable("nftUrl");
  const nftUrls = nftIds.map((id) => {
    console.log(nftUrl);
    console.log(id);
    return nftUrl[0].concat(id).concat(".png");
  });

  nftUrls.forEach((url) => {
    var img = document.createElement("img");
    img.src = url;
    img.style = "background-color: blue; width: 150px; height: 150px";
    document.getElementById("content").appendChild(img);
  });
};

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      const nftsString = decodeURIComponent(pair[1]);
      const nfts = nftsString.split(",");
      return nfts;
    }
  }
  console.log("Query variable %s not found", variable);
}

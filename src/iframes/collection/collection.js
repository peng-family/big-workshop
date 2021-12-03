let pageNumber = 1;
const nbElement = 8;

const setInputNumber = () => {
  document.getElementById("inputPage").value = pageNumber;
};

const changePageNumber = () => {
  const pageNumberQueried = document.getElementById("inputPage").value;
  if (pageNumberQueried && pageNumber < pageNumberQueried) {
    getCollection(pageNumberQueried - pageNumber);
  } else if (pageNumberQueried && pageNumber > pageNumberQueried) {
    getCollection(pageNumberQueried - pageNumber);
  }
};

const getQueryVariable = (variable) => {
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
};

const totalSupply = Number(getQueryVariable("totalSupply")[0]);

const canGoNext = (number) => {
  if (
    (number > 0 && (pageNumber + number) * nbElement <= totalSupply) ||
    ((pageNumber + number) * nbElement > totalSupply &&
      ((pageNumber + number) * nbElement) % totalSupply < nbElement)
  ) {
    return true;
  }
};

const canGoPrevious = (number) => {
  return number < 0 && pageNumber + number > 0;
};

const getCollection = (number) => {
  if (canGoPrevious(number) || canGoNext(number) || number === 0) {
    pageNumber = pageNumber + number;
    const contents = document.getElementById("content");
    contents.innerHTML = "";

    for (
      let index = pageNumber * nbElement - nbElement;
      index < pageNumber * nbElement;
      index++
    ) {
      if (totalSupply > index) {
        const req = new XMLHttpRequest();
        req.open(
          "GET",
          `https://ipfs.io/ipfs/QmcEgLN4B43ZLL2QwQbsmWJGS6TZEwHP6ju3zKEocg5uh8/${index}.json`
        );
        req.onload = () => {
          const metadata = JSON.parse(req.response);
          const idNftElement = buildIdNftElement(metadata.tokenId);
          const imgElement = buildImgElement(metadata.image, metadata.tokenId);
          const imgContainer = buildImgContainer(
            idNftElement,
            metadata.tokenId
          );
          imgContainer.appendChild(imgElement);

          document.getElementById("content").appendChild(imgContainer);
        };
        req.onerror = (err) => console.error(err);
        req.send();
      }
    }
  }
  document.getElementById("inputPage").value = pageNumber;
};

const buildImgElement = (url, id) => {
  const img = document.createElement("img");
  img.src = url;
  img.style = "height: 100%; width: 100%;";
  img.id = `nft-${id}`;
  return img;
};

const buildIdNftElement = (id) => {
  const idNft = document.createElement("div");
  idNft.textContent = `${id}.`;
  idNft.style = "position: absolute; top: 10px; left: 16px;";
  return idNft;
};

const buildImgContainer = (idNftElement) => {
  const imgContainer = document.createElement("div");
  imgContainer.className = "background--custom";
  imgContainer.style =
    "width: 20vw; height: auto; min-height: 20vw;  padding: 5px; margin-bottom: 25px; position: relative; cursor: pointer;";
  imgContainer.appendChild(idNftElement);
  return imgContainer;
};
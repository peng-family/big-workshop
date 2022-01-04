const totalSupply = Number(getQueryVariable("totalSupply")[0]);

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
    const promisesToGenereateNFT = [];
    for (
      let index = pageNumber * nbElement - nbElement;
      index < pageNumber * nbElement;
      index++
    ) {
      if (totalSupply > index) {
        promisesToGenereateNFT.push(generatePenguinNFT(index));
      }
    }
    Promise.all(promisesToGenereateNFT).then((results) => {
      results.sort((a, b) =>
        compareToSort(a.metadata.tokenId, b.metadata.tokenId)
      );
      results.forEach((result) =>
        document.getElementById("content").appendChild(result.htmlElement)
      );
    });
  }
  document.getElementById("inputPage").value = pageNumber;
};

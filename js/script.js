const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');

  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
optArticleTagsSelector = '.post-tags .list';
optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';

    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  let allTags = [];
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      html = html + linkHTML;
      if (allTags.indexOf(linkHTML) == -1) {
        allTags.push(linkHTML);
      }
    }
    tagsWrapper.innerHTML = html;
  }
  const tagList = document.querySelector(optTagsListSelector);
  tagList.innerHTML = allTags.join(' ');

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTagLink of activeTagLinks) {
      activeTagLink.classList.remove('active');
    }

    const tagLinks = document.querySelector(href);

    for (let tagLink of tagLinks) {
      tagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    const links = document.querySelectorAll('.list a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  addClickListenersToTags();
}

generateTags();



const SEARCH_URL_BASE = '/_hcms/v3/site-search/search';

const SURROUNDING_PAGE_NUMBERS = 1; 
const searchResultsContainer = document.querySelectorAll('.hs-search-results');

// --- ICONS CONFIGURATION ---
const NEXT_ICON_SVG = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4804 17.5597C11.4956 17.5746 11.9597 17.6884 12.5117 17.8125C13.0639 17.9366 13.5216 18.0192 13.5289 17.9961C13.5362 17.973 13.5933 17.5982 13.6558 17.1632C13.7813 16.2896 14.0851 15.2697 14.4098 14.6318C15.4217 12.6438 17.2372 11.3275 19.4393 10.9853L20 10.8982L20 10.02L20 9.1417L19.4918 9.0583C16.162 8.51191 13.9912 6.07678 13.5851 2.43259C13.5586 2.19463 13.5269 2 13.5147 2C13.4024 2 11.5416 2.43861 11.5064 2.47336C11.481 2.49849 11.4999 2.72157 11.5486 2.96901C12.087 5.70904 13.6287 7.93867 15.6294 8.87093L16.1094 9.09457L6.24046 9.11208L1.13131e-06 9.1232L1.28669e-06 10.9005L6.25652 10.9117L16.1021 10.9293L15.4963 11.2295C13.9244 12.0084 12.68 13.5363 11.9472 15.587C11.7383 16.1713 11.4232 17.5033 11.4804 17.5597Z" fill="#101000"/>
</svg>`;

const PREV_ICON_SVG = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.51958 17.5597C8.50444 17.5746 8.0403 17.6884 7.48825 17.8125C6.93613 17.9366 6.47844 18.0192 6.47108 17.9961C6.46379 17.973 6.40665 17.5982 6.34419 17.1632C6.21871 16.2896 5.91489 15.2697 5.59025 14.6318C4.57834 12.6438 2.76277 11.3275 0.560742 10.9853L6.20861e-07 10.8982L6.97636e-07 10.02L7.74417e-07 9.1417L0.508237 9.0583C3.83799 8.51191 6.00883 6.07678 6.41493 2.43259C6.44143 2.19463 6.47311 2 6.48531 2C6.59761 2 8.45839 2.43861 8.49358 2.47336C8.51903 2.49849 8.5001 2.72157 8.45145 2.96901C7.913 5.70904 6.37125 7.93867 4.37056 8.87093L3.89064 9.09457L13.7595 9.11208L20 9.1232L20 10.9005L13.7435 10.9117L3.89786 10.9293L4.50375 11.2295C6.07556 12.0084 7.32001 13.5363 8.05285 15.587C8.26168 16.1713 8.57679 17.5033 8.51958 17.5597Z" fill="#101000"/>
</svg>`;
// ----------------------------

/**
 * Grab JSON configuration for the module from the HubL data.
 */

const getModuleConfig = moduleName => {
  const configJSONScript = document.querySelector(
    `[data-${moduleName}-config]`
  );
  if (configJSONScript) {
    return JSON.parse(configJSONScript.textContent);
  }
  return {
    /* eslint-disable camelcase */
    search_results_heading_tag: 'h1',
    search_results_page_path: '',
    search_results_count_message:
      'Displaying [[offset]] – [[limit]] of [[total]] results',
    search_results_display_featured_images: false,
    search_results_display_category: false,
    featured_image_alt: 'Featured Image',
    first_page_link_text: '',
    previous_page_link_text: '',
    next_page_link_text: '',
    last_page_link_text: '',
    no_results_message: 'No results message',
    navigation_aria_label: 'Paging Navigation',
    /* eslint-enable camelcase */
  };
};

const moduleConfig = getModuleConfig('search_results');

const getSearchPageUrl = pageOffset => {
  const currentPageParams = new URLSearchParams(window.location.search);
  currentPageParams.set('offset', pageOffset);
  return `${moduleConfig.search_results_page_path
    }?${currentPageParams.toString()}`;
};

/**
 * Given a total number of results, an offset, and a page size, returns an object full of pagination data for display.
 *
 * @param {number} totalItems the total number of items to be paginated
 * @param {number} currentOffset the current offset of the page
 * @param {number} pageSize the number of items per page
 * @returns {object} the paginator object with data for rendering pagination
 */

const getPaginator = (totalItems, currentOffset, pageSize) => {
  // default page size is 10
  pageSize = pageSize || 10;

  /**
   * Setting up variables
   */

  const maxPageNumbersToDisplay = SURROUNDING_PAGE_NUMBERS * 2 + 1;

  const centerPageSlot = Math.ceil(maxPageNumbersToDisplay / 2);

  // calculate total pages of items
  const totalPagesOfItems = Math.ceil(totalItems / pageSize);

  const currentPage = currentOffset / pageSize + 1;

  // calculate previous page url based on offset and page size
  const prevPageUrl =
    currentPage > 1 ? getSearchPageUrl(currentOffset - pageSize) : '';

  // calculate next page url based on offset and page size
  const nextPageUrl =
    currentPage < totalPagesOfItems
      ? getSearchPageUrl(currentOffset + pageSize)
      : '';

  /**
   * Setting up functions.
   */

  // Page numbers are a rolling window of the current page, and attempt to center the current page in the navigation.
  const calculateBeginAndEndPageNumbers = () => {
    let firstDisplayedPageNumber;
    let lastDisplayedPageNumber;

    // There are less total pages than the maximum number of pages to display, so we can just display all of them.
    if (totalPagesOfItems <= maxPageNumbersToDisplay) {
      firstDisplayedPageNumber = 1;
      lastDisplayedPageNumber = totalPagesOfItems;
      return { firstDisplayedPageNumber, lastDisplayedPageNumber };
    }

    // The current page is less than the center page slot, so we start at 1.
    if (currentPage <= centerPageSlot) {
      firstDisplayedPageNumber = 1;
      lastDisplayedPageNumber = centerPageSlot + SURROUNDING_PAGE_NUMBERS;
      return { firstDisplayedPageNumber, lastDisplayedPageNumber };
    }

    // The current page is one away from the last, so we can end at the total number of pages.
    if (currentPage + 1 >= totalPagesOfItems) {
      firstDisplayedPageNumber = totalPagesOfItems - centerPageSlot;
      lastDisplayedPageNumber = totalPagesOfItems;
      return { firstDisplayedPageNumber, lastDisplayedPageNumber };
    }

    // The current page is somewhere in the middle, so we calculate to try and keep it in the middle.
    firstDisplayedPageNumber = currentPage - SURROUNDING_PAGE_NUMBERS;
    lastDisplayedPageNumber = currentPage + SURROUNDING_PAGE_NUMBERS;
    return { firstDisplayedPageNumber, lastDisplayedPageNumber };
  };

  const maybeAddLastPageLink = pages => {
    // if the number of pages is less than the total pages, add an ellipsis, and link to the last page.
    if (
      totalPagesOfItems > currentPage + SURROUNDING_PAGE_NUMBERS &&
      totalPagesOfItems > pages.length
    ) {
      const lastPageOffset = totalPagesOfItems * pageSize - pageSize;

      return [
        ...pages,
        { display: '...' },
        {
          display: totalPagesOfItems,
          offset: lastPageOffset,
          url: getSearchPageUrl(lastPageOffset),
        },
      ];
    }
    return pages;
  };

  const maybeAddFirstPageLink = pages => {
    if (
      currentPage > centerPageSlot &&
      totalPagesOfItems > maxPageNumbersToDisplay
    ) {
      return [
        { display: '1', offset: 0, url: getSearchPageUrl(0) },
        { display: '...' },
        ...pages,
      ];
    }
    return pages;
  };

  /**
   * Putting variables and functions together to generate the paginator.
   */

  const {
    firstDisplayedPageNumber,
    lastDisplayedPageNumber,
  } = calculateBeginAndEndPageNumbers(currentPage);

  const pageNumberSlots = Array(
    lastDisplayedPageNumber - firstDisplayedPageNumber + 1
  ).keys();

  // Fill the page number slots with display data.
  let pages = [...pageNumberSlots].map(i => {
    const pageOffset = (firstDisplayedPageNumber + i - 1) * pageSize;
    return {
      display: firstDisplayedPageNumber + i,
      offset: pageOffset,
      url: getSearchPageUrl(pageOffset),
    };
  });

  pages = maybeAddLastPageLink(pages);
  pages = maybeAddFirstPageLink(pages);

  const firstPageUrl = getSearchPageUrl(0);
  const lastPageUrl = getSearchPageUrl(totalPagesOfItems * pageSize - pageSize);

  // return object with all paginator properties required by the view
  return {
    totalItems,
    currentPage,
    prevPageUrl,
    nextPageUrl,
    firstPageUrl,
    lastPageUrl,
    pageSize,
    totalPagesOfItems,
    firstDisplayedPageNumber,
    lastDisplayedPageNumber,
    pages,
  };
};

const renderPageNumberLinks = (pages, currentPage, show) => {
  if (!show) {
    return '';
  }

  return pages
    .map(page => {
      const activeClass =
        currentPage === page.display
          ? 'hs-search-results__pagination__link--active'
          : '';
      const currentPageAriaLabel =
        currentPage === page.display
          ? `${moduleConfig.current_page_aria_label}.` // add a period to the end of the aria label to have screen readers pause.
          : '';
      if (page.url) {
        return `<a class="hs-search-results__pagination__link hs-search-results__pagination__link--number ${activeClass}"
                  aria-label="${currentPageAriaLabel} ${moduleConfig.page_number_aria_label} ${page.display}"
                  href="${page.url}">${page.display}</a>`;
      }
      return `<span class="hs-search-results__pagination__link">${page.display}</span>`;
    })
    .join('');
};

const renderPageNavigation = paginator => {
  
  // Logic for Previous Button State
  const isPrevDisabled = paginator.currentPage === 1;
  const prevClass = `hs-search-results__pagination__link hs-search-results__pagination__link--prev ${isPrevDisabled ? 'hs-search-results__pagination__link--disabled' : ''}`;
  const prevHref = isPrevDisabled ? 'javascript:void(0);' : paginator.prevPageUrl;
  
  // Logic for Next Button State
  const isNextDisabled = paginator.currentPage === paginator.totalPagesOfItems;
  const nextClass = `hs-search-results__pagination__link hs-search-results__pagination__link--next ${isNextDisabled ? 'hs-search-results__pagination__link--disabled' : ''}`;
  const nextHref = isNextDisabled ? 'javascript:void(0);' : paginator.nextPageUrl;

  const prevAria = moduleConfig.previous_page_link_text || "Previous";
  const nextAria = moduleConfig.next_page_link_text || "Next";

  return `
  <nav class="hs-search-results__pagination" role="navigation" aria-label="${moduleConfig.navigation_aria_label}">

    <a class="${prevClass}" 
       aria-label="${prevAria}" 
       href="${prevHref}"
       ${isPrevDisabled ? 'aria-disabled="true"' : ''}>
      ${PREV_ICON_SVG}
    </a>

    ${renderPageNumberLinks(
      paginator.pages,
      paginator.currentPage,
      moduleConfig.show_numbers
    )}

    <a class="${nextClass}" 
       aria-label="${nextAria}" 
       href="${nextHref}"
       ${isNextDisabled ? 'aria-disabled="true"' : ''}>
      ${NEXT_ICON_SVG}
    </a>

  </nav>
  `;
};

// NOTE: This function is kept for reference, but we use direct H6 in individual result now
const renderSearchResultHeading = searchResultTitle => {
  const headingLevel = (moduleConfig.search_results_heading_tag).replace('h', '');
  const resultHeadingLevel = parseInt(headingLevel, 10);
  return `
    <h${resultHeadingLevel} class="hs-search-results__title">${searchResultTitle}</h${resultHeadingLevel}>
  `;
};

const renderSearchResultCategory = category => {
  if (!moduleConfig.search_results_display_category || !category) {
    return '';
  }
  return `<p class="hs-search-results__category">${category}</p>`;
};


const renderFeaturedImage = featuredImageUrl => {
  if (!featuredImageUrl) {
    return `<div class="hs-search-results__featured-image-wrapper">
      <img class="hs-search-results__featured-image" src="../../Images/System-templates/default-featured-image.png" alt="featured_image">
    </div>`;
  }
  // Alt intentionally left blank as it is not needed for decorative images.
  return `<div class="hs-search-results__featured-image-wrapper">
      <img class="hs-search-results__featured-image" src="${featuredImageUrl}" alt="${moduleConfig.featured_image_alt}"> 
    </div>`; 
};


const renderIndividualResult = result => {
  // Directly using result.title inside h6 to avoid nesting <hX> inside <h6>
  const featuredImage = moduleConfig.search_results_display_featured_images
    ? renderFeaturedImage(result.featuredImageUrl)
    : '';

  return `<li class="hs-search-results__listing__item">
  <a class="hs-search-results__link" href="${result.url}">
    ${featuredImage}
    <div class="hs-search-results__content">
      <h6 class="hs-search-results__title">${result.title}</h6>
      ${renderSearchResultCategory(result.category)}
      <p class="hs-search-results__description">${result.description}</p>
    </div>
    </a>
  </li>
  `;
};

const renderEmptyResults = resultData => {
  [...searchResultsContainer].forEach(resultContainer => {
    const noResultsMessage = moduleConfig.no_results_message.replace(
      '[[search_term]]',
      `“${resultData.searchTerm}”`
    );

    resultContainer.innerHTML = `<div class="hs-search__no-results text-center mt-20">
      <p>${noResultsMessage}</p>
    </div>`;
  });
};

const renderSearchResults = resultData => {
  const paginator = getPaginator(
    resultData.total,
    resultData.offset,
    resultData.limit
  );

  // Get search term from Result Data or URL params
  const searchTerm = resultData.searchTerm || new URLSearchParams(window.location.search).get('q') || "";
   
  // Custom Message: Showing X results for "Term"
  const searchResultsCountMessage = `Showing ${resultData.total} results for "${searchTerm}"`;

  const results = resultData.results
    .map(result => {
      return renderIndividualResult(result);
    })
    .join('');

  [...searchResultsContainer].forEach(resultContainer => {
    
    resultContainer.innerHTML = `
        <p class="hs-search-results__message text-center mt-10 mb-40" role="status">${searchResultsCountMessage}</p>
        <ul class="hs-search-results__listing">
          ${results}
        </ul>
        ${renderPageNavigation(paginator)}
      `;
  });
};

const search = searchParams => {
  const searchUrl = `${SEARCH_URL_BASE}?${searchParams.toString()}`;
  const request = new XMLHttpRequest();

  request.open('GET', searchUrl, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const resultData = JSON.parse(request.responseText);
      if (resultData.results.length > 0) {
        renderSearchResults(resultData);
      } else {
        renderEmptyResults(resultData);
      }
    } else {
      console.error('Server reached, error retrieving results.'); // eslint-disable-line no-console
    }
  };

  request.onerror = function () {
    console.error('Could not reach the server.'); // eslint-disable-line no-console
  };

  request.send();
};

document.addEventListener('DOMContentLoaded', () => {
  const currentSearchParams = new URLSearchParams(window.location.search);
  currentSearchParams.set('analytics', 'true');

  if (currentSearchParams.has('term')) {
    currentSearchParams.set('q', currentSearchParams.get('term'));
    currentSearchParams.delete('term');
  }

  if (currentSearchParams.get('q')?.length) {
    search(currentSearchParams);
  }
});
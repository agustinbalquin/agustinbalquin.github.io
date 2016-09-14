import React from 'react';
import { observable, computed, autorun, action } from 'mobx';
import 'whatwg-fetch';
import marked from 'marked';

class Page {
  title;
  what;
  how;

  constructor(title, what, how) {
    this.title = title;
    this.what = what;
    this.how = marked(how.join("\n\n"));
  }
  slug() {
    return this.title.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}

class PageStore {
  @observable pages = [];
  @observable currentPageSlug = null;

  @action loadPages() {
    if( ! this.hasPages() ) {
      fetch('/pages.js')
        .then((response) => response.json())
        .then((json) => {
          for(let r of json) {
            this.addPage(r);
          }
        })
    }
  }

  hasPages() {
    return this.pages.length != 0
  }

  @computed get currentPage() {
    return this.pages.find(page => page.slug() === this.currentPageSlug)
  }

  addPage(json) {
    this.pages.push(new Page(json.title, json.what, json.how))
  }
}

export const pageStore = new PageStore();
autorun(() => {
  document.title = `Website - ${pageStore.currentPage ? pageStore.currentPage.title : "pages" }`;
  window.scrollTo(0,0);
});

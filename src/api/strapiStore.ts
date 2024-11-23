import {
  ApiAboutAbout,
  ApiHomepageHomepage,
  ApiPortfolioPortfolio,
  ApiSongSong,
  ApiTopbarTopbar,
} from '@api/types/generated/contentTypes';
import { Reactive, reactive } from 'vue';

export const state: Reactive<{
  topBarContent?: ApiTopbarTopbar;
  homeContent?: ApiHomepageHomepage;
  aboutContent?: ApiAboutAbout;
  portfolioContent?: ApiPortfolioPortfolio;
  contactContent?: ApiPortfolioPortfolio;
  songs?: ApiSongSong[];
  getTopBarContent: () => Promise<void>;
  getHomeContent: () => Promise<void>;
  getAboutContent: () => Promise<void>;
  getPortfolioContent: () => Promise<void>;
  getContactContent: () => Promise<void>;
  getSongs: () => Promise<void>;
}> = reactive({
  topBarContent: undefined,
  homeContent: undefined,
  aboutContent: undefined,
  portfolioContent: undefined,
  songs: undefined,
  getTopBarContent: async () => {
    if (!state.topBarContent) {
      const response = await makeApiRequest('topbar');
      state.topBarContent = response;
    }
  },
  getHomeContent: async () => {
    if (!state.homeContent) {
      const response = await makeApiRequest('homepage');
      state.homeContent = response;
    }
  },
  getAboutContent: async () => {
    if (!state.aboutContent) {
      const response = await makeApiRequest('about');
      state.aboutContent = response;
    }
  },
  getPortfolioContent: async () => {
    if (!state.portfolioContent) {
      const response = await makeApiRequest('portfolio');
      state.portfolioContent = response;
    }
  },
  getContactContent: async () => {
    if (!state.contactContent) {
      const response = await makeApiRequest('contact');
      state.contactContent = response;
    }
  },
  getSongs: async () => {
    if (!state.songs) {
      const response = await makeApiRequest('songs');
      state.songs = response;
    }
  },
});

const makeApiRequest = async (
  url: string,
  populate: boolean = true,
): Promise<any> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/${url}${populate ? '?populate=*' : ''}`,
  );
  const responseJson = await response.json();
  return responseJson.data;
};

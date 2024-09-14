import {
  ApiAboutAbout,
  ApiHomepageHomepage,
  ApiPortfolioPortfolio,
  ApiSongSong,
} from '@api/types/generated/contentTypes';
import { Reactive, reactive } from 'vue';

export const state: Reactive<{
  homeContent?: ApiHomepageHomepage;
  aboutContent?: ApiAboutAbout;
  portfolioContent?: ApiPortfolioPortfolio;
  songs?: ApiSongSong[];
  getHomeContent: () => Promise<void>;
  getAboutContent: () => Promise<void>;
  getPortfolioContent: () => Promise<void>;
  getSongs: () => Promise<void>;
}> = reactive({
  homeContent: undefined,
  aboutContent: undefined,
  songs: undefined,
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

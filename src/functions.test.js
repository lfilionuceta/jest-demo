const mockAxios = require('axios');
const {
  getFilms,
} = require('./functions');

// https://jestjs.io/docs/mock-functions#mocking-partials
jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios');

  return {
    __esModule: true,
    ...originalModule,
    get: jest.fn(),
  }
});

// https://jestjs.io/docs/api#describename-fn
describe('getFilms', () => {
  it('calls get the correct number of times', async () => {
    const mockedFilmUrls = {
      data: {
        films: [
          'url1',
          'url2',
          'url3',
        ]
      }
    };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockedFilmUrls));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { title: 'Movie 1' } }));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { title: 'Movie 2' } }));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { title: 'Movie 3' } }));

    const result = await getFilms(1);

    expect(mockAxios.get).toHaveBeenCalledTimes(4);
    expect(result?.[0].title).toEqual('Movie 1');
    expect(result?.[1].title).toEqual('Movie 2');
    expect(result?.[2].title).toEqual('Movie 3');
  });
});

import { put, call, takeLatest } from 'redux-saga/effects';
const url = 'https://dads-scraper.herokuapp.com';

export function* watcherLoadNews() {
    yield takeLatest('HOMEPAGE_LOADED', workerLoadNews);
}



export function* workerLoadNews() {
    yield put({ type: 'NEWS_LOADING' });

    let isLoaded = false;
    let stories = [];

    try {

        // ++++ if using mocks use this instead:
        // isLoaded = true;

        // ++++ if online use this:-
        yield fetch(url)
            .then(res => res.json())
            .then(json => {
                json.length > 0 ? isLoaded = true : isLoaded = false;
                json.length > 0 ? stories = json : stories = [];
                return;
            })
            .catch(err => console.log('news api error: ', err));

        } catch(e) {
            console.log('Load-News Saga error: ', e);
        }
        
    isLoaded ? yield put({ type: 'NEWS_LOADED', stories }) : yield put({ type: 'NEWS_FAILED' })
}
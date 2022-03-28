import { takeLatest, all, put, call } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([
        watcherSaga(),
    ])
}
function* watcherSaga() {
    yield takeLatest('fetching', workerSaga);
}


function* workerSaga(data) {
    try {
        const fetchApi = async () => {
            const API_KEY = 'AIzaSyCNns6DpdfuPPEiQzNorU6dvprFa1YD3bE';
            const totalDetailsApi = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&part=id&q=${data.value.searchData}&key=${API_KEY}`
            const likeApi = `https://youtube.googleapis.com/youtube/v3/videos/rate?id=fbXKzndVrYM&rating=like&key=${API_KEY}`;
            const videosApi = `https://youtube.googleapis.com/youtube/v3/search?part=id&maxResults=10&q=${data.searchData}&key=${API_KEY}`;
            const response = await fetch(totalDetailsApi,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.value.tokenData}`,
                        'Accept': 'application/json'
                    }
                }
            );
            const responseData = await response.json();
            return responseData;
        }
        const response = yield call(fetchApi);
        yield put({ type: 'success', response })
    } catch (err) {
        console.log(err);
    }
}
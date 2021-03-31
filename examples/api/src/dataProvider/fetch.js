import codeMessage from './codeMessage';

export const fetchJson = (
    url,
    options = { credentials: 'include', mode: 'cors' }
) => {
    const requestHeaders =
        options.headers ||
        new Headers({
            Accept: 'application/json',
        });

    if (
        !requestHeaders.has('Content-Type') &&
        !(options && options.body && options.body instanceof FormData)
    ) {
        requestHeaders.set('Content-Type', 'application/json');
    }

    requestHeaders.set('Authorization', 'bearer stbui');

    if (options.body) {
        options.body = JSON.stringify(options.body);
    }

    return fetch(url, {
        credentials: 'include',
        mode: 'cors',
        ...options,
        headers: requestHeaders,
    })
        .then(response =>
            response.text().then(text => ({
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text,
            }))
        )
        .then(({ status, statusText, headers, body }) => {
            let json;
            try {
                json = JSON.parse(body);
            } catch (e) {
                console.error(e);
            }
            if (status < 200 || status >= 300) {
                if (status === 500) {
                    return;
                }
                return Promise.reject(
                    new Error((json && json.error) || statusText)
                );
            }

            let code = Number(json.code);

            // 不符合预期
            if (json && code !== 0) {
                const message =
                    json.detail || json.message || '系统错误，请联系管理员';
                const _codeMessage = codeMessage[json.code];
                return Promise.reject(new Error(_codeMessage || message));
            }

            // 返回预期数据
            return Promise.resolve(json);
        });
};

export default fetchJson;

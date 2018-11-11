// Core
import predict from 'predict';

export const range = (start, stop, step = 1) => {
    return (Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step));
};

export const getAverageValue = (data) => {
    const start = 0.01;
    const array = Object.keys(data).map(key => data[key]);
    const end = start * (array.length + 1);
    const lr = predict.linearRegression(array, range(start, end, start));

    return Math.round(lr.predict(start + end));
};

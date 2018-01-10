/**
 * Logs previous and current state for every action call
 * @param getState
 * @returns {Function}
 */
export default function logger({ getState }) {
    return (next) => (action) => {
        return next(action);
    };
}

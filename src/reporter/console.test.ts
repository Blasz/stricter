import logConsole from './console';

describe('consoleReporter', () => {
    const logMock = jest.fn();
    console.log = logMock;

    beforeEach(() => {
        logMock.mockReset();
    });

    it('outputs errors for empty report', () => {
        const empty = {};
        logConsole(empty);

        expect(logMock.mock.calls.length).toBe(1);
    });

    it('outputs warn for every warning', () => {
        const warns = {
            rule1: {
                warnings: ['warning1'],
                errors: [],
                time: 0,
            },
            rule2: {
                warnings: ['warning2'],
                errors: [],
                time: 0,
            },
        };
        logConsole(warns);

        expect(logMock.mock.calls.length).toBe(1 + 2);
        expect(logMock.mock.calls[1][0]).toMatch(/warning:/);
    });

    it('outputs error for every error', () => {
        const errors = {
            rule1: {
                errors: ['error1'],
                warnings: [],
                time: 0,
            },
            rule2: {
                errors: ['error2'],
                warnings: [],
                time: 0,
            },
        };
        logConsole(errors);

        expect(logMock.mock.calls.length).toBe(1 + 2);
        expect(logMock.mock.calls[1][0]).toMatch(/error:/);
    });
});

module.exports = {
    preset: 'jest-puppeteer',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/e2e/**/*.test.js'
    ],
    collectCoverageFrom: [
        'src/js/**/*.js',
        '!src/js/__tests__/**',
        '!src/js/app.js'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};

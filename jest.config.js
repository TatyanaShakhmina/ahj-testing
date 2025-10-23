module.exports = {
    projects: [
        {
            displayName: 'unit',
            testEnvironment: 'jsdom',
            transform: { '^.+\\.js$': 'babel-jest' },
            testMatch: ['**/src/js/__tests__/**/*.test.js'],
            collectCoverageFrom: [
                'src/js/**/*.js',
                '!src/js/__tests__/**',
                '!src/js/app.js'
            ],
            coverageDirectory: 'coverage',
            coverageThreshold: { global: { branches: 80, functions: 80, lines: 80, statements: 80 } },
            moduleNameMapper: {
                '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
                '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
            }
        },
        {
            displayName: 'e2e',
            testEnvironment: 'node',
            testMatch: ['**/e2e/**/*.test.js'],
            testTimeout: 30000
        }
    ],
    coverageReporters: ['text', 'lcov', 'html']
};

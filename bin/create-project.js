#!/usr/bin/env node

import('../src/index.js').then(index => {
    return index.start();
});
const path = require('path');
const process = require('process');
const makeProvider = require('../..');

const provider = makeProvider({
	negotiateProtocol() {
		return {identifier: 'ava-3.2', ava: {version: '3.15.0'}, projectDir: __dirname};
	},
});

const worker = provider.worker({
	extensionsToLoadAsModules: [],
	state: JSON.parse(process.argv[2]),
});

const ref = path.resolve(process.argv[3]);

if (worker.canLoad(ref)) {
	worker.load(ref, {requireFn: require});
}

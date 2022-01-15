module.exports = {
	"site": {
		"title": "beep",
		"description": "Cool Site",
		"font": "Cutive Mono",
		"url": process.env.NODE_ENV === 'production' ? 'https://beeps.dev' : 'http://127.0.0.1:8080'
	},
	"generator": {
		process: process.pid,
		timestamp: new Date().toLocaleString(),
		arch: process.arch,
		platform: process.platform,
		seed: Math.random() * 5000,
		year: new Date().getFullYear(),
		env: process.env.NODE_ENV === 'production' ? 'production' : 'development'
	},
	"package": require('../package.json'),
}
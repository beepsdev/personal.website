module.exports = {
	"site": {
		"title": "beep",
		"description": "Cool Site",
		"font": "Cutive Mono"
	},
	"generator": {
		process: process.pid,
		timestamp: new Date().toLocaleString(),
		arch: process.arch,
		platform: process.platform,
		seed: Math.random()*5000,
		year: new Date().getFullYear()
	}
}
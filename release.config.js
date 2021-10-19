module.exports = {
	branch: 'master',
	tagFormat: '${version}',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/npm',
		'@semantic-release/github',
		['@semantic-release/git', {
			message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
			assets: [
				'CHANGELOG.md',
				'package.json',
				'package-lock.json'
			]
		}]
	]
};
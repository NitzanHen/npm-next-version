//@ts-check
const core = require('@actions/core');
const axios = require('axios').default;

const npmRegistry = 'https://registry.npmjs.org/'

try {
  const repoName = core.getInput('repo');
  const registry = core.getInput('registry') || npmRegistry;
  const tag = core.getInput('tag') || 'unstable';
  const delimiter = core.getInput('delimiter') || '-'

  /** @param {string} version */
  const getNextVersion = (version) => {
    if(!version) {
      throw new Error(`Unknown error - failed to fetch latest version with tag ${tag}`)
    }

    const regex = new RegExp(`^(?<primary>\\d+\\.\\d+\\.\\d+)(${delimiter}(?<tag>${tag})\\.(?<n>\\d+))?`, 'i');
    const result = version.match(regex);
    if (!result.groups) {
      throw new Error(`Version string on latest version with tag ${tag} does not follow required pattern`)
    }
    const match = result.groups;
    return `${match.primary}${delimiter}${tag}.${parseInt(match.n) + 1 || 1}`
  }

  axios.get(`${registry}/${repoName}`)
    .then(res => res.data)
    .then(data => data && data['dist-tags'] && data['dist-tags'][tag])
    .then(getNextVersion)
    .then(nextVersion => core.setOutput('next-version', nextVersion))

}
catch (e) {
  core.setFailed(e.message);
}
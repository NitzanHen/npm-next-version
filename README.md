# npm-next-version

This Github action determines the version string for the next unstable version of Rhax, based on its latest unstable version in the npm registry. 
It is used in the [Rhax](https://github.com/rhaxjs/rhax) repository's workflows (to be exact, [here](https://github.com/rhaxjs/rhax/blob/f6ad41dc3298780f21c0a2093f69e8c3e1141e82/.github/workflows/npm-publish-unstable.yml#L24)).

While the action was implemented and tested in an ad-hoc manner for the needs of Rhax, and might change according to them, its code could be easily adapted for other projects looking for similar functionality. For what it's worth (in terms of non-specific code), "magic numbers" (strings) were avoided, and instead provided as parameters with default values.

Note: the `node_modules` directory is not ignored because Github actions written in Javascript require it to be present in the repository itself. See [here](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github).

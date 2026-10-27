# Contributing

Here's what you need to know to contribute to `is-hotkey`.

## Reporting bugs

If you run into any weird behavior while using `is-hotkey`, feel free to open a new issue in this repository. Please include enough information for other people to reproduce the issue. A minimal example, preferably hosted somewhere that other people can run it (such as a CodeSandbox) really helps.

Please also check if the issue is reproducible on all browsers, or just on a specific browser, and let us know in the issue description which browsers and operating systems you've tried.

## Submitting pull requests

Handcrafted pull requests are greatly appreciated. Where possible, include tests and documentation changes in your pull request. You'll also need to add a changeset if your pull request includes changes that need to be released as a new version. See below for more info on changesets.

Please avoid breaking changes unless there's a strong reason to include them. If your pull request includes breaking changes, please explain this in the pull request description.

**If you used AI assistance for your pull request, please make a note of this in the description, including the extent to which you relied on AI.** At minimum, we ask that you read and fully understand the effects of every line of code in your PR. If it's evident that this hasn't been done, or if a PR contains an excessive amount of AI-generated code, we might close your PR or ask you to rewrite it yourself.

## Adding changesets

New versions of `is-hotkey` are published automatically using the [Changesets](https://changesets.dev/) tool. Draft versions are created or updated automatically whenever a pull request containing a changeset file is merged. This means that if your pull request includes changes that affect the published NPM package, you'll need to include a changeset in your PR. If you don't include one, this could delay merging your PR.

Pull requests that do not affect runtime code, such as changes to tests, documentation or development dependencies, do not require a changeset.

To add a changeset, run `yarn changeset`. If your changes consist only of bug fixes (no public API changes), you should create a patch changeset. Otherwise, for new features and breaking changes, create a minor changeset instead. Since `is-hotkey` is still in `0.x`, major changesets should not be used.

In the description for your changeset, include a brief summary of what changed. This summary should be aimed at developers using `is-hotkey`, and should include any information that would be useful when upgrading to this version, or when deciding whether to upgrade.
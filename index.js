const core = require("@actions/core");
const github = require("@actions/github");

try {
  const repoName = github.context.payload.repository.name;
  const packagePath = `./package.json`;

  const packageInfo = require(packagePath);
  if (github.context.payload.ref) {
    const ref = github.context.payload.ref;
    const refVersionParts = ref.split(/\//gi);
    const refVersion = refVersionParts[refVersionParts.length - 1];

    if (packageInfo.version.toLowerCase() !== refVersion.toLowerCase()) {
      core.setFailed(
        `Package version is ${packageInfo.version}, tag version is ${refVersion}`
      );
    } else {
      process.exit(0);
    }
  } else {
    core.setFailed("This action can only be called from a tagged ref");
  }
} catch (err) {
  console.error(err);
  core.setFailed(err.message);
}

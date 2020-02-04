const core = require("@actions/core");
const github = require("@actions/github");

try {
  const repoName = github.context.payload.repository.name;
  const packagePath = `/github/workspace/${repoName}`;

  const packageInfo = require(packagePath);
  if (github.context.payload.ref) {
    const ref = github.context.payload.ref;
    const refVersionParts = ref.split(/\//gi);
    const refVersion = refVersionParts[refVersionParts.length - 1];

    if (packageInfo.version.toLowerCase() !== refVersion.toLowerCase()) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
}
process.exit(1);

# Chowchow

Dependency-less (almost) per user customisable [git hooks](https://git-scm.com/docs/githooks)

## Dependency-less?

It uses no npm modules, but does require `ruby` to be somewhere on your `$PATH`. (we use it read yaml).

## Whats wrong with Husky?

Nothing that much I guess, but I don't like automatically installing git hooks on other peoples machines without consent and enforcing workflows on them. Such things should be both opt-in and easily opt-out-able from any point.
Show people a path but don't force them down it, you don't knows whats best for them.

## Basic Usage

You don't actually need to add this module to your project's package.json for simple usage.

Install the githook scripts by running
```sh
npx @sandfox/chowchow install
```

_installation will fail if there are any non chowchow created hooks installed as chowchow would permanently  overwrite them, use --force if your fine with that_

and then create a `chowchow.yml` file in the root of your project with any commands you want
for each of the git hooks you are interested in. Any arguments that `git` would normally supply to a hook are available in `$GIT_PARAMS`.

```yaml
pre-commit:
    - npm test

post-checkout:
    - yarn install
    - ./scripts/log $GIT_PARAMS

commit-msg:
    - ./scripts/something
    - ./scripts/add-metadata

```

If at anytime you want to stop chowchow from running, either comment out or move the `.chowchow.yml` file, or run 
```
npx @sandfox/chowchow uninstall
```
to remove all of it's git hooks from `.git/hooks`. It will only delete hooks that `chowchow` created.

## How it works

Upon installation a [bash script](./hook.sh) is installed into `git/hooks` for each possible git hook (that chowchow knows about).

When the hook is triggered by `git`, the bash script checks the `.chowchow.yml` file for a section corresponding to the name of hook and for each item it finds, evals the item.


## License

GPL-3.0 
See [LICENSE](LICENSE) for full terms.


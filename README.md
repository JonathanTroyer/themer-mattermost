# themer-mattermost

A Mattermost theme generator for [themer](https://github.com/mjswensen/themer).

## Installation & usage

Install this module wherever you have `themer` installed:

```none
npm install themer-mattermost
```

Then pass `themer-mattermost` as a `-t` (`--template`) arg to `themer`:

```none
themer -c my-colors.js -t themer-mattermost -o gen --code-theme monokai
```

Note that you can select the specific [code theme](https://docs.mattermost.com/help/settings/theme-colors.html) used. Currently the only valid options are `solarized-dark`, `solarized-light`, `github`, and `monokai`.
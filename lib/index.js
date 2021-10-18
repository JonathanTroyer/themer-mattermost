const validCodeThemes = [
    'solarized-dark',
    'solarized-light',
    'github',
    'monokai'
]

module.exports.render = (colors, options) => {
    if (options == null) {
        options = {};
    }
    let codeTheme = options['code-theme'];
    if (!validCodeThemes.includes(codeTheme)) {
        console.warn(`Invalid code theme '${codeTheme}'. Reverting to default.`);
        codeTheme = validCodeThemes[0];
    }

    let themes = [];
    for (let [themeName, colorSet] of Object.entries(colors)) {
        themes.push(Promise.resolve({
            name: `themer-mattermost-${themeName}.json`,
            contents: JSON.stringify({
                sidebarBg: colorSet.shade0,
                sidebarText: colorSet.shade6,
                sidebarHeaderBg: colorSet.shade0,
                sidebarHeaderTextColor: colorSet.shade7,
                sidebarUnreadText: colorSet.shade7,
                sidebarTextHoverBg: colorSet.shade2,
                sidebarTextActiveBorder: colorSet.shade3,
                sidebarTextActiveColor: colorSet.shade7,
                onlineIndicator: colorSet.accent3,
                awayIndicator: colorSet.accent2,
                dndIndicator: colorSet.accent0,
                mentionBj: colorSet.accent7,
                mentionBg: colorSet.accent7,
                mentionColor: colorSet.shade7,
                centerChannelBg: colorSet.shade0,
                centerChannelColor: colorSet.shade6,
                newMessageSeparator: colorSet.shade5,
                mentionHighlightBg: colorSet.shade2,
                mentionHighlightLink: colorSet.accent5,
                codeTheme,
                linkColor: colorSet.accent5,
                buttonBg: colorSet.accent4,
                buttonColor: colorSet.shade7,
                errorTextColor: colorSet.accent1,
            })
        }));
    }
    return themes;
}

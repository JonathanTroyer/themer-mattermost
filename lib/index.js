const validCodeThemes = [
	"solarized-dark",
	"solarized-light",
	"github",
	"monokai",
];

const template = {
	name: "Mattermost",

	render: async function* (colorSet, options) {
		const hasValidCodeTheme =
			options?.["code-theme"] &&
			validCodeThemes.includes(options["code-theme"]);
		const codeTheme = hasValidCodeTheme
			? options["code-theme"]
			: validCodeThemes[0];

		if (
			options?.["code-theme"] &&
			!validCodeThemes.includes(options["code-theme"])
		) {
			console.warn(
				`Invalid code theme '${options["code-theme"]}'. Reverting to default.`,
			);
		}

		// Generate theme for each variant (dark, light)
		for (const [variantName, variant] of Object.entries(colorSet.variants)) {
			yield {
				path: `themer-mattermost-${variantName}.json`,
				content: Buffer.from(
					JSON.stringify(
						{
							sidebarBg: variant.shade0,
							sidebarText: variant.shade6,
							sidebarUnreadText: variant.shade7,
							sidebarTextHoverBg: variant.shade2,
							sidebarTextActiveBorder: variant.shade3,
							sidebarTextActiveColor: variant.shade7,
							sidebarHeaderBg: variant.shade0,
							sidebarTeamBarBg: variant.shade1,
							sidebarHeaderTextColor: variant.shade7,
							onlineIndicator: variant.accent3,
							awayIndicator: variant.accent2,
							dndIndicator: variant.accent0,
							mentionBg: variant.accent7,
							mentionColor: variant.shade7,
							centerChannelBg: variant.shade0,
							centerChannelColor: variant.shade6,
							newMessageSeparator: variant.shade5,
							linkColor: variant.accent5,
							buttonBg: variant.accent4,
							buttonColor: variant.shade7,
							errorTextColor: variant.accent1,
							mentionHighlightBg: variant.shade2,
							mentionHighlightLink: variant.accent5,
							codeTheme,
						},
						null,
						2,
					),
					"utf8",
				),
			};
		}
	},

	renderInstructions: (paths) =>
		`Copy ${paths.join(" and ")} to your Mattermost team settings under Display > Theme > Custom Theme.`,
};

module.exports = template;

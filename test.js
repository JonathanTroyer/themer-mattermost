const template = require("./lib/index.js");

// Mock color set for testing
const mockColorSet = {
	variants: {
		dark: {
			shade0: "#1c1c1c",
			shade1: "#262626",
			shade2: "#303030",
			shade3: "#3a3a3a",
			shade4: "#444444",
			shade5: "#4e4e4e",
			shade6: "#585858",
			shade7: "#ffffff",
			accent0: "#ff5555",
			accent1: "#ff6b6b",
			accent2: "#ffa500",
			accent3: "#50fa7b",
			accent4: "#8be9fd",
			accent5: "#79dae8",
			accent6: "#ffb86c",
			accent7: "#ff79c6",
		},
		light: {
			shade0: "#ffffff",
			shade1: "#f8f8f8",
			shade2: "#e8e8e8",
			shade3: "#d8d8d8",
			shade4: "#c8c8c8",
			shade5: "#b8b8b8",
			shade6: "#686868",
			shade7: "#000000",
			accent0: "#d50000",
			accent1: "#ff5722",
			accent2: "#ff9800",
			accent3: "#4caf50",
			accent4: "#2196f3",
			accent5: "#03a9f4",
			accent6: "#ff5722",
			accent7: "#e91e63",
		},
	},
};

async function runTests() {
	console.log("Running tests...");

	try {
		// Test 1: Basic template structure
		if (!template.name) {
			throw new Error("Template should have a name");
		}
		console.log("✓ Template has name");

		// Test 2: Render function exists
		if (typeof template.render !== "function") {
			throw new Error("Template should have a render function");
		}
		console.log("✓ Template has render function");

		// Test 3: Render instructions function exists
		if (typeof template.renderInstructions !== "function") {
			throw new Error("Template should have renderInstructions function");
		}
		console.log("✓ Template has renderInstructions function");

		// Test 4: Render function generates output
		const results = [];
		for await (const result of template.render(mockColorSet)) {
			results.push(result);
		}

		if (results.length === 0) {
			throw new Error("Render should generate at least one file");
		}
		console.log(`✓ Render generates ${results.length} files`);

		// Test 5: Generated files have correct structure
		for (const result of results) {
			if (!result.path || !result.content) {
				throw new Error("Generated files should have path and content");
			}

			const content = JSON.parse(result.content.toString());
			if (!content.sidebarBg || !content.centerChannelBg) {
				throw new Error("Generated theme should have required properties");
			}
		}
		console.log("✓ Generated files have correct structure");

		// Test 6: Code theme validation
		const resultsWithInvalidCodeTheme = [];
		for await (const result of template.render(mockColorSet, {
			"code-theme": "invalid-theme",
		})) {
			resultsWithInvalidCodeTheme.push(result);
		}

		const contentWithInvalidTheme = JSON.parse(
			resultsWithInvalidCodeTheme[0].content.toString(),
		);
		if (contentWithInvalidTheme.codeTheme !== "solarized-dark") {
			throw new Error("Invalid code theme should default to solarized-dark");
		}
		console.log("✓ Invalid code theme defaults correctly");

		console.log("\nAll tests passed! ✨");
		process.exit(0);
	} catch (error) {
		console.error(`\n❌ Test failed: ${error.message}`);
		process.exit(1);
	}
}

runTests();

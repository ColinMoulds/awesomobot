                    require.config({
                        paths: {
                            "vs": "/monaco/min/vs"
                        }
                    });

                    require(["vs/editor/editor.main"], function () {

                        monaco.editor.defineTheme("TowelTest", {
                            base: "vs", // can also be vs-dark or hc-black
                            inherit: true, // can also be false to completely replace the builtin rules
                            rules: [{
                                    token: "comment",
                                    foreground: "ffa500",
                                    fontStyle: "italic underline"
                                },
                                {
                                    token: "comment.js",
                                    foreground: "008800",
                                    fontStyle: "bold"
                                },
                                {
                                    token: "comment.css",
                                    foreground: "0000ff"
                                } // will inherit fontStyle from `comment` above
                            ]
                        });

                        monaco.editor.defineTheme("MattIsTrueWaifu", {
                            base: "vs-dark",
                            inherit: true,
                            rules: [{
                                    background: "282c34"
                                },
                                {
                                    token: "comment",
                                    foreground: "5C6370",
                                    fontStyle: "italic"
                                },
                                {
                                    token: "string.escape",
                                    foreground: "EF596F",
                                    fontStyle: "italic"
                                },
                                {
                                    token: "constant.js",
                                    foreground: "A6B2C0",
                                    fontStyle: "italic"
                                }
                            ],
                            colors: {
                                "activityBar.background": "#2F333D",
                                "activityBar.foreground": "#D7DAE0",
                                "activityBarBadge.background": "#4D78CC",
                                "activityBarBadge.foreground": "#F8FAFD",
                                "badge.background": "#282c34",
                                "button.background": "#404754",
                                "debugToolBar.background": "#21252b",
                                "dropdown.background": "#1d1f23",
                                "diffEditor.insertedTextBackground": "#00809B33",
                                "dropdown.border": "#181A1F",
                                "editor.background": "#282c34",
                                "editorError.foreground": "#c24038",
                                "editorIndentGuide.activeBackground": "#C8C8C859",
                                "editorMarkerNavigation.background": "#21252b",
                                "editorRuler.foreground": "#AAB1C026",
                                "editor.lineHighlightBackground": "#2c313c",
                                "editor.selectionBackground": "#67769660",
                                "editor.selectionHighlightBackground": "#ffffff10",
                                "editor.selectionHighlightBorder": "#ddd",
                                "editorCursor.background": "#ffffffc9",
                                "editorCursor.foreground": "#528bff",
                                "editorBracketMatch.border": "#515a6b",
                                "editorBracketMatch.background": "#515a6b",
                                "editor.findMatchBackground": "#42557B",
                                "editor.findMatchBorder": "#457dff",
                                "editor.findMatchHighlightBackground": "#314365",
                                "editor.wordHighlightBackground": "#484e5b",
                                "editor.wordHighlightBorder": "#7f848e",
                                "editor.wordHighlightStrongBackground": "#AAB1C026",
                                "editor.wordHighlightStrongBorder": "#7f848e",
                                "editorGroup.background": "#181A1F",
                                "editorGroup.border": "#181A1F",
                                "editorGroupHeader.tabsBackground": "#21252B",
                                "editorIndentGuide.background": "#3B4048",
                                "editorLineNumber.foreground": "#495162",
                                "editorActiveLineNumber.foreground": "#737984",
                                "editorWhitespace.foreground": "#3B4048",
                                "editorHoverWidget.background": "#21252B",
                                "editorHoverWidget.border": "#181A1F",
                                "editorSuggestWidget.background": "#21252B",
                                "editorSuggestWidget.border": "#181A1F",
                                "editorSuggestWidget.selectedBackground": "#2c313a",
                                "editorWidget.background": "#21252B",
                                "focusBorder": "#21252b",
                                "input.background": "#1d1f23",
                                "list.activeSelectionBackground": "#2c313a",
                                "list.activeSelectionForeground": "#d7dae0",
                                "list.focusBackground": "#383E4A",
                                "list.hoverBackground": "#292d35",
                                "list.highlightForeground": "#C5C5C5",
                                "list.inactiveSelectionBackground": "#2c313a",
                                "list.inactiveSelectionForeground": "#d7dae0",
                                "peekViewEditor.matchHighlightBackground": "#29244b",
                                "scrollbarSlider.background": "#4e566660",
                                "scrollbarSlider.activeBackground": "#747D9180",
                                "scrollbarSlider.hoverBackground": "#5A637580",
                                "sideBar.background": "#21252b",
                                "sideBarSectionHeader.background": "#282c34",
                                "statusBar.background": "#21252B",
                                "statusBar.foreground": "#9da5b4",
                                "statusBarItem.hoverBackground": "#2c313a",
                                "statusBar.noFolderBackground": "#21252B",
                                "statusBar.debuggingBackground": "#7e0097",
                                "statusBar.debuggingBorder": "#66017a",
                                "statusBar.debuggingForeground": "#ffffff",
                                "tab.activeBackground": "#2c313a",
                                "tab.border": "#181A1F",
                                "tab.inactiveBackground": "#21252B",
                                "tab.hoverBackground": "#323842",
                                "tab.unfocusedHoverBackground": "#323842",
                                "terminal.foreground": "#C8C8C8",
                                "terminal.ansiBlack": "#2D3139",
                                "terminal.ansiBlue": "#61AFEF",
                                "terminal.ansiGreen": "#98C379",
                                "terminal.ansiYellow": "#D19A66",
                                "titleBar.activeBackground": "#282c34",
                                "titleBar.activeForeground": "#9da5b4",
                                "titleBar.inactiveBackground": "#282C34",
                                "titleBar.inactiveForeground": "#6B717D"
                            }
                        });

                        var editor = monaco.editor.create(document.getElementById("advancedEditor"), {
                            value: [
                                "function x() {",
                                "\tconsole.log(`This is the advanced editor!`);",
                                "}"
                            ].join("\n"),
                            language: "javascript",
                            theme: "MattIsTrueWaifu"
                        });
                    });
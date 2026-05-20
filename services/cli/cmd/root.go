package cmd

import (
	"fmt"

	"github.com/mganesh135/code-sentinal/services/cli/cmd/commands"
	"github.com/spf13/cobra"
)

var (
	version = "1.0.0"
)

var rootCmd = &cobra.Command{
	Use:     "sentinal",
	Short:   "Code Sentinal is CLI base code reviewing tool",
	Long:    "Code Sentinal is CLI base code reviewing tool, with a vast features all built using Cobra",
	Version: version,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Welcome to Code Sentinal, for further commands please type sentinal --help")
	},
}

func Execute() {
	addCommands()
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
	}
}

func addCommands() {
	rootCmd.AddCommand(commands.Watch())
}

func init() {
	// Add a flag to the root command.
	rootCmd.PersistentFlags().BoolP("version", "v", false, "display version")
	rootCmd.PersistentFlags().BoolP("help", "h", false, "display help")
	rootCmd.PersistentFlags().BoolP("verbose", "V", false, "display verbose output")
}

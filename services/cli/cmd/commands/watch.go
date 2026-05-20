package commands

import (
	"fmt"

	"github.com/spf13/cobra"
)

// Checks for latest commits that have not been published and starts code analysis automatically.
var watchCmd = &cobra.Command{
	Use:   "watch",
	Short: "Watch the code for changes",
	Long:  "Watch the code for changes",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Watching the code for changes")
	},
}

func Watch() *cobra.Command {
	return watchCmd
}

func init() {
	// add flags to the watch command
	watchCmd.PersistentFlags().BoolP("version", "v", false, "display version")
	watchCmd.PersistentFlags().BoolP("help", "h", false, "display help")
	watchCmd.PersistentFlags().BoolP("verbose", "V", false, "display verbose output")
}

package template

import "embed"

//go:embed *.go.tpl
var RocGuiTemplate embed.FS
